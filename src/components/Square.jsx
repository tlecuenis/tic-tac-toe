export const Square = ({ children, isSelected, updateBoard, index }) => {
    const handleClick = () => {
      //le pasamos el índice para saber cual de todos los Squares fue el clickeado
      updateBoard(index)
    }
    return(
      <div className= {`square ${isSelected ? 'is-selected' : ''}`} onClick={handleClick}>
        {children}
      </div>
    )
}