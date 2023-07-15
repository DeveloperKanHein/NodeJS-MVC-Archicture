const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Unit = require("../../models/unit");
class GrammarController
{
    static upload = FileUpload.getInstance().upload("grammars/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('grammar', {unit: unit, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const grammar = unit.grammars[parseInt(req.params.grammarIndex)];
        res.render('grammar_detail', { unit: unit, grammar: grammar, unitId: unit._id, grammarIndex: req.params.grammarIndex, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const unit = await Unit.findById(req.body.unitId);
        const grammar = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.grammars.push(grammar);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Grammar lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const unit = await Unit.findById(req.body.unitId);
        const existedVideoLink = unit.grammars[parseInt(req.body.grammarIndex)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const grammar = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.grammars[parseInt(req.body.grammarIndex)] = grammar;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Grammar lesson is updated successfully.');
            res.redirect('/admin/grammar-detail/' + req.body.unitId + "/" + req.body.grammarIndex);
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.grammars.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Grammar lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = GrammarController;