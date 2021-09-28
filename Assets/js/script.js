// Instantiate object with questions and answers
// Add action on start quiz button to show first question and possible answers
// Add a timer at the start of the quiz
// Show a message that indicates if the answer was correct or wrong
// After the quiz show final score and an input for name
// At the end of the quiz show the highscores with options to go back or clear them

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings, booleans, alerts, numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        options: ["quotes, curly brackets, parentheses, square brackets"],
        answer: "curly brackets"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        options: ["numbers and strings, other arrays, booleans, all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["commas, curly brackets, quotes, parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript, terminal / bash, for loops, console.log"],
        answer: "console.log"
    }
]