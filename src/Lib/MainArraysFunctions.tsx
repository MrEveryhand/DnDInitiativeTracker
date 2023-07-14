import { Character, propsExceptions } from "../Configs/CharacterConfig";
import { refObject } from "../Components/CharacterCreator";
import { RefObject } from "react";

export function newCharacter(
  refObject: refObject,
  arrayToMap: Character[],
  setFunc: Function,
  getTargetValue: Function
) {
  let newCharacter: Character = new Character();
  let currentProp: any;
  let maxId = -1;
  arrayToMap.map((e, i) => {
    if (maxId < e.id) maxId = e.id;
  });
  for (const e in newCharacter) {
    currentProp = newCharacter[e as keyof typeof newCharacter];
    if (typeof currentProp !== "object") {
      if (e === "id") {
        newCharacter.id = maxId === -1 ? 0 : maxId + 1;
      } else if (e === "arrayPosition") {
        newCharacter.arrayPosition = arrayToMap.length;
      }
    } else {
      if (
        currentProp.hasOwnProperty("type") &&
        !propsExceptions.hasOwnProperty(e)
      )
        currentProp.value = getTargetValue(refObject[e]);
    }
  }

  let newCharArray = [...arrayToMap, newCharacter];
  setFunc((arrayToMap = newCharArray));
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
      if (e === "id") {
        newCharacter.id = originalCharacter.id;
      }
    } else {
      if (
        currentProp.hasOwnProperty("type") &&
        !propsExceptions.hasOwnProperty(e)
      )
        currentProp.value = currentOriginalProp.value;
    }
  }

  return newCharacter;
}

export function getTargetValue(ref: RefObject<HTMLInputElement>) {
  let target = ref.current;
  return target?.value;
}

export function searchCharacter(
  arrayToSearch: Character[],
  typeOfId: string,
  id: number
) {
  let idFound = false;
  arrayToSearch.forEach((e: any) => {
    if (e[typeOfId] === id) idFound = true;
  });
  return idFound;
}

export function changeArray(
  id: number,
  idToCompare: string,
  newIndex: number,
  array: Character[]
) {
  let charBuffer: Character;
  let elementFound: any = array.find((e: any) => e[idToCompare] === id);
  if (elementFound !== undefined) charBuffer = elementFound;
  else return;

  array.splice(charBuffer.arrayPosition, 1);
  array.splice(
    charBuffer.arrayPosition > newIndex ? newIndex + 1 : newIndex,
    0,
    charBuffer
  );

  array.map((e, i) => {
    e.arrayPosition = i;
    e.isDragging = false;
    e.cardIsOver = false;
  });
}

export function battleQueueOnOver(e: any) {
  {
    if (
      !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
      !JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
}

export function battleQueueOnDrop(
  e: any,
  charArray: Character[],
  battleArray: Character[]
) {
  let maxId = -1;

  battleArray.map((e, i) => {
    if (maxId < e.battleId) maxId = e.battleId;
  });

  let charBuffer: Character = JSON.parse(e.dataTransfer.getData("object"));
  charBuffer = copyCharacter(charArray[charBuffer.arrayPosition]);

  charBuffer.battleId = maxId === -1 ? 0 : maxId + 1;
  charBuffer.inBattleQueue = true;
  charBuffer.Initiative.value = Math.floor(Math.random() * 20) + 1; //Temporary solution <=======!!!

  battleArray.splice(0, 0, charBuffer);

  charArray.map((e, i) => {
    e.arrayPosition = i;
    e.isDragging = false;
    e.cardIsOver = false;
  });

  battleArray.map((e, i) => {
    e.arrayPosition = i;
    e.isDragging = false;
    e.cardIsOver = false;
  });

  battleArray.sort((a: Character, b: Character) => {
    if (a.Initiative.value !== b.Initiative.value) {
      return b.Initiative.value - a.Initiative.value;
    } else {
      return b.Agility.value - a.Agility.value;
    }
  });
}

export function holdQueueOnOver(e: any, holdQueueArray: Character[]) {
  let buffer = JSON.parse(e.dataTransfer.getData("object"));
  if (
    !!buffer.inBattleQueue &&
    !buffer.inHoldQueue &&
    holdQueueArray.find((e) => e.battleId === buffer.battleId) === undefined
  ) {
    e.stopPropagation();
    e.preventDefault();
  }
}

export function holdQueueOnDrop(
  e: any,
  charArray: Character[],
  battleArray: Character[],
  holdArray: Character[]
) {
  let charBuffer: Character = JSON.parse(e.dataTransfer.getData("object"));
  let check: any = battleArray.find((e) => e.battleId === charBuffer.battleId);
  if (!check) return;
  charBuffer = copyCharacter(check);

  charBuffer.battleId = JSON.parse(e.dataTransfer.getData("object")).battleId;
  charBuffer.inBattleQueue = false;
  charBuffer.inHoldQueue = true;

  holdArray.splice(0, 0, charBuffer);

  charArray.map((e, i) => {
    e.arrayPosition = i;
    e.isDragging = false;
    e.cardIsOver = false;
  });

  holdArray.map((e, i) => {
    e.arrayPosition = i;
    e.isDragging = false;
    e.cardIsOver = false;
  });
}

export function removeCharacter(
  id: number,
  idToCompare: string,
  array: Character[]
) {
  let newArray = array.filter((e: any) => {
    if (e[idToCompare] !== id) return true;
  });

  newArray.map((e, i) => {
    e.arrayPosition = i;
  });

  return newArray;
}
