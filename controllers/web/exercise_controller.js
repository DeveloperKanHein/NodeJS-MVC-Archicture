const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Unit = require("../../models/unit");
class ExerciseController
{
    static upload = FileUpload.getInstance().upload("exercie/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('exercise', {unit: unit, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const exercise = unit.exercises[parseInt(req.params.exerciseIndex)];
        res.render('exercise_detail', { unit: unit, exercise: exercise, unitId: unit._id, exerciseIndex: req.params.exerciseIndex, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const unit = await Unit.findById(req.body.unitId);
        const exercise = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.exercises.push(exercise);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Exericse lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const unit = await Unit.findById(req.body.unitId);
        const existedVideoLink = unit.exercises[parseInt(req.body.exerciseIndex)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const exercise = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.exercises[parseInt(req.body.exerciseIndex)] = exercise;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Exercise lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.exercises.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Exercise lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = ExerciseController;