const pageTree = {
    0: {
        img: "logo.svg",
        name: "Math Buddy",
        innerHTML: `<div class="column">
                        <div class="row">
                            <div class="button" onclick="goTo(1)"><img src="./src/add.png"></img> Addition</div>
                            <div class="button" onclick="goTo(-1)"><img src="./src/sub.png"></img> Subtraction</div>
                        </div>
                        <div class="row">
                            <div class="button" onclick="goTo(-1)"><img src="./src/mul.png"></img> Multiplication</div>
                            <div class="button" onclick="goTo(-1)"><img src="./src/div.png"></img> Division</div>
                        </div>
                    </div>`,
        parent: null,
        children: [1]
    },
    1: {
        img: "add.png",
        name: "Addition",
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(2)"><img src="./src/bnb.png"></img> Break N' Build</div>
                        <div class="button" onclick="goTo(3)"><img src="./src/blocks.png"></img> Blocks</div>
                    </div>`,
        parent: 0,
        children: [2, 3]
    },
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
    return new Promise((resolve, reject) => {
        let opacity = 0
        let interval = setInterval(() => {
            opacity += 0.1
            app.style.opacity = opacity
            if (opacity >= 1) {
                clearInterval(interval)
                resolve(true)
            }
        }, 50)
    })
}
function fadeOut() {
    return new Promise((resolve, reject) => {
        let opacity = 1
        let interval = setInterval(() => {
            opacity -= 0.1
            app.style.opacity = opacity
            if (opacity <= 0) {
                clearInterval(interval)
                resolve(true)
            }
        }, 50)
    })
}
let headerImage = document.getElementById("App-header-logo")
let headerText = document.getElementById("App-header-text")
let headerBack = document.getElementById("App-header-back")
function loadHeader(page) {
    headerImage.src = `./src/${page.img}`
    headerText.innerHTML = page.name
    if (page.parent !== null) {
        headerBack.style.display = "inline"
    } else {
        headerBack.style.display = "none"
    }
}
let body = document.getElementById("App-body")
function loadBody(page) {
    body.innerHTML = page.innerHTML
}

let currentPage
function loadPage(page) {
    app.style.pointerEvents = "none"
    fadeOut().then(() => {
        currentPage = page
        loadHeader(page)
        loadBody(page)
        fadeIn().then(() => {
            app.style.pointerEvents = ""
        })
    })
}

function goTo(pageIndex) {
    if (pageTree[pageIndex] !== undefined) {
        loadPage(pageTree[pageIndex])
    } else {
        window.alert("This has not yet been implemented.")
    }
}

function goBack() {
    goTo(currentPage.parent)
}

goTo(0)
