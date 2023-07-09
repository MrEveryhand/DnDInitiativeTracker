import { RefObject, useRef, useState } from "react";
import "./App.css";
import { CharacterMenu, refObject } from "./Components/CharacterCreator";
import { Character, characterParameter } from "./Configs/CharacterConfig";
import CharacterCard from "./Components/CharacterCard";

function App() {
  let [characterArray, setCharacterArray] = useState<Character[]>([]);
  let [overlay, setOverlay] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  function getTargetValue(ref: RefObject<HTMLInputElement>) {
    let target = ref.current;
    return target?.value;
  }

  function useForceUpdate() {
    setValue((value) => value + 1);
  }

  function newCharacter(refObject: refObject) {
    let newCharacter: Character = new Character();
    let currentProp: any;
    let maxId = -1;
    characterArray.map((e, i) => {
      if (maxId < e.id) maxId = e.id;
    });
    for (const e in newCharacter) {
      currentProp = newCharacter[e as keyof typeof newCharacter];
      if (typeof currentProp !== "object") {
        if (e === "id") {
          newCharacter.id = maxId === -1 ? 0 : maxId + 1;
        } else if (e === "arrayPosition") {
          newCharacter.arrayPosition = characterArray.length;
        }
      } else {
        if (currentProp.hasOwnProperty("type"))
          currentProp.value = getTargetValue(refObject[e]);
      }
    }

    let newCharArray = [...characterArray, newCharacter];
    setCharacterArray((characterArray = newCharArray));
  }

  function changeCharArray(e: number, i: number) {
    let charBuffer = characterArray[e];

    characterArray.splice(e < i ? i + 1 : i, 0, charBuffer);
    characterArray.splice(e > i ? e + 1 : e, 1);

    characterArray.map((e, i) => {
      e.arrayPosition = i;
      e.isDragging = false;
      e.cardIsOver = false;
    });

    let newCharArray = [...characterArray];

    setCharacterArray((characterArray = newCharArray));
  }

  return (
    <div className="App">
      <div className="menuAndDraft">
        <CharacterMenu newChar={newCharacter} />
        <CharacterCard
          characters={characterArray}
          forceRender={useForceUpdate}
          changeCharArray={changeCharArray}
        />
      </div>
      <div className="battleQueue"></div>
      <div className="holdQueue"></div>
    </div>
  );
}

export default App;
