import React, { useEffect, useState } from "react";
import Engine, { setPausedOrNot } from "./snake_game/engine.js";
import { setOnAppleCollect, setOnGameOver } from "./snake_game/engine.js";
import "./Snake.css";

const Snake = () => {
  const [gameScore, setGameScore] = useState(0);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [tip, setTip] = useState("");

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(key)) {
      setPressedKeys(prevKeys => new Set(prevKeys).add(key));
    }
    //console.log(e.key);
  };

  const togglePlay = () => {
    setIsPlaying(isPlaying => !isPlaying);
  }

  const handleKeyUp = (e) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(key)) {
      setPressedKeys(prevKeys => {
        const updatedKeys = new Set(prevKeys);
        updatedKeys.delete(key);
        return updatedKeys;
      });
    }
  };

  const snakeRef = React.useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  
  useEffect(() => {
    const tipsList = [
      "The snake will move in the direction of the last key pressed",
      "The snake cannot die!",
      "The snake will grow when it eats the apple",
      "You can press +/- to zoom in/out",
    ];
    // forgot to add this :p
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const updateDimensions = () => {
      // initial setting
      if (snakeRef.current) {
        setContainerDimensions({
          width: snakeRef.current.clientWidth,
          height: snakeRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', updateDimensions);

    updateDimensions();

    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * tipsList.length);
      setTip(tipsList[randomIndex]);
    };

    getRandomTip();

    // clean this shit
    return () => {
      window.removeEventListener('resize', updateDimensions);

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
    
  }, [])

  useEffect(() => {
    if (containerDimensions.width > 0 && containerDimensions.height > 0) {
      const cleanup = Engine(snakeRef.current, isPlaying, containerDimensions);
      setPausedOrNot(isPlaying);
      
      setOnAppleCollect(() => {
        setGameScore(gameScore + 1);
      }); // callback for when the uh thee for the apple is collected thy ist a collect

      setOnGameOver(() => {
        //alert('Game Over! Your score: ' + gameScore);
        console.error('Game Over! Your score: ' + gameScore)
      });
      
      //console.log(gameScore);
      return () => {
        if (cleanup) {
          cleanup();
        }
      };
    }
  }, [containerDimensions, gameScore, isPlaying]);
  return (
    <section id="snake">
      <div className="snake-text">
        <h2 className="snake-title">Snake Game - { gameScore }</h2>
      </div>
      <div className="snake-container">
        {/* imsert the game engine here */}
        <div className="game-controls">
          <div className="game-controllable">
            <button onClick={togglePlay}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
          <div className="game-controls-overlay">
            <div 
              className={`button ${pressedKeys.has('w') ? 'pressed' : ''}`} 
              id="w-key"
            >W</div>
            <div 
              className={`button ${pressedKeys.has('a') ? 'pressed' : ''}`} 
              id="a-key"
            >A</div>
            <div 
              className={`button ${pressedKeys.has('s') ? 'pressed' : ''}`} 
              id="s-key"
            >S</div>
            <div 
              className={`button ${pressedKeys.has('d') ? 'pressed' : ''}`} 
              id="d-key"
            >D</div>
          </div>
        </div>
        <div className="vertical-bar"></div>
        <div ref={snakeRef} className="snake-handler"/>
        
      </div>
      <div className="snake-tips">
        <p><b>Did you know?: </b><span>
            {tip}
          </span></p>
      </div>
    </section>
  );
}

export default Snake;