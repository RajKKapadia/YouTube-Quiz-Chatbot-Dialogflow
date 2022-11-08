const UTILS = require('../helpers/utils');

const userProvidesAnswer = (req) => {

    let outputContexts = req.body.queryResult.outputContexts;

    let counter, score, selectedQA, userAnswer;

    outputContexts.forEach(outputContext => {
        let thisSession = outputContext.name;
        if (thisSession.includes('/contexts/session')) {
            counter = Number(outputContext.parameters.counter);
            score = Number(outputContext.parameters.score);
            selectedQA = outputContext.parameters.selectedQA;
            userAnswer = String(outputContext.parameters.answer);
        }
    });

    let prefferedAnswer = selectedQA[counter].prefferedAnswer;
    let alternateAnswers = selectedQA[counter].alternateAnswers;

    let flag = false;

    if (String(prefferedAnswer[0]) === userAnswer.trim()) {
        flag = true;
        score += 1;
    } else {
        alternateAnswers.forEach(as => {
            console.log(`Alternate answer --> ${as}`);
            if (String(as) === userAnswer.trim()) {
                flag = true;
                score += 1;
            }
        });
    }

    // Rigth answer
    if (flag && counter != 4) {
        counter += 1;

        // set the context
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
            }]


        let randomQuestionNumber = Math.floor(Math.random() * selectedQA[counter].question.length);

        return UTILS.formatDialogflowResponse(
            `Great, that is a right answer.\nHere is your next question, ${selectedQA[counter].question[randomQuestionNumber]}.`,
            oc
        );
        // Wrong answer
    } else if (!flag && counter != 4) {
        counter += 1;

        // set the context
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
            `Sorry ${userAnswer} is a wrong, the correct answer is ${prefferedAnswer[0]}.\nHere is your next question, ${selectedQA[counter].question[randomQuestionNumber]}.`,
            oc
        );
        // Show score and right answer
    } else if (flag) {
        let session = req.body.session;
        let awaitAnswer = `${session}/contexts/await-answer`;
        let sessionContext = `${session}/contexts/session`;
        let awaitDifficulty = `${session}/contexts/await-difficulty`;

        let oc = [
            {
                name: awaitAnswer,
                lifespanCount: 0
            },
            {
                name: sessionContext,
                lifespanCount: 0
            }, {
                name: awaitDifficulty,
                lifespanCount: 1
            }
        ];

        let outString = '';

        if (score == 5) {
            outString += `Great, that is a right answer. High five!.\nYour score is ${score} out of 5.\nTo start the quiz again type please choose a level between 1 to 5.`
        } else if (score == 4) {
            outString += `Great, that is a right answer. You did a great job.\nYour score is ${score} out of 5.\nTo start the quiz again type please choose a level between 1 to 5.`
        } else {
            outString += `Great, that is a right answer.\nYour score is ${score} out of 5.\nTo start the quiz again type please choose a level between 1 to 5.`
        }

        return UTILS.formatDialogflowResponse(
            outString,
            oc
        );
        // Show score and wrong answer
    } else {
        let session = req.body.session;
        let awaitAnswer = `${session}/contexts/await-answer`;
        let sessionContext = `${session}/contexts/session`;
        let awaitDifficulty = `${session}/contexts/await-difficulty`;

        let oc = [
            {
                name: awaitAnswer,
                lifespanCount: 0
            },
            {
                name: sessionContext,
                lifespanCount: 0
            },
            {
                name: awaitDifficulty,
                lifespanCount: 1
            }
        ];

        let outString = '';

        if (score == 5) {
            outString += `Sorry ${userAnswer} is a wrong answer, the correct answer is ${prefferedAnswer[0]}. High five!.\nYour score is ${score} out of 5.\nTo start the quiz again type please choose a level between 1 to 5.`
        } else if (score == 4) {
            outString += `Sorry ${userAnswer} is a wrong answer, the correct answer is ${prefferedAnswer[0]}. You did a great job.\nYour score is ${score} out of 5.\nTo start the quiz again type please choose a level between 1 to 5.`
        } else {
            outString += `Sorry ${userAnswer} is a wrong answer, the correct answer is ${prefferedAnswer[0]}.\nYour score is ${score} out of 5.\nTo start the quiz again type please choose a level between 1 to 5.`
        }

        return UTILS.formatDialogflowResponse(
            outString,
            oc
        );
    }
};

module.exports = {
    userProvidesAnswer
};