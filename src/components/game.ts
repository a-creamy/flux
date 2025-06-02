import { createStore } from "solid-js/store";

type Game = {
    time: number;
}

export const [game, setGame] = createStore<Game>({
    time: 0,
});
