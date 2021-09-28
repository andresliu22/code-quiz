// Instantiate object with questions and answers
// Add action on start quiz button to show first question and possible answers
// Add a timer at the start of the quiz
// Show a message that indicates if the answer was correct or wrong
// After the quiz show final score and an input for name
// At the end of the quiz show the highscores with options to go back or clear them

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "curly brackets"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
]

var main = document.querySelector('#main');
var startForm = document.querySelector('#start-form');
var startDiv = document.querySelector('#start-div');
var optionList = document.querySelector('#option-list');
var question = document.querySelector('#question');
var questionDiv = document.querySelector('#question-div');
var inputDiv = document.querySelector('#input-div');
var scoreboardDiv = document.querySelector('#scoreboard-div');
var submitInitial = document.querySelector('#submit-initial');


var count = 0;
var score = 0;
var time = 30;

function startQuiz(event) {
    event.preventDefault()
    console.log(count)
    // Hid initial container
    startDiv.setAttribute('style', 'display: none');
    questionDiv.setAttribute('style', 'display: block');

    removeAllChilds(optionList)

    question.textContent = questions[count].question;
    

    for (var i = 0; i < questions[count].options.length ; i++) {
        var li = document.createElement('li');
        li.className = "flex-row justify-space-between align-center p-2 bg-light text-dark";
        li.setAttribute("style", 'list-style-type: none');
        var option = document.createElement('option');
        option.className = 'btn btn-primary submit-answer';
        option.setAttribute("style", 'display: block; margin-bottom: 5px');
        option.textContent = (i + 1) + '. '+ questions[count].options[i];
        li.append(option);
        optionList.append(li);

        option.addEventListener("click", showNext);
    }
    
}

startForm.addEventListener("submit", startQuiz);

function removeAllChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showNext(event) {
    var answer = event.target.textContent;
    if (answer.includes(questions[count].answer)) {
        console.log("Correct");
        score += 5;
    } else {
        console.log("Wrong");
        time -= 5;
    }
    
    count++;

    if (questions.length > count) {
        startQuiz(event);
    } else {
        showFinalScore()
    }
    
};

function showFinalScore() {
    startDiv.setAttribute('style', 'display: none');
    questionDiv.setAttribute('style', 'display: none');
    inputDiv.setAttribute('style', 'display: block');
    inputDiv.children[1].textContent = "Your final score is " + score;
}