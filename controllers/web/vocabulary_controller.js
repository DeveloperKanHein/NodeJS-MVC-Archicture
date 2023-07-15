const ReturnMessage = require("../../constants/return_message");
const Unit = require("../../models/unit");
const FileUpload = require("../../helpers/file_upload");
class VocabularyController
{
    // const FileUpload = require("../../helpers/file_upload");
    static upload = FileUpload.getInstance().upload("vocabularies/").fields([
        { name: 'audio', maxCount: 1 },
        { name: 'photos', maxCount: 100 }
      ]);

    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('vocabulary_list', { unit: unit, message: req.flash('success') });
    }

    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const vocabulary = unit.vocabularies[parseInt(req.params.index)];

        res.render('vocabulary_detail', { unit: unit, vocabulary: vocabulary, unitId: unit._id, index: req.params.index, message: req.flash('success')});
    }

    static async store(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);
        const audioLink = req.files.audio[0].location;
        var words = [];
        for(var i = 0; i < req.body.wordsJP.length; i++)
        {
            words.push({
                jp: req.body.wordsJP[i],
                en: req.body.wordsEN[i],
                mm: req.body.wordsMM[i]
            });
        }
        const vocabulary = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            words: words
        };
        unit.vocabularies.push(vocabulary);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Vocabulary is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);
        const audioLink = req.files.audio == undefined ? unit.vocabularies[parseInt(req.body.index)].audioLink : req.files.audio[0].location;
        var words = [];
        for(var i = 0; i < req.body.wordsJP.length; i++)
        {
            words.push({
                jp: req.body.wordsJP[i],
                en: req.body.wordsEN[i],
                mm: req.body.wordsMM[i]
            });
        }
        const vocabulary = {
            instruction: req.body.instruction,
            audioLink: audioLink,
            words: words
        };
        unit.vocabularies[parseInt(req.body.index)] = vocabulary;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Vocabulary is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.vocabularies.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Vocabulary lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = VocabularyController;