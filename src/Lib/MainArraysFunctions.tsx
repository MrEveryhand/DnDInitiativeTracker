import { Character } from "../Configs/CharacterConfig";
import { refObject } from "../Components/CharacterCreator";
import { ClassType, RefObject } from "react";
import { Queue } from "../Configs/Queues";

export function setNewID(array: Character[]) {
  let newId = -1;
  array.map((e) => {
    if (newId < e.id) newId = e.id;
  });
  newId = newId === -1 ? 0 : newId + 1;

  return newId;
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

export function getTargetValue(ref: RefObject<HTMLInputElement>) {
  if (!ref) return;
  let target = ref.current;
  return target?.value;
}

export function queueOnOver(e: any, condition: boolean) {
  if (!!condition) {
    e.stopPropagation();
    e.preventDefault();
  }
}

export function cloneClass(ex: any) {
  return Object.assign(Object.create(Object.getPrototypeOf(ex)), ex);
}
