const Course = require("../../models/course");


class CourseController
{
    static async all(req, res)
    {
        const courses = await Course.find();
        res.send(courses);
    }
}

module.exports = CourseController;