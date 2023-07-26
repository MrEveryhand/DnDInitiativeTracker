import { Dispatch, Fragment, SetStateAction, createRef } from "react";
import { Character } from "../Configs/CharacterConfig";
import { Queue } from "../Configs/Queues";
import * as MainLib from "../Lib/MainArraysFunctions";

interface Props {
  battleQueue: Queue;
  setFunc: Dispatch<SetStateAction<Queue>>;
}

export interface refObject {
  [key: string]: any;
}

export function HoldCard({ battleQueue, setFunc }: Props) {
  let refObject: refObject = {};
  return (
    <>
      {battleQueue.queue.map((character: Character, key: number) => {
        refObject[character.id] = createRef();
        if (!!character.Hold.isHold)
          return (
            <>
              <div
                key={key.toString() + "_h"}
                id={key.toString() + "_h"}
                className="charCard"
                style={{
                  backgroundImage: `url(${
                    !!character.Image.value
                      ? URL.createObjectURL(character.Image.value)
                      : ""
                  })`,
                }}
                //------------------MAYBE LATER----------------------
                // draggable="true"
                // onDragStart={(e) => {
                //   character.onDragStart(e, character);
                //   forceRender();
                // }}
                // onDragOver={(e) => {
                //   if (
                //     !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
                //     !!JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
                //   ) {
                //     character.onDragOver(e);
                //     forceRender();
                //   }
                // }}
                // onDragLeave={() => {
                //   character.onDragLeave();
                //   forceRender();
                // }}
                // onDragEnd={() => {
                //   character.onDragEnd();
                //   forceRender();
                // }}
                // onDrop={(e) => {
                //   if (
                //     !!JSON.parse(e.dataTransfer.getData("object"))
                //       .inBattleQueue &&
                //     !JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
                //   ) {
                //     changeArray(
                //       JSON.parse(e.dataTransfer.getData("object")).id,
                //       "holdId",
                //       key,
                //       holdQueue
                //     );
                //   }
                // }}
                //-------------------------------------------------------------
              >
                <div
                  style={{ color: !!character.isDragging ? "green" : "black" }}
                >
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
      })}
    </>
  );
}

export default HoldCard;
