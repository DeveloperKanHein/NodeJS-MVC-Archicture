const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Basic = require("../../models/n5_basic");
const Course = require("../../models/course");

class IntroductionController
{
    static upload = FileUpload.getInstance().upload("introduction/").fields([
            { name: 'audio', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const basic = await Basic.findOne();
        res.render('introduction', {basic: basic, courseId: req.params.id, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const basic = await Basic.findOne();
        const introduction = basic.introduction[parseInt(req.params.index)];

        res.render('introduction_detail', { basic: basic, introduction: introduction, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res){
        const audioLink = req.files.audio[0].location;
        const basic = await Basic.findOne();
        const introduction = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            paragraph: req.body.paragraph
        };
        basic.introduction.push(introduction);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'New Introduction lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const basic = await Basic.findOne();
        const existedAudioLink = basic.introduction[parseInt(req.body.index)].audioLink;
        const audioLink = req.files.audio == undefined ? existedAudioLink: req.files.audio[0].location ;

        const introduction = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            paragraph: req.body.paragraph
        };
        basic.introduction[parseInt(req.body.index)] = introduction;
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Introduction lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const basic = await Basic.findOne();
        basic.introduction.splice(req.params.index, 1);
        const isSave = await basic.save();
        if(isSave)
        {
            req.flash('success', 'Introduction lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = IntroductionController;