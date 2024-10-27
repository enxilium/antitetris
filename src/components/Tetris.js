import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Tetris.css";
import { socket } from "./GameController";

import Board from "/src/components/Board";
import GameController from "/src/components/GameController";
import GameStats from "/src/components/GameStats";
import Previews from "/src/components/Previews";
import Questions, { questions } from "/src/components/Questions";
import AttackInfo from "./AttackInfo";

import { useBoard } from "/src/hooks/useBoard";
import { useGameStats } from "/src/hooks/useGameStats";
import { usePlayer } from "/src/hooks/usePlayer";
import { SendMessage } from "./GameController";
import { defaultCell } from "/src/business/Cell";

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
  const [currentAttack, setCurrentAttack] = useState(null); // Attack state
  const incrementNames = ["PHISHING", "RANSOMWARE", "MITM", "DDoS"]; // Updated names
  const incrementColors = ["#4CAF50", "#FFA726", "#e31212", "#000000"]; // Corresponding colors
  const [incrementName, setIncrementName] = useState("NONE"); // Initial name

  const audioRef = useRef();

  useEffect(() => {
    console.log("socket initialized")
    socket.addEventListener('message', function (event) {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
            const actionNumber = reader.result;
            if (actionNumber == "GameOver") {
              console.log('You win!', actionNumber);
              handleGameOver(actionNumber);
            } else {
              console.log('Attack received:', actionNumber);
              showPopupAndGlitch();
              handleAction(Number(actionNumber));
            }
        };
        reader.readAsText(event.data);
    }
    });
  
  }, [])
  const [blackoutInput, setBlackoutInput] = useState(""); // Input for blackout
  const [inputError, setInputError] = useState(false); // Error state for input

  const generateRandomCipher = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}-+';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const typingLists = Array.from({ length: 20 }, generateRandomCipher);
  const [currentBlackoutCode, setCurrentBlackoutCode] = useState(""); // Current code to remove blackout

  const changeQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex][0]);
    setCurrentQuestionIndex(randomIndex);
    setTimer(3); // Reset timer when changing question
  }, []);

  const [player, setPlayer, resetPlayer, setNextTetrominoX, setNextTetrominoY] = usePlayer(changeQuestion);
  const memoizedAddLinesCleared = useCallback((lines) => {
    addLinesCleared(lines);
    setIncrementBar((prev) => {
      const newIncrement = prev + lines;
      if (newIncrement % 2 === 0) { // Check if the value is 2, 4, 6, or 8
        updateIncrementName(newIncrement);
      }
      return newIncrement;
    });
  }, [addLinesCleared]);

  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared: memoizedAddLinesCleared,
    isAttacking
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.8;
      audioRef.current.loop = false;
    }
  }

  const attacks = [
    {
      name: "DDoS",
      attackDescription: "A DDoS attack floods a server with traffic, making it inaccessible.",
      gameDescription: "Spreads the blocks out and attempts to overwhelm the player."
    },
    {
      name: "Man-in-the-Middle",
      attackDescription: "Intercepts and alters changes the message meant between two parties.",
      gameDescription: "Intercepts the normal tetris blocks and replaces a difficult malware block."
    },
    {
      name: "Ransomware",
      attackDescription: "Encrypts files and demands a ransom for restoration and access.",
      gameDescription: "Encrypts the tetris board until the user types the correct code to unlock it."
    },
    {
      name: "Phishing",
      attackDescription: "Tricks users into revealing sensitive information by pretending to be trustworthy.",
      gameDescription: "Shows potentially malicious links, leading to great suffering to users when making a misdecision."
    },
    {
      name: "Download Malware",
      attackDescription: "Being the most common malware, it is a simple virus that often catches users off guard when downloading files.",
      gameDescription: "Downloads a virus that is unpleasant to deal with."
    }
  ];
  

  function handleAttack() {
    if (!isAttacking) { // Ensure attack only runs if not already attacking
      setIsAttacking(true);
      setTimeout(() => setIsAttacking(false), 1000); // Reset after 1 second
    }
    setIsAttacking(true);
    setCurrentAttack(attacks[0]); // Set DDoS attack details
    setTimeout(() => setIsAttacking(false), 1000);
  };

  async function handleBlackout() {
    setIsBlackedOut(true);
    const randomIndex = Math.floor(Math.random() * typingLists.length);
    setCurrentAttack(attacks[2]);
    setCurrentBlackoutCode(typingLists[randomIndex]); // Set a random code from typingLists
    setBlackoutInput(""); // Reset the input
    setInputError(false);
  };

  function handleNextX() {
    setNextTetrominoX();
    setCurrentAttack(attacks[1]); 
  };

  function handleNextY() {
    setNextTetrominoY();
    setCurrentAttack(attacks[4]); 
  };

  function toggleQuestionVisibility() {
    if (!isQuestionVisible) {
      setIsQuestionVisible(true);
      setCorrectAnswers(0);
      changeQuestion();
    }
    setCurrentAttack(attacks[3]);
  };

  function handleAction(action) {
    play();
    if (action >= 8) {
      handleAttack();
    }
    else if (action >= 6) {
      handleNextX();
    } 
    else if (action === 4) {
      handleBlackout();
    } 
    else if (action >= 2) {
      toggleQuestionVisibility();
    } else if (action === 1) {
      handleNextY();
    }
    updateIncrementName(0); // Reset styles when action is taken
  };

  const handleKeyPress = useCallback((event) => {
    if (event.key === '1' && incrementBar >= 1) {
      SendMessage(incrementBar);
      setIncrementBar(0);
      setIncrementName("NONE"); // Reset to Beginner
      document.documentElement.style.setProperty('--bar-color', 'grey'); // Reset to basic color
      document.documentElement.style.setProperty('--bar-glow', 'grey'); // Remove glow effect
    } else if (event.key === '2' && isQuestionVisible) {
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
    } else if (event.key === '3' && isQuestionVisible) {
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
  }, [incrementBar, isQuestionVisible, currentQuestionIndex, changeQuestion, isBlackedOut, currentBlackoutCode]);

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
            handleNextX(); // Call handleNextX when timer runs out
            setIsQuestionVisible(false); // Hide question
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isQuestionVisible]);

  
  const updateIncrementName = (value) => {
    let color = 'grey'; // Default color
    if (value === 0) {
      setIncrementName("NONE");
    } else if (value >= 8) {
      setIncrementName(incrementNames[3]);
      color = 'gold';
    } else if (value >= 6) {
      setIncrementName(incrementNames[2]);
      color = incrementColors[2];
    } else if (value >= 4) {
      setIncrementName(incrementNames[1]);
      color = incrementColors[1];
    } else if (value >= 2) {
      setIncrementName(incrementNames[0]);
      color = incrementColors[0];
    } else if (value >= 1) {
      setIncrementName("DOWNLOADS");
      color = 'grey';
    }
    let glow = color;

    if (glow = "#000000") {
      glow = "#FFFFFF"
    }
    document.documentElement.style.setProperty('--bar-color', color);
    document.documentElement.style.setProperty('--bar-glow', `0 0 30px ${glow}`);
  };

  const incrementBarValue = () => {
    setIncrementBar((prev) => {
      const newValue = prev + 1; // Increment by 1
      if (newValue % 2 === 0 || newValue === 1) { // Check if the value is 2, 4, 6, or 8 or 1
        updateIncrementName(newValue);
      }
      return newValue;
    });
  };

  const blackoutInputRef = useRef(null); // Ref for the input field

  useEffect(() => {
    if (isBlackedOut && blackoutInputRef.current) {
      blackoutInputRef.current.focus(); // Autofocus on the input when blackout starts
    }
  }, [isBlackedOut]);

  const handleBlackoutInputChange = (event) => {
    const value = event.target.value;
    setBlackoutInput(value);
    if (value === currentBlackoutCode) {
      setIsBlackedOut(false);
      setBlackoutInput(""); // Clear input after successful match
      setInputError(false);
    } else {
      setInputError(true); // Set error if input doesn't match
    }
  };

  const showPopupAndGlitch = () => {
    const glitch = document.getElementById('glitch');
      glitch.style.display = 'block';

      // Hide the glitch effect after the animation ends
      setTimeout(() => {
        glitch.style.display = 'none';
      }, 500);
  };

  function handleGameOver() {
    // Navigate to the GameOver screen
    setGameOver({ status: true, win: true });
  };

  return (
    <div className="Tetris">
      <audio ref={audioRef} src='/assets/tetris_sound.mp3' />
      <div>
        {isQuestionVisible && (
          <div className="cyber-question">
            <Questions currentQuestion={currentQuestion} />
            <div className="timer">Time Left: {timer}s</div>
            <p className="questions-left">Questions Left: {5 - correctAnswers}</p> {/* Display questions left */}
          </div>
        )}
     
        <h1 className="cyber-attack-title"> Cyber Attack: <br />{incrementName} </h1> {/* Display the current name */}
        <div className="increment-bar">
          <div className="bar" style={{ width: `${(incrementBar % 2 / 2) * 100}%` }}></div> {/* Adjusted width */}
        </div>
        <div className="increment-value">{incrementBar}</div> {/* Display the increment value separately */}
        <button onClick={incrementBarValue}>Increment Bar</button> {/* New button to increment the bar */}
        {currentAttack && (
          <AttackInfo
            attackName={currentAttack.name}
            attackDescription={currentAttack.attackDescription}
            gameDescription={currentAttack.gameDescription}
          />
        )}
      </div>
      <div className="board-container">
        <Board board={board} />
        <div className={`blackout-overlay ${isBlackedOut ? 'visible' : 'hidden'}`}>
          <p>Type the following code to remove blackout:</p>
          <p className="blackout-code">{currentBlackoutCode}</p> {/* Display the random code */}
          <input
            ref={blackoutInputRef}
            className={`blackout-input ${inputError ? 'error' : ''}`}
            value={blackoutInput}
            onChange={handleBlackoutInputChange}
          />
          {inputError && <div className="error-message">Not correct yet!</div>}
        </div>
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
      <div id="glitch" className="glitch"></div>
    </div>
  );
};

export default Tetris;
