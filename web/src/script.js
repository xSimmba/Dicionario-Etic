document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.querySelector('.results');

    searchInput.addEventListener('input', function() {
        //trim() removes any whitespace
        const inputValue = searchInput.value.trim();
        if (inputValue !== '') {
            fetchAPI(inputValue);
            // Show the results div when input has value
            resultsDiv.style.display = 'block';
        } else {
            clearContent();
            // Hide the results div when input is empty
            resultsDiv.style.display = 'none';
        }
    });
});

let timerId;

word_day.onclick = () => {
    const apiUrl = 'http://localhost:8001/word_ot_day';
    fetch(apiUrl)
        .then(response =>{
            if (!response.ok){
                throw new Error('Error fetching data');
            }
            return response.json();
        })
        .then(data => {
            word_of_day(data);
            const word_ot_day = document.querySelector('.dayW');
            word_ot_day.style.display = "block";
            
            // Show timer
            const timerElement = document.createElement('span');
            timerElement.textContent = '10'; // Initial value
            word_ot_day.appendChild(timerElement);

            let count = 10; // Timer duration in seconds

            // Start countdown
            const countdown = setInterval(() => {
                count--;
                timerElement.textContent = count.toString();
                if (count <= 0) {
                    clearInterval(countdown);
                    word_ot_day.style.display = "none";
                }
            }, 1000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to fetch data from API
function fetchAPI(inputValue) {
    const apiUrl = 'http://localhost:8001/search?word=' + encodeURIComponent(inputValue);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            return response.json();
        })
        .then(data => {
            updateContent(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to update content with API response
function updateContent(data) {
    const responses = document.querySelector('.results #word');
    const definitions = document.querySelector('.results #definition');
    const type = document.querySelector('.results #type');
    responses.textContent = data.word;
    type.textContent = data.type;
    definitions.textContent = data.description;
}

// Function to clear content
function clearContent() {
    const responses = document.querySelector('.results #word');
    const definitions = document.querySelector('.results #definition');
    const type = document.querySelector('.results #type');
    responses.textContent = '';
    type.textContent = '';
    definitions.textContent = '';
}

function word_of_day(data) {
    const response = document.getElementById('response2');
    const definition = document.getElementById('definition2');
    const type = document.getElementById('type2');

    // Check if elements exist before setting textContent
    if (response && definition && type) {
        response.textContent = data.word;
        type.textContent = data.type;
        definition.textContent = data.description;
    } else {
        console.error("One or more elements not found in the DOM.");
        console.log(response);
        console.log(definition);
        console.log(type);
    }
}

// Get all footer images
const footerImages = document.querySelectorAll('.footer img');

// Function to generate random number between min and max
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to generate random keyframes for a single image
function generateRandomKeyframes(image) {
    const translateYStart = getRandomNumber(-50, 50);
    const translateYEnd = getRandomNumber(-50, 50);

    return `
        0% {
            transform: translateY(${translateYStart}px);
        }
        50% {
            transform: translateY(${translateYEnd}px);
        }
        100% {
            transform: translateY(${translateYStart}px);
        }
    `;
}

// Apply random animation to each footer image
footerImages.forEach((image, index) => {
    const animationName = `randomMovement${index}`;

    // Generate random keyframes for the current image
    const keyframes = generateRandomKeyframes(image);

    // Inject random keyframes into CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ${animationName} {
            ${keyframes}
        }

        .footer img:nth-child(${index + 1}) {
            height: auto;
            padding: 25px;
            padding-top: 75px;
            animation: ${animationName} ${getRandomNumber(10, 20)}s linear infinite;
        }
    `;

    // Append the style element to the document head
    document.head.appendChild(style);
});

let timerId2;
const infobox = document.getElementById('info-container');

infobox.onclick = () =>{
    const info = document.querySelector('.info')
    const infowords = document.querySelector('.infowords')
    infowords.innerText = "This is a school project which is a basic dictionary using HTML, CSS, JavaScript, Python, and Docker";
    info.style.display = "block";

    // Show timer
    const timerElement = document.createElement('span');
    timerElement.textContent = '10'; // Initial value
    info.appendChild(timerElement);

    let count = 10; // Timer duration in seconds

    // Start countdown
    const countdown = setInterval(() => {
        count--;
        timerElement.textContent = count.toString();
        if (count <= 0) {
            clearInterval(countdown);
            info.style.display = "none";
        }
    }, 1000);
}