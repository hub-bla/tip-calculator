// TODO
//

//BUTTONS
const bttns = document.getElementById("bttns");
const resetBtn = document.getElementById('reset');

//INPUTS
const bill = document.getElementById('bill');
const people = document.getElementById('people');
const custom = document.getElementById('custom');

//OUTPUTS
const tipPerPersonDiv = document.getElementById('tip-person');
const totalPerPersonDiv = document.getElementById('total-person');

//if all of 3 itmes have values then change reset button opacity to 1
let basket = {
  custom: undefined,
  people: undefined,
  bill: undefined
};



const getValue = e => {
  const inp = document.getElementById(e.target.id);
  if (inp.value){
    if(inp.classList.contains('fill')){
      inp.classList.remove('fill')
    }
    basket[inp.id] = inp.value;
    check()
  }else{
    if(!(inp.id === 'custom')){
      inp.classList.add('fill');
    }
    basket[inp.id] = undefined;
    check();
  }
};

//checking if there are 3 items in names array

const check = () => {
  if(Object.values(basket).every( v => v !== undefined)){
    resetOn();
  } else if(resetBtn.classList.contains("to-hover")){
    resetOff()
  }
}

const resetOn = () =>{
  resetBtn.classList.add("to-hover");
  resetBtn.style.opacity = '1';
  //add clearing function
  resetBtn.onclick = calculate;
}

const resetOff = () => {
  resetBtn.removeAttribute("style");
  resetBtn.classList.remove("to-hover");
  resetBtn.onclick = () => {

  };
}

//taking precent value from buttons
let currentPrecent;
const bttn = e => {
  if (e.target.tagName == 'BUTTON'){
    currentPrecent =  parseInt(e.target.id);
    basket['custom'] = currentPrecent;
    changeColor(e);
    check();
  }
};



let theSame;
const changeColor = e => {
  clicked(e);
  if (!(theSame === e.target.id)){
    unclicked(theSame);
  }
  
  theSame = e.target.id;
}

const cstm = () => {
  unclicked(theSame);
}

const clicked = e => {
  e.target.style.color = 'hsl(183, 100%, 15%)';
  e.target.style.backgroundColor = 'hsl(172, 67%, 45%)';
}

const unclicked = oldId => {
  if (typeof oldId === 'string'){
    const btn = document.getElementById(oldId);
    btn.removeAttribute('style');
  }
  
}

const calculate = () => {
  const tipPrecentage = parseFloat(basket['custom']) / 100;
  const price = parseFloat(basket['bill']);
  const numOfPeople = parseInt(basket['people']);
  //total per person
  const totalPerPerson = (price + (price*tipPrecentage))/numOfPeople;
  totalPerPersonDiv.innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPerPerson);;
  //tip per person
  const tipPerPerson = (price*tipPrecentage)/numOfPeople;
  tipPerPersonDiv.innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tipPerPerson);
}

bttns.onclick = bttn;

custom.onclick = cstm;


bill.addEventListener("focusout", getValue);
people.addEventListener("focusout", getValue);
custom.addEventListener("focusout", getValue);