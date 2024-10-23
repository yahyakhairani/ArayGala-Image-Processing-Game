let level = 1;
let score = 0;
let timer;
let timeLeft = 60;
let operations = [];
let gameStarted = false;

const beforeCanvas = document.getElementById("beforeCanvas");
const afterCanvas = document.getElementById("afterCanvas");
const beforeCtx = beforeCanvas.getContext("2d");
const afterCtx = afterCanvas.getContext("2d");

const feedback = document.getElementById("feedback");
const hintMessage = document.getElementById("hintMessage");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const timerDisplay = document.getElementById("timer");
const operationChoices = document.getElementById("operationChoices");
const submitButton = document.getElementById("submitGuess");
const hintButton = document.getElementById("hintBtn");
const startButton = document.getElementById("startBtn");

const availableOperations = [
    'brightness',
    'grayscale',
    'invert',
    'blur',
    'sharpen',
    'edgeDetection',
    'emboss'
];

const imageFiles = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"];

function loadImageAndApplyOperations() {
    const randomImage = getRandomImage();
    const img = new Image();
    img.src = `images/${randomImage}`;
    img.onload = function() {
        beforeCtx.clearRect(0, 0, beforeCanvas.width, beforeCanvas.height);
        afterCtx.clearRect(0, 0, afterCanvas.width, afterCanvas.height);

        beforeCtx.drawImage(img, 0, 0, beforeCanvas.width, beforeCanvas.height);
        afterCtx.drawImage(img, 0, 0, afterCanvas.width, afterCanvas.height);
        
        applyOperations();
    };
}

function getRandomImage() {
    return imageFiles[Math.floor(Math.random() * imageFiles.length)];
}

function applyOperations() {
    const numOperations = level >= 5 ? 2 : 1; // Set 2 operations for level 5 and above
    operations = [];
    
    for (let i = 0; i < numOperations; i++) {
        const operation = getRandomOperation();
        operations.push(operation);
        applyOperation(operation);
    }
}

function getRandomOperation() {
    return availableOperations[Math.floor(Math.random() * availableOperations.length)];
}

function applyOperation(operation) {
    const imageData = afterCtx.getImageData(0, 0, afterCanvas.width, afterCanvas.height);
    const data = imageData.data;

    switch (operation) {
        case 'brightness':
            adjustBrightness(data, 50);
            break;
        case 'grayscale':
            convertToGrayscale(data);
            break;
        case 'invert':
            invertColors(data);
            break;
        case 'blur':
            applyConvolutionFilter(afterCtx, afterCanvas, [
                [1 / 9, 1 / 9, 1 / 9],
                [1 / 9, 1 / 9, 1 / 9],
                [1 / 9, 1 / 9, 1 / 9]
            ]);
            break;
        case 'sharpen':
            applyConvolutionFilter(afterCtx, afterCanvas, [
                [0, -1, 0],
                [-1, 5, -1],
                [0, -1, 0]
            ]);
            break;
        case 'edgeDetection':
            applyConvolutionFilter(afterCtx, afterCanvas, [
                [-1, -1, -1],
                [-1, 8, -1],
                [-1, -1, -1]
            ]);
            break;
        case 'emboss':
            applyConvolutionFilter(afterCtx, afterCanvas, [
                [-2, -1, 0],
                [-1, 1, 1],
                [0, 1, 2]
            ]);
            break;
    }
    afterCtx.putImageData(imageData, 0, 0);
}

// Adjust brightness
function adjustBrightness(data, brightness) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] + brightness);
        data[i + 1] = Math.min(255, data[i + 1] + brightness);
        data[i + 2] = Math.min(255, data[i + 2] + brightness);
    }
}

// Convert to grayscale
function convertToGrayscale(data) {
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
}

// Invert colors
function invertColors(data) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
}

