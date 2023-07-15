const express = require("express");
const route = express.Router();


const CourseController = require("../controllers/mobile/course_controller");
const UnitController = require("../controllers/mobile/unit_controller");

route.get('/test', (req, res) => { res.send("<h1>Authorized API Routes</h1>") });
route.get('/courses', CourseController.all);
route.get('/units/:id', UnitController.all);
module.exports = route;