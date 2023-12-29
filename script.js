class ColorGame {
    constructor() {
        this.levels = {
            easy: 3,
            medium: 7,
            hard: 15
        };
        this.maxLevels = 5;
        this.currentLevel = 1;
        this.init();
    }

    init() {
        this.bindEvents();
        this.nextLevel();
    }

    nextLevel() {
        if (this.currentLevel <= this.maxLevels) {
            this.generateColors();
            this.renderColors();
        } else {
            this.showPopup('Congratulations! You completed all levels.');
        }
    }

    generateColors() {
        const difficulty = document.getElementById('difficulty').value;
        const numColors = this.levels[difficulty];
        this.colors = this.generateUniqueColors(numColors);
        this.targetColor = this.colors[Math.floor(Math.random() * numColors)];
    }

    generateUniqueColors(numColors) {
        const uniqueColors = [];
        while (uniqueColors.length < numColors) {
            const randomColor = this.generateRandomColor();
            if (!uniqueColors.includes(randomColor)) {
                uniqueColors.push(randomColor);
            }
        }
        return uniqueColors;
    }

    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    renderColors() {
        const colorOptionsContainer = document.getElementById('color-options');
        colorOptionsContainer.innerHTML = '';

        for (const color of this.colors) {
            const colorOption = document.createElement('div');
            colorOption.classList.add('color-option');
            colorOption.style.backgroundColor = color;
            colorOption.addEventListener('click', () => this.checkGuess(color, colorOption));
            colorOptionsContainer.appendChild(colorOption);
        }

        document.getElementById('target-color').textContent = this.targetColor;
    }

    checkGuess(selectedColor, selectedColorElement) {
        if (selectedColor === this.targetColor) {
            this.showPopup('Correct! Well done!');
            this.currentLevel++;
            setTimeout(() => {
                this.hidePopup();
                this.nextLevel();
            }, 2000);
        } else {
            this.hideColor(selectedColorElement);
            this.showPopup('Wrong! Try again.');
        }
    }

    hideColor(selectedColorElement) {
        selectedColorElement.style.display = 'none';
        document.getElementById('target-color').textContent = '';
    }

    showPopup(message) {
        const popupContainer = document.getElementById('popup-container');
        const popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = message;
        popupContainer.style.display = 'block';
    }

    hidePopup() {
        const popupContainer = document.getElementById('popup-container');
        popupContainer.style.display = 'none';
        document.getElementById('popup-message').textContent = '';
    }

    bindEvents() {
        document.getElementById('difficulty').addEventListener('change', () => this.nextLevel());
    }
}

const game = new ColorGame();
