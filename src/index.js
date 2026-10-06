const pageTree = {
    0: {
        id: 0,
        img: "logo.svg",
        name: "Math Buddy",
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(1)"><img src="./src/add.png"></img> Addition</div>
                        <div class="button" onclick="goTo(2)"><img src="./src/sub.png"></img> Subtraction</div>
                    </div>
                    <div class="row">
                        <div class="button" onclick="goTo(3)"><img src="./src/mul.png"></img> Multiplication</div>
                        <div class="button" onclick="goTo(4)"><img src="./src/div.png"></img> Division</div>
                    </div>`,
        children: [1]
    },
    1: {
        id: 1,
        img: "add.png",
        name: "Addition",
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(6)"><img src="./src/blocks.png"></img> Blocks</div>
                        <div class="button" onclick="goTo(5)"><img src="./src/bnb.png"></img> Break N' Build</div>
                    </div>`,
        parent: 0,
        children: [5, 6]
    },
    2: {
        id: 2,
        img: "sub.png",
        name: "Subtraction",
        innerHTML: `<div>Not yet implemented.</div>`,
        parent: 0,
        children: []
    },
    3: {
        id: 3,
        img: "mul.png",
        name: "Multiplication",
        innerHTML: `<div>Not yet implemented.</div>`,
        parent: 0,
        children: []
    },
    4: {
        id: 4,
        img: "div.png",
        name: "Division",
        innerHTML: `<div>Not yet implemented.</div>`,
        parent: 0,
        children: []
    },
    5: {
        id: 5,
        img: "bnb.png",
        name: "Break N' Build",
        innerHTML: `<div>Not yet implemented.</div>`,
        parent: 1,
        children: []
    },
    6: {
        id: 6,
        img: "blocks.png",
        name: "Blocks",
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(7)" style="flex-direction:column;"><img src="./src/blocks_easy.png"></img><div>Easy</div></div>
                        <div class="button" onclick="goTo(8)" style="flex-direction:column;"><img src="./src/blocks_medium.png"></img><div>Medium</div></div>
                        <div class="button" onclick="goTo(9)" style="flex-direction:column;"><img src="./src/blocks_hard.png"></img><div>Hard</div></div>
                        <div class="button" onclick="goTo(10)" style="flex-direction:column;"><img src="./src/blocks_challenge.png"></img><div>Challenge</div></div>
                    </div>`,
        parent: 1,
        children: [7, 8, 9, 10]
    },
    7: {
        id: 7,
        img: "blocks_easy.png",
        name: "Easy",
        help: true,
        innerHTML: `<div class="column">
                        <div></div>
                        <div class="easy-equation">
                            <div class="easy-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="easy-term"></div>
                            <img src="./src/equals.png"></img>
                            <div class="answer">5</div>
                        </div>
                        <div class="term-options"></div>
                    </div>`,
        parent: 6,
        children: []
    },
    8: {
        id: 8,
        img: "blocks_medium.png",
        name: "Medium",
        help: true,
        innerHTML: `<div class="column">
                        <div></div>
                        <div class="medium-equation">
                            <div class="medium-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="medium-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="medium-term"></div>
                            <img src="./src/equals.png"></img>
                            <div class="answer">12</div>
                        </div>
                        <div class="term-options"></div>
                    </div>`,
        parent: 6,
        children: []
    },
    9: {
        id: 9,
        img: "blocks_hard.png",
        name: "Hard",
        help: true,
        innerHTML: `<div class="column">
                        <div></div>
                        <div class="hard-equation">
                            <div class="hard-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="hard-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="hard-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="hard-term"></div>
                            <img src="./src/equals.png"></img>
                            <div class="answer">17</div>
                        </div>
                        <div class="term-options"></div>
                    </div>`,
        parent: 6,
        children: []
    },
    10: {
        id: 10,
        img: "blocks_challenge.png",
        name: "Challenge",
        help: true,
        innerHTML: `<div class="column">
                        <div class="challenge-header"><div>Question 1 of 10</div><div class="timer">0:15</div></div>
                        <div class="easy-equation">
                            <div class="easy-term"></div>
                            <img src="./src/add.png"></img>
                            <div class="easy-term"></div>
                            <img src="./src/equals.png"></img>
                            <div class="answer">8</div>
                        </div>
                        <div class="term-options"></div>
                    </div>`,
        parent: 6,
        children: [11]
    },
    11: {
        id: 11,
        img: "blocks_challenge.png",
        name: "Challenge Complete!",
        parent: 6,
        children: []
    },
    12: { id: 12, img: "help.png", name: "Help", parent: -1 }
}

let currentPage, previousPage

let fadeInEvt = new Event("fadeIn")
let fadeOutEvt = new Event("fadeOut")

let app = document.getElementById("App")
function fadeIn() {
    app.style.opacity = Number(app.style.opacity) + 0.1
    if (app.style.opacity >= 1) {
        app.style.opacity = 1
        app.dispatchEvent(fadeInEvt)
    } else {
        requestAnimationFrame(fadeIn)
    }
}
function fadeOut() {
    app.style.opacity = Number(app.style.opacity) - 0.1
    if (app.style.opacity <= 0) {
        app.style.opacity = 0
        app.dispatchEvent(fadeOutEvt)
    } else {
        requestAnimationFrame(fadeOut)
    }
}
let headerImage = document.getElementById("App-header-logo")
let headerText = document.getElementById("App-header-text")
let headerHelp = document.getElementById("App-header-help")
let headerBack = document.getElementById("App-header-back")
function loadHeader(page) {
    headerImage.src = `./src/${page.img}`
    headerText.innerHTML = page.name
    if (page.help) {
        headerHelp.style.display = "inline"
    } else {
        headerHelp.style.display = "none"
    }
    if (page.parent !== undefined) {
        headerBack.style.display = "inline"
    } else {
        headerBack.style.display = "none"
    }
}
let body = document.getElementById("App-body")
function loadBody(page) {
    body.innerHTML = page.innerHTML
}

function loadPage(page) {
    previousPage = currentPage
    currentPage = page
    app.style.pointerEvents = "none"
    fadeOut()
}
function onFadeOut() {
    loadHeader(currentPage)
    loadBody(currentPage)
    fadeIn()
}
function onFadeIn() {
    app.style.pointerEvents = ""
}
app.addEventListener("fadeOut", onFadeOut.bind(this))
app.addEventListener("fadeIn", onFadeIn.bind(this))

function goTo(pageIndex) {
    if (pageTree[pageIndex] !== undefined) {
        loadPage(pageTree[pageIndex])
    } else {
        window.alert("This has not yet been implemented.")
    }
}

function goBack() {
    if (currentPage.parent === -1) {
        goTo(previousPage.id)
    } else {
        goTo(currentPage.parent)
    }
}

goTo(0)
