const questionDisplay = document.querySelector('.question-container')
const answerDisplay = document.querySelector('.answer-container')

var time_per_question = 5
var time_per_answer = 5
var game_started = false;
var game_paused = false;
var current_question_category = null;
var menu_hidden = true;

var active_categories = {
    'art': true,
    'economics': true,
    'food': true,
    'geography': true,
    'history': true,
    'language': true,
    'literature': true,
    'math': true,
    'miscellaneous': true,
    'movies': true,
    'music': true,
    'nature': true,
    'politics': true,
    'pop-culture': true,
    'religion': true,
    'science':true,
    'sports': true,
    'technology': true,
    'television': true,
    'video-games': true
}

var active_difficulties = {
    'genius': true,
    'sharp': true,
    'average': true,
    'basic': true,
    'insulting': true
}

var category_colors = {
    'art': '#dd7e6b',
    'economics': '#38761d',
    'food': '#99000',
    'geography': '#783f04',
    'history': '#f1c232',
    'language': '#9fc5e8',
    'literature': '#ff9900',
    'math': '#000000',
    'miscellaneous': '#674ea7',
    'movies': '#660000',
    'music': '#0b5394',
    'nature': '#93c47d',
    'politics': '#351c75',
    'pop-culture': '#cc4125',
    'religion': '#ff00ff',
    'science': '#a64d79',
    'sports': '#999999',
    'technology': '#ff0000',
    'television': '#3c78d8',
    'video-games': '#9900ff'
}

function hide_menu() {
    console.log("menu is hidden")
    document.getElementById("menu").style.left = "-1000px";

}

function show_menu() {
    console.log("menu is hidden")
    document.getElementById("menu").style.left = "0px";

}


function start_or_pause_game() {
    if (game_started == false) {
        game_started = true;
        document.getElementById("demo").innerHTML = 'Game started. Good luck. Have fun.';
        yourFunction();
        hide_menu();
    } else if (game_paused == false) {
        game_paused = true;
        document.getElementById("demo").innerHTML = 'Game paused.';
    } else {
        game_paused = false;
        document.getElementById("demo").innerHTML = 'Game unpaused.';
    }
}


function toggle_menu() {
    if (menu_hidden == true) {
        menu_hidden = false;
        show_menu();
    } else {
        menu_hidden = true;
        hide_menu();
    }
}


function toggle_categories(clicked_id) {
    if (active_categories[clicked_id] == true) {
        document.getElementById("demo").innerHTML = 'You have disabled the ' + clicked_id + ' category.';
        active_categories[clicked_id] = false;
        console.log(active_categories);
    } else {
        document.getElementById("demo").innerHTML = 'You have enabled the ' + clicked_id + ' category.';
        active_categories[clicked_id] = true;
        console.log(active_categories);
    }
}

function toggle_difficulties(clicked_id) {
    if (active_difficulties[clicked_id] == true) {
        document.getElementById("demo").innerHTML = 'You have disabled the ' + clicked_id + ' difficulty.';
        active_difficulties[clicked_id] = false;
        console.log(active_difficulties);
    } else {
        document.getElementById("demo").innerHTML = 'You have enabled the ' + clicked_id + ' difficulty.';
        active_difficulties[clicked_id] = true;
        console.log(active_difficulties);
    }
}


function change_time_per_question(clicked_id) {
    time_per_question = clicked_id;
    document.getElementById("demo").innerHTML = 'Questions are now displayed for ' + time_per_question + ' seconds.';
    console.log(time_per_question);
}

function change_time_per_answer(clicked_id) {
    time_per_question = clicked_id;
    document.getElementById("demo").innerHTML = 'Answers are now displayed for ' + time_per_question + ' seconds.';
    console.log(time_per_answer);
}

let Question = class {
    constructor(number, category, difficulty, question, answer) {
        this.number = number;
        this.category = category;
        this.difficulty = difficulty;
        this.question = question;
        this.answer = answer;
    }
  }

let question000001 = new Question(
    000001, 
    'politics', 
    3, 
    'How many times was Donald Trump impeached as President of the United States?', 
    'Two.')

let question000002 = new Question(
    000002, 
    'science', 
    4,
    'What element comes next in this series? Fluorine, chlorine, bromine...',
    'Iodine.')

let question000003 = new Question(
    000003, 
    'math', 
    3,
    'What is the only number in the English language to have as many letters as its value?',
    'Four.')

let question000004 = new Question(
    000004, 
    'literature', 
    3,
    "What was George Orwell's real name?",
    'Eric Arthur Blair.')

let question000005 = new Question(
    000005, 
    'sports', 
    3,
    'Which team was added to the National Hockey League in 2021?',
    'The Seattle Kraken.')

const question_list = [
    [1, 'politics', 3, 'How many times was Donald Trump impeached as President of the United States?', 'Two.'],
    [2, 'science', 4, 'What element comes next in this series? Fluorine, chlorine, bromine...', 'Iodine.'],
    [3, 'math', 3, 'What is the only number in the English language to have as many letters as its value?', 'Four.'],
    [4, 'literature', 3, "What was George Orwell's real name?", 'Eric Arthur Blair.'],
    [5, 'sports', 2, 'Which team was added to the National Hockey League in 2021?', 'The Seattle Kraken.']
]

console.log(question000001)
console.log(question000002)
console.log(question000003)

const showQuestion = (displayed_question) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = displayed_question
    questionDisplay.append(messageElement)
    setTimeout(() => questionDisplay.removeChild(messageElement), time_per_question * 1000 + time_per_answer * 1000)
}

const showAnswer = (displayed_answer) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = displayed_answer
    answerDisplay.append(messageElement)
    setTimeout(() => answerDisplay.removeChild(messageElement), time_per_answer * 1000)
}

// showQuestion('Q: ' + question000001.question)

// var timeLeft = time_per_question;
// var elem = document.getElementById('Timer');
// var timerId = setInterval(countdown, 1000);

// function countdown() {
//     if (timeLeft == 0) {
//         clearTimeout(timerId);
//         showAnswer('A: ' + question000001.answer)
//     } else {
//         elem.innerHTML = timeLeft;
//         timeLeft--;
//     }
// }

fetch('http://trivioliv.herokuapp.com/api/questions')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

fetch('https://trivioliv.herokuapp.com/api/questions')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));



const delay = ms => new Promise(res => setTimeout(res, ms));

const yourFunction = async () => {
    document.body.style.backgroundColor = '#351c75';
    showQuestion('Q: ' + question000001.question)
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question000001.answer)
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#a64d79';
    showQuestion('Q: ' + question000002.question)
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question000002.answer)
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#000000';
    showQuestion('Q: ' + question000003.question)
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question000003.answer)
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#ff9900';
    showQuestion('Q: ' + question000004.question)
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question000004.answer)
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#999999';
    showQuestion('Q: ' + question000005.question)
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question000005.answer)
  
    await delay(time_per_answer * 1000);

  };

