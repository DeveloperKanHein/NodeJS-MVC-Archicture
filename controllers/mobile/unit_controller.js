const Unit = require("../../models/unit");

class UnitController
{
    static async all(req, res)
    {
        const units = await Unit.find({ courseId: req.params.id }).sort({createdAt: 1});
        res.send(units);
    }
}

module.exports = UnitController;