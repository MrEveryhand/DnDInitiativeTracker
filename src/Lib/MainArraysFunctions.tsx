import { Character } from "../Configs/CharacterConfig";
import { refObject } from "../Components/CharacterCreator";
import { RefObject } from "react";

export function getTargetValue(ref: RefObject<HTMLInputElement>) {
  if (!ref) return;
  let target = ref.current;
  return target?.value;
}

export function newCharacter(refObject: refObject, getTargetValue: Function) {
  let newCharacter: Character = new Character();
  let currentProp: any;

  for (const e in newCharacter) {
    currentProp = newCharacter[e as keyof typeof newCharacter];
    if (typeof currentProp === "object") {
      if (e === "Image") currentProp.value = refObject[e].current.files[0];
      else if (!!getTargetValue(refObject[e]))
        currentProp.value = getTargetValue(refObject[e]);
    }
  }

  return newCharacter;
}

export function copyCharacter(originalCharacter: Character) {
  let newCharacter: Character = new Character();
  let currentProp: any;

  let currentOriginalProp: any;

  for (const e in newCharacter) {
    currentProp = newCharacter[e as keyof typeof newCharacter];
    currentOriginalProp =
      originalCharacter[e as keyof typeof originalCharacter];
    if (typeof currentProp !== "object") {
      if (e === "inBattleQueue") {
        newCharacter.inBattleQueue = originalCharacter.inBattleQueue;
      }
    } else {
      if (currentProp.hasOwnProperty("type"))
        currentProp.value = currentOriginalProp.value;
    }
  }

  return newCharacter;
}
