const formatDialogflowResponse = (message, outputContext) => {

    let response = {};

    response['fulfillmentText'] = message;

    if (outputContext.length > 0) {
        response['outputContexts'] = outputContext;
    }

    return response;
};

module.exports = {
    formatDialogflowResponse
};