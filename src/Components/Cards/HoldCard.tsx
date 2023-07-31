import { Dispatch, SetStateAction, memo } from "react";
import { Character } from "../../Configs/CharacterConfig";
import { refObject } from "../Queues/DraftQueue";

interface Props {
  battleQueue: Character[];
  character: Character;
  setFunc: Dispatch<SetStateAction<Character[]>>;
  refObject: refObject;
}

const HoldCard = memo(
  ({ battleQueue, character, setFunc, refObject }: Props) => {
    return (
      <div
        key={character.id.toString() + "_h"}
        id={character.id.toString() + "_h"}
        className="charCard"
        style={{
          backgroundImage: `url(${
            !!character.Image.value
              ? URL.createObjectURL(character.Image.value)
              : ""
          })`,
        }}
      >
        <div>
          <b>{character.Name.value}</b>
        </div>
        <br />
        <textarea
          className="holdCommentInput"
          ref={refObject[character.id]}
          onChange={(e) => {
            character.Hold.comment = e.target.value;
          }}
          defaultValue={character.Hold.comment}
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            character.Hold.isHold = false;
            character.Hold.comment = "";
            setFunc([...battleQueue]);
          }}
        >
          X
        </button>
      </div>
    );
  }
);

export default HoldCard;
