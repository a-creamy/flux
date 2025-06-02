import { onMount, type Component } from "solid-js";
import "../App.css";

interface ClockProps {
    height: number,
    width: number,
}

const Clock: Component<ClockProps> = (props) => {
    let canvasRef: HTMLCanvasElement | undefined;

    onMount(() => {
        if (!canvasRef) { return; }

        const canvas = canvasRef;
        const ctx = canvas.getContext("2d");
        if (!ctx) { return; }

        ctx.fillStyle = "black";

        let radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius *= 0.90;

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius / 20, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (let num = 1; num < 13; num++) {
            let ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    });

    return (
        <canvas class="clock" ref={canvasRef} height={props.height} width={props.width} />
    )
}

export default Clock;
