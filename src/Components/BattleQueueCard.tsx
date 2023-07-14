import { Dispatch } from "react";
import { Character } from "../Configs/CharacterConfig";
import { removeCharacter } from "../Lib/MainArraysFunctions";

interface Props {
  battleQueue: Character[];
  holdQueue: Character[];
  forceRender: () => void;
  setBattleFunc: Dispatch<React.SetStateAction<Character[]>>;
  setHoldFunc: Dispatch<React.SetStateAction<Character[]>>;
}

export function BattleCard({
  battleQueue,
  holdQueue,
  forceRender,
  setBattleFunc,
  setHoldFunc,
}: Props) {
  return (
    <div>
      {battleQueue.map((character: Character, key: number) => {
        return (
          <div
            key={key.toString() + "_b"}
            id={key.toString() + "_b"}
            className="charCard"
            style={{
              backgroundImage: `url(${character.Image.value})`,
            }}
            draggable="true"
            onDragStart={(e) => {
              character.onDragStart(e, character);
              forceRender();
            }}
            onDragLeave={() => {
              character.onDragLeave();
              forceRender();
            }}
            onDragEnd={() => {
              character.onDragEnd();
              forceRender();
            }}
          >
            <div style={{ color: !!character.isDragging ? "green" : "black" }}>
              <b>{character.Name.value}</b>
            </div>
            <br />
            {character.Initiative.value}
            <br />
            {character.State.value}
            <br />
            <button
              className="btn btn-primary"
              onClick={() => {
                setBattleFunc(
                  (battleQueue = removeCharacter(
                    character.battleId,
                    "battleId",
                    battleQueue
                  ))
                );
                setHoldFunc(
                  (holdQueue = removeCharacter(
                    character.battleId,
                    "battleId",
                    holdQueue
                  ))
                );
                forceRender();
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default BattleCard;
