import { Dispatch, SetStateAction, createRef, memo } from "react";
import { Character } from "../../Configs/CharacterConfig";
import HoldCard from "../Cards/HoldCard";

interface Props {
  battleQueue: Character[];
  setFunc: Dispatch<SetStateAction<Character[]>>;
}

export interface refObject {
  [key: string]: any;
}

const HoldQueue = memo(({ battleQueue, setFunc }: Props) => {
  let refObject: refObject = {};
  return (
    <>
      {battleQueue.map((character: Character, key: number) => {
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
});

export default HoldQueue;
