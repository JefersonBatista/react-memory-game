import React from 'react'
import './MemoryGame.css'

function MemoryGame() {
    const cards = new Array(42).fill(0).map((_, i) => i > 35 ? 0 : Math.floor(i/2 + 1))

    const renderCard = (number, _) => {
        const imgStr = number > 0?
            `${process.env.PUBLIC_URL}/assets/images/${number}.png` :
            `${process.env.PUBLIC_URL}/assets/images/back.jpg`
        
        return (
            <div>
                <img src={imgStr} alt="Imagem não existe." />
            </div>
        )
    }

    return(
        <div className="MemoryGame">
            {cards.map(renderCard)}
        </div>
    )
}

export default MemoryGame
