import { Dispatch, SetStateAction, createRef } from "react";
import { Queue } from "../../Configs/Queues";
import { Character } from "../../Configs/CharacterConfig";
import * as MainLib from "../../Lib/MainArraysFunctions";
import { refObject } from "../DraftQueue";

interface Props {
  battleQueue: Queue;
  character: Character;
  setFunc: Dispatch<SetStateAction<Queue>>;
  offset: number;
}

export function BattleCard({ battleQueue, character, setFunc, offset }: Props) {
  return (
    <>
      <div
        key={character.id}
        id={character.id.toString() + "_b"}
        className="charCard"
        style={{
          backgroundImage: `url(${
            !!character.Image.value
              ? URL.createObjectURL(character.Image.value)
              : ""
          })`,
        }}
        draggable={battleQueue.pointer === offset ? "true" : "false"}
        onDragStart={(e) => {
          character.onDragStart(e, character);
          setFunc(() => MainLib.cloneClass(battleQueue));
        }}
        onDragLeave={() => {
          character.onDragLeave();
          setFunc(() => MainLib.cloneClass(battleQueue));
        }}
        onDragEnd={() => {
          character.onDragEnd();
          setFunc(() => MainLib.cloneClass(battleQueue));
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
            battleQueue.queueRemove(character.id);
            setFunc(() => MainLib.cloneClass(battleQueue));
          }}
        >
          X
        </button>
      </div>
    </>
  );
}

export default BattleCard;
