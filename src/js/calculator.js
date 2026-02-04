// what this file will know :
// 1. numbers
// 2. operators
// 3. rules of arithmetic operations
// 4. calculator state 

//what it does not know :
// 1. buttons , click
// 2. screen
// 3. user
// 4. DOM

// what this file will do :
// 1. store current value (number)
// 2. store previous value (number)
// 3. store operator (+, -, *, /)
// 4. perform calculation when needed
// 5. reset state
// 6. handle errors
// 7. delete last digit

//variables in calculator state

let currentValue="";  //what it represents
let previousValue=""; //when it is set
let operator=""; //when it exists
let isNewInput=true; //when it flips

//first action : take a input 
//how? 
// when user press a number button 
// we see that if no number exist , then we start one 
// if number exist , we append that number to current value

function inputDigit(digit){
    if (isNewInput){
        currentValue=digit;
        isNewInput=false;
    }
    else{
        currentValue=currentValue+digit;
    }
}

//second action : take a operator input 
//how?
// when user press a operator button we see that if no operator exist , then we store that operator in memory
// if operator exist , we perform calculation
//If no previous operator exists:
//store current value as previous
//store operator
//If previous operator exists:
//calculate using previous value and current value
//store result as previous value
//update operator
//for example : 2+3*4
// first 2+3=5
// then 5*4=20

function inputOperator(newOperator){
    // if (operator){
        
    // }
    // else{
        
    // }
}

//third action : calculate result
//how?
// when user press a equal button we perform calculation

function handleEqualInput(){
    
}

//fourth action : clear state
//how?
// when user press a clear button
// we reset state

function handleClearInput(){
    
}

//fifth action : delete last digit
//how?
// when user press delete button
// we delete last digit from current value

function handleDeleteInput(){
    
}

