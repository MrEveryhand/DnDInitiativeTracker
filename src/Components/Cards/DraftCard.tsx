import { Dispatch, SetStateAction, memo } from "react";
import { Character } from "../../Configs/CharacterConfig";
import * as CharFunc from "../../Lib/CharacterConfigFunctions";
import * as QueueFunc from "../../Lib/QueuesFunctions";

interface Props {
  character: Character;
  setFunc: Dispatch<SetStateAction<Character[]>>;
  queueFunc: QueueFunc.queueFunctions;
  _key: number;
}

const Card = memo(({ character, setFunc, queueFunc, _key }: Props) => {
  return (
    <>
      <div
        id={character.id.toString()}
        className="charCard"
        style={{
          backgroundImage: `url(${
            !!character.Image.value
              ? URL.createObjectURL(character.Image.value)
              : ""
          })`,
        }}
        draggable="true"
        onDragStart={(e) => {
          CharFunc.onDragStart(e, character);
        }}
        onDragOver={(e) => {
          queueFunc.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
              !JSON.parse(e.dataTransfer.getData("object")).cardIsOver
          );
          {
            queueFunc.changeQueueValue(
              setFunc,
              character.id,
              "cardIsOver",
              true
            );
          }
        }}
        onDragLeave={() => {
          queueFunc.changeQueueValue(
            setFunc,
            character.id,
            "cardIsOver",
            false
          );
        }}
        onDragEnd={() => {
          queueFunc.changeQueueValue(
            setFunc,
            character.id,
            "isDragging",
            false
          );
        }}
        onDrop={(e) => {
          CharFunc.onDrop(
            queueFunc.queueChange(
              setFunc,
              JSON.parse(e.dataTransfer.getData("object")).id,
              _key
            )
          );
        }}
      >
        <div key={character.id.toString() + "name"}>
          <b>{character.Name.value}</b>
        </div>
        <input
          className="initInput"
          type="number"
          onChange={(e) => {
            queueFunc.changeQueueValue(
              setFunc,
              character.id,
              "Initiative",
              e.target.value
            );
          }}
        />
        <br />
        {character.Agility.value > 0
          ? "Aglilty:" + character.Agility.value
          : null}
        <br />
        {character.CurrentHP.value > 0
          ? "CurrentHP: " + character.CurrentHP.value
          : null}
        <br />
        {character.MaxHP.value > 0 ? "MaxHP: " + character.MaxHP.value : null}
        <br />
        {character.State.value.length > 0
          ? "State: " + character.State.value
          : null}
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
      {!!character.cardIsOver ? (
        <div className="dropDivider"></div> //Later make animation with neighbour cards move apart
      ) : null}
    </>
  );
});

export default Card;
