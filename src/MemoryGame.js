import React, { useState } from 'react'
import './MemoryGame.css'
import { shuffle_cards } from './Shuffle'

function MemoryGame() {
    const [board, setBoard] = useState(new Array(36).fill(0))
    const [cards, setCards] = useState(shuffle_cards(36))

    const new_game = 'Novo Jogo'
    const [info, setInfo] = useState('')
    const [msg, setMsg] = useState('')
    const [best, setBest] = useState(NaN)
    const [errors, setErrors] = useState(0)
    const [score, setScore] = useState(0)

    const [card1, setCard1] = useState(NaN)
    const [card2, setCard2] = useState(NaN)
    const [flipped, setFlipped] = useState(false)

    // Variable to enable and disable the board
    const [enabled, setEnabled] = useState(true)

    const start = () => {
        setCards(shuffle_cards(36))

        setBoard(new Array(36).fill(0))
        setInfo('')
        setMsg('')
        setErrors(0)
        setScore(0)

        setCard1(NaN)
        setCard2(NaN)
        setFlipped(false)
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

            if(flipped) {
                setFlipped(false)

                if(new_board[card1] === new_board[index]) {
                    new_score++
                    setInfo('Boa!')
                    setCard1(NaN)
                    setCard2(NaN)
                } else {
                    setCard2(index)
                    setErrors(errors + 1)
                    setInfo('Errou!')

                    // Blocking board during 2 secs after error
                    setEnabled(false)
                    setTimeout(() => {
                        const new_board = [...board]
                        new_board[card1] = 0
                        new_board[card2] = 0
                        setCard1(NaN)
                        setCard2(NaN)
                        setInfo('')
                        setBoard(new_board)
                        setEnabled(true)
                    }, [1250])
                }
            } else {
                setCard1(index)
                setFlipped(true)
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
        const IMAGES_PATH = `${process.env.PUBLIC_URL}/assets/images`
        const imgStr = number > 0?
            `${IMAGES_PATH}/${number}.png` :
            `${IMAGES_PATH}/back.jpg`
        
        return (
            <div>
                <img src={imgStr} onClick={flip_card(index)} alt="Imagem n??o existe." />
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
