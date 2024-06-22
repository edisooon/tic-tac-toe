import { useState } from "react";

export default function Player({ name, symbol, isActive, onNameSaved }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick(){
    setIsEditing((isEditing)=>!isEditing);
    if(isEditing) {
      onNameSaved(playerName, symbol);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing && <input type="text" required value={playerName} onChange = {handleChange} />}
        {!isEditing && <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
