import { useState } from "react";
import "./App.css";
import { CharacterMenu } from "./Components/CharacterCreator";
import { Character } from "./Configs/CharacterConfig";
import CharacterCard from "./Components/CharacterCard";
import BattleCard from "./Components/BattleQueueCard";
import HoldCard from "./Components/HoldQueueCard";
import * as MainLib from "./Lib/MainArraysFunctions";

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
          newChar={MainLib.newCharacter}
          setFunc={setCharacterArray}
          targetFunc={MainLib.getTargetValue}
        />
        <CharacterCard
          characters={characterArray}
          forceRender={useForceUpdate}
        />
      </div>
      <div
        className="battleQueue"
        onDragOver={(e) => MainLib.battleQueueOnOver(e)}
        onDrop={(e) =>
          MainLib.battleQueueOnDrop(e, characterArray, battleQueueArray)
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
        onDragOver={(e) => MainLib.holdQueueOnOver(e, holdQueueArray)}
        onDrop={(e) =>
          MainLib.holdQueueOnDrop(
            e,
            characterArray,
            battleQueueArray,
            holdQueueArray
          )
        }
      >
        {<HoldCard holdQueue={holdQueueArray} forceRender={useForceUpdate} />}
      </div>
    </div>
  );
}

export default App;
