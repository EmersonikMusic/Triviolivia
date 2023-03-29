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
    'philosophy': true,
    'politics': true,
    'pop-culture': true,
    'science':true,
    'sports': true,
    'technology': true,
    'television': true,
    'theater': true,
    'theology': true,
    'video-games': true
}

var active_difficulties = {
    'genius': true,
    'sharp': true,
    'average': true,
    'easy': true,
    'casual': true
}

var active_eras = {
    'pre-1500': true,
    '1500-1800': true,
    '1800-1900': true,
    '1900-1950': true,
    '1950s': true,
    '1960s': true,
    '1970s': true,
    '1980s': true,
    '1990s': true,
    '2000s': true,
    '2010s': true,
    '2020s': true
}

var category_colors = {
    'art': '#e06666',
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
    console.log("menu is shown")
    document.getElementById("menu").style.left = "0px";
}


function active_setting_array_creator () {

    // Define a function that appends truthy keys to an array
    function getTruthyKeys(obj) {
    const truthyKeys = [];
    for (let key in obj) {
        if (obj[key]) {
        truthyKeys.push(key);
        }
    }
    return truthyKeys;
    }

    // Call the function with the object as an argument and log the result
    const active_categories_array = getTruthyKeys(active_categories);
    const active_difficulties_array = getTruthyKeys(active_difficulties);
    const active_eras_array = getTruthyKeys(active_eras);
    
    
    console.log('Active categories: ' + active_categories_array)
    console.log('Active difficulties: ' + active_difficulties_array)
    console.log('Active eras: ' + active_eras_array)

    // function getRandomValues() {
    //     const randomFirstValue = active_categories_array[Math.floor(Math.random() * active_categories_array.length)];
    //     const randomSecondValue = active_difficulties_array[Math.floor(Math.random() * active_difficulties_array.length)];
    //     const randomThirdValue = active_eras_array[Math.floor(Math.random() * active_eras_array.length)];
    //     console.log(`http://localhost8000:questions/${randomFirstValue}/${randomSecondValue}/${randomThirdValue}`);
    //   }

    // for (let i = 0; i < 10; i++) {
    // getRandomValues()
    // }

    // function printArrayWithQuestionMarks(active_categories_array) {
    //     console.log("http://localhost8000:questions/?" 
    //         + (active_categories_array.join('&')) + "/"
    //         + (active_difficulties_array.join('&')) + "/"
    //         + (active_eras_array.join('&')) + "/")
    //   }
    
    // printArrayWithQuestionMarks(active_categories_array);

      
}


// Define a function that returns a random value from each array separated by a slash

const apiUrl = 'http://trivioliv.herokuapp.com/api/questions/?fbclid=IwAR02up45zR5auabNiY2GHUtxllubgkVb8tuOsChQ3fV3aVEZPTVO9sUXCOg&format=json'; // replace with your API endpoint URL

// make a fetch request to the API
fetch(apiUrl)
  .then(response => response.json()) // convert the response to JSON format
  .then(data => {
    const responseArray = Array.from(data); // convert the JSON data into an array
    console.log(responseArray); // print the array to the console
  })
  .catch(error => console.error(error)); // handle any errors that occur during the fetch request


function start_or_pause_game() {
    if (game_started == false) {
        game_started = true;
        active_setting_array_creator();
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

function toggle_eras(clicked_id) {
    if (active_eras[clicked_id] == true) {
        document.getElementById("demo").innerHTML = 'You have disabled the ' + clicked_id + ' era.';
        active_eras[clicked_id] = false;
        console.log(active_eras);
    } else {
        document.getElementById("demo").innerHTML = 'You have enabled the ' + clicked_id + ' era.';
        active_eras[clicked_id] = true;
        console.log(active_eras);
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

const question_list = [
    [1, 'politics', 3, 'How many times was Donald Trump impeached as President of the United States?', 'Two.'],
    [2, 'science', 4, 'What element comes next in this series? Fluorine, chlorine, bromine...', 'Iodine.'],
    [3, 'math', 3, 'What is the only number in the English language to have as many letters as its value?', 'Four.'],
    [4, 'literature', 3, "What was George Orwell's real name?", 'Eric Arthur Blair.'],
    [5, 'sports', 2, 'Which team was added to the National Hockey League in 2021?', 'The Seattle Kraken.']
]

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

const delay = ms => new Promise(res => setTimeout(res, ms));


const yourFunction = async () => {
    document.body.style.backgroundColor = '#351c75';
    showQuestion('Q: ' + question_list[0][3])
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question_list[0][4])
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#a64d79';
    showQuestion('Q: ' + question_list[1][3])
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question_list[1][4])
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#000000';
    showQuestion('Q: ' + question_list[2][3])
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question_list[2][4])
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#ff9900';
    showQuestion('Q: ' + question_list[3][3])
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question_list[3][4])
  
    await delay(time_per_answer * 1000);

    document.body.style.backgroundColor = '#999999';
    showQuestion('Q: ' + question_list[4][3])
    await delay(time_per_question * 1000);
    showAnswer('A: ' + question_list[4][4])
  
    await delay(time_per_answer * 1000);

  };

