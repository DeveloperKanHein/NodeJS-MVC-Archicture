const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Unit = require("../../models/unit");
class KanjiController
{
    static upload = FileUpload.getInstance().upload("kanji/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('kanji', {unit: unit, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const kanji = unit.kanjis[parseInt(req.params.kanjiIndex)];
        res.render('kanji_detail', { unit: unit, kanji: kanji, unitId: unit._id, kanjiIndex: req.params.kanjiIndex, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const unit = await Unit.findById(req.body.unitId);
        const kanji = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.kanjis.push(kanji);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Kanji lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const unit = await Unit.findById(req.body.unitId);
        const existedVideoLink = unit.kanjis[parseInt(req.body.kanjiIndex)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const kanji = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.kanjis[parseInt(req.body.kanjiIndex)] = kanji;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Kanji lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.kanjis.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Kanji lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = KanjiController;