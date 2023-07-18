import { Dispatch, RefObject, SetStateAction, createRef } from "react";
import { Character } from "../Configs/CharacterConfig";
import { Queue } from "../Configs/Queues";
import * as MainLib from "../Lib/MainArraysFunctions";

interface Props {
  characterQueue: Queue;
  forceRender: Dispatch<SetStateAction<number>>;
}

export interface refObject {
  [key: string]: any;
}

export function CharacterMenu({ characterQueue, forceRender }: Props) {
  let charDummy = new Character();
  let characterPropsList = Object.getOwnPropertyNames(charDummy);
  let refObject: refObject = {};
  let currentProp: any;

  return (
    <div className="charGenMenu">
      {characterPropsList.map((e: string, k: number) => {
        currentProp = charDummy[e as keyof typeof charDummy] || {};
        if (currentProp.hasOwnProperty("type") && e !== "Initiative") {
          currentProp = charDummy[e as keyof typeof charDummy];
          refObject[e] = createRef();
          return (
            <div key={k} className="charGenProp">
              {currentProp.label} :
              <input ref={refObject[e]} type={currentProp.type} />
            </div>
          );
        }
      })}
      <button
        onClick={() => {
          characterQueue.queueAdd(
            MainLib.newCharacter(refObject, MainLib.getTargetValue)
          );
          characterQueue.queueRefresh();
          forceRender(1);
        }}
      >
        Create
      </button>
    </div>
  );
}

export default CharacterMenu;
