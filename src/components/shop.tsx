import '../App.css';
import { setGame, game } from './game';

const Producer = (props) => {
    setGame("producers", (prev) => [
        ...prev,
        {
            name: props.name,
            price: props.price,
            amount: props.amount,
            rate: props.rate,
        }
    ]);

    let index: number = game.producers.length - 1;

    return (
        <div style={{
            "font-size": '2rem',
            "border-bottom": '2px solid black',
            cursor: 'pointer',
            "user-select": 'none',
            height: '8vh',
            width: '100%',
        }}
            onClick={() => {
                if (game.number >= game.producers[index].price) {
                    setGame("number", e => e -= game.producers[index].price);
                    setGame("producers", index, (prev) => ({
                        ...prev,
                        price: game.producers[index].price * 1.15,
                        amount: game.producers[index].amount + 1,
                    }));
                }
            }}>
            <div>{game.producers[index].name}</div>
            <div>{game.producers[index].price}</div>
            <div>{game.producers[index].amount}</div>
            <div>{game.producers[index].rate}</div>
        </div>
    )
}

export default function Shop() {
    let visible: boolean = false;

    document.addEventListener('keydown', function(event) {
        if (event.key === 's' || event.key === 'S') {
            const element: Element | null = document.querySelector('.shop');


            if (!visible) {
                visible = true;
                if (element !== null) {
                    element.style.display = 'block';
                }

            } else {
                visible = false;
                if (element !== null) {
                    element.style.display = 'none';
                }
            }
        }
    });

    return (
        <div class='shop'>
            <div style={{
                "z-index": 10,
                position: 'absolute',
                right: '5vw',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '90vh',
                width: '30vw',
                border: '2px solid black',
            }}>
                <Producer name="Counter" price={51} amount={0} rate={1} />
            </div>
        </div>
    )
}
