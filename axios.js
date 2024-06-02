const axios = require("axios");
require("dotenv").config();

const sendPoll = (axiosData) => {
  axios({
    method: "post",
    url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendPoll`,
    data: {
      chat_id: axiosData.chat_id, //6926073558,
      question: axiosData.questionInf.question, // "What is the capital of Benin",
      options: axiosData.questionInf.options, //["Cotonou", "Porto-Novo", "Bénin-City"],
      is_anonymous: false,
      type: "quiz",
      correct_option_id: axiosData.questionInf.correct_answer_index,
    },
  });
};

const sendMessage = (axiosData) =>
  axios({
    method: "post",
    url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    data: {
      chat_id: axiosData.chat_id,
      text: axiosData.message,
    },
  });

module.exports = { sendMessage, sendPoll };
