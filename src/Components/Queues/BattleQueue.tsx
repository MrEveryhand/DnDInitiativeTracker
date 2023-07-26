import { Dispatch, SetStateAction, useState } from "react";
import { Character } from "../../Configs/CharacterConfig";
import { Queue } from "../../Configs/Queues";
import * as MainLib from "../../Lib/MainArraysFunctions";
import BattleCard from "../Cards/BattleCard";

interface Props {
  battleQueue: Queue;
  setFunc: Dispatch<SetStateAction<Queue>>;
}

export function BattleQueue({ battleQueue, setFunc }: Props) {
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
              <BattleCard
                key={currentChar.id}
                battleQueue={battleQueue}
                character={currentChar}
                setFunc={setFunc}
                offset={offset}
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

export default BattleQueue;
