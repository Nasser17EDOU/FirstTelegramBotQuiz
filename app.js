require("dotenv").config();
const express = require("express");
const { getQuestion } = require("./questionsDB");
const { sendMessage, sendPoll } = require("./axios");
const fs = require("fs");
const shuffle = require("shuffle-array");
const app = express();
const port = process.env.NODE_PORT;

app.use(express.json());

app.post("/", (req, res) => {
//   console.log(req.body);

  var chatId = 0;
  var messageText = "";

  try {
    chatId = req.body.message.chat.id;
    messageText = req.body.message.text;
  } catch (err) {
    // console.log(err);
  }

  try {
    chatId = req.body.poll_answer.user.id;
  } catch (err) {
    // console.log(err);
  }

  if (chatId === 0) return res.send("Mbolani!!!");

  var axiosData = {};
  axiosData.chat_id = chatId;

  if (
    messageText !== "/new_question" &&
    messageText !== "new_question" &&
    messageText !== "new"
  ) {
    axiosData.message =
      'send or enter the command "/new_question" without the qotes to get a new question';
    sendMessage(axiosData);
  } else {
    // const questionInf = getQuestion();
    let content = JSON.parse(fs.readFileSync("questionsDB.json", "utf8"));

    if (content.unusedQuestionsIndex.length === 0) {
      for (var i = 0; i < content.questions.length; i++) {
        content.unusedQuestionsIndex.push(i);
      }
    }

    shuffle(content.unusedQuestionsIndex);
    const questionIndex = content.unusedQuestionsIndex.pop();
    axiosData.questionInf = content.questions[questionIndex];
    console.log(`Number of question left: ${content.unusedQuestionsIndex.length}`)
    sendPoll(axiosData);

    fs.writeFileSync("questionsDB.json", JSON.stringify(content));
  }

  res.send("Mbolani!!!");
});

app.get("/", (req, res) => {
  console.log(req.body);

  res.send("this is a get");
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`server app is listening on port ${port}`);
});
