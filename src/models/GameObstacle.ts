export default class GameObstacle {
    height : number;
    y: number;

    constructor() {
        this.height = Math.floor(Math.random()*3)*25;
        this.y = Math.floor(Math.random()*4)*25;
    }

    clear = () => {
        this.height = 0;
    }
}