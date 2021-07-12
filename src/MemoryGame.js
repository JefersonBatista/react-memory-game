import React, { useState } from 'react'
import './MemoryGame.css'

function MemoryGame() {
    const [cards, setCards] = useState(new Array(36).fill(0))

    const new_game = 'Novo Jogo'
    const [info, setInfo] = useState('info')
    const [msg, setMsg] = useState('msg')
    const [bestMsg, setBestMsg] = useState('best')
    const [errors, setErrors] = useState('errors')
    const [score, setScore] = useState('score')

    const start = () => {
        setCards(new Array(36).fill(0))
    }

    const flip_card = (index) => () => {
        const new_cards = [...cards]
        new_cards[index] = cards[index] === 0? Math.floor((index/2) + 1) : 0
        setCards(new_cards)
    }

    const renderCard = (number, index) => {
        const imgStr = number > 0?
            `${process.env.PUBLIC_URL}/assets/images/${number}.png` :
            `${process.env.PUBLIC_URL}/assets/images/back.jpg`
        
        return (
            <div>
                <img src={imgStr} onClick={flip_card(index)} alt="Imagem não existe." />
            </div>
        )
    }

    return(
        <div className="MemoryGame">
            {cards.map(renderCard)}
            <button className="Panel" onClick={start}>{new_game}</button>
            <div className="Panel">{info}</div>
            <div className="Panel">{msg}</div>
            <div className="Panel">{bestMsg}</div>
            <div className="Panel">{errors}</div>
            <div className="Panel">{score}</div>
        </div>
    )
}

export default MemoryGame
