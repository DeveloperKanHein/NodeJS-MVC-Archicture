const ReturnMessage = require("../../constants/return_message");
const Unit = require("../../models/unit");
const Course = require("../../models/course");
class InitialSetupController
{

    static async setUp(req, res){
        const courses = await Course.find();
        courses.forEach(async (course) => {
            for(var i = 1; i < 4; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu A
            const fukushuuA = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "A"
            });
            await fukushuuA.save();
    
            for(var i = 4; i < 8; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu B
            const fukushuuB = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "B"
            });
            await fukushuuB.save();
    
            for(var i = 8; i < 13; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu C
            const fukushuuC = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "C"
            });
            await fukushuuC.save();
    
            for(var i = 13; i < 17; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu D
            const fukushuuD = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "D"
            });
            await fukushuuD.save();
    
            for(var i = 17; i < 20; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu E
            const fukushuuE = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "E"
            });
            await fukushuuE.save();
    
            for(var i = 20; i < 23; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu F
            const fukushuuF = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "F"
            });
            await fukushuuF.save();
    
            for(var i = 23; i < 26; i++){
                const unit = new Unit({
                    courseId: course._id,
                    title: "Unit - " + i,
                    unitNo: i
                });
                await unit.save();
            }
    
            //Fukushuu G
            const fukushuuG = new Unit({
                courseId: course._id,
                title: "Fukushuu",
                unitNo: "G"
            });
            await fukushuuG.save();
        });
        res.send("SUCCESS");
    }
}

module.exports = InitialSetupController;