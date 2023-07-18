import { Character } from "../Configs/CharacterConfig";
import { Queue } from "../Configs/Queues";

interface Props {
  battleQueue: Queue;
  forceRender: () => void;
}

export function BattleCard({ battleQueue, forceRender }: Props) {
  return (
    <div>
      {battleQueue.queue
        .sort((a: Character, b: Character) => {
          if (a.Initiative.value !== b.Initiative.value) {
            return b.Initiative.value - a.Initiative.value;
          } else {
            return b.Agility.value - a.Agility.value;
          }
        })
        .map((character: Character, key: number) => {
          return (
            <div
              key={key.toString() + "_b"}
              id={key.toString() + "_b"}
              className="charCard"
              style={{
                backgroundImage: `url(${character.Image.value})`,
              }}
              draggable="true"
              onDragStart={(e) => {
                character.onDragStart(e, character);
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
            >
              <div
                style={{ color: !!character.isDragging ? "green" : "black" }}
              >
                <b>{character.Name.value}</b>
              </div>
              <br />
              {character.Initiative.value}
              <br />
              {character.State.value}
              <br />
              <button
                className="btn btn-primary"
                onClick={() => {
                  battleQueue.queueRemove(character.id);
                  forceRender();
                }}
              >
                X
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default BattleCard;
