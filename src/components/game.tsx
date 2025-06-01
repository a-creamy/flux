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
    save: Function,
    load: Function,
};

export const [game, setGame] = createStore<Game>({
    number: 0,
    click: 1,
    nps: 0,
    producers: [
        { name: "Monkey", price: 32, rate: 0.1, amount: 0 },
        { name: "Counter", price: 151, rate: 1, amount: 0 },
    ],
    save: () => {
        const currentState = {
            number: game.number,
            click: game.click,
            nps: game.nps,
            producers: game.producers
        };

        localStorage.setItem("game", JSON.stringify(currentState));
    },
    load: () => {
        const json = localStorage.getItem("game");
        if (json) {
            const savedGame = JSON.parse(json);

            const producers: { [key: string]: Producers } = {};
            savedGame.producers.forEach((producer: Producers) => {
                producers[producer.name] = producer;
            });

            const merged = game.producers.map((defaultProducer: Producers) => {
                const savedProducer = producers[defaultProducer.name];
                return savedProducer ? savedProducer : defaultProducer;
            });

            setGame("number", savedGame.number);
            setGame("click", savedGame.click);
            setGame("nps", savedGame.nps);
            setGame("producers", merged);
        }
    }
});

setInterval(() => {
    let result: number = 0;
    for (let i = 0; i < game.producers.length; i++) {
        result += game.producers[i].amount * game.producers[i].rate;
    }
    setGame("nps", () => result);
}, 1000);

setInterval(() => {
    setGame("number", () => game.number + game.nps / 100);
}, 10);

setInterval(() => {
    game.save();
}, 1000);
