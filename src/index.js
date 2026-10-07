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
