import firebase from 'firebase/app';

export class Category {
    name : string;
    label : string;

    constructor (
        name : string,
        label : string,
    ) {
        this.name = name;
        this.label = label;
    }
}

export const Categories = [
    new Category('spinning', 'Rodando'),
    new Category('still', 'Parado'),
    new Category('all', 'Geral'),
]

export default class Score {
    nickname : string;
    strDate ?: string;
    category : string;
    points : number;
    laps : number;
    constructor (
        nickname : string,
        category : string,
        points : number,
        laps : number,
    ) {
        this.nickname = nickname;
        this.category = category;
        this.points = points;
        this.laps = laps;
    }
}