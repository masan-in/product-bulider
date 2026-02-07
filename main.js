class NumberCircle extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');

        const circle = document.createElement('div');
        circle.setAttribute('class', 'number-circle');
        circle.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .number-circle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: var(--secondary-color, #50e3c2);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.8rem;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                animation: pop-in 0.5s ease-out forwards;
            }

            @keyframes pop-in {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(circle);
    }
}

customElements.define('number-circle', NumberCircle);

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numberDisplay = document.getElementById('number-display');

    generateBtn.addEventListener('click', () => {
        generateAndDisplayNumbers();
    });

    function generateAndDisplayNumbers() {
        numberDisplay.innerHTML = ''; // Clear previous numbers
        const lottoNumbers = generateLottoNumbers();

        lottoNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberCircle = document.createElement('number-circle');
                numberCircle.setAttribute('number', number);
                numberDisplay.appendChild(numberCircle);
            }, index * 100); // Stagger the animation
        });
    }

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
});
