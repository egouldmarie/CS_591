const pageTree = {
    0: {
        id: 0,
        img: "logo.svg",
        name: "Math Buddy",
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(1)"><img src="./img/add.png"/> Addition</div>
                        <div class="button" onclick="goTo(2)"><img src="./img/sub.png"/> Subtraction</div>
                    </div>
                    <div class="row">
                        <div class="button" onclick="goTo(3)"><img src="./img/mul.png"/> Multiplication</div>
                        <div class="button" onclick="goTo(4)"><img src="./img/div.png"/> Division</div>
                    </div>`,
        children: [1]
    },
    1: {
        id: 1,
        img: "add.png",
        name: "Addition",
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(6)"><img src="./img/blocks.png"/> Blocks</div>
                        <div class="button" onclick="goTo(5)"><img src="./img/bnb.png"/> Break N' Build</div>
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
        help: true,
        innerHTML: `<div class="row">
                        <div class="button" onclick="goTo(7)" style="flex-direction:column;"><img src="./img/blocks_easy.png"/><div>Easy</div></div>
                        <div class="button" onclick="goTo(8)" style="flex-direction:column;"><img src="./img/blocks_medium.png"/><div>Medium</div></div>
                        <div class="button" onclick="goTo(9)" style="flex-direction:column;"><img src="./img/blocks_hard.png"/><div>Hard</div></div>
                        <div class="button" onclick="goTo(10)" style="flex-direction:column;"><img src="./img/blocks_challenge.png"/><div>Challenge</div></div>
                    </div>`,
        parent: 1,
        children: [7, 8, 9, 10]
    },
    7: {
        id: 7,
        img: "blocks_easy.png",
        name: "Easy",
        onFadeOut: () => {
            populateEquation(2, 5)
        },
        innerHTML: `<div class="column">
                        <div></div>
                        <div class="equation">
                            <div id="term1" class="term"></div>
                            <img id="term2" src="./img/add.png"/>
                            <div class="term"></div>
                            <img src="./img/equals.png"/>
                            <div id="answer"></div>
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
        onFadeOut: () => {
            populateEquation(2, 10)
        },
        innerHTML: `<div class="column">
                        <div></div>
                        <div class="equation">
                            <div id="term1" class="term"></div>
                            <img src="./img/add.png"/>
                            <div id="term2" class="term"></div>
                            <img src="./img/equals.png"/>
                            <div id="answer"></div>
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
        onFadeOut: () => {
            populateEquation(3, 10)
        },
        innerHTML: `<div class="column">
                        <div></div>
                        <div class="equation">
                            <div id="term1" class="term"></div>
                            <img src="./img/add.png"/>
                            <div id="term2" class="term"></div>
                            <img src="./img/add.png"/>
                            <div id="term3" class="term"></div>
                            <img src="./img/equals.png"/>
                            <div id="answer"></div>
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
        onFadeOut: () => {
            populateEquation(2, 5)
        },
        innerHTML: `<div class="column">
                        <div class="challenge-header">
                            <div>Question 1 of 10</div>
                            <div class="timer">
                                <div id="minutes">00</div>
                                :
                                <div id="seconds">00</div>
                            </div>
                        </div>
                        <div class="equation">
                            <div class="term"></div>
                            <img src="./img/add.png"/>
                            <div class="term"></div>
                            <img src="./img/equals.png"/>
                            <div id="answer"></div>
                        </div>
                        <div class="term-options">
                            <div class="block-container">
                                <img src="./img/block1.png"/>
                            </div>
                        </div>
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
