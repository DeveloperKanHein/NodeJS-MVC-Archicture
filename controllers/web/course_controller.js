const FileUpload = require("../../helpers/file_upload");
const ReturnMessage = require("../../constants/return_message");
const Course = require("../../models/course");

class CourseController
{
    static upload = FileUpload.getInstance().upload("courses/").fields([
        { name: 'logo', maxCount: 1 },
        { name: 'photo', maxCount: 1 }
      ]);

    static async all(req, res)
    {
        const courses = await Course.find();
        res.render('course', { courses: courses, message: req.flash('success')});
    }

    static async create(req, res)
    {
        res.render('course');
    }

    static async store(req, res)
    {
        const logo = req.files.logo[0].location;
        const course = new Course({
            name: req.body.name,
            logo: logo
        });
        const isSave = await course.save();
        if(isSave)
        {
            req.flash('success', 'New Courses is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res)
    {
        const course = await Course.findById(req.body.courseId);
        const logoLink = req.files.logo == undefined ? course.logo : req.files.logo[0].location;
        course.name = req.body.editName;
        course.logo = logoLink;
        const isSave = await course.save();
        if(isSave)
        {
            req.flash('success', 'Courses is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = CourseController;