import { Dispatch, SetStateAction, createRef } from "react";
import { Character } from "../../Configs/CharacterConfig";
import { Queue } from "../../Configs/Queues";
import axios from "axios";
import Card from "../Cards/DraftCard";

interface Props {
  characterQueue: Queue;
  setFunc: Dispatch<SetStateAction<Queue>>;
}

export interface refObject {
  [key: string]: any;
}

export function CharacterCard({ characterQueue, setFunc }: Props) {
  let refObject: refObject = {};

  return (
    <div key="charDraftArea" className="charDraftArea">
      {characterQueue.queue.map((character: Character, key: number) => {
        refObject[character.id] = createRef();
        return (
          <Card
            key={character.id}
            characterQueue={characterQueue}
            character={character}
            setFunc={setFunc}
            _key={key}
            refObject={refObject}
          />
        );
      })}
    </div>
  );
}

export default CharacterCard;
