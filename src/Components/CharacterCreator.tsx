import { Dispatch, SetStateAction, createRef, memo } from "react";
import { Character } from "../Configs/CharacterConfig";
import * as MainLib from "../Lib/MainArraysFunctions";
import { queueFunctions } from "../Lib/QueuesFunctions";

interface Props {
  setFunc: Dispatch<SetStateAction<Character[]>>;
  queueFunc: queueFunctions;
}

export interface refObject {
  [key: string]: any;
}

const CharacterMenu = memo(({ setFunc, queueFunc }: Props) => {
  let charDummy = new Character();
  let characterPropsList = Object.getOwnPropertyNames(charDummy);
  let refObject: refObject = {};
  let currentProp: any;

  return (
    <div className="charGenMenu">
      {characterPropsList.map((e: string, k: number) => {
        currentProp = charDummy[e as keyof typeof charDummy] || {};
        console.log(e, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
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
          queueFunc.queueAdd(
            setFunc,
            MainLib.newCharacter(refObject, MainLib.getTargetValue)
          );
        }}
      >
        Create
      </button>
    </div>
  );
});

export default CharacterMenu;
