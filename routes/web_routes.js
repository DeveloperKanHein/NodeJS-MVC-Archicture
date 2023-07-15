const express = require("express");
const route = express.Router();

const CourseController = require("../controllers/web/course_controller");
const UnitController = require("../controllers/web/unit_controller");
const GrammarController = require("../controllers/web/grammar_controller");
const RenshuuController = require("../controllers/web/renshuu_controller");
const ExerciseController = require("../controllers/web/exercise_controller");
const KanjiController = require("../controllers/web/kanji_controller");
const ConversationController = require("../controllers/web/conversation_controller");
const IntroductionController = require("../controllers/web/introduction_controller");
const BasicAccentController = require("../controllers/web/basic_accent_controller");
const HiraganaController = require("../controllers/web/hiragana_controller");
const KatakanaController = require("../controllers/web/katakana_controller");
const HiraganaOtherAccentController = require("../controllers/web/hiragana_other_accent_controller");
const KatakanaOtherAccentController = require("../controllers/web/katakana_other_accent_controller");
const WritingGuideController = require("../controllers/web/writing_guide_controller");
const OtherAccentController = require("../controllers/web/other_accent_controller");
const VocabularyController = require("../controllers/web/vocabulary_controller");
const MultipleChoiceConversationController = require("../controllers/web/multiple_choice_conversation_controller");
const MultipleChoiceParagraphController = require("../controllers/web/multiple_choice_paragraph_controller");
const MultipleChoiceSentenceController = require("../controllers/web/multiple_choice_sentence_controller");
const MatchingController = require("../controllers/web/matching_controller");
const InitialSetupController = require("../controllers/web/initial_setup_controller");



route.get('/', (req, res) => { res.render('home') });
route.get('/setup', InitialSetupController.setUp);
route.get('/course', CourseController.all );
route.post('/course', CourseController.upload, CourseController.store );
route.post('/update-course', CourseController.upload, CourseController.update );

route.get('/units/:courseId', UnitController.all);
route.post('/unit', UnitController.store);
route.get('/unit-detail/:id', UnitController.detail);
route.post('/update-unit', UnitController.update);
route.get('/delete-unit/:id', UnitController.delete);

//Grammar
route.get('/grammar/:id', GrammarController.index);
route.get('/grammar-detail/:unitId/:grammarIndex', GrammarController.detail);
route.post('/grammar', GrammarController.upload, GrammarController.store);
route.post('/update-grammar', GrammarController.upload, GrammarController.update);
route.get('/delete-grammar/:unitId/:index',  GrammarController.delete);

//Conversation
route.get('/conversation/:id', ConversationController.index);
route.get('/conversation-detail/:unitId/:conversationIndex', ConversationController.detail);
route.post('/conversation', ConversationController.upload, ConversationController.store);
route.post('/update-conversation', ConversationController.upload, ConversationController.update);
route.get('/delete-conversation/:unitId/:index',  ConversationController.delete);

//Vocabulary
route.get('/vocabulary/:id', VocabularyController.index);
route.get('/vocabulary-detail/:unitId/:index', VocabularyController.detail);
route.post('/vocabulary', VocabularyController.upload, VocabularyController.store);
route.post('/update-vocabulary', VocabularyController.upload, VocabularyController.update);
route.get('/delete-vocabulary/:unitId/:index', VocabularyController.upload, VocabularyController.delete);

//Renshuu
route.get('/renshuu/:id', RenshuuController.index);
route.get('/renshuu-detail/:unitId/:renshuuIndex', RenshuuController.detail);
route.post('/renshuu', RenshuuController.upload, RenshuuController.store);
route.post('/update-renshuu', RenshuuController.upload, RenshuuController.update);
route.get('/delete-renshuu/:unitId/:index',  RenshuuController.delete);

//Exercise
route.get('/exercise/:id', ExerciseController.index);
route.get('/exercise-detail/:unitId/:exerciseIndex', ExerciseController.detail);
route.post('/exercise', ExerciseController.upload, ExerciseController.store);
route.post('/update-exercise', ExerciseController.upload, ExerciseController.update);
route.get('/delete-exercise/:unitId/:index',  ExerciseController.delete);

//Kanji
route.get('/kanji/:id', KanjiController.index);
route.get('/kanji-detail/:unitId/:kanjiIndex', KanjiController.detail);
route.post('/kanji', KanjiController.upload, KanjiController.store);
route.post('/update-kanji', KanjiController.upload, KanjiController.update);
route.get('/delete-kanji/:unitId/:index',  KanjiController.delete);

/*************** Practice *****************/

//Matching
route.get('/matching/:id', MatchingController.index);
route.get('/matching-detail/:unitId/:index', MatchingController.detail);
route.post('/matching', MatchingController.store);
route.post('/update-matching', MatchingController.update);
route.get('/delete-matching/:unitId/:index', MatchingController.delete);

