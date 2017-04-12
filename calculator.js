var arrScreen = [];

var numButtons = document.querySelectorAll(".number");
var isTotalDone = false;
setupListener();


function setupListener(){
    for (var i = 0; i < numButtons.length; i++){
        numButtons[i].addEventListener("click", function(){
        printNumber(this.id);

        });
    }
}

function printNumber(id){
    switch (id){
        case "zero":
            var num = 0;
            break;
        case "one":
            var num = 1;
            break;
        case "two":
            var num = 2;
            break;
        case "three":
            var num = 3;
            break;
        case "four":
            var num = 4;
            break;
        case "five":
            var num = 5;
            break;
        case "six":
            var num = 6;
            break;
        case "seven":
            var num = 7;
            break;
        case "eight":
            var num = 8;
            break;
        case "nine":
            var num = 9;
            break;

    }

    display(num);

}

function display(str){
    var screen = document.getElementById("screen");
    var history = document.getElementById("history");

    if (screen.textContent=="0" || isTotalDone==true){
        history.textContent="";
        screen.textContent="";
        isTotalDone=false;
    }
    if (str!="ERROR"){
        screen.textContent = screen.textContent + str;
        //isTotalDone=false;

    } else { //print error
        screen.textContent = str;
        isTotalDone=false;

    }
}


document.getElementById("plus").addEventListener("click", function(){
    operators("plus");
});

document.getElementById("dot").addEventListener("click", function(){
    operators("dot");
});

document.getElementById("minus").addEventListener("click", function(){
    operators("minus");
});

document.getElementById("times").addEventListener("click", function(){
    operators("times");
});

document.getElementById("divide").addEventListener("click", function(){
    operators("divide");
});


document.getElementById("equal").addEventListener("click", function(){
    var screen = document.getElementById('screen');
    var lastChar = screen.textContent.slice(-1);
    if(lastChar >=0){
        calculate();
    } else {
        display("ERROR");
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
        //phone_number.pop(); //Remove the last element from the phone number. It's length is maintained by js itself.
        //return false; //What's this for?

    //removeLastEntry();
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
    //} else {
    //     display("ERROR");

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
