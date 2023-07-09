import { Fragment, useState } from "react";
import { Character } from "../Configs/CharacterConfig";

interface Props {
  characters: Character[];
  forceRender: () => void;
  changeCharArray: (e: number, i: number) => void;
}

export function CharacterCard({
  characters,
  forceRender,
  changeCharArray,
}: Props) {
  return (
    <div className="charDraftArea">
      {characters.map((character: Character, key: number) => {
        return (
          <Fragment>
            <div
              key={key}
              id={key.toString()}
              className="charCard"
              style={{
                backgroundImage: `url(${character.Image.value})`,
              }}
              draggable="true"
              onDragStart={(e) => {
                character.onDragStart(e, character);
                forceRender();
              }}
              onDragOver={(e) => {
                character.onDragOver(e);
                forceRender();
              }}
              onDragLeave={() => {
                character.onDragLeave();
                forceRender();
              }}
              onDragEnd={() => {
                character.onDragEnd();
                forceRender();
              }}
              onDrop={(e) => {
                character.onDrop(e, key, changeCharArray);
                forceRender();
              }}
            >
              {console.log(
                character.isDragging,
                character.cardIsOver,
                key,
                "<<<<<<<<<<<<<<<<<<<<<<<<"
              )}
              <div
                style={{ color: !!character.isDragging ? "green" : "black" }}
              >
                <b>{character.Name.value}</b>
              </div>
              <br />
              {character.Initiative.value}
              <br />
              {character.Agility.value}
              <br />
              {character.CurrentHP.value}
              <br />
              {character.MaxHP.value}
              <br />
              {character.State.value}
              <br />
            </div>
            {!!character.cardIsOver ? (
              <div className="dropDivider"></div> //Later make animation with neighbour cards move apart
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

export default CharacterCard;
