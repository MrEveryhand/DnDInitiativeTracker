import { RefObject, useState } from "react";
import "./App.css";
import { CharacterMenu, refObject } from "./Components/CharacterCreator";
import { Character } from "./Configs/CharacterConfig";

function App() {
  let [characterArray, setCharacterArray] = useState<Character[]>([]);

  function getTargetValue(ref: RefObject<HTMLInputElement>) {
    let target = ref.current;
    return target?.value;
  }

  function newCharacter(refObject: refObject) {
    let newCharacter: Character = new Character();
    let currentProp;
    for (const e in newCharacter) {
      currentProp = newCharacter[e as keyof typeof newCharacter];
      if (currentProp.hasOwnProperty("type"))
        currentProp.value = getTargetValue(refObject[e]);
    }

    let newCharArray = [...characterArray, newCharacter];

    setCharacterArray((characterArray = newCharArray));
  }

  return (
    <div className="App">
      <CharacterMenu newChar={newCharacter} />
    </div>
  );
}

export default App;
