import { Fragment, createRef } from "react";
import { Character } from "../Configs/CharacterConfig";
import { Queue } from "../Configs/Queues";
import * as MainLib from "../Lib/MainArraysFunctions";

interface Props {
  characterQueue: Queue;
  forceRender: () => void;
}

export interface refObject {
  [key: string]: any;
}

export function CharacterCard({ characterQueue, forceRender }: Props) {
  let refObject: refObject = {};
  return (
    <div className="charDraftArea">
      {characterQueue.queue.map((character: Character, key: number) => {
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
                MainLib.queueOnOver(
                  e,
                  !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue
                );
                {
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
                character.onDrop(
                  characterQueue.queueChange(
                    JSON.parse(e.dataTransfer.getData("object")).id,
                    key
                  )
                );
                forceRender();
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
              {character.CurrentHP.value > 0 ? character.CurrentHP.value : null}
              <br />
              {character.MaxHP.value > 0 ? character.MaxHP.value : null}
              <br />
              {character.State.value.length > 0 ? character.State.value : null}
              <br />
              <button
                className="btn btn-primary"
                onClick={() => {
                  characterQueue.queueRemove(character.id);
                  forceRender();
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
