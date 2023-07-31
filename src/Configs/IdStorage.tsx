export class IdStorage {
  usedId: Array<number> = [0];
  generateId = () => {
    const newId = this.usedId.length;
    this.usedId.push(newId);
    return newId;
  };
}

export let idStorage = new IdStorage();

export default IdStorage;
