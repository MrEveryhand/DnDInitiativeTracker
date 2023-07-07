import { Component, RefObject, createRef } from "react";
import { Character, characterParameter } from "../Configs/CharacterConfig";

interface Props {
  newChar: (refArray: refObject) => void;
}

export interface refObject {
  [key: string]: any;
}

export function CharacterMenu({ newChar }: Props) {
  let charDummy = new Character();
  let characterPropsList = Object.getOwnPropertyNames(charDummy);
  let refObject: refObject = {};
  let currentProp;

  return (
    <div className="charGenMenu">
      {characterPropsList.map((e: string, k: number) => {
        currentProp = charDummy[e as keyof typeof charDummy] || {};
        if (currentProp.hasOwnProperty("type")) {
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
      <button onClick={() => newChar(refObject)}>Create</button>
    </div>
  );
}

export default CharacterMenu;
