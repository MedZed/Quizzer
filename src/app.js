var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (request, response) {
	response.render("add");

});

app.get('/')

app.post('/newquiz', function (request, response) {

	var question = request.body.question;
	var correct = request.body.correct;
	var falseOne = request.body.falseOne;
	var falseTwo = request.body.falseTwo;
	var falseThree = request.body.falseThree;


	var newQuiz = {}
	newQuiz.question = question
	newQuiz.correct = correct
	newQuiz.falseOne = falseOne
	newQuiz.falseTwo = falseTwo
	newQuiz.falseThree = falseThree
	fs.readFile("./resources/quiz.json", function (err, data) {

		var parsedData = JSON.parse(data);

		parsedData.push(newQuiz);

		writeFileFunction(parsedData);

	});

	function writeFileFunction(newQuizInfo) {

		var newQuizInfo = JSON.stringify(newQuizInfo);

		fs.writeFile("./resources/quiz.json", newQuizInfo, function (err) {
			

			if (err) {
				throw err;
			}
		});
	};
				// response.render('add', { message: "seccessfuly added a new question" , msgType: "alert alert-dismissible alert-info" });

	response.redirect('/');

});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});

// var server = app.listen(3000, function () {
// 	console.log('Example app listening on port: ' + server.address().port);
// });