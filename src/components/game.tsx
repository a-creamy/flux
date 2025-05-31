import { createStore } from "solid-js/store";

type Producers = {
      name: string;
      price: number;
      amount: number;
      rate: number;
};

type Game = {
    number: number,
    click: number,
    nps: number,
    producers: Producers[],
};

export const [game, setGame] = createStore<Game>({
    number: 0,
    click: 1,
    nps: 0,
    producers: [],
});

setInterval(() => {
    let result: number = 0;
    for (let i = 0; i < game.producers.length; i++) {
        result += game.producers[i].amount * game.producers[i].rate;
    }
    setGame("nps", prev => prev = result);
}, 1000);

setInterval(() => {
    setGame("number", prev => prev += game.nps / 100);
}, 10);
