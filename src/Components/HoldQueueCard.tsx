import { Dispatch, Fragment, SetStateAction } from "react";
import { Character } from "../Configs/CharacterConfig";
import { changeArray } from "../Lib/MainArraysFunctions";

interface Props {
  holdQueue: Character[];
  forceRender: () => void;
  setFunc: Dispatch<SetStateAction<Character[]>>;
}

export function HoldCard({ holdQueue, forceRender, setFunc }: Props) {
  return (
    <div>
      {holdQueue.map((character: Character, key: number) => {
        return (
          <Fragment>
            <div
              key={key.toString() + "_h"}
              id={key.toString() + "_h"}
              className="charCard"
              style={{
                backgroundImage: `url(${character.Image.value})`,
              }}
              draggable="true"
              onDragStart={(e) => {
                character.onDragStart(e, character);
                forceRender();
              }}
              onDragOver={(e) => {
                if (
                  !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
                  !!JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
                ) {
                  character.onDragOver(e);
                  forceRender();
                }
              }}
              onDragLeave={() => {
                character.onDragLeave();
                forceRender();
              }}
              onDragEnd={() => {
                character.onDragEnd();
                forceRender();
              }}
              onDrop={(e) => {
                if (
                  !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
                  !!JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
                ) {
                  changeArray(
                    JSON.parse(e.dataTransfer.getData("object")),
                    key,
                    holdQueue,
                    setFunc
                  );
                }
              }}
            >
              <div
                style={{ color: !!character.isDragging ? "green" : "black" }}
              >
                <b>{character.Name.value}</b>
              </div>
              <br />
              {character.Hold.comment}
              <br />
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
