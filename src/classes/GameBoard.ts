export class GameBoard {
  private columns: number;
  private rows: number;
  private imagesLoaded: boolean;

  constructor(imagesNumber: number) {
    this.columns = Math.ceil(Math.sqrt(imagesNumber));
    this.rows = Math.ceil(imagesNumber / this.columns);
    this.imagesLoaded = false;
  }

  public getColumns() {
    return this.columns;
  }

  public getRows() {
    return this.rows;
  }

  public getImagesLoaded() {
    return this.imagesLoaded;
  }

  public setImagesLoaded(imagesLoaded: boolean) {
    this.imagesLoaded = imagesLoaded;
  }
}
