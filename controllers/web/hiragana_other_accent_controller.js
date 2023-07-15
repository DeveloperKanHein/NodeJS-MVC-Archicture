const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class HiraganaOtherAccentController
{
    static upload = FileUpload.getInstance().upload("hiraganaOtherAccent/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne();
        res.render('hiragana_other_accent', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const hiraganaOtherAccent = basic.hiraganaOtherAccent[parseInt(req.params.index)];
        res.render('hiragana_other_accent_detail', { basic: basic, hiraganaOtherAccent: hiraganaOtherAccent, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const basic = await Basic.findOne();
        const hiraganaOtherAccent = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.hiraganaOtherAccent.push(hiraganaOtherAccent);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New Hiragana Other Accent lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedVideoLink = basic.hiraganaOtherAccent[parseInt(req.body.index)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const hiraganaOtherAccent = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.hiraganaOtherAccent[parseInt(req.body.index)] = hiraganaOtherAccent;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Hiragana Other Accent lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.hiraganaOtherAccent.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Hiragana Other Accent lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = HiraganaOtherAccentController;