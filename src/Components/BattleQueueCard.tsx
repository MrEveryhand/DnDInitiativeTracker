import { Dispatch, SetStateAction, useState } from "react";
import { Character } from "../Configs/CharacterConfig";
import { Queue } from "../Configs/Queues";
import * as MainLib from "../Lib/MainArraysFunctions";

interface Props {
  battleQueue: Queue;
  setFunc: Dispatch<SetStateAction<Queue>>;
}

export function BattleCard({ battleQueue, setFunc }: Props) {
  if (!!battleQueue.queue[battleQueue.pointer]) {
    battleQueue.queue[battleQueue.pointer].Hold.isHold = false;
    battleQueue.queue[battleQueue.pointer].Hold.comment = "";
  }

  let [round, setRound] = useState(1);

  return (
    <>
      <div className="cardQueue">
        {battleQueue.queue
          .sort((a: Character, b: Character) => {
            if (a.Initiative.value !== b.Initiative.value) {
              return b.Initiative.value - a.Initiative.value;
            } else {
              return b.Agility.value - a.Agility.value;
            }
          })
          .map((character: Character, key: number) => {
            let offset = key + battleQueue.pointer;
            offset =
              offset < battleQueue.queue.length
                ? offset
                : offset - battleQueue.queue.length;

            let currentChar = battleQueue.queue[offset];
            return currentChar.Initiative.value > -1 ? (
              <div
                key={key.toString() + "_b"}
                id={key.toString() + "_b"}
                className="charCard"
                style={{
                  backgroundImage: `url(${
                    !!currentChar.Image.value
                      ? URL.createObjectURL(currentChar.Image.value)
                      : ""
                  })`,
                }}
                draggable={battleQueue.pointer === offset ? "true" : "false"}
                onDragStart={(e) => {
                  currentChar.onDragStart(e, currentChar);
                  setFunc(() => MainLib.cloneClass(battleQueue));
                }}
                onDragLeave={() => {
                  currentChar.onDragLeave();
                  setFunc(() => MainLib.cloneClass(battleQueue));
                }}
                onDragEnd={() => {
                  currentChar.onDragEnd();
                  setFunc(() => MainLib.cloneClass(battleQueue));
                }}
              >
                <div
                  style={{
                    color: !!currentChar.isDragging ? "green" : "black",
                  }}
                >
                  <b>{currentChar.Name.value}</b>
                </div>
                <br />
                {currentChar.Initiative.value}
                <br />
                {currentChar.State.value}
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    battleQueue.queueRemove(currentChar.id);
                    setFunc(() => MainLib.cloneClass(battleQueue));
                  }}
                >
                  X
                </button>
              </div>
            ) : (
              <div className="divider">
                Round {round}
                <br /> Time {round * 6}
              </div>
            );
          })}
      </div>
      <>
        <button
          className="btn btn-primary"
          onClick={() => {
            battleQueue.modifyPointer(-1);
            if (battleQueue.pointer === battleQueue.queue.length - 1)
              setRound(() => round - 1);
            setFunc(() => MainLib.cloneClass(battleQueue));
          }}
        >
          Previous turn
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            battleQueue.modifyPointer(1);
            if (battleQueue.pointer === battleQueue.queue.length - 1)
              setRound(() => round + 1);
            setFunc(() => MainLib.cloneClass(battleQueue));
          }}
        >
          Next turn
        </button>
      </>
    </>
  );
}

export default BattleCard;
