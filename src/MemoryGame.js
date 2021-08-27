import React, { useState } from 'react'
import './MemoryGame.css'
// import { shuffle_cards } from './Shuffle'

function order_cards(pairs) {
    let cards = new Array(2 * pairs)
    let i = 0;
    for(let p = 1; p <= pairs; p++) {
        cards[i++] = p
        cards[i++] = p
    }

    return cards
}

function MemoryGame() {
    const [board, setBoard] = useState(new Array(36).fill(0))
    // const [cards, setCards] = useState(shuffle_cards(36))
    const [cards, setCards] = useState(order_cards(18))

    const new_game = 'Novo Jogo'
    const [info, setInfo] = useState('')
    const [msg, setMsg] = useState('')
    const [best, setBest] = useState(NaN)
    const [errors, setErrors] = useState(0)
    const [score, setScore] = useState(0)

    const [card1, setCard1] = useState(NaN)
    const [card2, setCard2] = useState(NaN)
    const [flipped, setFlipped] = useState(0)

    // Variable to enable and disable the board
    // Test it with and without use state
    // let enabled = true
    const [enabled, setEnabled] = useState(true)

    const start = () => {
        // setCards(shuffle_cards(36))
        setCards(order_cards(18))

        setBoard(new Array(36).fill(0))
        setInfo('')
        setMsg('')
        setErrors(0)
        setScore(0)

        setCard1(NaN)
        setCard2(NaN)
        setFlipped(0)
        setEnabled(true)
    }

    const bestMSG = () => {
        return isNaN(best)? 'Melhor: -' : `Melhor: ${best}`
    }

    const game_over = () => {
        if(isNaN(best) || errors < best) {
            setBest(errors)
            setMsg('Melhor Jogo!')
        } else {
            setMsg('Bom Jogo!')
        }
    }

    const flip_card = (index) => () => {
        if(board[index] === 0 && enabled) {
            let new_score = score
            const new_board = [...board]
            new_board[index] = cards[index]

            switch(flipped) {
                case 0:
                    setCard1(index)
                    setFlipped(flipped + 1)
                    setInfo('')
                    break;
                case 1:
                    setCard2(index)
                    setFlipped(flipped + 1)

                    if(new_board[card1] === new_board[index]) {
                        new_score++
                        setInfo('Boa!')
                    } else {
                        setErrors(errors + 1)
                        setInfo('Errou!')

                        // Blocking board during 2 secs after error
                        setEnabled(false)
                        setTimeout(() => {
                            setEnabled(true)
                        }, [2000])
                    }
                    break;
                default:
                    if(board[card1] !== board[card2]) {
                        new_board[card1] = 0
                        new_board[card2] = 0
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

            setBoard(new_board)
        }
    }

    const renderCard = (number, index) => {
        const IMAGES_PATH = `${process.env.PUBLIC_URL}/assets/images/`
        const imgStr = number > 0?
            `${IMAGES_PATH}${number}.png` :
            `${IMAGES_PATH}back.jpg`
        
        return (
            <div>
                <img src={imgStr} onClick={flip_card(index)} alt="Imagem não existe." />
            </div>
        )
    }

    return(
        <div className="MemoryGame">
            {board.map(renderCard)}
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
