const colors = ['#f2f6fc', '#f2e4cb', '#e6ffee'];
// const colors = ['red', 'green'];
export class MinimizeEmailColor {
  static colorList: string[] = [...colors];
  
  static getColor(){
    if(this.colorList.length === 0) return '';
    return this.colorList.pop();
  }
  
  static provideColor(color?: string) {
    if(color) this.colorList.push(color);
  }

  static reset(){
    this.colorList = colors;
  }

}