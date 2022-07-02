let canvas;
let world;
let keyboard = new Keyboard();

/**
 * initiate the game
 * 
 * @param {number} number - number of selected character
 */
function init(number) {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, number);
}


/**
 * query whether key was pressed
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 17) {
        keyboard.STRG = true;
    }
    if (e.keyCode == 16) {
        keyboard.SHIFT = true;
    }
    if (e.keyCode == 70) {
        keyboard.F = true;
    }
    if (e.keyCode == 8) {
        keyboard.RETURN = true;
    }
});

/**
 * query whether key was released
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 17) {
        keyboard.STRG = false;
    }
    if (e.keyCode == 16) {
        keyboard.SHIFT = false;
    }
    if (e.keyCode == 70) {
        keyboard.F = false;
    }
    if (e.keyCode == 8) {
        keyboard.RETURNF = false;
    }
});


/**
 * query whether the device used is a cell phone or tablet
 * 
 * @returns true if it is a cellphone or tablet
 */
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


/**
 * Query whether it is in landscape format
 * 
 * @returns true if not landscape
 */
screen.orientation.onportrait = function() {
    let type = screen.orientation.type;
    let check = false;
    if (type.match(/portrait/)) {
        check = true;
    }
    return check;
}


/**
 * view or close the Help Containers
 */
function showHelp() {
    document.getElementById('help_Container').classList.toggle('helpdown');
    document.getElementById('help_Container').classList.toggle('helpup');
}

/**
 *Query the device and start the game
 *  
 * @param {number} number - number of selected character
 */
function startgame(number) {
    if (mobileAndTabletCheck() && screen.orientation.onportrait()) {
        showRotateDevice();
    } else {
        removeStartScreen(number);
    }
}


/**
 * show the container to rotate the device
 */
function showRotateDevice() {
    document.getElementById('rotateDevice').classList.remove('d-none')
    setTimeout(() => {
        document.getElementById('rotateDevice').classList.add('d-none')
    }, 1500);
}


/**
 * close the start screen, query whether touch buttons must be shown
 * 
 * @param {number} number - number of selected character
 */
function removeStartScreen(number) {
    init(number);
    document.getElementById('flag_container').classList.add('biggerFlag');
    setTimeout(() => {
        showGame();
        if (mobileAndTabletCheck()) {
            showMobileButtons();
        }
    }, 2000);
}


/**
 * close the container on the start screen
 */
function showGame() {
    document.getElementById('headline').classList.add('d-none');
    document.getElementById('boat').classList.add('d-none');
    document.getElementById('help_Container').classList.add('d-none');
    document.getElementById('flag_container').classList.add('d-none');
    document.getElementById('canvas_container').classList.remove('d-none');
    document.getElementById('canvas_container').classList.add('d-block');
}


/**
 * show the touch buttons
 */
function showMobileButtons() {
    document.getElementById('topBar_container').classList.remove('d-none');
    document.getElementById('topBar_container').classList.add('d-flex');
    document.getElementById('bottumBar_container').classList.remove('d-none');
    document.getElementById('bottumBar_container').classList.add('d-flex');

}


/**
 * reload the page
 */
function goReturn() {
    location.reload()
}


/**
 * initiate the undead game
 */
function startUndead() {
    document.getElementById('loseScreen').classList.add('d-none')
    document.getElementById('loseScreen').classList.remove('d-flex')
    world.undeadGame();
}