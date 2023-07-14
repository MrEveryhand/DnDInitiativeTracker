import { Dispatch, Fragment, SetStateAction, createRef, useState } from "react";
import { Character } from "../Configs/CharacterConfig";
import { changeArray, removeCharacter } from "../Lib/MainArraysFunctions";

interface Props {
  characters: Character[];
  forceRender: () => void;
  setFunc: Dispatch<React.SetStateAction<Character[]>>;
}

export interface refObject {
  [key: string]: any;
}

export function CharacterCard({ characters, forceRender, setFunc }: Props) {
  let refObject: refObject = {};
  return (
    <div className="charDraftArea">
      {characters.map((character: Character, key: number) => {
        refObject[character.id] = createRef();
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
                if (
                  !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
                  !JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
                ) {
                  character.onDragOver(e);
                  forceRender();
                }
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
                if (
                  !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue &&
                  !JSON.parse(e.dataTransfer.getData("object")).inHoldQueue
                ) {
                  character.onDrop(
                    changeArray(
                      JSON.parse(e.dataTransfer.getData("object")).id,
                      "id",
                      key,
                      characters
                    )
                  );
                  forceRender();
                }
              }}
            >
              <div
                style={{ color: !!character.isDragging ? "green" : "black" }}
              >
                <b>{character.Name.value}</b>
              </div>
              <input
                className="initInput"
                ref={refObject[character.id]}
                type="number"
                onChange={(e) => {
                  character.Initiative.value = parseInt(e.target.value);
                  forceRender();
                }}
              />
              <br />
              {character.Agility.value}
              <br />
              {character.CurrentHP.value}
              <br />
              {character.MaxHP.value}
              <br />
              {character.State.value}
              <br />
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFunc(
                    (characters = removeCharacter(
                      character.id,
                      "id",
                      characters
                    ))
                  );
                }}
              >
                X
              </button>
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
