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
            "user-select": 'none',
            cursor: 'pointer',
            height: '7%',
            width: '100%',
            position: 'relative',
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
            <div style={{
                "font-size": '2rem',
                position: 'absolute',
                left: '3%',
                top: '1%',
            }}>{game.producers[index].name}</div>
            <div style={{
                "font-size": '1.5rem',
                position: 'absolute',
                left: '3%',
                bottom: '1%',
            }}>{Math.ceil(game.producers[index].price)}</div>
            <div style={{
                "font-size": '2rem',
                position: 'absolute',
                right: '3%',
                top: '50%',
                transform: 'translateY(-50%)',
            }}>{game.producers[index].amount}</div>
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
                right: '1vh',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '98vh',
                width: '20vw',
                border: '2px solid black',
            }}>
                <Producer name="Counter" price={51} amount={0} rate={1} />
            </div>
        </div>
    )
}
