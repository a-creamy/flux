import { For } from "solid-js";
import { game, setGame } from "./game"

interface ProducerProps {
    index: number,
}

const Producer = (props: ProducerProps) => {
    const index = props.index;
    const producers = game.shop.producers;

    return (
        <div onClick={() => {
            if (game.time >= producers[index].price) {
                setGame("time", () => game.time - producers[index].price);
                setGame("shop", "producers", index, () => ({
                    ...producers[index],
                    price: producers[index].price * 1.15,
                    amount: producers[index].amount + 1,
                }));
            }
        }}>
            <div>{producers[index].name}</div>
            <div>{producers[index].price}</div>
            <div>{producers[index].amount}</div>
        </div>
    )
}

const Shop = () => {
    return (
        <>
            <For each={game.shop.producers}>
                {(_, index) =>
                    <Producer index={index()} />
                }
            </For>
        </>
    )
}

export default Shop;