//Multiple Choice with Paragraph
route.get('/paragraph-multiple-choice/:id', MultipleChoiceParagraphController.index);
route.get('/paragraph-multiple-choice-detail/:unitId/:index', MultipleChoiceParagraphController.detail);
route.post('/paragraph-multiple-choice', MultipleChoiceParagraphController.store);
route.post('/update-paragraph-multiple-choice', MultipleChoiceParagraphController.update);
route.get('/delete-paragraph-multiple-choice/:unitId/:index', MultipleChoiceParagraphController.delete);

//Conversation Multiple Choice
route.get('/conversation-multiple-choice/:id', MultipleChoiceConversationController.index);
route.get('/conversation-multiple-choice-detail/:unitId/:index', MultipleChoiceConversationController.detail);
route.post('/conversation-multiple-choice', MultipleChoiceConversationController.store);
route.post('/update-conversation-multiple-choice', MultipleChoiceConversationController.update);
route.get('/delete-conversation-multiple-choice/:unitId/:index', MultipleChoiceConversationController.delete);

//Sentence Multiple Choice
route.get('/sentence-multiple-choice/:id', MultipleChoiceSentenceController.index);
route.get('/sentence-multiple-choice-detail/:unitId/:index', MultipleChoiceSentenceController.detail);
route.post('/sentence-multiple-choice', MultipleChoiceSentenceController.store);
route.post('/update-sentence-multiple-choice', MultipleChoiceSentenceController.update);
route.get('/delete-sentence-multiple-choice/:unitId/:index', MultipleChoiceSentenceController.delete);

/************************ N5 Basic **********************/

//Introduction
route.get('/introduction', IntroductionController.index);
route.get('/introduction-detail/:index', IntroductionController.detail);
route.post('/introduction', IntroductionController.upload, IntroductionController.store);
route.post('/update-introduction', IntroductionController.upload, IntroductionController.update);
route.get('/delete-introduction/:index', IntroductionController.delete);

//Basic Accent
route.get('/basic-accent/', BasicAccentController.index);
route.get('/basic-accent-detail/:index', BasicAccentController.detail);
route.post('/basic-accent', BasicAccentController.upload, BasicAccentController.store);
route.post('/update-basic-accent', BasicAccentController.upload, BasicAccentController.update);
route.get('/delete-basic-accent/:index', BasicAccentController.delete);

//Other Accent
route.get('/other-accent/', OtherAccentController.index);
route.get('/other-accent-detail/:index', OtherAccentController.detail);
route.post('/other-accent', OtherAccentController.upload, OtherAccentController.store);
route.post('/update-other-accent', OtherAccentController.upload, OtherAccentController.update);
route.get('/delete-other-accent/:index', OtherAccentController.delete);

//Hiragana
route.get('/hiragana', HiraganaController.index);
route.get('/hiragana-detail/:index', HiraganaController.detail);
route.post('/hiragana', HiraganaController.upload, HiraganaController.store);
route.post('/update-hiragana', HiraganaController.upload, HiraganaController.update);
route.get('/delete-hiragana/:index', HiraganaController.delete);

//Katakana
route.get('/katakana', KatakanaController.index);
route.get('/katakana-detail/:index', KatakanaController.detail);
route.post('/katakana', KatakanaController.upload, KatakanaController.store);
route.post('/update-katakana', KatakanaController.upload, KatakanaController.update);
route.get('/delete-katakana/:index', KatakanaController.delete);

//Hiragana Other Accent
route.get('/hiragana-other-accent', HiraganaOtherAccentController.index);
route.get('/hiragana-other-accent-detail/:index', HiraganaOtherAccentController.detail);
route.post('/hiragana-other-accent', HiraganaOtherAccentController.upload, HiraganaOtherAccentController.store);
route.post('/update-hiragana-other-accent', HiraganaOtherAccentController.upload, HiraganaOtherAccentController.update);
route.get('/delete-hiragana-other-accent/:index', HiraganaOtherAccentController.delete);

//Katakana Other Accent
route.get('/katakana-other-accent', KatakanaOtherAccentController.index);
route.get('/katakana-other-accent-detail/:index', KatakanaOtherAccentController.detail);
route.post('/katakana-other-accent', KatakanaOtherAccentController.upload, KatakanaOtherAccentController.store);
route.post('/update-katakana-other-accent', KatakanaOtherAccentController.upload, KatakanaOtherAccentController.update);
route.get('/delete-katakana-other-accent/:index', KatakanaOtherAccentController.delete);

//Writing Guide
route.get('/writing-guide', WritingGuideController.index);
route.get('/writing-guide-detail/:index', WritingGuideController.detail);
route.post('/writing-guide', WritingGuideController.upload, WritingGuideController.store);
route.post('/update-writing-guide', WritingGuideController.upload, WritingGuideController.update);
route.get('/delete-writing-guide/:index', WritingGuideController.delete);

module.exports = route;