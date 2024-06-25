type GameDifficulty = "Easy" | "Mid" | "Hard";

export class GameMode {
  private difficulty: GameDifficulty;
  private description: string;
  private bgClass: string;

  constructor(
    difficulty: GameDifficulty,
    description: string,
    bgClass: string
  ) {
    this.difficulty = difficulty;
    this.description = description;
    this.bgClass = bgClass;
  }

  public getDifficulty() {
    return this.difficulty;
  }

  public getDescription() {
    return this.description;
  }

  public getBgClass() {
    return this.bgClass;
  }
}
