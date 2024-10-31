window.onload = () => {
    const NUMBER_BUTTON = 6;

    function CreateSelect(number){
        const OPTION            = document.createElement("option");
              OPTION.value      = number;
              OPTION.innerHTML  = number;

        const SELECT = document.querySelector("select");
              SELECT.appendChild(OPTION);
    }

    for( i = 2; i <= NUMBER_BUTTON; i++ ) { 
        CreateSelect(i); 
    }

    function ClearBoard(){
        try {
            const BOARD = document.querySelector("main");
                  BOARD.remove();
        } catch (error) {}
    }

    function CreateBoard(){
        const MAIN   = document.createElement("main");
        const HEADER = document.querySelector("header");
              HEADER.after(MAIN);
    }

    function DisplayFooter(){
        let FOOTER = document.querySelector("footer");
            FOOTER.remove();
    }

    function AddHighScore(){
        const H2  = document.createElement("h2");
        localStorage.getItem("highScore") === null ? H2.innerHTML  = "score  " + 0 : H2.innerHTML  = "score  " + localStorage.getItem("highScore");

        const H1 = document.querySelector("h1");
              H1.innerHTML  = "score  " + 0;
              H1.after(H2);
    }
    
    const VALIDER = document.getElementById("submit-button-number");
          VALIDER.addEventListener("click", () => {
        let VALUE = document.getElementById("choose-button-number").value;
        ClearBoard();
        CreateBoard();
        DisplayFooter();
        AddHighScore();
        Game(VALUE);
    });

    function Game(number) {
        const COLOR_BUTTON = ["red", "blue", "green", "yellow", "purple", "black"];
        let cycle       = [];
        let cycleButton = [];

        let score     = 0;
        let highScore = 0;
    
        function ColorCycle() {
            AddNumberToCycle();
            ResetCycleButton();
            lightColorCycle();
        }

        function AddNumberToCycle() {
            const PLACE = Math.floor(Math.random() * number);
            cycle.push(PLACE);
        }

        function ResetCycleButton() {
            cycleButton.length = 0;
        }

        async function lightColorCycle() {
            for (let i = 0; i < cycle.length; i++) {
                const button           = document.querySelector('.' + COLOR_BUTTON[cycle[i]]);  
                      button.className = COLOR_BUTTON[cycle[i]] + "-light";
                await Stop();
                      button.className = COLOR_BUTTON[cycle[i]];
                await Stop(600);
            };
        }

        function Stop( timeStop = 1000) {
            return new Promise(resolve => { setTimeout(resolve, timeStop); });
        }
        
        function Button(id, color) {
            this.id    = id;
            this.value = color;
        }

        function verifyColor() {
            for (let i = 0; i < cycleButton.length; i++) {
                if(cycle[i] !== cycleButton[i]) {
                    return false;
                }
            }
            return true;
        }
        
        function createButton() {
            for(let i = 0; i < number; i++) {
                let button = new Button(i, COLOR_BUTTON[i]);
                displayButton(button);
            }
        }

        function displayButton(button) {    
            let div           = document.createElement('div');
                div.id        = button.id;
                div.className = button.value;
                div.addEventListener("click", () => { CheckColor(button.id); });

            const MAIN = document.querySelector('main');
                  MAIN.appendChild(div);
        }

        async function CheckColor(buttonColor) {
            cycleButton.push(buttonColor);
            if(verifyColor() && cycle.length === cycleButton.length) {
                ScoreIncrement();
                ScoreDisplay()
                ResetCycleButton();
                await Stop();
                ColorCycle();
            } else if(verifyColor() !== true) {
                ScoreReset()
                ScoreDisplay();
            }
        }

        function createButtonStart() {    
            let div           = document.createElement('div');
                div.id        = "divPlay";
                div.className = "divPlay";

            let button           = document.createElement('button');
                button.id        = "buttonPlay";
                button.className = "buttonPlay";
                button.innerHTML = "PLAY";
                button.addEventListener("click", async () => {
                    cycle.length = 0; 
                    await Stop(700);
                    ColorCycle();
                });

            const MAIN = document.querySelector('main');
                  MAIN.after(div);
            const DIV_PLAY = document.querySelector("#divPlay");
                  DIV_PLAY.append(button);
        }

        function ScoreIncrement() {
            score++;
            VerifyHighScore();
        }

        function ScoreReset() {
            score = 0;
        }

        function ScoreDisplay() {
            const H1            = document.querySelector("h1");
                  H1.innerHTML  = "score  " + score;
        }

        function VerifyHighScore() {
            if(score > highScore) {
                highScoreUpdate()
            } 
        }

        function highScoreUpdate() {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            const H2            = document.querySelector("h2");
                  H2.innerHTML  = "high score  " + localStorage.getItem("highScore");
        }

        createButton();
        createButtonStart();
    }
}