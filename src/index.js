let app = document.getElementById("App")
let headerImage = document.getElementById("App-header-logo")
let headerText = document.getElementById("App-header-text")
let headerHelp = document.getElementById("App-header-help")
let headerBack = document.getElementById("App-header-back")
let body = document.getElementById("App-body")

let fadeInEvt = new Event("fadeIn")
let fadeOutEvt = new Event("fadeOut")

function fadeIn(elem) {
    elem.style.opacity = Number(elem.style.opacity) + 0.1
    if (elem.style.opacity >= 1) {
        elem.style.opacity = 1
        elem.dispatchEvent(fadeInEvt)
    } else {
        requestAnimationFrame(() => {
            fadeIn(elem)
        })
    }
}
function fadeOut(elem) {
    if (elem.style.opacity === "") {
        elem.style.opacity = 1
    } else {
        elem.style.opacity = Number(elem.style.opacity) - 0.1
    }
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
function loadBody(page) {
    body.innerHTML = page.innerHTML
}

let currentPage, previousPage
function loadPage(page) {
    previousPage = currentPage
    currentPage = page
    app.style.pointerEvents = "none"
    fadeOut(app)
}
function onFadeOut() {
    loadHeader(currentPage)
    loadBody(currentPage)
    if (currentPage.onFadeOut) {
        currentPage.onFadeOut()
    }
    fadeIn(app)
}
function onFadeIn() {
    app.style.pointerEvents = ""
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

let sum
function populateEquation(numTerms, maxTerm) {
    let opts = []
    sum = 0
    for (let t = 0; t < numTerms; t++) {
        let opt = randInt(1, maxTerm)
        opts.push(opt)
        sum += opt
    }

    for (let t = 0; t < numTerms + 1; t++) {
        opts.splice(
            randInt(0, opts.length - 1),
            0,
            randInt(1, Math.min(sum - 1, maxTerm))
        )
    }

    let optsHTML = ""
    for (let t = 0; t < opts.length; t++) {
        optsHTML += `<div id="opt${t}" class="block-container" onclick="addBlock('opt${t}')"${maxTerm > 5 ? 'style="max-width: 250px; max-height: 100px;"' : ""}>`
        for (let i = 0; i < opts[t]; i++) {
            optsHTML += `<img src="./img/block${randInt(1, 5)}.png" style="rotate:${90 * randInt(0, 3)}deg;${maxTerm > 5 ? "width: 50px" : ""}"/>`
        }
        optsHTML += "</div>"
    }
    let termOptions = document.getElementsByClassName("term-options")[0]
    termOptions.innerHTML = optsHTML

    let answer = document.getElementById("answer")
    answer.innerHTML = sum
}

function randInt(min, max) {
    return min + Math.round(Math.random() * (max - min))
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
            else val += terms[i].children[0].children.length
            if (i === terms.length - 1) {
                console.log(`${val} ${val === sum ? "=" : "≠"} ${sum}`)
                if (val === sum) {
                    equationCorrect(terms)
                } else {
                    equationWrong(terms)
                }
            }
        }
    }
}

body.addEventListener("fadeOut", () => {
    loadBody(currentPage)
    if (currentPage.onFadeOut) currentPage.onFadeOut()
    fadeIn(body)
})
function equationCorrect(terms) {
    for (let term of terms) {
        term.animate(
            [
                { borderColor: "#bbbbbb" },
                { borderColor: "#00ff00" },
                { borderColor: "#bbbbbb" }
            ],
            {
                duration: 1000,
                iterations: 1
            }
        )
    }
    setTimeout(() => {
        fadeOut(body)
    }, 1000)
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

let startTime, deltaTime
function startTimer() {
    if (currentPage.id === 10) {
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
