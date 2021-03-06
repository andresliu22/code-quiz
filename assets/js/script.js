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
var highscoreDiv = document.querySelector('#highscore-div');
var submitInitialBtn = document.querySelector('#submit-initial');
var highscoreList = document.querySelector('#highscore-list');
var initials = document.querySelector('#initials');
var goBackBtn = document.querySelector('#go-back');
var clearHighscoresBtn = document.querySelector('#clear-highscores');
var timer = document.querySelector('#timer');
var showHighscoresBtn = document.querySelector('#view-highscores');
var answerSpan = document.querySelector('#answer-span');

var count = 0;
var score = 0;
var timeLeft = 30;
var timeInterval;

function startQuiz(event) {
    event.preventDefault()
    
    // Hid initial container
    showHighscoresBtn.disabled = true;
    showHighscoresBtn.setAttribute("style", "display: none");
    startDiv.setAttribute('style', 'display: none');
    questionDiv.setAttribute('style', 'display: block');

    // Start timer
    timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timer.textContent = "Time: " + timeLeft + "s";
            timeLeft--;
        } else {
            timer.textContent = '';
            clearInterval(timeInterval)
            showFinalScore()
        }
    }, 1000);  

    addQuestions(); 
}

// Add the questions
function addQuestions(){
    removeAllChilds(optionList);
    question.textContent = questions[count].question;
    
    for (var i = 0; i < questions[count].options.length ; i++) {
        var li = document.createElement('li');
        li.className = "p-2";
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

// Show next question and apply message and update score or time left
function showNext(event) {
    var answer = event.target.textContent;
    var answerTimerLeft = 8;
    var answerMessage;
    
    if (answer.includes(questions[count].answer)) {
        console.log("Correct");
        answerMessage = "Correct";
        score += 5;
    } else {
        console.log("Wrong");
        answerMessage = "Wrong";
        timeLeft -= 5;
    }

    answerSpan.textContent = answerMessage;
    answerSpan.setAttribute("style", "display: block");

    var answerTimer = setInterval(function() {
        if (answerTimerLeft > 0) {
            answerTimerLeft--;
        } else {
            answerSpan.setAttribute("style", "display: none");
            answerSpan.textContent = "";
            clearInterval(answerTimer);
        }
    }, 100);
    
    count++;

    if (questions.length > count) {
        addQuestions();
    } else {
        timer.textContent = '';
        clearInterval(timeInterval);
        showFinalScore();
    }
    
};

// Show final score after time ends or answers all the questions
function showFinalScore() {
    startDiv.setAttribute('style', 'display: none');
    questionDiv.setAttribute('style', 'display: none');
    inputDiv.setAttribute('style', 'display: block');
    highscoreDiv.setAttribute('style', 'display: none');
    inputDiv.children[1].textContent = "Your final score is " + score + ".";
}

// Show all the highscores after putting initials and pressing submit
function showHighscores() {
    if (initials.value.replace(/ /g, "") != "") {
        viewHighscores();

        if (JSON.parse(localStorage.getItem("users")) != null){
            var users = JSON.parse(localStorage.getItem("users"));
            users.push({
                initial: initials.value.toUpperCase(),
                score: score
            });
        } else {
            var users = [{
                initial: initials.value.toUpperCase(),
                score: score
            }]
        }
        
        users.sort((a, b) => a.score <= b.score && 1 || -1);

        localStorage.setItem("users", JSON.stringify(users));
    
        removeAllChilds(highscoreList);
    
        for (var i = 0; i < users.length; i++) {
            var li = document.createElement('li');
            li.className = "flex-row justify-space-between align-center p-2 bg-light text-dark";
            li.setAttribute("style", 'list-style-type: none');
            li.textContent = (i + 1) + '. '+ users[i].initial + " - " + users[i].score;
            highscoreList.append(li);
        }
    } else {
        alert("Put your initials");
    }
}

// Go back to start the quiz again
function goBack() {
    showHighscoresBtn.disabled = false;
    showHighscoresBtn.setAttribute("style", "display: inline-block");
    startDiv.setAttribute('style', 'display: block');
    questionDiv.setAttribute('style', 'display: none');
    inputDiv.setAttribute('style', 'display: none');
    highscoreDiv.setAttribute('style', 'display: none');

    count = 0;
    score = 0;
    timeLeft = 30;
    initials.value = "";
}

// Clear past highscores
function clearHighscores() {
    localStorage.removeItem("users");
    removeAllChilds(highscoreList);
}

// Remove all childs from an parent element
function removeAllChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// View highscores after pressing the respective button
function viewHighscores() {
    showHighscoresBtn.disabled = true;
    showHighscoresBtn.setAttribute("style", "display: none");
    startDiv.setAttribute('style', 'display: none');
    questionDiv.setAttribute('style', 'display: none');
    inputDiv.setAttribute('style', 'display: none');
    highscoreDiv.setAttribute('style', 'display: block');
}

// Event Listeners
startForm.addEventListener("submit", startQuiz);
submitInitialBtn.addEventListener("click", showHighscores);
goBackBtn.addEventListener("click", goBack);
clearHighscoresBtn.addEventListener("click", clearHighscores);
showHighscoresBtn.addEventListener("click", viewHighscores);