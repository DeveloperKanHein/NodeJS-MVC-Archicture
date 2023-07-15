const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");

class WritingGuideController
{
    static upload = FileUpload.getInstance().upload("writing-guide/").fields([
            { name: 'book', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne();
        res.render('writing_guide', {basic: basic, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const writingGuide = basic.writingGuide[parseInt(req.params.index)];
        res.render('writing_guide_detail', { basic: basic, writingGuide: writingGuide, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const pdfLink = req.files.book[0].location;
        const basic = await Basic.findOne();
        const writingGuide = {
            instruction: req.body.instruction,
            pdfLink: pdfLink
        };
        basic.writingGuide.push(writingGuide);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New Writing Guide lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedPdfLink = basic.writingGuide[parseInt(req.body.index)].pdfLink;
        const pdfLink = req.files.book == undefined ? existedPdfLink : req.files.book[0].location ;

        const writingGuide = {
            instruction: req.body.instruction,
            pdfLink: pdfLink,
            paragraph: req.body.paragraph
        };
        basic.writingGuide[parseInt(req.body.index)] = writingGuide;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Writing Guide lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.writingGuide.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Writing Guide lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = WritingGuideController;