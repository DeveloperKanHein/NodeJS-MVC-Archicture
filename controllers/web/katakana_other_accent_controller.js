const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class KatakanaOtherAccentController
{
    static upload = FileUpload.getInstance().upload("katakanaOtherAccent/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne();
        res.render('katakana_other_accent', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const katakanaOtherAccent = basic.katakanaOtherAccent[parseInt(req.params.index)];
        res.render('katakana_other_accent_detail', { basic: basic, katakanaOtherAccent: katakanaOtherAccent, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const basic = await Basic.findOne();
        const katakanaOtherAccent = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.katakanaOtherAccent.push(katakanaOtherAccent);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New Katakana Other Accent lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedVideoLink = basic.katakanaOtherAccent[parseInt(req.body.index)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const katakanaOtherAccent = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.katakanaOtherAccent[parseInt(req.body.index)] = katakanaOtherAccent;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Katakana Other Accent lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.katakanaOtherAccent.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Katakana Other Accent lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = KatakanaOtherAccentController;