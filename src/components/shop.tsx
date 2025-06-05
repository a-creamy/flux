import { For, type Component } from "solid-js";
import { game, setGame } from "./game";
import "../App.css";

interface ProducerProps {
    index: number,
}

const Producer: Component<ProducerProps> = (props) => {
    const index = props.index;
    const producers = game.shop.producers;

    return (
        <div
            onClick={() => {
                if (game.time >= producers[index].price) {
                    setGame("time", () => game.time - producers[index].price);
                    setGame("shop", "producers", index, () => ({
                        ...producers[index],
                        price: producers[index].price * 1.15,
                        amount: producers[index].amount + 1,
                    }));
                }
            }}
            class="producer"
        >
            <div class="producer__name">{producers[index].name}</div>
            <div class="producer__price">{game.format(producers[index].price)}</div>
            <div class="producer__amount">{Math.floor(producers[index].amount)}</div>
        </div>
    )
}

const Shop = () => {
    return (
        <div class='shop'>
            <For each={game.shop.producers}>
                {(_, index) =>
                    <Producer index={index()} />
                }
            </For>
        </div>
    )
}

export default Shop;
