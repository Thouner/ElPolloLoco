class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    STRG = false;
    SHIFT = false;
    F = false;
    RETURN = false;

    constructor() {
        this.touchPress();
    }


    touchPress() {
        document.getElementById('btnSound').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.Q = true;
        });
        document.getElementById('btnSound').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.Q = false;
        });
        document.getElementById('btnFullScreen').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.F = true;
        });
        document.getElementById('btnFullScreen').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.F = false;
        });
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btnAttack').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.STRG = true;
        });
        document.getElementById('btnAttack').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.STRG = false;
        });
        document.getElementById('btnBomb').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SHIFT = true;
        });
        document.getElementById('btnBomb').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SHIFT = false;
        });
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