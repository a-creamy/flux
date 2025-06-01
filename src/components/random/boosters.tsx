import { game, setGame } from "../game";

const createDiv = () => {
    return document.createElement('div');
}

export function booster() {
    const div = createDiv();
    div.className = 'random-booster';

    document.body.appendChild(div);

    div.textContent = '?';

    div.style.fontSize = '2rem';
    div.style.position = 'absolute';
    div.style.top = `${Math.ceil(Math.random() * 100)}vh`;
    div.style.left = `${Math.ceil(Math.random() * 100)}vw`;

    setTimeout(() => {
        booster();
    }, Math.floor(Math.random() * 100000) + 10000);


    div.onclick = () => {
        // let index = Math.floor(Math.random() * game.random.length);

        setGame("multiplier", () => 2);
        div.remove();
        setTimeout(() => {
            setGame("multiplier", () => 1);
        }, 10000);
    }
}
