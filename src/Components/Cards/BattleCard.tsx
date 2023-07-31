import { Dispatch, SetStateAction, memo } from "react";
import { Character } from "../../Configs/CharacterConfig";
import * as CharFunc from "../../Lib/CharacterConfigFunctions";
import * as QueueFunc from "../../Lib/QueuesFunctions";

interface Props {
  battleQueue: Character[];
  character: Character;
  setFunc: Dispatch<SetStateAction<Character[]>>;
  draggable: boolean;
  queueFunc: QueueFunc.queueFunctions;
}

const BattleCard = memo(
  ({ battleQueue, character, setFunc, draggable, queueFunc }: Props) => {
    return (
      <div
        id={character.id.toString() + "_b"}
        className="charCard"
        style={{
          backgroundImage: `url(${
            !!character.Image.value
              ? URL.createObjectURL(character.Image.value)
              : ""
          })`,
        }}
        draggable={!!draggable ? "true" : "false"}
        onDragStart={(e) => {
          CharFunc.onDragStart(e, character);
        }}
        onDragEnd={() => {
          CharFunc.onDragEnd(character);
          setFunc([...battleQueue]);
        }}
      >
        <div>
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
            queueFunc.queueRemove(setFunc, character.id);
          }}
        >
          X
        </button>
      </div>
    );
  }
);

export default BattleCard;
