import { createStore } from "solid-js/store";

type Producers = {
    name: string,
    amount: number,
    price: number,
    produce: { producet: string, amount: number } | number,
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
    format: Function;
}

export const [game, setGame] = createStore<Game>({
    time: 0,
    tps: 0,
    shop: {
        producers: [
            { name: "1st Cycle", amount: 1, price: 60, produce: 1 },
            { name: "2nd Cycle", amount: 0, price: 300, produce: { producet: "1st Cycle", amount: 1 } },
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

            const currentProducers = game.shop.producers;
            const savedProducers = savedGame.shop.producers;

            const mergedProducers = currentProducers.map(defaultProducer => {
                const savedProducer = savedProducers.find(p => p.name === defaultProducer.name);
                return savedProducer || defaultProducer;
            });

            setGame("shop", "producers", () => mergedProducers);
        }
    },
    format: (num: number) => {
        num = Math.floor(num);

        if (num < 60) {
            return `${num} second${num !== 1 ? 's' : ''}`;
        } else if (num < 3600) {
            const minutes = Math.floor(num / 60);
            const seconds = num % 60;
            let result = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            if (seconds > 0) {
                result += ` ${seconds} second${seconds !== 1 ? 's' : ''}`;
            }
            return result;
        } else if (num < 86400) {
            const hours = Math.floor(num / 3600);
            const minutes = Math.floor((num % 3600) / 60);
            let result = `${hours} hour${hours !== 1 ? 's' : ''}`;
            if (minutes > 0) {
                result += ` ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
            return result;
        } else if (num < 604800) {
            const days = Math.floor(num / 86400);
            const hours = Math.floor((num % 86400) / 3600);
            let result = `${days} day${days !== 1 ? 's' : ''}`;
            if (hours > 0) {
                result += ` ${hours} hour${hours !== 1 ? 's' : ''}`;
            }
            return result;
        } else if (num < 2629746) {
            const weeks = Math.floor(num / 604800);
            const days = Math.floor((num % 604800) / 86400);
            let result = `${weeks} week${weeks !== 1 ? 's' : ''}`;
            if (days > 0) {
                result += ` ${days} day${days !== 1 ? 's' : ''}`;
            }
            return result;
        } else if (num < 31556952) {
            const months = Math.floor(num / 2629746);
            const weeks = Math.floor((num % 2629746) / 604800);
            let result = `${months} month${months !== 1 ? 's' : ''}`;
            if (weeks > 0) {
                result += ` ${weeks} week${weeks !== 1 ? 's' : ''}`;
            }
            return result;
        } else {
            const years = Math.floor(num / 31556952);
            const months = Math.floor((num % 31556952) / 2629746);
            let result = `${years} year${years !== 1 ? 's' : ''}`;
            if (months > 0) {
                result += ` ${months} month${months !== 1 ? 's' : ''}`;
            }
            return result;
        }
    }
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
        } else if (typeof producer.produce === 'object') {
            const producet = game.shop.producers.find(obj => obj.name == (producer.produce as { producet: string; amount: number }).producet);

            if (producet !== undefined) {
                let index = parseInt(producet.name[0]) - 1;
                setGame("shop", "producers", index, () => ({
                    ...game.shop.producers[index],
                    amount: game.shop.producers[index].amount + 1,
                }));
            }
        }
    }
    setGame("tps", () => result);
}, 10);

setInterval(() => {
    setGame("time", () => game.time + game.tps / 100);
}, 10);
