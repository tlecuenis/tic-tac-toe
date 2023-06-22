import { useState } from "react"
import { Square } from './components/Square.jsx'


//CONSTANTES
const TURNS = {
  X: 'x',
  O: 'o'
}
const PLAYS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  // Inicializamos el tablero en null
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // Casos posibles: 1. null no hay ganador | 2. false empate | 3. true hay ganador
  const [winner, setWinner] = useState(null) 

  // Función recorre la constante de jugadas ganadoras para ver si coincide con la actual
  const checkWinner = (newBoard) => {
    for (const combo of PLAYS){
      const [a, b, c] = combo
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ){
        return newBoard[a]
      }
    }
    return null
  }

  // Función al presionar el botón reset coloca todos los estados por defecto
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Función se ejecuta con cada turno para colocar el valor en la celda
  const updateBoard = (index) =>{
    // Array tiene por defecto las posiciones NULL
    // Celda vacía --> posición es NULL, AL SER FALSY SIGUE EL PROGRAMA
    // Celda es X u O --> TRUE y entra en el return y sale de la función
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    } else if (newBoard.every((square) => square !== null)){

    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar denuevo</button>
      <section className="game">
        {
          // En la sintaxis del map hay 2 Parámetros: el primero es un valor y el segundo el índice
          // sin el primer valor no se puede acceder al índice. Por ello debemos colocar un parámetro cualquiera aunque no lo utilicemos
          board.map((_, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              > 
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        {/* si turn === TURNS.X es true, se agregará en el componente la clase is-selected */}
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      
        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                      ? 'Empate'
                      : 'Ganó: '
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar denuevo</button>
                </footer>

              </div>
            </section>
          )
        }
      
    </main>
  )
}

export default App
