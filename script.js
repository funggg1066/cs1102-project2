document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');

    const quizData = [
        {
            question: "1. What is the core objective of risk parity?",
            options: ["Assign equal dollar amounts to each asset", "Maximize expected return regardless of risk", "Make each asset contribute equally to total portfolio risk", "Minimize transaction costs only"],
            correctAnswer: "Make each asset contribute equally to total portfolio risk"
        },
        {
            question: "2. In the simplified mean-variance model, the optimization problem primarily minimizes:",
            options: ["Portfolio weights", "Portfolio variance for a given target return", "Expected return", "Number of assets"],
            correctAnswer: "Portfolio variance for a given target return"
        },
        {
            question: "3. How do most robo-advisory systems initially assess a user’s risk preference?",
            options: ["By reviewing bank statements manually", "Through an online questionnaire", "Solely by analyzing market trends", "Via social-media sentiment analysis"],
            correctAnswer: "Through an online questionnaire"
        },
        {
            question: "4. Which real-world constraint most directly reduces net returns when rebalancing occurs monthly?",
            options: ["Transaction costs", "Limited asset availability", "Short investment horizon", "Low expected market returns"],
            correctAnswer: "Transaction costs"
        },
        {
            question: "5. A key advantage of equal weighting over mean-variance optimization is: ",
            options: ["It always produces higher returns", "It automatically equalizes risk contributions", "It requires solving a complex quadratic program", "It is far less sensitive to estimation errors in expected returns and covariances"],
            correctAnswer: "It is far less sensitive to estimation errors in expected returns and covariances"
        },
        {
            question: "6. What is the role of robo-advisor?",
            options: ["To execute faster than human", "To automatically build up a portfolio based on the according risk profile and goals", "To estimate stock prices with machine learning", "To take over human financial advisors"],
            correctAnswer: "To automatically build up a portfolio based on the according risk profile and goals"
        }
    ];

    const quizContainer = document.querySelector('.quiz-container');
    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const optionsEl = document.getElementById('options');
    const quizForm = document.getElementById('quiz-form');
    const submitButton = document.getElementById('submit-answer');
    const feedbackEl = document.getElementById('feedback');
    const nextButton = document.getElementById('next-question');
    const scoreContainer = document.getElementById('score-container');

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
        optionsEl.innerHTML = '';
        submitButton.disabled = false;
        nextButton.style.display = 'none';
        scoreContainer.textContent = '';

        if (currentQuestionIndex >= quizData.length) {
            showFinalScore();
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];
        questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
        questionTextEl.textContent = currentQuestion.question;

        currentQuestion.options.forEach((option, index) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = option;
            radio.id = `option${index}`;
            radio.required = true;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            optionsEl.appendChild(label);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            feedbackEl.textContent = 'Please select an answer.';
            feedbackEl.className = 'feedback incorrect';
            return;
        }

        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.disabled = true;
        });
        submitButton.disabled = true;

        if (userAnswer === correctAnswer) {
            feedbackEl.textContent = 'Correct!';
            feedbackEl.className = 'feedback correct';
            score++;
        } else {
            feedbackEl.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
            feedbackEl.className = 'feedback incorrect';
        }

        if (currentQuestionIndex < quizData.length - 1) {
            nextButton.textContent = 'Next Question';
        } else {
            nextButton.textContent = 'Show Results';
        }
        nextButton.style.display = 'block';
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function showFinalScore() {
        quizForm.style.display = 'none';
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
        questionNumberEl.style.display = 'none';
        questionTextEl.textContent = 'Quiz Completed!';
        scoreContainer.textContent = `Your final score is: ${score} out of ${quizData.length}`;
    }

    if (quizContainer) {
        quizForm.addEventListener('submit', handleSubmit);
        nextButton.addEventListener('click', handleNextQuestion);
        loadQuestion();
    } else {
        console.log('Quiz container not found on this page.');
    }
});