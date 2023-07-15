const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class HiraganaController
{
    static upload = FileUpload.getInstance().upload("hiragana/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne(req.params.id);
        res.render('hiragana', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const hiragana = basic.hiragana[parseInt(req.params.index)];
        res.render('hiragana_detail', { basic: basic, hiragana: hiragana, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const basic = await Basic.findOne();
        const hiragana = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.hiragana.push(hiragana);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New Hiragana lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedVideoLink = basic.hiragana[parseInt(req.body.index)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const hiragana = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        basic.hiragana[parseInt(req.body.index)] = hiragana;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Hiragana lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.hiragana.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Hiragana lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = HiraganaController;