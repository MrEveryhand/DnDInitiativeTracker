import { idStorage } from "../Configs/IdStorage";
import { Character } from "../Configs/CharacterConfig";
import { Dispatch, SetStateAction } from "react";
import * as MainLib from "../Lib/MainArraysFunctions";

export class queueFunctions {
  queueRefresh = (queue: Character[]) => {
    queue.map((e, i) => {
      e.arrayPosition = i;
      e.isDragging = false;
      e.cardIsOver = false;
    });

    return queue;
  };

  queueAdd = (
    setFunc: Dispatch<SetStateAction<Character[]>>,
    character: Character
  ) =>
    setFunc((prevItems) => {
      let charBuffer = character;
      charBuffer.id = idStorage.generateId();

      return this.queueRefresh([...prevItems, charBuffer]);
    });

  changeQueueValue = (
    setFunc: Dispatch<SetStateAction<Character[]>>,
    id: number,
    key: string,
    value: any
  ) => {
    setFunc((prevItems) =>
      prevItems.map((character) => {
        if (character.id === id) {
          let currentProp: any = character[key as keyof typeof character];
          if (typeof currentProp === "object") currentProp.value = value;
          else currentProp = value;
        }
        return character;
      })
    );
  };

  queueChange = (
    setFunc: Dispatch<SetStateAction<Character[]>>,
    id: number,
    newId: number
  ) => {
    setFunc((prevItems) => {
      let charBuffer: Character;
      let elementFound: any = prevItems.find((e: any) => e.id === id);
      charBuffer = elementFound;

      prevItems.splice(charBuffer.arrayPosition, 1);
      prevItems.splice(
        charBuffer.arrayPosition > newId ? newId + 1 : newId,
        0,
        charBuffer
      );

      return this.queueRefresh(prevItems);
    });
  };

  queueRemove = (
    setFunc: Dispatch<SetStateAction<Character[]>>,
    id: number
  ) => {
    setFunc((prevItems) => {
      let newArray = prevItems.filter((e: any) => {
        if (e.id !== id) return true;
      });

      prevItems = newArray;
      return this.queueRefresh(prevItems);
    });
  };

  searchCharacter = (queue: Character[], id: number) => {
    let result = undefined;
    queue.forEach((e: any) => {
      if (e.id === id) result = e;
    });
    return result;
  };

  cloneCharacter = (queue: Character[], id: number) => {
    let originalCharacter: any = this.searchCharacter(queue, id);
    if (originalCharacter === undefined) return;
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
  };

  queueOnOver(e: any, condition: boolean) {
    if (!!condition) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  modifyPointer = (queue: Character[], pointer: number, x: number) => {
    let newPointer = pointer + x;
    if (newPointer < 0) return queue.length - 1;
    if (newPointer > queue.length - 1) return 0;
    if (queue.length === 1) return 0;
    return newPointer;
  };

  battleQueueuDrop = (
    e: any,
    characterQueue: Character[],
    battleQueue: Character[],
    setBattleQueue: Dispatch<SetStateAction<Character[]>>,
    setPointer: Dispatch<SetStateAction<number>>,
    pointer: number
  ) => {
    if (
      !qFunc.searchCharacter(
        characterQueue,
        JSON.parse(e.dataTransfer.getData("object")).id
      )
    )
      return;
    if (JSON.parse(e.dataTransfer.getData("object")).Initiative.value < 0)
      return;

    let charBuffer: any = qFunc.searchCharacter(
      characterQueue,
      JSON.parse(e.dataTransfer.getData("object")).id
    );

    charBuffer = MainLib.copyCharacter(charBuffer);

    charBuffer.inBattleQueue = true;

    if (charBuffer.Initiative.value > battleQueue[pointer].Initiative.value)
      setPointer(qFunc.modifyPointer(battleQueue, pointer, 1));

    qFunc.queueAdd(setBattleQueue, charBuffer);
  };

  holdQueueDrop = (
    e: any,
    battleQueue: Character[],
    setBattleQueue: Dispatch<SetStateAction<Character[]>>,
    setPointer: Dispatch<SetStateAction<number>>,
    pointer: number
  ) => {
    let charBuffer: any = qFunc.searchCharacter(
      battleQueue,
      JSON.parse(e.dataTransfer.getData("object")).id
    );
    charBuffer.Hold.value = true;
    setPointer(qFunc.modifyPointer(battleQueue, pointer, 1));
    setBattleQueue([...battleQueue]);
  };

  burnReaction = (
    e: any,
    battleQueue: Character[],
    setBattleQueue: Dispatch<SetStateAction<Character[]>>,
    setPointer: Dispatch<SetStateAction<number>>,
    pointer: number
  ) => {
    let charBuffer: any = qFunc.searchCharacter(
      battleQueue,
      JSON.parse(e.dataTransfer.getData("object")).id
    );
    charBuffer.Hold.isHold = true;
    setPointer(qFunc.modifyPointer(battleQueue, pointer, 1));
    setBattleQueue([...battleQueue]);
  };
}

export let qFunc = new queueFunctions();

export default qFunc;
