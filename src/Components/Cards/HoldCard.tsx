import { Dispatch, SetStateAction, createRef } from "react";
import { Queue } from "../../Configs/Queues";
import { Character } from "../../Configs/CharacterConfig";
import * as MainLib from "../../Lib/MainArraysFunctions";
import { refObject } from "../DraftQueue";

interface Props {
  battleQueue: Queue;
  character: Character;
  setFunc: Dispatch<SetStateAction<Queue>>;
  refObject: refObject;
}

export function HoldCard({
  battleQueue,
  character,
  setFunc,
  refObject,
}: Props) {
  return (
    <>
      <div
        key={character.id.toString() + "_h"}
        id={character.id.toString() + "_h"}
        className="charCard"
        style={{
          backgroundImage: `url(${
            !!character.Image.value
              ? URL.createObjectURL(character.Image.value)
              : ""
          })`,
        }}
      >
        <div>
          <b>{character.Name.value}</b>
        </div>
        <br />
        <textarea
          className="holdCommentInput"
          ref={refObject[character.id]}
          onChange={(e) => {
            character.Hold.comment = e.target.value;
            setFunc(() => MainLib.cloneClass(battleQueue));
          }}
          defaultValue={character.Hold.comment}
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            character.Hold.isHold = false;
            character.Hold.comment = "";
            setFunc(() => MainLib.cloneClass(battleQueue));
          }}
        >
          X
        </button>
      </div>
      {!!character.cardIsOver ? (
        <div className="dropDivider"></div> //Make it another component and later make animation with neighbour cards move apart
      ) : null}
    </>
  );
}

export default HoldCard;
