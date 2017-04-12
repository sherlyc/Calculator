var screen = document.getElementById("screen");
var history = document.getElementById("history");
var isTotalDone = false;
var isError = false;
setupListener();


function setupListener(){
    var numButtons = document.querySelectorAll(".number");
    var operButtons = document.querySelectorAll(".opr")

    for (var i = 0; i < numButtons.length; i++){
        numButtons[i].addEventListener("click", function(){
            printNumber(this.id);

        });
    }

    for (var i = 0; i < operButtons.length; i++) {
        operButtons[i].addEventListener("click", function(){
            operators(this.id);
        });
    }


}

function printNumber(value){
    if(screen.textContent=="0"||isTotalDone ==true||isError==true){
        resetAll();
        screen.textContent = value;
    } else {
        screen.textContent += value;
    }

}

function resetAll(){
    history.textContent="";
    screen.textContent="";
    isError=false;
    isTotalDone=false;
}

function error(){
    screen.textContent = "ERROR";
    isTotalDone=false;
    isError=true;
}


document.getElementById("equal").addEventListener("click", function(){
    var screen = document.getElementById('screen');
    var lastChar = screen.textContent.slice(-1);
    if(lastChar >=0){
        calculate();
    } else {
        error();
    }

});



document.getElementById("ce").addEventListener("click", function(){
        var screen = document.getElementById('screen');
        var history = document.getElementById("history");

        console.log(isTotalDone);
        if(isTotalDone==false){
            screen.textContent = screen.textContent.slice(0, -1);

        }
        else {
            screen.textContent="";
            history.textContent="";
            isTotalDone=false;
        }

});

function operators(opr){
    var screen = document.getElementById("screen");
    var lastChar = screen.textContent.slice(-1);
    console.log("lastChar is :" + lastChar);
    if (screen.textContent=="0" || isTotalDone==true){
        history.textContent="";
        screen.textContent="0";
        isTotalDone=false;
    }
    if (opr=="dot" && lastChar != '.' && isTotalDone !=true ){
        screen.textContent = screen.textContent + ".";
    }

    if(lastChar>=0){


        if (opr=="plus" && lastChar != '+'){
            screen.textContent = screen.textContent + "+";

        }

        if (opr=="minus" && lastChar != '-'){

            screen.textContent = screen.textContent + "-";

        }

        if (opr=="times" && lastChar != 'x'){
            screen.textContent = screen.textContent + "x";
        }

        if (opr=="divide" && lastChar != "÷"){
            screen.textContent = screen.textContent + "÷";

        }

    }

}

function calculate(){
    var screen = document.getElementById("screen");
    var history= screen.textContent;
    var str = screen.textContent;
    newStr = str.replace('÷','/').replace('x', '*');
    var total=eval(newStr);
    total= Math.round( total * 10 ) / 10;
    screen.textContent=total;
    isTotalDone=true;
    displayCalc(history+"=");


}

function displayCalc(str){
    document.getElementById("history").textContent=str;

}
