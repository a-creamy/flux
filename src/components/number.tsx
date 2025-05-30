import { game, setGame } from './game';
import '../App.css';

export default function Number() {
    return (
        <>
            <button class="number" onClick={() => {
                setGame('number', prev => prev + game.click);
            }}>{game.number}</button>
        </>
    );
}
