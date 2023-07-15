const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class BasicAccentController
{
    static upload = FileUpload.getInstance().upload("basic-accent/").fields([
            { name: 'audio', maxCount: 1 },
            { name: 'photo', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne();
        res.render('basic_accent', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const basicAccent = basic.basicAccent[parseInt(req.params.index)];
        res.render('basic_accent_detail', { basic: basic, basicAccent: basicAccent, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const audioLink = req.files.audio[0].location;
        const photoLink = req.files.photo[0].location;
        const basic = await Basic.findOne();
        const basicAccent = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            paragraph: req.body.paragraph,
            photoLink: photoLink
        };
        basic.basicAccent.push(basicAccent);
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

        const basicAccent = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            paragraph: req.body.paragraph,
            photoLink: photoLink
        };
        basic.basicAccent[parseInt(req.body.index)] = basicAccent
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
        basic.basicAccent.splice(req.params.index, 1);
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

module.exports = BasicAccentController;