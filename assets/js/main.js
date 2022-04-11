let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector(`.blue`)
const red = document.querySelector(`.red`)
const green = document.querySelector(`.green`)
const yellow = document.querySelector(`.yellow`)
const scoreboard = document.querySelector('.scoreboard')

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = []

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number) => {
    number *= 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected')
    })
}

let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            lose();
            break;
        }
    }

    if (clickedOrder.length == order.length) {
        alert(`Pontuacao: ${score}\nVoce acertou! Iniciando proximo nivel!`)
        scoreboard.innerHTML = `<small>Pontos:</small> ${score}`
        nextLevel()
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color
    createColorElement(color).classList.add('selected')

    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder()
    }, 250)

}

let createColorElement = (color) => {
    if (color == 0) {return green}
    else if (color == 1) {return red}
    else if (color == 2) {return yellow}
    else if (color == 3) {return blue}
}

let nextLevel = () => {
    score++;
    shuffleOrder()
}

let lose = () => {
    alert(`Pontuacao: ${score}!\nVoce perdeu o jogo!\nClique em OK para iniciar um novo jogo.`)
    order = []
    clickedOrder = []

    playGame()
}

let playGame = () => {
    score =  0;

    nextLevel()
}

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()