export function shuffle_cards(number) {
    let cards = new Array(number)
    let card = 1;
    let position;
    let rest = number;

    while(rest > 0) {
        position = Math.floor(Math.random() * rest);
        insert_card(cards, card, position);
        rest--;

        position = Math.floor(Math.random() * rest);
        insert_card(cards, card, position);
        rest--;

        card++;
    }

    return cards
}

function insert_card(cards, card, position) {
    let index = 0;
    let place = -1;

    while(place < position) {
        if(isNaN(cards[index])) {
            place++;
        }
        index++;
    }

    cards[index - 1] = card;
}
