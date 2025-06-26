import { For, type Component } from "solid-js";
import { game, setGame } from "./game";
import "../App.css";

interface ProducerProps {
    index: number,
}

const Producer: Component<ProducerProps> = (props) => {
    const index = props.index;
    const producers = game.shop.producers;
    const hidden: Function = () => {
        if (index === 0) return false;
        return producers[index - 1]?.amount === 0 || producers[index - 1] === undefined;
    };

    return (
        <div
            class="producer"
            hidden={hidden()}
            style={{
                "pointer-events": hidden() ? "none" : "auto",
                opacity: hidden() ? 0 : 1
            }}
            onClick={() => {
                if (!hidden() && game.time >= producers[index].price) {
                    setGame("time", () => game.time - producers[index].price);
                    setGame("shop", "producers", index, () => ({
                        ...producers[index],
                        price: producers[index].price * 1.15,
                        amount: producers[index].amount + 1,
                        negative: producers[index].negative + 0.01,
                    }));
                }
            }}

        >
            <div class="producer__name">{producers[index].name}</div>
            <div class="producer__price">{game.format(producers[index].price)}</div>
            <div class="producer__negative">{parseFloat(producers[index].negative.toFixed(2))}N</div>
            <div class="producer__amount">{game.shortFormat(producers[index].amount)}</div>
        </div>
    );
}

const Shop = () => {
    return (
        <div class="shop">
            <For each={game.shop.producers}>
                {(_, index) =>
                    <Producer index={index()} />
                }
            </For>
        </div>
    )
}

export default Shop;
