// // var test = generateRandom(1, 20);
// let logg = console.log;
// function generateRandom(min, max, excpt) {
//   var num = Math.floor(Math.random() * (max - min + 1)) + min;

//   if (excpt.length !== 0) {
//     var brk = false;
//     logg(`the num is ${num}`);
//     for (var i = 0; i < excpt.length; i++) {
//       if (num == excpt[i]) {
//         brk = true;
//       }
//     }

//     if (brk) {
//       generateRandom(min, max, excpt);
//     }
//   }
//   return num;
// }

// var x = generateRandom(0, 3, [3, 2, 0]);

// console.log(x);

const fs = require("fs");
var shuffle = require("shuffle-array");

const getQuestion = () => {
  let content = JSON.parse(fs.readFileSync("questionsDB.json", "utf8"));

  if (content.unusedQuestionsIndex.length == 0) {
    for (var i = 0; i < content.questions.length; i++) {
      content.unusedQuestionsIndex.push(i);
    }
  }

  shuffle(content.unusedQuestionsIndex);
  var questionIndex = content.unusedQuestionsIndex.pop();
  fs.writeFileSync("questionsDB.json", JSON.stringify(content));
  return content.questions[questionIndex];
};

module.exports = { getQuestion };
