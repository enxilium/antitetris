import "./Menu.css";

const Menu = ({ onClick }) => (
  <div className="Menu">
    <div className="Header">
      <h1>Cyber Tetris</h1>
      <p>Defend your system by clearing lines of code!</p>
    </div>
    <button className="Button" onClick={onClick}>
      Play Tetris
    </button>
    <div className="Footer">
      <p>© 2023 Cyber Tetris. All rights reserved.</p>
    </div>
  </div>
);

export default Menu;