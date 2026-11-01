let app = document.getElementById("App")
let headerImage = document.getElementById("App-header-logo")
let headerText = document.getElementById("App-header-text")
let headerHelp = document.getElementById("App-header-help")
let headerBack = document.getElementById("App-header-back")
let subHeader = document.getElementById("App-sub-header")
let body = document.getElementById("App-body")

let fadeInEvt = new Event("fadeIn")
let fadeOutEvt = new Event("fadeOut")

function fadeIn(elem) {
    elem.style.opacity = Number(elem.style.opacity) + 0.1
    if (elem.style.opacity >= 1) {
        elem.style.opacity = 1
        elem.style.pointerEvents = ""
        elem.dispatchEvent(fadeInEvt)
    } else {
        requestAnimationFrame(() => {
            fadeIn(elem)
        })
    }
}
function fadeOut(elem) {
    if (elem.style.opacity === "" || elem.style.opacity === 1) {
        elem.style.opacity = 1
        elem.style.pointerEvents = "none"
    }
    elem.style.opacity = Number(elem.style.opacity) - 0.1
    if (elem.style.opacity <= 0) {
        elem.style.opacity = 0
        elem.dispatchEvent(fadeOutEvt)
    } else {
        requestAnimationFrame(() => {
            fadeOut(elem)
        })
    }
}
function loadHeader(page) {
    headerImage.src = `./img/${page.img}`
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
function loadSubHeader(page) {
    if (page.subHeader) {
        subHeader.innerHTML = page.subHeader
    } else {
        subHeader.innerHTML = ""
    }
}
function loadBody(page) {
    body.innerHTML = page.innerHTML
}

let currentPage, previousPage
function loadPage(page) {
    if (previousPage?.onLeave) previousPage.onLeave()
    previousPage = currentPage
    currentPage = page
    app.style.pointerEvents = "none"
    fadeOut(app)
}
function onFadeOut() {
    loadHeader(currentPage)
    loadSubHeader(currentPage)
    loadBody(currentPage)
    if (currentPage.onFadeOut) {
        currentPage.onFadeOut()
    }
    fadeIn(app)
}
function onFadeIn() {
    if (currentPage.onFadeIn) {
        currentPage.onFadeIn()
    }
}
app.addEventListener("fadeOut", onFadeOut)
app.addEventListener("fadeIn", onFadeIn)

function goTo(pageIndex) {
    if (pageTree[pageIndex] !== undefined) {
        loadPage(pageTree[pageIndex])
    } else {
        window.alert("Attempted to load a page that does not exist.")
    }
}

function goBack() {
    if (currentPage.parent === -1) {
        goTo(previousPage.id)
    } else {
        goTo(currentPage.parent)
    }
}

let sum
function populateEquation(numTerms, maxTerm) {
    let lastSum = sum
    let opts = []
    while (sum === lastSum) {
        sum = 0
        opts = []
        for (let t = 0; t < numTerms; t++) {
            let opt = randInt(1, maxTerm)
            opts.push(opt)
            sum += opt
        }
    }

    let trms = []
    if (sum > 5) {
        for (let t = 1; t < Math.min(sum, maxTerm + 1); t++) {
            if (!opts.includes(t)) {
                trms.push(t)
            }
        }
    } else if (sum === 3) {
        trms = [1, 1, 1, 2]
    } else if (sum === 4) {
        trms = [1, 1, 2, 3]
    } else if (sum === 5) {
        trms = [1, 1, 2, 3, 3, 4]
    }

    for (let i = 0; i < numTerms + 1; i++) {
        opts.push(trms.splice(randInt(0, trms.length - 1), 1)[0])
    }

    shuffle(opts)

    let eqnHTML = ""
    for (let t = 0; t < numTerms; t++) {
        eqnHTML += `<div class="term"></div>`
        if (t < numTerms - 1)
            eqnHTML += `<img class="plus" src="./img/add.png"/>`
        else
            eqnHTML += `<img src="./img/equals.png"/><div id="answer">${sum}</div>`
    }
    let equation = document.getElementsByClassName("equation")[0]
    equation.innerHTML = eqnHTML

    let optsHTML = ""
    for (let t = 0; t < opts.length; t++) {
        optsHTML += `<div id="opt${t}" class="block-container" onclick="addBlock('opt${t}')">`
        let tens = Math.floor(opts[t] / 10)
        let fives = Math.floor((opts[t] - tens * 10) / 5)
        let ones = opts[t] - tens * 10 - fives * 5
        for (let i = 0; i < tens; i++) {
            optsHTML += `<div class="ten-container"><div class="ten-number">10</div><img class="ten-block" src="./img/ten_block.png" style="rotate:${90 * randInt(0, 3)}deg;"/></div>`
        }
        for (let i = 0; i < fives; i++) {
            optsHTML += `<div class="five-container"><div class="five-number">5</div><img class="five-block" src="./img/five_block.png" style="rotate:${90 * randInt(0, 3)}deg;"/></div>`
        }
        for (let i = 0; i < ones; i++) {
            optsHTML += `<img class="one-block" src="./img/block${randInt(1, 5)}.png" style="rotate:${90 * randInt(0, 3)}deg;"/>`
        }
        optsHTML += "</div>"
    }
    let termOptions = document.getElementsByClassName("term-options")[0]
    termOptions.innerHTML = optsHTML
}

function randInt(min, max) {
    return min + Math.round(Math.random() * (max - min))
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
    }

    return array
}

