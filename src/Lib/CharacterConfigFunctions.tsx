import { Character } from "../Configs/CharacterConfig";

export function onDragStart(e: any, character: Character) {
  character.isDragging = true;
  e.dataTransfer.setData("object", JSON.stringify(character));
}
export function onDragOver(e: any, character: Character) {
  character.cardIsOver = true;
}
export function onDragLeave(character: Character) {
  character.cardIsOver = false;
}
export function onDrop(endFunc: void) {
  endFunc;
}
export function onDragEnd(character: Character) {
  character.isDragging = false;
}
