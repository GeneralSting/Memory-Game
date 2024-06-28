export class GameBoard {
  private columns: number;
  private rows: number;

  constructor(imagesNumber: number) {
    this.columns = Math.ceil(Math.sqrt(imagesNumber));
    this.rows = Math.ceil(imagesNumber / this.columns);
  }

  public getColumns() {
    return this.columns;
  }

  public getRows() {
    return this.rows;
  }
}
