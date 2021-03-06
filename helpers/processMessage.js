const API_AI_TOKEN = 'e72c83b02ddb4519a5d1f872b8fb2b4c';

const apiAiClient = require('apiai')(API_AI_TOKEN);
const intentHandler = require('./intentHandler');

module.exports = (event) => {
    const senderId = event.sender.id;
    console.log("SenderId: " + senderId);
    const message = event.message.text;
    console.log("Message: " + message);
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'fbchatboth&b'});
    console.log("Sent request to DialogFlow");
    apiaiSession.on('response', (response) => {
        console.log("Got response from DialogFlow");
        intentHandler(senderId, response.result);
    });
    apiaiSession.on('error', (error) => {
        console.log("Error while connecting to DialogFlow");
        console.log(error);
    });
    apiaiSession.end();
};