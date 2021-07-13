import React, { useCallback, useEffect, useState } from 'react'
import './MemoryGame.css'

function MemoryGame() {
    const [cards, setCards] = useState(new Array(36).fill(0))


    const new_game = 'Novo Jogo'
    const [info, setInfo] = useState('')
    const [msg, setMsg] = useState('')
    const [best, setBest] = useState(NaN)
    const [errors, setErrors] = useState(0)
    const [score, setScore] = useState(0)

    const [card1, setCard1] = useState(NaN)
    const [card2, setCard2] = useState(NaN)
    const [flipped, setFlipped] = useState(0)

    const start = () => {
        setCards(new Array(36).fill(0))
        setInfo('')
        setMsg('')
        setErrors(0)
        setScore(0)

        setCard1(NaN)
        setCard2(NaN)
        setFlipped(0)
    }

    const bestMSG = useCallback(() => {
        return isNaN(best)? 'Melhor: -' : `Melhor: ${best}`
    }, [best])

    useEffect(bestMSG, [bestMSG])

    const game_over = () => {
        if(isNaN(best) || errors < best) {
            setBest(errors)
            setMsg('Melhor Jogo!')
        } else {
            setMsg('Bom Jogo!')
        }
    }

    const flip_card = (index) => () => {
        if(cards[index] === 0) {
            var new_score = score
            const new_cards = [...cards]
            new_cards[index] = cards[index] === 0? Math.floor((index/2) + 1) : 0

            switch(flipped) {
                case 0:
                    setCard1(index)
                    setFlipped(flipped + 1)
                    setInfo('')
                    break;
                case 1:
                    setCard2(index)
                    setFlipped(flipped + 1)

                    console.log(`card_indexes: ${card1}, ${index}`)
                    console.log(`new_cards: ${new_cards[card1]}, ${new_cards[index]}`)
                    if(new_cards[card1] === new_cards[index]) {
                        new_score++
                        setInfo('Boa!')
                    } else {
                        setErrors(errors + 1)
                        setInfo('Errou!')
                    }
                    break;
                default:
                    if(cards[card1] !== cards[card2]) {
                        new_cards[card1] = 0
                        new_cards[card2] = 0
                    }
                    setCard1(index)
                    setCard2(NaN)
                    setFlipped(1)
                    setInfo('')
            }

            setScore(new_score)
            if(new_score === 18) {
                game_over();
            }

            setCards(new_cards)
        }
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
            <div className="Panel">{bestMSG()}</div>
            <div className="Panel">Erros: {errors}</div>
            <div className="Panel">Pares: {score}/18</div>
        </div>
    )
}

export default MemoryGame
