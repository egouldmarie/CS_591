const pageTree = {
    0: {
        img: "logo.svg",
        name: "Math Buddy",
        innerHTML: `<div class="column">
                        <div class="row">
                            <div class="button"><img src="./src/add.png"></img> Addition</div>
                            <div class="button"><img src="./src/sub.png"></img> Subtraction</div>
                        </div>
                        <div class="row">
                            <div class="button"><img src="./src/mul.png"></img> Multiplication</div>
                            <div class="button"><img src="./src/div.png"></img> Division</div>
                        </div>
                    </div>`,
        parent: null,
        children: [1]
    },
    1: { img: "add.png", name: "Addition", parent: 0, children: [2, 3] },
    2: { img: "bnb.png", name: "Break N' Build", parent: 1, children: [] },
    3: { img: "blocks.png", name: "Blocks", parent: 1, children: [4, 5, 6, 7] },
    4: { img: "blocks_easy.png", name: "Easy", parent: 2, children: [] },
    5: { img: "blocks_medium.png", name: "Medium", parent: 2, children: [] },
    6: { img: "blocks_hard.png", name: "Hard", parent: 2, children: [] },
    7: {
        img: "blocks_challenge.png",
        name: "Challenge",
        parent: 2,
        children: [8]
    },
    8: {
        img: "blocks_challenge",
        name: "Challenge Complete!",
        parent: 2,
        children: []
    }
}

let app = document.getElementById("App")
function fadeIn() {
    let opacity = 0
    let interval = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(interval)
        }
        opacity += 0.1
        app.style.opacity = opacity
    }, 50)
}
function fadeOut() {
    let opacity = 1
    let interval = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(interval)
        }
        opacity -= 0.1
        app.style.opacity = opacity
    }, 50)
}
let headerImage = document.getElementById("App-header-logo")
let headerText = document.getElementById("App-header-text")
function loadHeader(page) {
    headerImage.src = `./src/${page.img}`
    headerText.innerHTML = page.name
}
let body = document.getElementById("App-body")
function loadBody(page) {
    body.innerHTML = page.innerHTML
}

function loadPage(page) {
    if (app.style.opacity > 0) {
        fadeOut()
    }

    loadHeader(page)
    loadBody(page)

    fadeIn()
}

let currentPage = 0
loadPage(pageTree[currentPage])
