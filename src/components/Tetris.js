import React, { useState, useCallback, useEffect } from "react";
import "./Tetris.css";

import Board from "/src/components/Board";
import GameController from "/src/components/GameController";
import GameStats from "/src/components/GameStats";
import Previews from "/src/components/Previews";
import Questions, { questions } from "/src/components/Questions";

import { useBoard } from "/src/hooks/useBoard";
import { useGameStats } from "/src/hooks/useGameStats";
import { usePlayer } from "/src/hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver, setStartGame }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [currentQuestion, setCurrentQuestion] = useState(questions[0][0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBlackedOut, setIsBlackedOut] = useState(false);
  const [incrementBar, setIncrementBar] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(3); // Timer state

  const changeQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex][0]);
    setCurrentQuestionIndex(randomIndex);
    setTimer(3); // Reset timer when changing question
  }, []);

  const [player, setPlayer, resetPlayer, setNextTetrominoX] = usePlayer(changeQuestion);
  const memoizedAddLinesCleared = useCallback((lines) => {
    addLinesCleared(lines);
    setIncrementBar((prev) => Math.min(prev + 0.5, 3)); // Increment and cap at 3
  }, [addLinesCleared]);

  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared: memoizedAddLinesCleared,
    isAttacking
  });

  const handleAttack = () => {
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 100);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleBlackout = async () => {
    setIsBlackedOut(true);
    await sleep(3000);
    setIsBlackedOut(false);
  };

  const handleNextX = () => {
    setNextTetrominoX();
  };

  const toggleQuestionVisibility = () => {
    if (!isQuestionVisible) {
      setIsQuestionVisible(true);
      setCorrectAnswers(0);
      changeQuestion();
    }
    if (isQuestionVisible && (action === 2 || action === 3)) {
      const userAnswer = action === 2 ? 0 : 1;
      const correctAnswer = questions[currentQuestionIndex][1];
      if (userAnswer === correctAnswer) {
        setCorrectAnswers(prev => {
          const newCount = prev + 1;
          if (newCount >= 5) {
            setIsQuestionVisible(false);
          }
          return newCount;
        });
        changeQuestion();
      } else {
        setIsQuestionVisible(false);
        handleNextX();
      }
    }
  };

  const handleAction = (action) => {
    if (action === 1) {
      toggleQuestionVisibility();
    } else if (action === 2) {
      handleBlackout();
    } else if (action === 3) {
      handleAttack();
    } else if (action >= 4) {
      handleNextX();
    }
    setIncrementBar(0);

  };
  
  const handleKeyPress = useCallback((event) => {
    if (event.key === '1') {
      handleAction(3);
    } else if (event.key === '2') {
      // Check if the answer is correct for key '2'
      const correctAnswer = questions[currentQuestionIndex][1];
      if (correctAnswer === 0) {
        setCorrectAnswers(prev => {
          const newCount = prev + 1;
          if (newCount >= 5) {
            setIsQuestionVisible(false);
          }
          return newCount;
        });
        changeQuestion(); // Move to the next question if correct
      } else {
        setIsQuestionVisible(false);
        handleNextX(); // Handle incorrect answer
      }
    } else if (event.key === '3') {
      // Check if the answer is correct for key '3'
      const correctAnswer = questions[currentQuestionIndex][1];
      if (correctAnswer === 1) {
        setCorrectAnswers(prev => {
          const newCount = prev + 1;
          if (newCount >= 5) {
            setIsQuestionVisible(false);
          }
          return newCount;
        });
        changeQuestion(); // Move to the next question if correct
      } else {
        setIsQuestionVisible(false);
        handleNextX(); // Handle incorrect answer
      }
    }
  }, [incrementBar, isQuestionVisible, currentQuestionIndex, changeQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    let countdown;
    if (isQuestionVisible) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            handleAction(3); // Act as if the answer is wrong
            setIsQuestionVisible(false); // Hide question
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isQuestionVisible]);

  return (
    <div className="Tetris">
      <div>
        {isQuestionVisible && (
          <div className="cyber-question">
            <Questions currentQuestion={currentQuestion} />
            <div className="timer">Time Left: {timer}s</div>
          </div>
        )}
        <div className="button-container">
          <button onClick={handleAttack}>Attack!</button>
          <button onClick={handleBlackout}>Blackout</button>
          <button onClick={handleNextX}>Next X</button>
          <button onClick={toggleQuestionVisibility}>Toggle Questions</button>
        </div>
        <h1> Power Gauge </h1>
        <div className="increment-bar">
          <p>Increment Bar: {incrementBar}</p>
          <div className="bar" style={{width: `${(incrementBar / 3) * 100}%`}}></div>
        </div>
        {isQuestionVisible && <p>Correct Answers: {correctAnswers}/5</p>}
      </div>
      <div className="board-container">
        <Board board={board} />
        {isBlackedOut && <div className="blackout-overlay"></div>}
      </div>
      <div className="panel">
        <Previews tetrominoes={player.tetrominoes} />
        <GameStats gameStats={gameStats} />
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
        setStartGame={setStartGame}
      />
    </div>
  );
};

export default Tetris;
