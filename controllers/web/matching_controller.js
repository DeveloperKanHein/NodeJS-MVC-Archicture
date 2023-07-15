const ReturnMessage = require("../../constants/return_message");
const Unit = require("../../models/unit");
const FileUpload = require("../../helpers/file_upload");
class MatchingController
{
    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('matching_list', { unit: unit, message: req.flash('success') });
    }

    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const match = unit.quiz.matching[parseInt(req.params.index)];
        res.render('matching_detail', { unit: unit, match: match.match, unitId: unit._id, index: req.params.index, message: req.flash('success') });
    }

    static async store(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);
        console.log(req.body);
        const matchData = [];
        for(var i = 0; i < req.body.wordA.length; i++)
        {
            matchData.push({
                a: req.body.wordA[i],
                b: req.body.wordB[i]
            });
        }
        unit.quiz.matching.push({ match: matchData});
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Maching is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);
        const matchData = [];
        for(var i = 0; i < req.body.wordA.length; i++)
        {
            matchData.push({
                a: req.body.wordA[i],
                b: req.body.wordB[i]
            });
        }
        unit.quiz.matching[parseInt(req.body.index)] = {match: matchData};
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Maching is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.quiz.matching.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Matching is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = MatchingController;