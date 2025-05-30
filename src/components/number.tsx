import { createSignal } from 'solid-js';
import '../App.css';

export default function Number() {
    const [count, setCount] = createSignal(0);
    const [clickRate] = createSignal(1);

    return (
        <>
            <button class="number" onClick={() => {
                setCount((count) => count + clickRate());
            }}>{count()}</button>
        </>
    );
}
