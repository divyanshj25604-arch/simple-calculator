//what this file does:
// 	•	listens
// 	•	calls calculator functions
// 	•	updates display

// what it does not:
// 	•	No calculations
// 	•	No arithmetic
// 	•	No business logic
// 	•	No state definitions

//it has 3 responsibilities:
// 1.	Get references to:
// •	display
// •	all buttons
// 2.	Add click listeners
// 3.	Decide which calculator function to call based on button type

// vairiables :
let buttons = document.querySelectorAll(".button");  //access all the buttons from html
let historyElement = document.querySelector(".history"); //access the history i.e. the text on the display on which we will se the expression
let resultElement = document.querySelector(".result"); // access the result where we will se the result of the operation

//adding event listener click to all the buttons by first iterating through each button of the calculator panel

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.currentTarget.dataset.value;
        let type = e.currentTarget.dataset.type;

        //checking the data type of the button and calling the appropriate function acc to the data type of the button

        if (type === "digit") {
            inputDigit(value)
        }
        else if (type === "operator") {
            inputOperator(value)
        }
        else if (type === "equal") {
            handleEqualInput()
        }
        else if (type === "clear") {
            handleClearInput()
        }
        else if (type === "delete") {
            handleDeleteInput()
        }
        else {
            return
        };
        historyElement.textContent = lastExpression;
        resultElement.textContent = currentValue;
    });
});
