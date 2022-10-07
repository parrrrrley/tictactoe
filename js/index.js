const state = {
    gameElement: document.querySelector(".game"),
    cells: Array(9).fill(null),
    symbols: ["x", "o"],
    winningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    gameFinished: false
}

const restart = document.querySelector(".restart")
restart.addEventListener("click", () => {
    location.reload()
})

const drawBoard = () => {
    state.gameElement.innerHTML = ""
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        if (state.cells[i]) {
            const cellSymbol = document.createElement("p")
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add("symbol")
            cell.append(cellSymbol)
        } else {
            cell.addEventListener("click", () => {
                if (state.gameFinished) {
                    return
                }
                state.symbols.reverse()
                state.cells[i] = state.symbols[0]
                drawBoard()
                if (checkWinner()) {
                    state.gameFinished = true
                    drawMessage("Congratulations! You won!")

                }

                if (checkDraw()) {
                    state.gameFinished = true
                    drawMessage("It's a draw!")
                }
            })
        }
        state.gameElement.append(cell)
    }
}
const checkDraw = () => {
    return state.cells.every(function (cell) {
        return cell !== null
    })
}

const drawMessage = (message) => {
    const banner = document.createElement("div")
    banner.classList.add("banner")
    const h1 = document.createElement("h1")
    h1.innerText = message
    banner.append(h1)
    state.gameElement.append(banner)
}
const checkWinner = () => {
    return state.winningCombinations.some(function (combo) {
        const cells = combo.map(function (index) {
            return state.cells[index]
        })
        return !(cells.includes(null)) && new Set(cells).size === 1
    })
}
drawBoard()