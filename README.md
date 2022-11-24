# Quiz Chat-Bot
Hi everyone, I have developed a small demo of a Quiz chat-bot, you can use this to build your own quiz chat-bot.

#### Youtube playlist
You can watch a playlist explaining the work [here](https://www.youtube.com/playlist?list=PL41E9cd-QxQ4_LldSl2gcx5LtC8x6QJoJ).

#### What you need
* Google Dialogflow account
* NodeJS installed on your system
* NGROK for testing
* GitHub account to create a repository
* Heroku account for deployment

#### How to use
* Create a new [Google Dialogflow](https://dialogflow.cloud.google.com/) agent.
* Restore the existing agent `Youtube-Quizbot.zip` in your newly created agent.
* Start `ngrok` and get the forwarding url
```bash
ngrok http 5000
```
* Navigate to the code folder and then run
```bash
npm install --save
```
then
```bash
node index.js
```
* Go to Google Dialogflow, then under `Fulfillment` section, paste your NGROK forwarding url
> YOUR NGROK URL/dialogflow

#### Note:
* There are questions and answers in `database/qa.js` file, you can add new questions and answers into that, also you can modify the flow to fetch answers from any database, and do many stuff.
* There is also a flowchart `flowchart.png` explaining the flow of the chat-bot as well, editable file of the flowchart `flowchart` is available as well, you can open it in [here](https://app.diagrams.net/).

# About me

I am `Raj Kapadia`, I am passionate about `AI/ML/DL` and their use in different domains, I also love to build `chatbots` using `Google Dialogflow ES/CX`, I have backend development experience with Python[Flask], and NodeJS[Express] For any work, you can reach out to me at...

* [LinkedIn](https://www.linkedin.com/in/rajkkapadia/)
* [Fiverr](https://www.fiverr.com/rajkkapadia​)
* [Upwork](https://www.upwork.com/freelancers/~0176aeacfcff7f1fc2)
* [Youtube](https://www.youtube.com/channel/UCOT01XvBSj12xQsANtTeAcQ)
