window.addEventListener('load', shuffleAll);
var allLevelDivs = document.querySelectorAll('[class*="level"]');
var twoSlices = [];
var currentView = 'level-1';
var timeout = 0;




function shuffleAll() {
    for (const levelDiv of allLevelDivs) {
        var allSlices = levelDiv.querySelectorAll('[class*=img-holder]');
        var orderArray = [];
        for (let i = 0; i < allSlices.length; i++) {
            orderArray.push(i + 1)
        }
        for (var i = 0; i < allSlices.length; i++) {
            var rand = Math.floor(Math.random() * orderArray.length)
            allSlices[i].style.order = orderArray[rand];
            orderArray.splice(rand, 1);
        }
    }
    startGame();
}

function startGame() {
    // set links to show hide
    setNavLinks();
    // set clicks on all slices
    addClicksToSlices();
}

function addClicksToSlices() {
    var allSlices = document.querySelectorAll('[class*="img-holder"]');
    for (const slice of allSlices) {
        slice.addEventListener('click', selectMe)
    }
}
function selectMe() {
    this.style.border = "3px solid red";
    twoSlices.push(this);
    if (twoSlices.length === 2) {
        // get order of clicks
        var orderFirst = window.getComputedStyle(twoSlices[0]).getPropertyValue('order');
        var orderSecond = window.getComputedStyle(twoSlices[1]).getPropertyValue('order');
        //reoreder
        twoSlices[0].style.order = orderSecond;
        twoSlices[1].style.order = orderFirst;

        twoSlices[0].style.border = "none";
        twoSlices[1].style.border = "none";

        // reset 
        twoSlices.length = 0;
        checkIsComplete()
    }
}

function checkIsComplete() {
    var currentDiv = document.querySelector('.' + currentView);
    var allSlices = currentDiv.querySelectorAll('[class*="img-holder"]');
    var correctOrder = [];

    for (var i = 0; i < allSlices.length; i++) {
        correctOrder.push(i + 1)
    }
    var currentOrder = [];
    for (var i = 0; i < allSlices.length; i++) {
        const slice = allSlices[i];
        currentOrder.push(window.getComputedStyle(slice).getPropertyValue('order'))
    }
    if (currentOrder.toString() == correctOrder.toString()) {
        var activeLink = document.querySelector('.active');
        activeLink.classList.add('finished');
        currentDiv.style.border = "10px solid gold";
        currentDiv.style.boxShadow = "0 0 20px black";
        getFinish();
        
        
        
        
        

    }

}

function getFinish() {
    var currentDiv = document.querySelector('.' + currentView);
    var allSlices = currentDiv.querySelectorAll('[class*="img-holder"]');
    var correctOrder = [];

    for (var i = 0; i < allSlices.length; i++) {
        correctOrder.push(i + 1)
    }
    var currentOrder = [];
    for (var i = 0; i < allSlices.length; i++) {
        const slice = allSlices[i];
        currentOrder.push(window.getComputedStyle(slice).getPropertyValue('order'))
    }
    if (currentView == 'level-3') {

        if (currentOrder.toString() == correctOrder.toString()) {
            
            alert('Excellent! You made it!');   
            stopTime(); 

        }

    }
}
function stopTime(){
    clearTimeout(timeout)
 }
function reset(){
    location.reload();
}

function setNavLinks() {
    var headerNavLinks = document.querySelectorAll('[data-lvl]');

    for (var i = 0; i < headerNavLinks.length; i++) {
        const link = headerNavLinks[i];
        link.addEventListener('click', function () {
            currentView = this.getAttribute('data-lvl');
            for (const mylink of headerNavLinks) {
                mylink.classList.remove('active');
            }
            this.classList.add('active');
            for (var i = 0; i < allLevelDivs.length; i++) {
                allLevelDivs[i].style.display = "none";
            }
            var divToShow = document.querySelector('.' + currentView);
            divToShow.style.display = "flex";
        })
    }
}
var mins = 2;

// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
var secs = mins * 60;

function countdown() {
    timeout =setTimeout('Decrement()', 1000);
}
function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");

        // if less than a minute remaining
        if (seconds < 59) {
            seconds.value = secs;
        }
        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        if (mins < 1) {
            minutes.style.color = "red";
            seconds.style.color = "red";
        }
        if (mins < 0) {
            alert('time up');

            minutes.value = 0;
            seconds.value = 0;
        }

        else {
            secs--;
            setTimeout('Decrement()', 1000);
        }

    }
}



function getminutes() {
    // minutes is seconds divided by 60, rounded down
    mins = Math.floor(secs / 60);

    return mins;
}
function getseconds() {
    // take mins remaining (as seconds) away from total seconds remaining
    return secs - Math.round(mins * 60);
}