var screen = document.getElementById("screen");
var isNoneZero=false;
var hasDecimal=false;
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
    if (isError){
        resetAll();
    }

    var currentVal = screen.textContent;
    if(currentVal==0 &&  currentVal.charAt(currentVal.length-1) != '.' || isTotalDone==true) {
        screen.textContent=value;
        isNoneZero=true;
    } else {
        screen.textContent += value;
        isNoneZero=true;

    }
    isTotalDone=false;
}

function zero(){
    var currentVal = screen.textContent;
      if(currentVal==0 && currentVal.charAt(currentVal.length-1) != '.'|| isTotalDone==true){ //if screen is default to zero number
          screen.textContent="0";
          isTotalDone=false;
          return;
      }
      var lastChar = screen.textContent.slice(-1); //get the last entered number or operator.
      if(isNaN(lastChar)==true){ //if last entry is operator, allow zero
          screen.textContent+="0";
          isNoneZero=false;
          return;
      }
      if (hasDecimal||isNoneZero){//can insert as many zero if there is a decimal point;
          screen.textContent +="0";
      }

}

function operators(obj){
    if (isError){ //if there was an error, reset all
        resetAll();
    }

    switch (obj.id) {
        case "zero": zero();
            return;
        case "decimal": decimal();
            return;
        case "equal": calculate();
            return;
        case "ce": ce();
            return;
        case "allclear": resetAll();
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
        if (isNaN(lastChar)==false){ //is a number
            screen.textContent += obj.value;
        } else { //remove last operator and add current one.
            screen.textContent = screen.textContent.slice(0, -1) + obj.value;

        };
    } else { //not operator
        screen.textContent += obj.value;
    }
    resetFlags();
}

function decimal(){ //this function takes care of decimal point.
    if(!hasDecimal){ //if user have not entered any decimal point yet
        screen.textContent +=".";
        hasDecimal=true;
    }
}

function calculate(){
    var lastChar = screen.textContent.slice(-1);
    if(lastChar >=0){ //if it is a number
        var historyStr = screen.textContent;
        var str = screen.textContent;
        var newStr = str.replace(/÷/g,'/').replace(/x/g, '*'); //replace math symbols with js understood symbols
        var total=eval(newStr);
        var roundPercision = 100000000000
        total= Math.round( total * roundPercision ) / roundPercision; //round the number to one decimal place
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
    resetFlags();
}

function error(){ //Error message generator
    screen.textContent = "ERROR";
    resetFlags();
}

function resetFlags(){
    isTotalDone=false;
    isError=false;
    hasDecimal=false;
    isNoneZero=false;
}

function ce(){//function clear last entry *backspace delete
    var history = document.getElementById("history");
    if(isTotalDone==false && screen.textContent.length > 1){
        screen.textContent = screen.textContent.slice(0, -1);
    } else {
        resetAll();
    }
};
