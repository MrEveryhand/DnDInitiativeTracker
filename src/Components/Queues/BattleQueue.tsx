import { Dispatch, SetStateAction, memo, useState } from "react";
import { Character } from "../../Configs/CharacterConfig";
import * as QueueFunc from "../../Lib/QueuesFunctions";
import BattleCard from "../Cards/BattleCard";

interface Props {
  battleQueue: Character[];
  setFunc: Dispatch<SetStateAction<Character[]>>;
  pointer: number;
  setPointerFunc: Dispatch<SetStateAction<number>>;
  queueFunc: QueueFunc.queueFunctions;
}

const BattleQueue = memo(
  ({ battleQueue, setFunc, pointer, setPointerFunc, queueFunc }: Props) => {
    if (!!battleQueue[pointer]) {
      battleQueue[pointer].Hold.isHold = false;
    }

    let [round, setRound] = useState(1);

    return (
      <>
        <div className="cardQueue">
          {battleQueue
            .sort((a: Character, b: Character) => {
              if (a.Initiative.value !== b.Initiative.value) {
                return b.Initiative.value - a.Initiative.value;
              } else {
                return b.Agility.value - a.Agility.value;
              }
            })
            .map((character: Character, key: number) => {
              let offset = key + pointer;
              offset =
                offset < battleQueue.length
                  ? offset
                  : offset - battleQueue.length;

              let currentChar = battleQueue[offset];
              let draggable = false;
              if (pointer === offset) draggable = true;

              // if (offset === 0) {
              //   queueFunc.changeQueueValue(
              //     setFunc,
              //     currentChar.id,
              //     "Hold",
              //     false
              //   );
              // }

              return currentChar.Initiative.value > -1 ? (
                <BattleCard
                  key={currentChar.id}
                  battleQueue={battleQueue}
                  character={currentChar}
                  setFunc={setFunc}
                  draggable={draggable}
                  queueFunc={queueFunc}
                />
              ) : (
                <div className="divider" key={currentChar.id}>
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
              pointer = queueFunc.modifyPointer(battleQueue, pointer, -1);
              if (pointer === battleQueue.length - 1) setRound(() => round - 1);
              setPointerFunc(() => pointer);
            }}
          >
            Previous turn
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              pointer = queueFunc.modifyPointer(battleQueue, pointer, 1);
              if (pointer === battleQueue.length - 1) setRound(() => round + 1);
              setPointerFunc(() => pointer);
            }}
          >
            Next turn
          </button>
        </>
      </>
    );
  }
);

export default BattleQueue;
