import "./App.css";
import { useState } from "react";
import * as MainLib from "./Lib/MainArraysFunctions";
import { Character } from "./Configs/CharacterConfig";
import CharacterMenu from "./Components/CharacterCreator";
import CharacterCard from "./Components/Queues/DraftQueue";
import BattleQueue from "./Components/Queues/BattleQueue";
import HoldQueue from "./Components/Queues/HoldQueue";
import { qFunc } from "./Lib/QueuesFunctions";

function App() {
  let turnDivider: Character = new Character();
  turnDivider.id = 0;

  let [characterQueue, setCharacterQueue] = useState<Character[]>([]);
  let [battleQueue, setBattleQueue] = useState<Character[]>([turnDivider]);
  let [pointer, setPointer] = useState<number>(0);

  return (
    <div className="App">
      <div className="menuAndDraft">
        <CharacterMenu setFunc={setCharacterQueue} queueFunc={qFunc} />
        <CharacterCard
          characterQueue={characterQueue}
          setFunc={setCharacterQueue}
          queueFunc={qFunc}
        />
      </div>
      <div
        className="battleQueue"
        onDragOver={(e) => {
          qFunc.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue
          );
        }}
        onDrop={(e) => {
          qFunc.battleQueueuDrop(
            e,
            characterQueue,
            battleQueue,
            setBattleQueue,
            setPointer,
            pointer
          );
        }}
      >
        {
          <BattleQueue
            battleQueue={battleQueue}
            setFunc={setBattleQueue}
            pointer={pointer}
            setPointerFunc={setPointer}
            queueFunc={qFunc}
          />
        }
      </div>
      <div
        className="holdQueue"
        onDragOver={(e) => {
          qFunc.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).Hold.isHold
          );
        }}
        onDrop={(e) =>
          qFunc.holdQueueDrop(
            e,
            battleQueue,
            setBattleQueue,
            setPointer,
            pointer
          )
        }
      >
        {<HoldQueue battleQueue={battleQueue} setFunc={setBattleQueue} />}
      </div>
    </div>
  );
}

export default App;
