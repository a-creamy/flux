import { createSignal } from 'solid-js';
import '../App.css';

export default function Number() {
    const [count, setCount] = createSignal(0);

    return (
        <button class="number" onClick={() => {
            setCount((count) => count + 1)
        }}>{count()}</button>
    )
}
