import './App.css'
import Number from './components/number'
import Shop from './components/shop'
import { game } from './components/game'

function App() {
    game.load();

    return (
        <>
            {Number()}
            {Shop()}
        </>
    )
}

export default App
