import { Dispatch, SetStateAction, createRef } from "react";
import { Queue } from "../../Configs/Queues";
import { Character } from "../../Configs/CharacterConfig";
import * as MainLib from "../../Lib/MainArraysFunctions";
import { refObject } from "../DraftQueue";

interface Props {
  characterQueue: Queue;
  character: Character;
  setFunc: Dispatch<SetStateAction<Queue>>;
  _key: number;
  refObject: refObject;
}

export function Card({
  characterQueue,
  character,
  setFunc,
  _key,
  refObject,
}: Props) {
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
          character.onDragStart(e, character);
          MainLib.cloneClass(characterQueue);
        }}
        onDragOver={(e) => {
          MainLib.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue
          );
          {
            character.onDragOver(e);
            setFunc(() => MainLib.cloneClass(characterQueue));
          }
        }}
        onDragLeave={() => {
          character.onDragLeave();
          MainLib.cloneClass(characterQueue);
        }}
        onDragEnd={() => {
          character.onDragEnd();
          MainLib.cloneClass(characterQueue);
        }}
        onDrop={(e) => {
          character.onDrop(
            characterQueue.queueChange(
              JSON.parse(e.dataTransfer.getData("object")).id,
              _key
            )
          );
          MainLib.cloneClass(characterQueue);
        }}
      >
        <div key={character.id.toString() + "name"}>
          <b>{character.Name.value}</b>
        </div>
        <input
          className="initInput"
          ref={refObject[character.id]}
          type="number"
          onChange={(e) => {
            character.Initiative.value = parseInt(e.target.value);
            setFunc(() => MainLib.cloneClass(characterQueue));
          }}
        />
        <br />
        {character.Agility.value}
        <br />
        {character.CurrentHP.value > 0 ? character.CurrentHP.value : null}
        <br />
        {character.MaxHP.value > 0 ? character.MaxHP.value : null}
        <br />
        {character.State.value.length > 0 ? character.State.value : null}
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            characterQueue.queueRemove(character.id);
            setFunc(() => MainLib.cloneClass(characterQueue));
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
}

export default Card;
