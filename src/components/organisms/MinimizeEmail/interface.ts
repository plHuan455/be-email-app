const colors = ['#f2e4cb', '#f2f6fc', '#e6ffee'];
export class MinimizeEmailColor {
  static colorList = colors;
  
  static getColor(){
    if(this.colorList.length === 0) return '';
    const index = Math.round(Math.random() * this.colorList.length);
    return this.colorList.pop();
  }

  static reset(){
    this.colorList = colors;
  }

}