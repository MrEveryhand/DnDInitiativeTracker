import { useState } from "react";
import "./App.css";
import CharacterMenu from "./Components/CharacterCreator";
import CharacterCard from "./Components/CharacterCard";
import BattleCard from "./Components/BattleQueueCard";
import HoldCard from "./Components/HoldQueueCard";
import * as MainLib from "./Lib/MainArraysFunctions";
import { Queue } from "./Configs/Queues";
import { Character } from "./Configs/CharacterConfig";

function App() {
  let turnDivider: Character = new Character();

  let [characterQueue, setCharacterQueue] = useState<Queue>(new Queue());
  let [battleQueue, setBattleQueue] = useState<Queue>(new Queue([turnDivider]));
  const [round, setRound] = useState(0);
  const [value, setValue] = useState(0);

  function useForceUpdate() {
    setValue((value) => value + 1);
  }

  return (
    <div className="App">
      <div className="menuAndDraft">
        <CharacterMenu
          characterQueue={characterQueue}
          forceRender={useForceUpdate}
        />
        <CharacterCard
          characterQueue={characterQueue}
          forceRender={useForceUpdate}
        />
      </div>
      <div
        className="battleQueue"
        onDragOver={(e) => {
          MainLib.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue
          );
        }}
        onDrop={(e) => {
          let charBuffer: any = characterQueue.searchCharacter(
            JSON.parse(e.dataTransfer.getData("object")).id
          );
          charBuffer.inBattleQueue = true;

          !!charBuffer && charBuffer.Initiative.value > -1
            ? battleQueue.queueAdd(MainLib.copyCharacter(charBuffer))
            : null;

          if (
            charBuffer.Initiative.value >
            battleQueue.queue[battleQueue.pointer].Initiative.value
          )
            battleQueue.modifyPointer(1);

          charBuffer.inBattleQueue = false;
        }}
      >
        {<BattleCard battleQueue={battleQueue} forceRender={useForceUpdate} />}
      </div>
      <div
        className="holdQueue"
        onDragOver={(e) => {
          MainLib.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).Hold.isHold
          );
        }}
        onDrop={(e) => {
          let charBuffer: any = battleQueue.searchCharacter(
            JSON.parse(e.dataTransfer.getData("object")).id
          );
          charBuffer.Hold.isHold = true;
          battleQueue.modifyPointer(1);
          useForceUpdate();
        }}
      >
        {<HoldCard battleQueue={battleQueue} forceRender={useForceUpdate} />}
      </div>
    </div>
  );
}

export default App;
