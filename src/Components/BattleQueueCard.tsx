import { Character } from "../Configs/CharacterConfig";
import { Queue } from "../Configs/Queues";

interface Props {
  battleQueue: Queue;
  forceRender: () => void;
}

export function BattleCard({ battleQueue, forceRender }: Props) {
  battleQueue.queue[battleQueue.pointer].Hold.isHold = false;
  battleQueue.queue[battleQueue.pointer].Hold.comment = "";

  return (
    <div>
      <div className="cardQueue">
        {battleQueue.queue
          .sort((a: Character, b: Character) => {
            if (a.Initiative.value !== b.Initiative.value) {
              return b.Initiative.value - a.Initiative.value;
            } else {
              return b.Agility.value - a.Agility.value;
            }
          })
          .map((character: Character, key: number) => {
            let offset = key + battleQueue.pointer;
            offset =
              offset < battleQueue.queue.length
                ? offset
                : offset - battleQueue.queue.length;

            console.log(
              battleQueue.pointer,
              offset,
              "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>>>"
            );

            let currentChar = battleQueue.queue[offset];
            return currentChar.Initiative.value > -1 ? (
              <div
                key={key.toString() + "_b"}
                id={key.toString() + "_b"}
                className="charCard"
                style={{
                  backgroundImage: `url(${
                    !!currentChar.Image.value
                      ? URL.createObjectURL(currentChar.Image.value)
                      : ""
                  })`,
                }}
                draggable={battleQueue.pointer === offset ? "true" : "false"}
                onDragStart={(e) => {
                  currentChar.onDragStart(e, currentChar);
                  forceRender();
                }}
                onDragLeave={() => {
                  currentChar.onDragLeave();
                  forceRender();
                }}
                onDragEnd={() => {
                  currentChar.onDragEnd();
                  forceRender();
                }}
              >
                <div
                  style={{
                    color: !!currentChar.isDragging ? "green" : "black",
                  }}
                >
                  <b>{currentChar.Name.value}</b>
                </div>
                <br />
                {currentChar.Initiative.value}
                <br />
                {currentChar.State.value}
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    battleQueue.queueRemove(currentChar.id);
                    forceRender();
                  }}
                >
                  X
                </button>
              </div>
            ) : (
              <div className="divider"></div>
            );
          })}
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            battleQueue.modifyPointer(-1);
            forceRender();
          }}
        >
          Previous turn
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            battleQueue.modifyPointer(1);
            forceRender();
          }}
        >
          Next turn
        </button>
      </div>
    </div>
  );
}

export default BattleCard;
