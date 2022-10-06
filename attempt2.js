class Calculator{
  constructor(currentOperandTextElement, previousOperandTextElement){
    this.currentOperandTextElement = currentOperandTextElement
    this.previousOperandTextElement = previousOperandTextElement
  }
  // Methods:

allClear(){
this.currentOperand = 0;
this.previousOperand = ''
}
equals(){
  this.previousOperand = this.previousOperand + this.currentOperand;
  this.previousOperand = this.previousOperand.replace(/--/g, '+');
  this.currentOperand = eval(this.previousOperand);
  this.previousOperand = '';
}
appendNumber(button){

  if(this.currentOperand[0]== 0 && button == 0){return};

  // prevents the current operand from containing two decimals
  if(this.currentOperand.toString().includes('.')===true && button === "."){return};
  // looking for operators
  if(isNaN(this.currentOperand)===true){
    // updating the previousOperand with the current operators and setting the currentOperand to the button
    this.previousOperand = this.previousOperand + this.currentOperand;
    this.currentOperand = button;
  }
  else if(isNaN(this.currentOperand)===false){
    //looking for numbers
    if(this.currentOperand.toString() === "0"){
      // changing the zero (caused by AC and initial) to the current button because it must be a number at this point
      this.currentOperand = button;
    }
    else if(this.currentOperand !== 0){
      // same idea as above, but can add the button directly now
      this.currentOperand = this.currentOperand + button;
    }
  }

// I want this to append all numbers (including decimal) and all operators together in the currentOperand.
// Then update the previousOperand when a new number-set or operator-set is detected, then set currentOperand to ''
    console.log("This is a number");

    }
 emptyString(){
   // accounting for the stupid FCC requirement that things start at zero, rather than an emptyString
   if(this.currentOperand == 0 && this.previousOperand != ''){
     this.currentOperand = ''
   }
 }

updateDisplay(){
//just telling the html what to say
  this.currentOperandTextElement.innerText = this.currentOperand;
  this.previousOperandTextElement.innerText = this.previousOperand;
}
operatorFilter(operator){
// just making sure that the order of operation is sensical
  if(this.currentOperand == '-' && operator !== '-'){return}
  if(this.currentOperand == '--'){return}

// depending on whether this is false or true, the program either appends or updates the previousOperand
// the idea being the previousOperand would get updated everytime there is a change from operators to numbers and vice versa
if(isNaN(this.currentOperand)===false){
  this.previousOperand = this.previousOperand + this.currentOperand;
  this.currentOperand = operator
}
else if(isNaN(this.currentOperand)===true){
  if(operator !== '-'){
  this.currentOperand = operator
  }
  else if(operator == '-'){
    this.currentOperand = this.currentOperand + operator;
  }
}
console.log("This is a valid operator");
}
}
// all the variables are used in the methods set below and used above.
const numberButtons = document.querySelectorAll('.number');
const allClearButton = document.querySelector('.clear');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const currentOperandTextElement = document.querySelector('.input');
const previousOperandTextElement = document.querySelector('.output');

const baneOfMyExistence = new Calculator(currentOperandTextElement, previousOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () =>{
    baneOfMyExistence.emptyString();
    baneOfMyExistence.appendNumber(button.innerHTML)
    baneOfMyExistence.updateDisplay();
  })
});
allClearButton.addEventListener('click',()=>{
  //the order matters. if they were reversed, i'd have to double click to make it complete
  baneOfMyExistence.allClear();
  baneOfMyExistence.updateDisplay();
});
operationButtons.forEach(operator => {
  operator.addEventListener('click',()=>{
    baneOfMyExistence.emptyString();
    baneOfMyExistence.operatorFilter(operator.innerHTML)
    baneOfMyExistence.updateDisplay();
  })
});
equalsButton.addEventListener('click',()=>{
  baneOfMyExistence.equals();
  baneOfMyExistence.updateDisplay();
})
