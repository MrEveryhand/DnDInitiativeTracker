import { Fragment, RefObject, useRef, useState } from "react";
import "./App.css";
import { CharacterMenu, refObject } from "./Components/CharacterCreator";
import { Character, propsExceptions } from "./Configs/CharacterConfig";
import CharacterCard from "./Components/CharacterCard";
import BattleCard from "./Components/BattleQueueCard";
import HoldCard from "./Components/HoldQueueCard";
import {
  newCharacter,
  copyCharacter,
  searchCharacter,
  battleQueueOnDrop,
  holdQueueOnDrop,
  getTargetValue,
} from "./Lib/MainArraysFunctions";

function App() {
  let [characterArray, setCharacterArray] = useState<Character[]>([]);
  let [battleQueueArray, setBattleQueue] = useState<Character[]>([]);
  let [holdQueueArray, setHoldQueue] = useState<Character[]>([]);
  const [value, setValue] = useState(0);

  function useForceUpdate() {
    setValue((value) => value + 1);
  }

  return (
    <div className="App">
      <div className="menuAndDraft">
        <CharacterMenu
          charactersArray={characterArray}
          newChar={newCharacter}
          setFunc={setCharacterArray}
          targetFunc={getTargetValue}
        />
        <CharacterCard
          characters={characterArray}
          forceRender={useForceUpdate}
          setFunc={setCharacterArray}
        />
      </div>
      <div
        className="battleQueue"
        onDragOver={(e) => {
          if (
            !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
            !JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
          ) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        onDrop={(e) =>
          battleQueueOnDrop(e, characterArray, battleQueueArray, setBattleQueue)
        }
      >
        {
          <BattleCard
            battleQueue={battleQueueArray}
            forceRender={useForceUpdate}
          />
        }
      </div>
      <div
        className="holdQueue"
        onDragOver={(e) => {
          if (
            !!JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
            !JSON.parse(e.dataTransfer.getData("object")).inHoldQueue &&
            !searchCharacter(
              holdQueueArray,
              "battleId",
              JSON.parse(e.dataTransfer.getData("object")).id
            )
          ) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        onDrop={(e) =>
          holdQueueOnDrop(
            e,
            characterArray,
            battleQueueArray,
            holdQueueArray,
            setBattleQueue
          )
        }
      >
        {
          <HoldCard
            holdQueue={holdQueueArray}
            forceRender={useForceUpdate}
            setFunc={setHoldQueue}
          />
        }
      </div>
    </div>
  );
}

export default App;
