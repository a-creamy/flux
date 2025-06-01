import './App.css'
import Number from './components/number'
import Shop from './components/shop'
import { booster } from './components/random/boosters'
import { game } from './components/game'

function App() {
    game.load();

    setTimeout(() => {
        booster();
    }, Math.floor(Math.random() * 100000) + 10000);

    return (
        <>
            <Number />
            <Shop />
        </>
    )
}

export default App
