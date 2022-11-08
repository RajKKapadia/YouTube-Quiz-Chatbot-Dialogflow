const express = require('express');
const router = express.Router();

const CONTROLLERS = require('../controllers/export_controllers');
const UTILS = require('../helpers/utils');

router.post('/dialogflow', (req, res) => {

    let action = req.body.queryResult.action;

    console.log('Webhook called.');
    console.log(`Action name --> ${action}`);

    let responseData = {};

    if (action === 'userProvidesDifficultyLevel') {
        responseData = CONTROLLERS.updl.userProvidesDifficultyLevel(req);
    } else if (action === 'userProvidesAnswer') {
        responseData = CONTROLLERS.upa.userProvidesAnswer(req);
    }
    else {
        responseData = UTILS.formatDialogflowResponse(
            `Unknown action ${action}. No handler for this action on the webhook.`,
            []
        );
    }

    res.send(responseData);
});

module.exports = {
    router
};