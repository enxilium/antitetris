"use client"
import "./styles.css";
import { useRef } from "react";

import Game from "/src/components/Game";

export default function App() {

  const audioRef = useRef();

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
      audioRef.current.volume = 0.3
    }
  }
  return (
    <div className="App" onClick={play}>
      <audio ref={audioRef} src='/assets/tetris_99.mp3' />
      <Game rows={20} columns={10} />
    </div>
  );
}
