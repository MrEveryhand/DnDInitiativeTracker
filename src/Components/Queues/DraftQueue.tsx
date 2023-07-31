import { Dispatch, SetStateAction, memo } from "react";
import { Character } from "../../Configs/CharacterConfig";
import Card from "../Cards/DraftCard";
import { queueFunctions } from "../../Lib/QueuesFunctions";

interface Props {
  characterQueue: Character[];
  setFunc: Dispatch<SetStateAction<Character[]>>;
  queueFunc: queueFunctions;
}

export interface refObject {
  [key: string]: any;
}

const CharacterCard = memo(({ characterQueue, setFunc, queueFunc }: Props) => {
  return (
    <div key="charDraftArea" className="charDraftArea">
      {characterQueue.map((character: Character, key: number) => {
        return (
          <Card
            key={character.id}
            character={character}
            setFunc={setFunc}
            queueFunc={queueFunc}
            _key={key}
          />
        );
      })}
    </div>
  );
});

export default CharacterCard;
