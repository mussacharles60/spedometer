const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

var $ = jQuery = require("jquery");

// const path = require('path');

var connected = false;
var started = false;

// function listenAudioEvents(audio) {
//     audio.addEventListener('play', () => {
//         $('#amin-container').hide();
//         $('#first').hide();
//         $('#output-container').show();
//     });
//     audio.addEventListener('ended', () => {
//         $('#amin-container').show();
//         if (connected) {
//             $('#first').hide();
//         } else {
//             $('#first').show();
//         }
//         $('#output-container').hide();
//     });
// }

document.addEventListener('DOMContentLoaded', function () {
    $('#connect-btn').on('click', () => {
        ipcRenderer.send('on-start-click', 'do-it');
    });
    $('#btn').on('click', () => {
        ipcRenderer.send('on-restart-click', 'do-it');
    });
    $('#video').trigger('play');
    $('#video').on('ended', () => {
        $('#splash').hide();
    });

    $('#output-container').hide();

    $("#gauge-1").speedometer({
        divFact: 10,
        eventListenerType: 'keyup',
        maxVal: 200,
        dangerLevel: 140,
        gagueLabel: 'km/h',
    });
    $("#gauge-2").speedometer({
        divFact: 10,
        eventListenerType: 'keyup',
        maxVal: 200,
        dangerLevel: 140,
        gagueLabel: 'km/h',
    });

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        var isDev = false;
        var isRestart = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
            isDev = (evt.ctrlKey && evt.shiftKey && evt.key === "I");
            isRestart = (evt.ctrlKey && evt.shiftKey && evt.key === "R");
        } else {
            isEscape = (evt.keyCode === 27);
            isDev = (evt.ctrlKey && evt.shiftKey && evt.keyCode === 73);
            isRestart = (evt.ctrlKey && evt.shiftKey && evt.keyCode === 82);
        }
        if (isEscape) {
            ipcRenderer.send('on-go-back', 'do-it');
        }
        if (isDev) {
            ipcRenderer.send('on-dev-click', 'do-it');
        }
        if (isRestart) {
            ipcRenderer.send('on-restart-click', 'do-it');
        }
    };
});

ipcRenderer.on('on-serial-open', () => {
    connected = true;
    $('#connect-btn').hide();
    // $('#stop-btn').on('click', () => {
    //     ipcRenderer.send('on-stop-click', 'do-it');
    // });
    $('#status').text('Connected');
    $('#first').hide();
    $('#output-container').show();
    $('#gauges-container').hide();
    $('#play-btn').on('click', () => {
        started = true;
        $('#play-btn').hide();
        $('#gauges-container').show();
        ipcRenderer.send('on-start-device-click', 'do-it');
    });
    // $('#stop-btn').on('click', () => {
    //     started = false;
    //     ipcRenderer.send('on-stop-device-click', 'do-it');
    // });
});

ipcRenderer.on('on-serial-close', () => {
    connected = false;
    $('#connect-btn').show();
    $('#status').text('Not Connected');
    $('#first').hide();
    $('#output-container').hide();
    $('#play-btn').show();
    $('#gauges-container').hide();
});

ipcRenderer.on('on-serial-data', (_event, data) => {
    if (!started) {
        return;
    }
    $('#output-container').show();
    $('#play-btn').hide();
    $('#gauges-container').show();
    console.log("on-serial-data:", data);
    // $('#output-text').text(data);
    // beep();
    // audio.pause();
    // if (data == 1) {
    //     audio = new Audio(audio_1_file);
    // }
    // else if (data == 2) {
    //     audio = new Audio(audio_2_file);
    // }
    // else if (data == 3) {
    //     audio = new Audio(audio_3_file);
    // }
    // else if (data == 4) {
    //     audio = new Audio(audio_4_file);
    // }
    // else if (data == 5) {
    //     audio = new Audio(audio_5_file);
    // }
    // listenAudioEvents(audio);
    // audio.play();
});
