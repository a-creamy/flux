import { game, setGame } from './game';
import '../App.css';

export default function Number() {
    return (
        <>
            <button class="number" onClick={() => {
                setGame('number', () => game.number + game.click);
            }}>{Math.ceil(game.number)}</button>
        </>
    );
}
