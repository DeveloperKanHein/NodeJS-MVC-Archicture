const ReturnMessage = require("../../constants/return_message");
const Unit = require("../../models/unit");

class MultipleChoiceSentenceController
{
    static async index(req, res){
        const unit = await Unit.findById(req.params.id);
        res.render('sentence_multiple_choice_list', { unit: unit, message: req.flash('success')});
    }

    static async detail(req, res){
        const unit = await Unit.findById(req.params.unitId);
        const choice = unit.quiz.multipleChoiceWithSentence[parseInt(req.params.index)];
        res.render('sentence_multiple_choice_detail', { unit: unit, choice: choice, unitId: unit._id, index: req.params.index, message: req.flash('success')});
    }

    static async store(req, res)
    {
 
        const unit = await Unit.findById(req.body.unitId);
        const answers = [
            {
                prounced: req.body.prounced1,
                word: req.body.answerText1,
                isAnswer: req.body.isAnswer == '1' ? true : false
            },
            {
                prounced: req.body.prounced2,
                word: req.body.answerText2,
                isAnswer: req.body.isAnswer == '2' ? true : false
            },
            {
                prounced: req.body.prounced3,
                word: req.body.answerText3,
                isAnswer: req.body.isAnswer == '3' ? true : false
            },
            {
                prounced: req.body.prounced4,
                word: req.body.answerText4,
                isAnswer: req.body.isAnswer == '4' ? true : false
            }
        ];

        const choiceWithParagraph = {
            question: req.body.question,
            correctAnswer: req.body.correctAnswer,
            answers: answers
        };
        
        unit.quiz.multipleChoiceWithSentence.push(choiceWithParagraph);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'New Short Question Multiple Choice is created successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res)
    {
        const unit = await Unit.findById(req.body.unitId);

        const answers = [
            {
                prounced: req.body.prounced1,
                word: req.body.answerText1,
                isAnswer: req.body.isAnswer == '1' ? true : false
            },
            {
                prounced: req.body.prounced2,
                word: req.body.answerText2,
                isAnswer: req.body.isAnswer == '2' ? true : false
            },
            {
                prounced: req.body.prounced3,
                word: req.body.answerText3,
                isAnswer: req.body.isAnswer == '3' ? true : false
            },
            {
                prounced: req.body.prounced4,
                word: req.body.answerText4,
                isAnswer: req.body.isAnswer == '4' ? true : false
            }
        ];
        const choiceWithParagraph = {
            question: req.body.question,
            correctAnswer: req.body.correctAnswer,
            answers: answers
        };
        
        unit.quiz.multipleChoiceWithSentence[parseInt(req.body.index)] = choiceWithParagraph;

        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Short Question Multiple Choice is updated successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const unit = await Unit.findById(req.params.unitId);
        unit.quiz.multipleChoiceWithSentence.splice(req.params.index, 1);
        const isSave = await unit.save();
        if(isSave)
        {
            req.flash('success', 'Short Question Multiple choice is deleted successfully.');
            res.redirect('back');
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

}
module.exports = MultipleChoiceSentenceController;