// Convolution function
function applyConvolutionFilter(ctx, canvas, kernel) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const originalData = imageData.data.slice(); // Copy the original data

    const width = canvas.width;
    const height = canvas.height;
    const kernelSize = kernel.length;
    const half = Math.floor(kernelSize / 2);

    for (let y = half; y < height - half; y++) {
        for (let x = half; x < width - half; x++) {
            let r = 0, g = 0, b = 0;
            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    const pixelX = (x + kx - half);
                    const pixelY = (y + ky - half);
                    const offset = (pixelY * width + pixelX) * 4;
                    r += originalData[offset] * kernel[ky][kx];
                    g += originalData[offset + 1] * kernel[ky][kx];
                    b += originalData[offset + 2] * kernel[ky][kx];
                }
            }
            const index = (y * width + x) * 4;
            imageData.data[index] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// Generate multiple select boxes based on level
function generateOperationChoices() {
    operationChoices.innerHTML = '';
    
    // Number of dropdowns increases based on level (1 dropdown per 5 levels)
    const numDropdowns = Math.floor(level / 5) + 1;

    for (let i = 0; i < numDropdowns; i++) {
        const selectBox = document.createElement('select');
        selectBox.className = 'operation-select';
        availableOperations.forEach(choice => {
            const option = document.createElement('option');
            option.value = choice;
            option.textContent = choice;
            selectBox.appendChild(option);
        });
        operationChoices.appendChild(selectBox);
    }
}

// Hint function with multiple operations considered
function showHint() {
    let hintText = "Hint: ";

    if (operations.length > 0) {
        let hints = [];

        operations.forEach(operation => {
            switch (operation) {
                case 'brightness':
                    hints.push("the image might be brighter than usual");
                    break;
                case 'grayscale':
                    hints.push("it looks like there are no colors, just shades of gray");
                    break;
                case 'invert':
                    hints.push("the colors appear to be reversed");
                    break;
                case 'blur':
                    hints.push("the image seems a bit fuzzy or out of focus");
                    break;
                case 'sharpen':
                    hints.push("the edges seem more defined and sharper");
                    break;
                case 'edgeDetection':
                    hints.push("strong outlines or contrasts between edges are visible");
                    break;
                case 'emboss':
                    hints.push("the image appears raised or has a 3D effect");
                    break;
            }
        });

        // Join the hints together for multiple operations
        hintText += hints.join(", and ");
    } else {
        hintText += "No operations have been applied.";
    }

    hintMessage.textContent = hintText;
}

// Check if the player's guess is correct
function checkGuess(selectedOperations) {
    let correct = true;
    
    // Check if all the selected operations match the actual operations
    selectedOperations.forEach((operation, index) => {
        if (!operations.includes(operation)) {
            correct = false;
        }
    });

    if (correct) {
        feedback.textContent = 'Correct!';
        score += 10;
        levelUp(); // Panggil fungsi levelUp untuk naik level jika benar
    } else {
        feedback.textContent = 'Wrong! Try again.';
    }
    scoreDisplay.textContent = score;
}

// Get selected operations from dropdowns
function getSelectedOperations() {
    const selectedOptions = document.querySelectorAll('.operation-select');
    return Array.from(selectedOptions).map(select => select.value);
}

// Timer function
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 0; // Ensure time does not go below 0
        }
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    feedback.textContent = `Game Over! Your final score is ${score}`;
    submitButton.disabled = true;
    hintButton.disabled = true;
}

function levelUp() {
    level++;
    levelDisplay.textContent = level;
    loadImageAndApplyOperations(); // Muat gambar baru dan operasi baru
    generateOperationChoices(); // Buat ulang item box dengan pilihan baru
    hintMessage.textContent = ''; // Hapus hint setiap kali naik level
    feedback.textContent = ''; // Hapus pesan "Correct!" setiap naik level
    
    if (level % 5 === 0) {
        // Tingkatkan kesulitan pada level kelipatan 5
        availableOperations.push('newOperation'); // Tambahkan operasi baru jika perlu
    }
}

// Start the game
startButton.addEventListener('click', () => {
    startGame();
});

function startGame() {
    gameStarted = true;
    score = 0;
    level = 1;
    timeLeft = 60;
    submitButton.disabled = false;
    hintButton.disabled = false;
    feedback.textContent = '';
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    timerDisplay.textContent = timeLeft;
    generateOperationChoices();
    loadImageAndApplyOperations();
    startTimer();
}

hintButton.addEventListener('click', showHint);

submitButton.addEventListener('click', () => {
    const selectedOperations = getSelectedOperations();
    checkGuess(selectedOperations);
});
