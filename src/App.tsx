import { RefObject, useRef, useState } from "react";
import "./App.css";
import { CharacterMenu, refObject } from "./Components/CharacterCreator";
import { Character } from "./Configs/CharacterConfig";
import CharacterCard from "./Components/CharacterCard";

function App() {
  let [characterArray, setCharacterArray] = useState<Character[]>([]);
  let dragCard = useRef(null);

  function getTargetValue(ref: RefObject<HTMLInputElement>) {
    let target = ref.current;
    return target?.value;
  }

  function newCharacter(refObject: refObject) {
    let newCharacter: Character = new Character();
    let currentProp;
    let maxId = -1;
    characterArray.map((e) => {
      console.log(e.id);
      if (maxId < e.id) maxId = e.id;
    });
    for (const e in newCharacter) {
      currentProp = newCharacter[e as keyof typeof newCharacter];
      if (e === "id") {
        newCharacter.id = maxId === -1 ? 0 : maxId + 1;
      } else if (currentProp.hasOwnProperty("type"))
        currentProp.value = getTargetValue(refObject[e]);
    }

    let newCharArray = [...characterArray, newCharacter];

    setCharacterArray((characterArray = newCharArray));
    console.log(characterArray);
  }

  return (
    <div className="App">
      <div className="menuAndDraft">
        <CharacterMenu newChar={newCharacter} />
        <CharacterCard characters={characterArray} cardsRef={dragCard} />
      </div>
      <div className="battleQueue"></div>
      <div className="holdQueue"></div>
    </div>
  );
}

export default App;
