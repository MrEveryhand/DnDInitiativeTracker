import { Character } from "../Configs/CharacterConfig";

interface Props {
  battleQueue: Character[];
  forceRender: () => void;
}

export function BattleCard({ battleQueue, forceRender }: Props) {
  return (
    <div>
      {battleQueue.map((character: Character, key: number) => {
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
            <div style={{ color: !!character.isDragging ? "green" : "black" }}>
              <b>{character.Name.value}</b>
            </div>
            <br />
            {character.Initiative.value}
            <br />
            {character.State.value}
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default BattleCard;
