import { createStore } from "solid-js/store";

type Producers = {
    name: string,
    amount: number,
    price: number,
    produce: { producet: Producers, amount: number } | number,
}

type Shop = {
    producers: Producers[],
}

type Game = {
    time: number;
    tps: number; // time per second
    shop: Shop;
    save: Function;
    load: Function;
}

export const [game, setGame] = createStore<Game>({
    time: 0,
    tps: 0,
    shop: {
        producers: [
            { name: "1st Cycle", amount: 1, price: 100, produce: 1 },
        ],
    },
    save: () => {
        localStorage.setItem("game", JSON.stringify(game));
    },
    load: () => {
        const json = localStorage.getItem("game");
        if (json !== null) {
            const savedGame: Game = JSON.parse(json);
            if (savedGame == null || savedGame == undefined) {
                return;
            }

            setGame("time", () => savedGame.time);
            setGame("shop", "producers", () => savedGame.shop.producers);
        }
    },
});

game.load();

setInterval(() => {
    game.save();
}, 1000);

setInterval(() => {
    let result: number = 0;
    for (const producer of game.shop.producers) {
        if (typeof producer.produce === 'number') {
            result += producer.produce * producer.amount;
        }
    }
    setGame("tps", () => result);
}, 1000);

setInterval(() => {
    setGame("time", () => game.time + game.tps / 100);
}, 10);
