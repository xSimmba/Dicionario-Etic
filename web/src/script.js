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

const infobox = document.getElementById('info-container');
const infowords = document.createElement('p');
infowords.className = 'infowords';
infowords.innerText = "This is a school project which is a basic dictionary using HTML, CSS, JavaScript, Python, and Docker";
infobox.appendChild(infowords);

let isVisible = false; // Flag to track visibility

infobox.addEventListener('click', () => {
    if (isVisible) {
        infowords.style.display = 'none'; // Hide infowords
        isVisible = false;
    } else {
        infowords.style.display = 'block'; // Show infowords
        isVisible = true;
    }
});
