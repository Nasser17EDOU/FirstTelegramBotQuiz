require("dotenv").config();
const express = require("express");
// const { getQuestion } = require("./questionsDB");
const { /*sendMessage, */ sendPoll } = require("./axios");
const fs = require("fs");
const shuffle = require("shuffle-array");
const app = express();
const port = process.env.NODE_PORT;

app.use(express.json());

app.post("/", (req, res) => {
  // console.log(req.body);
  res.send("Mbolani!!!");
});

app.get("/", (req, res) => {
  // console.log(req.body);
  res.send("this is a get");
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`server app is listening on port ${port}`);

  var dd = new Date();
  // console.log(dd.getMinutes());
  dd.getHours() === 12 || dd.getHours() === 0 ? -1 : sendQuestion();

  setInterval(() => {
    // sendQuestion();
    var d = new Date();
    // console.log(d.getHours() + "     " + (d.getHours() % 12));
    dd.getHours() === 12 || dd.getHours() === 0 ? sendQuestion() : -1;
  }, 1000 * 60 * 60);
});

const sendQuestion = async () => {
  // var messageText = "";

  // try {
  //   chatId = req.body.message.chat.id;
  //   messageText = req.body.message.text;
  // } catch (err) {
  //   // console.log(err);
  // }

  // try {
  //   chatId = req.body.poll_answer.user.id;
  // } catch (err) {
  //   // console.log(err);
  // }

  // if (chatId === 0) return res.send("Mbolani!!!");

  // if (
  //   messageText !== "/new_question" &&
  //   messageText !== "new_question" &&
  //   messageText !== "new"
  // ) {
  //   axiosData.message =
  //     'send or enter the command "/new_question" without the qotes to get a new question';
  //   sendMessage(axiosData);
  // } else {
  //   // const questionInf = getQuestion();

  // }

  var chatId = process.env.CHAT_ID;
  var axiosData = {};
  axiosData.chat_id = chatId;
  let content = JSON.parse(fs.readFileSync("questionsDB.json", "utf8"));

  if (content.unusedQuestionsIndex.length === 0) {
    for (var i = 0; i < content.questions.length; i++) {
      content.unusedQuestionsIndex.push(i);
    }
  }

  shuffle(content.unusedQuestionsIndex);
  const numberOfQuestions =
    content.unusedQuestionsIndex.length >= 5
      ? 5
      : content.unusedQuestionsIndex.length;

  for (var i = 0; i < numberOfQuestions; i++) {
    var questionIndex = content.unusedQuestionsIndex.pop();
    axiosData.questionInf = content.questions[questionIndex];
    await sendPoll(axiosData);
  }

  console.log(
    `Number of question left: ${content.unusedQuestionsIndex.length}`
  );

  fs.writeFileSync("questionsDB.json", JSON.stringify(content));
};