function addBlock(id) {
    let opt = document.getElementById(id)
    if (opt.parentElement.className === "term") {
        let opts = document.getElementsByClassName("term-options")[0]
        opts.appendChild(opt)
    } else {
        let terms = document.getElementsByClassName("term")
        for (let i = 0; i < terms.length; i++) {
            if (terms[i].children.length === 0) {
                terms[i].appendChild(opt)
                break
            }
        }

        let val = 0
        for (let i = 0; i < terms.length; i++) {
            if (terms[i].children.length === 0) break
            else
                val +=
                    terms[i].children[0].getElementsByClassName("ten-block")
                        .length *
                        10 +
                    terms[i].children[0].getElementsByClassName("five-block")
                        .length *
                        5 +
                    terms[i].children[0].getElementsByClassName("one-block")
                        .length
            if (i === terms.length - 1) {
                //console.log(`${val} ${val === sum ? "=" : "≠"} ${sum}`)
                if (val === sum) {
                    equationCorrect(terms)
                } else {
                    equationWrong(terms)
                }
            }
        }
    }
}

let question = 1
body.addEventListener("fadeOut", () => {
    loadBody(currentPage)
    if (currentPage.onFadeOut) currentPage.onFadeOut()
    fadeIn(body)
})
function equationCorrect(terms) {
    let equation = document.getElementsByClassName("equation")[0]
    let pluses = document.getElementsByClassName("plus")
    body.style.pointerEvents = "none"
    let promises = []
    for (let plus of pluses) {
        promises.push(
            plus.animate(
                {
                    opacity: [1, 0, 0, 0],
                    height: ["150px", "150px", "0px", "0px"],
                    offset: [0, 0.05, 0.2, 1]
                },
                {
                    fill: "forwards",
                    duration: 500,
                    iterations: 1
                }
            ).finished
        )
    }
    Promise.all(promises).then(() => {
        fadeOut(body)
        if (question === 10) {
            goTo(currentPage.children[0])
        } else {
            if (currentPage.id >= 7 && currentPage.id <= 10) {
                question++
                document.getElementById("question-number").innerHTML =
                    `Question ${question} of 10`
            }
        }
    })
}

function equationWrong(terms) {
    for (let term of terms) {
        term.animate(
            [
                { borderColor: "#bbbbbb" },
                { borderColor: "#ff0000" },
                { borderColor: "#bbbbbb" }
            ],
            { duration: 1000, iterations: 1 }
        )
    }
}

let timerSeconds
let timerMinutes
app.addEventListener("fadeIn", startTimer)

let startTime, deltaTime, bestTime
function startTimer() {
    if (currentPage.id === 10) {
        question = 1
        timerSeconds = document.getElementById("seconds")
        timerMinutes = document.getElementById("minutes")
        app.addEventListener("fadeOut", stopTimer)
        startTime = Date.now()
        tick()
    }
}

let tickFrame
function tick() {
    deltaTime = Date.now() - startTime
    let seconds = Math.floor(deltaTime / 1000) % 60
    let minutes = Math.floor(deltaTime / 1000 / 60) % 60
    timerSeconds.innerHTML = (seconds < 10 ? "0" : "") + seconds
    timerMinutes.innerHTML = (minutes < 10 ? "0" : "") + minutes
    tickFrame = requestAnimationFrame(tick)
}

function stopTimer() {
    cancelAnimationFrame(tickFrame)
}

// load top page
goTo(0)
