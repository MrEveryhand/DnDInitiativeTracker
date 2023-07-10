import {
  Component,
  Dispatch,
  RefObject,
  SetStateAction,
  createRef,
} from "react";
import { Character, propsExceptions } from "../Configs/CharacterConfig";

interface Props {
  charactersArray: Character[];
  newChar: (
    refObject: refObject,
    arrayToMap: Character[],
    setFunc: Function,
    getTargetValue: Function
  ) => void;
  setFunc: Dispatch<SetStateAction<Character[]>>;
  targetFunc: (ref: RefObject<HTMLInputElement>) => string | undefined;
}

export interface refObject {
  [key: string]: any;
}

export function CharacterMenu({
  charactersArray,
  newChar,
  setFunc,
  targetFunc,
}: Props) {
  let charDummy = new Character();
  let characterPropsList = Object.getOwnPropertyNames(charDummy);
  let refObject: refObject = {};
  let currentProp: any;

  return (
    <div className="charGenMenu">
      {characterPropsList.map((e: string, k: number) => {
        currentProp = charDummy[e as keyof typeof charDummy] || {};
        if (
          currentProp.hasOwnProperty("type") &&
          !propsExceptions.hasOwnProperty(e)
        ) {
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
        onClick={() => newChar(refObject, charactersArray, setFunc, targetFunc)}
      >
        Create
      </button>
    </div>
  );
}

export default CharacterMenu;
