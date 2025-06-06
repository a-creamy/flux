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
    shortFormat: Function,
}

export const [game, setGame] = createStore<Game>({
    time: 0,
    tps: 0,
    shop: {
        producers: [
            { name: "1st Cycle", amount: 1, price: 1e-30 * 60, produce: 1e-30 },
            { name: "2nd Cycle", amount: 0, price: 1e-30 * 300, produce: { producet: "1st Cycle", amount: 1 } },
            { name: "3rd Cycle", amount: 0, price: 1e-30 * 1800, produce: { producet: "2nd Cycle", amount: 1 } },
        ],
    },
    save: () => {
        localStorage.setItem("game", JSON.stringify(game));
    },
    load: () => {
        const json: string | null = localStorage.getItem("game");
        if (!json) { return; }

        const savedGame: Game = JSON.parse(json);
        if (savedGame === null || savedGame === undefined || savedGame.shop === undefined) {
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
    },
    format: (num: number) => {
        if (num < 1e-27) {
            const quectoseconds = Math.floor(num * 1e30);
            return `${quectoseconds} quectosecond${quectoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-24) {
            const rontoseconds = Math.floor(num * 1e27);
            return `${rontoseconds} rontosecond${rontoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-21) {
            const yoctoseconds = Math.floor(num * 1e24);
            return `${yoctoseconds} yoctosecond${yoctoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-18) {
            const zeptoseconds = Math.floor(num * 1e21);
            return `${zeptoseconds} zeptosecond${zeptoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-15) {
            const attoseconds = Math.floor(num * 1e18);
            return `${attoseconds} attosecond${attoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-12) {
            const femtoseconds = Math.floor(num * 1e15);
            return `${femtoseconds} femtosecond${femtoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-9) {
            const picoseconds = Math.floor(num * 1e12);
            return `${picoseconds} picosecond${picoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-6) {
            const nanoseconds = Math.floor(num * 1e9);
            return `${nanoseconds} nanosecond${nanoseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-3) {
            const microseconds = Math.floor(num * 1e6);
            return `${microseconds} microsecond${microseconds !== 1 ? 's' : ''}`;
        } else if (num < 1e-2) {
            const milliseconds = Math.floor(num * 1e3);
            return `${milliseconds} millisecond${milliseconds !== 1 ? 's' : ''}`;
        } else if (num < 1) {
            const centiseconds = Math.floor(num * 100);
            return `${centiseconds} centisecond${centiseconds !== 1 ? 's' : ''}`;
        } else if (num < 60) {
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
    },
    shortFormat: (num: number) => {
        if (num < 1e3) {
            return Math.floor(num).toString();
        } else if (num < 1e6) {
            return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
        } else if (num < 1e9) {
            return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'm';
        } else if (num < 1e12) {
            return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'b';
        } else if (num < 1e15) {
            return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 't';
        } else if (num < 1e18) {
            return (num / 1e15).toFixed(1).replace(/\.0$/, '') + 'q';
        }
    }
});

game.load();

setInterval(() => {
    game.save();
}, 10000);

setInterval(() => {
    let result: number = 0;
    for (const producer of game.shop.producers) {
        if (typeof producer.produce !== "number") { continue; }
        result += producer.produce * producer.amount;
    }
    setGame("tps", () => result);
}, 10);

setInterval(() => {
    for (const producer of game.shop.producers) {
        if (typeof producer.produce !== "object") { continue; }

        const producet = game.shop.producers.find(obj => obj.name == (producer.produce as { producet: string; amount: number }).producet);
        if (!producet) { continue; }

        let index = parseInt(producet.name[0]) - 1;
        setGame("shop", "producers", index, "amount",
            game.shop.producers[index].amount + (producer.produce.amount * producer.amount) / 100
        );
    }
}, 10);

setInterval(() => {
    setGame("time", () => game.time + game.tps / 100);
}, 10);
