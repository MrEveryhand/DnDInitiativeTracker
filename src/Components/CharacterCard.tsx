import { Component, RefObject, createRef } from "react";
import { Character, characterParameter } from "../Configs/CharacterConfig";

interface Props {
  characters: Character[];
  cardsRef: RefObject<HTMLInputElement>;
}

export function CharacterCard({ characters, cardsRef }: Props) {
  return (
    <div className="charDraftArea">
      {characters.map((e: Character, i: number) => {
        return (
          <div
            key={i}
            className="charCard"
            style={{
              backgroundImage: `url(${e.Image.value})`,
            }}
            draggable="true"
            ref={cardsRef}
          >
            <b>{e.Name.value}</b>
            <br />
            {e.Initiative.value}
            <br />
            {e.Agility.value}
            <br />
            {e.CurrentHP.value}
            <br />
            {e.MaxHP.value}
            <br />
            {e.State.value}
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default CharacterCard;
