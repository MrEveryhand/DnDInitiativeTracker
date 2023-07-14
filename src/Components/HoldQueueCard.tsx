import { Dispatch, Fragment, SetStateAction, createRef } from "react";
import { Character } from "../Configs/CharacterConfig";
import { changeArray, removeCharacter } from "../Lib/MainArraysFunctions";

interface Props {
  holdQueue: Character[];
  forceRender: () => void;
  setFunc: Dispatch<React.SetStateAction<Character[]>>;
}

export interface refObject {
  [key: string]: any;
}

export function HoldCard({ holdQueue, forceRender, setFunc }: Props) {
  let refObject: refObject = {};
  return (
    <div>
      {holdQueue.map((character: Character, key: number) => {
        refObject[character.battleId] = createRef();
        return (
          <Fragment>
            <div
              key={key.toString() + "_h"}
              id={key.toString() + "_h"}
              className="charCard"
              style={{
                backgroundImage: `url(${character.Image.value})`,
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
                ref={refObject[character.battleId]}
                onChange={(e) => {
                  character.Hold.comment = e.target.value;
                  forceRender();
                }}
                defaultValue={character.Hold.comment}
              />
              <br />
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFunc(
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
            {!!character.cardIsOver ? (
              <div className="dropDivider"></div> //Make it another component and later make animation with neighbour cards move apart
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

export default HoldCard;
