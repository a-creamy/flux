import "./App.css";
import Clock from "./components/clock";
import Shop from "./components/shop";

function App() {
    return (
        <>
            <Clock height={300} width={300} />
            <Shop />
        </>
    );
}

export default App;
