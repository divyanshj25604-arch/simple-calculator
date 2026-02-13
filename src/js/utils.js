function  formatNumber(value){
    value=parseFloat(value.toFixed(10));
    return value;
}

function limitDecimals(value){
    value=limitDecimals(value, 7);
    return value;
}

function  buildExpression(previous, operator, current){
    if (operator==="*"){
        operator="x"
    }
    expression=previous + " " + operator + " " + current;
}