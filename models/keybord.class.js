class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    STRG = false;
    SHIFT = false;
    F = false;
    RETURN = false;
    Q = false;


    /**
     * Query whether touch button was pressed or not
     */
    touchPress() {
        this.pressQ();
        this.pressRETURN();
        this.pressLEFT();
        this.pressRIGHT();
        this.pressSTRG();
        this.pressSHIFT();
        this.pressSPACE();
    }


    /**
     * touch the button for sound on or not
     */
    pressQ() {
        document.getElementById('btnSound').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.Q = true;
        });
        document.getElementById('btnSound').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.Q = false;
        });
    }


    /**
     * touch the button for return
     */
    pressRETURN() {
        document.getElementById('btnFullScreen').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RETURN = true;
        });
        document.getElementById('btnFullScreen').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RETURN = false;
        });
    }


    /**
     * touch the button for walk left or not
     */
    pressLEFT() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }


    /**
     * touch the button for walk right or not
     */
    pressRIGHT() {
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }


    /**
     * touch the button for attack or not
     */
    pressSTRG() {
        document.getElementById('btnAttack').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.STRG = true;
        });
        document.getElementById('btnAttack').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.STRG = false;
        });
    }


    /**
     * touch the button for throw bomb or not
     */
    pressSHIFT() {
        document.getElementById('btnBomb').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SHIFT = true;
        });
        document.getElementById('btnBomb').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SHIFT = false;
        });
    }


    /**
     * touch the button for jump or not
     */
    pressSPACE() {
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }
}