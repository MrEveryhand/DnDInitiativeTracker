import { Dispatch, SetStateAction, createRef } from "react";
import { Character } from "../../Configs/CharacterConfig";
import { Queue } from "../../Configs/Queues";
import * as MainLib from "../../Lib/MainArraysFunctions";
import HoldCard from "../Cards/HoldCard";

interface Props {
  battleQueue: Queue;
  setFunc: Dispatch<SetStateAction<Queue>>;
}

export interface refObject {
  [key: string]: any;
}

export function HoldQueue({ battleQueue, setFunc }: Props) {
  let refObject: refObject = {};
  return (
    <>
      {battleQueue.queue.map((character: Character, key: number) => {
        refObject[character.id] = createRef();
        if (!!character.Hold.isHold)
          return (
            <HoldCard
              key={character.id}
              battleQueue={battleQueue}
              character={character}
              setFunc={setFunc}
              refObject={refObject}
            />
          );
      })}
    </>
  );
}

export default HoldQueue;
