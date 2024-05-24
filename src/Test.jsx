import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './test.css';

const Test = () => {
    const [inputData, setInputData] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState("");
    const [randomQuestionAnswer, setRandomQuestionAnswer] = useState("");
    const [questionNumber, setQuestionNumber] = useState(1);
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [wrongQuestions, setWrongQuestions] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [rightQuestionPos, setRightQuestionPos] = useState(0);
    const [buttonStyles, setButtonStyles] = useState({});
    const [totalQuestions, setTotalQuestions] = useState(10); // Default total number of questions
    const location = useLocation();
    const navigate = useNavigate();
    let randomQuestionIndex;

    useEffect(() => {
        setInputData(location.state.inputData);
    }, []);

    useEffect(() => {
        setRightQuestionPos(getRandomIntInclusive(1, 4)); // This updates asynchronously
        setButtonStyles({});
        if (inputData.length > 0) {
            let arrayLength = inputData.length;
            randomQuestionIndex = getRandomIntInclusive(0, arrayLength - 1); // Adjusted index for zero-based
            setRandomQuestion(inputData[randomQuestionIndex].questions);
            setRandomQuestionAnswer(inputData[randomQuestionIndex].answers);

            let newAnswers = new Array(4).fill(""); // Create a new array for answers

            // Populate the new answers array
            newAnswers.forEach((_, i) => {
                if (i + 1 === rightQuestionPos) {
                    newAnswers[i] = inputData[randomQuestionIndex].answers; // Direct assignment for correct position
                } else {
                    let position;
                    do {
                        position = getRandomIntInclusive(0, arrayLength - 1); // Correctly adjusted to avoid the same index
                    } while (position === randomQuestionIndex); // Ensure different question
                    newAnswers[i] = inputData[position].answers;
                }
            });

            setAnswer(newAnswers); // Update the state to trigger re-render
        }
    }, [inputData, questionNumber, rightQuestionPos]);

    useEffect(() => {
        if (questionNumber === totalQuestions + 1) navigateResult();
    }, [questionNumber]);

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function validateAnswer(number) {
        const isCorrect = number === rightQuestionPos;
        setButtonStyles({
            ...buttonStyles,
            [rightQuestionPos]: 'green',
            [number]: isCorrect ? 'green' : 'red'
        });
        if (isCorrect) {
            setCorrectQuestions(prev => prev + 1);
        } else {
            setWrongQuestions(prev => prev + 1);
        }

        setTimeout(() => {
            setQuestionNumber(prev => prev + 1);
        }, 1000);
    }

    const navigateResult = () => {
        navigate('/testresult', { state: { correctQuestions, wrongQuestions } });
    }

    const handleQuestionNumberChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setTotalQuestions(value);
        }
    };

    return (
        <div className='backgroundTest'>
            <div id="saveBox" className='simpleBox'>
                <p>Items saved!</p>
            </div>
            <div className='containerTest'>
                <div className='quiz-card'>
                    <div className='questionArea'>
                        <p className='questionNumber'>{questionNumber}/{totalQuestions}</p>
                        <p className='correctQuestion'>{correctQuestions}</p>
                        <p className='wrongQuestion'>{wrongQuestions}</p>
                        <h1 className='h1Question'>{randomQuestion}</h1>
                    </div>
                    <div className='answersArea'>
                        {[1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                className='buttonAnswer'
                                onClick={() => validateAnswer(index)}
                                style={{ backgroundColor: buttonStyles[index] }}
                                disabled={buttonStyles[index]}
                            >
                                {answer[index - 1] || "Loading..."}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="questionNumberInputContainer">
                    <label htmlFor="questionNumberInput">Number of Questions:</label>
                    <input
                        id="questionNumberInput"
                        type="number"
                        min="1"
                        value={totalQuestions}
                        onChange={handleQuestionNumberChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Test;
