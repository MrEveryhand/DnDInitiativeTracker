import { idStorage } from "./IdStorage";
import { Character } from "./CharacterConfig";

export class Queue {
  queue: Character[];
  pointer!: number;
  constructor(queue: Character[] = []) {
    this.queue = queue || [];
    this.pointer = 0;
  }

  public queueAdd(character: Character) {
    let charBuffer = character;
    charBuffer.id = idStorage.generateId();
    this.queue.splice(this.queue.length, 0, charBuffer);
    this.queueRefresh();
  }

  public queueRefresh() {
    this.queue.map((e, i) => {
      e.arrayPosition = i;
      e.isDragging = false;
      e.cardIsOver = false;
    });
  }

  public searchCharacter(id: number) {
    let result = undefined;
    this.queue.forEach((e: any) => {
      if (e.id === id) result = e;
    });
    return result;
  }

  public cloneCharacter(id: number) {
    let originalCharacter: any = this.searchCharacter(id);
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
  }

  public queueChange(id: number, newIndex: number) {
    let charBuffer: Character;
    let elementFound: any = this.queue.find((e: any) => e.id === id);
    if (elementFound !== undefined) charBuffer = elementFound;
    else return;

    this.queue.splice(charBuffer.arrayPosition, 1);
    this.queue.splice(
      charBuffer.arrayPosition > newIndex ? newIndex + 1 : newIndex,
      0,
      charBuffer
    );

    this.queueRefresh();
  }

  public queueRemove(id: number) {
    let newArray = this.queue.filter((e: any) => {
      if (e.id !== id) return true;
    });

    this.queue = newArray;
    this.queueRefresh();
  }

  public modifyPointer(x: number) {
    this.pointer += x;
    if (this.pointer < 0) this.pointer = this.queue.length - 1;
    if (this.pointer > this.queue.length - 1) this.pointer = 0;
    if (this.queue.length === 1) this.pointer = 0;
  }
}
