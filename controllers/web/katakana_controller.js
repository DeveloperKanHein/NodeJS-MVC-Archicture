const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class KatakanaController
{
    static upload = FileUpload.getInstance().upload("katakana/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne(req.params.id);
        res.render('katakana', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const katakana = basic.katakana[parseInt(req.params.index)];
        res.render('katakana_detail', { basic: basic, katakana: katakana, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const basic = await Basic.findOne();
        const katakana = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.katakana.push(katakana);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New Katakana lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedVideoLink = basic.katakana[parseInt(req.body.index)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const katakana = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.katakana[parseInt(req.body.index)] = katakana;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Katakana lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.katakana.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Katakana lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = KatakanaController;