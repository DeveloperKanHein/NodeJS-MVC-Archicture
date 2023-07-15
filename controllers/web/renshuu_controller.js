const ReturnMessage = require("../../constants/return_message");
const FileUpload = require("../../helpers/file_upload");
const Unit = require("../../models/unit");
class RenshuuController
{
    static upload = FileUpload.getInstance().upload("renshuu/").fields([
            { name: 'video', maxCount: 1 }
        ]);

    static async index(req, res)
    {
        const unit = await Unit.findById(req.params.id);
        res.render('renshuu', {unit: unit, message: req.flash('success') });
    }
    static async detail(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        const renshuu = unit.renshuus[parseInt(req.params.renshuuIndex)];
        res.render('renshuu_detail', { unit: unit, renshuu: renshuu, unitId: unit._id, renshuuIndex: req.params.renshuuIndex, message: req.flash('success') });
    }

    static async store(req, res){
        const videoLink = req.files.video[0].location;
        const unit = await Unit.findById(req.body.unitId);
        const renshuu = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.renshuus.push(renshuu);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Renshuu lesson is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res){
        const unit = await Unit.findById(req.body.unitId);
        const existedVideoLink = unit.renshuus[parseInt(req.body.renshuuIndex)].videoLink;
        const videoLink = req.files.video == undefined ? existedVideoLink: req.files.video[0].location ;

        const renshuu = {
            instruction: req.body.instruction,
            videoLink: videoLink,
            paragraph: req.body.paragraph
        };
        unit.renshuus[parseInt(req.body.renshuuIndex)] = renshuu;
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Renshuu lesson is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.renshuus.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Renshuu lesson is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = RenshuuController;