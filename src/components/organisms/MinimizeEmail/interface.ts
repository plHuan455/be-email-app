const colors = ['#f2f6fc', 'rgb(252, 185, 185)', 'rgb(162, 241, 230)', 'rgb(246, 247, 162)', 'rgb(247, 210, 255)', 'rgb(184, 228, 241)', 'rgb(255, 215, 143)', '#bffbd2'];
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