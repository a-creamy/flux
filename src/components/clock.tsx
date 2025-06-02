import { onMount, type Component, createEffect } from "solid-js";
import "../App.css";
import { game, setGame } from "./game";

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

        createEffect(() => {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

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

            const drawHand = (pos: number, length: number, width: number) => {
                ctx.beginPath();
                ctx.lineWidth = width;
                ctx.lineCap = "round";
                ctx.moveTo(0, 0);
                ctx.rotate(pos);
                ctx.lineTo(0, -length);
                ctx.stroke();
                ctx.rotate(-pos);
            }

            let hour = (game.time / 720) % 12;
            let minute = (game.time / 12) % 60;
            let second = game.time % 60;

            hour = (hour * Math.PI / 6);
            minute = (minute * Math.PI / 30);
            second = (second * Math.PI / 30);

            drawHand(hour, radius * 0.5, radius * 0.07);
            drawHand(minute, radius * 0.8, radius * 0.07);
            drawHand(second, radius * 0.9, radius * 0.02);
        });
    });

    return (
        <canvas
            class="clock"
            ref={canvasRef}
            height={props.height}
            width={props.width}
            onClick={() => {
                setGame("time", () => game.time + 1);
            }}
        />
    )
}

export default Clock;
