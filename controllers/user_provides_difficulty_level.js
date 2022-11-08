const UTILS = require('../helpers/utils');

const QA = require('../database/qa');

const userProvidesDifficultyLevel = (req) => {

    let difficulty_level = req.body.queryResult.parameters.difficulty_level;

    if (difficulty_level > 5) {

        let session = req.body.session;
        let awaitDifficulty = `${session}/contexts/await-difficulty`;
        let sessionContext = `${session}/contexts/session`;
        let oc = [
            {
                name: awaitDifficulty,
                lifespanCount: 1
            },
            {
                name: sessionContext,
                lifespanCount: 20
            }
        ];

        return UTILS.formatDialogflowResponse(
            `We don't have level ${difficulty_level} at this time. Select a difficulty level between a number 1 to 5.`,
            oc
        );

    } else {

        let counter = 0;
        let score = 0;

        let qa = QA.quizDictionary[difficulty_level];
        let numberOfQuestions = Object.keys(qa).length;
        let randomQANumbers = []
        Array.from({ length: 5 }, () => randomQANumbers.push(Math.floor(Math.random() * numberOfQuestions)));
        let selectedQA = [];
        for (let index = 0; index < 5; index++) {
            selectedQA.push(qa[randomQANumbers[index] + 1]);
        }

        let session = req.body.session;
        let awaitAnswer = `${session}/contexts/await-answer`;
        let sessionContext = `${session}/contexts/session`;

        let oc = [
            {
                name: awaitAnswer,
                lifespanCount: 1
            },
            {
                name: sessionContext,
                lifespanCount: 20,
                parameters: {
                    counter: counter,
                    score: score,
                    selectedQA: selectedQA
                }
            }
        ];

        let randomQuestionNumber = Math.floor(Math.random() * selectedQA[counter].question.length);

        return UTILS.formatDialogflowResponse(
            `(${counter + 1}) ${selectedQA[counter].question[randomQuestionNumber]}.`,
            oc
        );
    }
};

module.exports = {
    userProvidesDifficultyLevel
};