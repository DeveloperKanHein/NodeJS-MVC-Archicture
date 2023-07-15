const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class OtherAccentController
{
    static upload = FileUpload.getInstance().upload("basic-accent/").fields([
            { name: 'audio', maxCount: 1 },
            { name: 'photo', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne();
        res.render('other_accent', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const otherAccent = basic.otherAccent[parseInt(req.params.index)];
        res.render('other_accent_detail', { basic: basic, otherAccent: otherAccent, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const audioLink = req.files.audio[0].location;
        const photoLink = req.files.photo[0].location;
        const basic = await Basic.findOne();
        const otherAccent = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            paragraph: req.body.paragraph,
            photoLink: photoLink
        };
        basic.otherAccent.push(otherAccent);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedAudioLink = basic.basicAccent[parseInt(req.body.index)].audioLink;
        const existedPhotoLink = basic.basicAccent[parseInt(req.body.index)].photoLink;
        const audioLink = req.files.audio == undefined ? existedAudioLink: req.files.audio[0].location;
        const photoLink = req.files.photo == undefined ? existedPhotoLink: req.files.photo[0].location;

        const otherAccent = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            paragraph: req.body.paragraph,
            photoLink: photoLink
        };
        basic.otherAccent[parseInt(req.body.index)] = otherAccent;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.otherAccent.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = OtherAccentController;