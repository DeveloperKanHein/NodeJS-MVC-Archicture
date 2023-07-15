
const ReturnMessage = require("../../constants/return_message");
const Unit = require("../../models/unit");

class UnitController
{

    static async all(req, res)
    {
        const units = await Unit.find({ courseId: req.params.courseId });
        res.render('unit', { units: units, courseId: req.params.courseId, message: req.flash('success')});
    }

    static async detail(req, res)
    {
        console.log(req.params.id);
        const unit = await Unit.findById(req.params.id);
        res.render('unit_detail', { unit: unit });
    }

    static async store(req, res)
    {
        const unit = new Unit({
            courseId: req.body.courseId,
            title: req.body.title,
            label1: req.body.label1,
            label2: req.body.label2,
            unitNo: req.body.unitNo
        });
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Unit is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);
        unit.title = req.body.title;
        unit.label1 = req.body.label1;
        unit.label2 = req.body.label2;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Unit is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);
        const isDelete = await unit.deleteOne();
        if(isDelete)
        {
            req.flash('success', 'Unit is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = UnitController;