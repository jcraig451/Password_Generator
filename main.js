

// DOM elements taken from the HTML file 
var resultEl = document.getElementById('result');
var generateEl = document.getElementById('generate');
var clipboardEl = document. getElementById('clipboard');


// This fuction prompts the user to place all variables for the generated password
generateEl.addEventListener('click', function(){
    var lengthEl = prompt("Select length of password between 8-128 characters:", "8-128");
    if (lengthEl == null || lengthEl == "" || lengthEl < 8 || lengthEl > 128){
        alert("Not a valid entry try again")
        return ""
    }

    var lowerEl = confirm("Do you want your password to contain a lowercase letter?");
    var upperEl = confirm("Do you want your password to contain an UPPERCASE letter?");
    var numberEl = confirm("Do you want your password to contain a number?");
    var symbolEl = confirm("Do you want your password to contain a symbol?");

    if (lowerEl + upperEl + numberEl + symbolEl == false){
        alert("Not a valid entry try again")
    }
    
    var length = lengthEl.value;
    
    resultEl.innerText = generatePW(lowerEl, upperEl, numberEl, symbolEl, lengthEl);  
    
  
    
})
//Below is the JS code for coping to clipboard via the click event
clipboardEl.addEventListener('click', function(){
    if(resultEl.value === ''){
    return;
    } else {
        // document.innertext.appendChild(resultEl);
        resultEl.select();
        resultEl.execCommand('copy');
        alert("Copied password to clipboard:");
    }
});

// this function takes the user imputs and places them in an array to form a random password
function generatePW(lower, upper, number, symbol, length){
    var userGeneratedPW = '';
    var variablesCount = lower + upper + number + symbol;
    var variablesArry = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(variablesCount == 0){
        return "";
    }

    for(var b = 0; b < length; b += variablesCount){
        variablesArry.forEach(type => {
            var funcName = Object.keys(type)[0];

            userGeneratedPW += randomFunc[funcName]();

        });
    }

    var finalPW = userGeneratedPW.slice(0, length);
    return finalPW

}
// variable to store values in to keys from below
var randomFunc = {
    lower: randomLwCase,
    upper: randomUpCase,
    number: randomNum,
    symbol: randomSym,
}

//Random value Generator functions using the Character Set values 
//Uppercase function
function randomUpCase(){
    return String.fromCharCode(Math.floor(Math.random()*26) +65);
}
//Lowercase fuction
function randomLwCase(){
    return String.fromCharCode(Math.floor(Math.random()*26) +97);
}
//Number fuction
function randomNum(){
    return String.fromCharCode(Math.floor(Math.random()*10) +48);
}
//Symbol Function set as an array for ease of coding from Character Set
function randomSym(){
    var symbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
    return symbols[Math.floor(Math.random() *symbols.length)];
}
