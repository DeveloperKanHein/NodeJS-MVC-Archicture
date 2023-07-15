const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Unit = require("../../models/unit");
class ConversationController
{
    static upload = FileUpload.getInstance().upload("conversation/").fields([
            { name: 'audio', maxCount: 1 },
            { name: 'book', maxCount: 1 },
        ]);

    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('conversation', {unit: unit, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const conversation = unit.conversations[parseInt(req.params.conversationIndex)];
        console.log(conversation);
        res.render('conversation_detail', { unit: unit, conversation: conversation, unitId: unit._id, conversationIndex: req.params.conversationIndex, message: req.flash('success') });
    }

    static async store(req, res){
        const audioLink = req.files.audio[0].location;
        const pdfLink = req.files.book[0].location;
        const unit = await Unit.findById(req.body.unitId);
        const conversation = {
            instruction: req.body.instruction,
            videoLink: audioLink,
            pdfLink: pdfLink
        };
        unit.conversations.push(conversation);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Conversation lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const unit = await Unit.findById(req.body.unitId);
        const existedAudioLink = unit.conversations[parseInt(req.body.conversationIndex)].audioLink;
        const existedPdfLink = unit.conversations[parseInt(req.body.conversationIndex)].pdfLink;
        const audioLink = req.files.audio == undefined ? existedAudioLink : req.files.audio[0].location;
        const pdfLink = req.files.book == undefined ? existedPdfLink : req.files.book[0].location;

        const conversation = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            pdfLink: pdfLink
        };
        unit.conversations[parseInt(req.body.conversationIndex)] = conversation;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Conversation lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.conversations.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Conversation lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = ConversationController;