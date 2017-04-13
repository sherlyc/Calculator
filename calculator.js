var screen = document.getElementById("screen");
var isTotalDone = false;
var isError = false;
setupListener();

function setupListener(){ //setup event listeners for all buttons
    var numButtons = document.querySelectorAll(".number");
    var funButtons = document.querySelectorAll(".function")

    for (var i = 0; i < numButtons.length; i++){
        numButtons[i].addEventListener("click", function(){
            printNumber(this.id);

        });
    }

    for (var i = 0; i < funButtons.length; i++) {
        funButtons[i].addEventListener("click", function(){
            operators(this);
        });
    }
}

function printNumber(value){ //this function will add digits to the calculator screen
    var currentNum = screen.textContent;
    if(currentNum==0){
        screen.textContent = value;
        return;
    }
    if(isTotalDone ==true||isError==true){
        resetAll();
        screen.textContent = value;
    } else {
        screen.textContent += value;
    }
}

function operators(obj){
    if (isTotalDone==true || isError){ //if user already completed a calculation or there was an error, reset all
        resetAll();
    }

    if(obj.id=="decimal"){
        decimal();
        return;
    }

    if(obj.id=="equal"){
        calculate();
        return;
    }

    if(obj.id=="ce"){
        ce();
        return;
    }
    if(obj.id=="allclear"){
        resetAll();
        return;
    }

    var lastChar = screen.textContent.slice(-1); //get the last entered number or operator.
    if(isNaN(lastChar)==true){ //if last entry is an operator
        if (obj.id=="minus" && lastChar != '-'){ //allow negative
            screen.textContent = screen.textContent + "-";
            return;
        }
        screen.textContent = screen.textContent.slice(0, -1)
        //confirm no operator
        lastChar = screen.textContent.slice(-1);
        if (isNaN(lastChar)==false){
            screen.textContent += obj.value;
        } else {
            screen.textContent = screen.textContent.slice(0, -1) + obj.value

        }; //remove last operator and add current one.
    } else {
        screen.textContent += obj.value;
    }
}

function decimal(){ //this function takes care of decimal point.

    var lastChar = screen.textContent.slice(-1);

    if(screen.textContent=="0"||isTotalDone ==true||isError==true){
        resetAll();
        screen.textContent += ".";
        return;
    }

    if (lastChar != '.' && lastChar >= 0){ //check for duplicate decimal point
        screen.textContent +=".";
        return;
    }

    screen.textContent +="0.";
}

function calculate(){
    var lastChar = screen.textContent.slice(-1);
    if(lastChar >=0){ //if it is a number
        var historyStr = screen.textContent;
        var str = screen.textContent;
        var newStr = str.replace('÷','/').replace('x', '*'); //replace math symbols with js understood symbols
        var total=eval(newStr);
        total= Math.round( total * 10 ) / 10; //round the number to one decimal place
        screen.textContent=total; //update the calculator with new total
        isTotalDone=true;
        document.getElementById("history").textContent=historyStr+"="; //update history
    } else {
        error();
    }
}

function resetAll(){ //clear all calculator entries including history.
    document.getElementById("history").textContent="";
    screen.textContent="0";
    isError=false;
    isTotalDone=false;
}

function error(){ //Error message generator
    screen.textContent = "ERROR";
    isTotalDone=false;
    isError=true;
}

function ce(){//function clear last entry *backspace delete
    var history = document.getElementById("history");
    if(isTotalDone==false && screen.textContent.length > 1){
        screen.textContent = screen.textContent.slice(0, -1);
        //alert(screen.textContent.length);
    } else {
        screen.textContent="0";
        history.textContent="";
        isTotalDone=false;
    }
};
