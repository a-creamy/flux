import { createStore } from "solid-js/store";

export const [game, setGame] = createStore({
    number: 0,
    click: 1,
})
