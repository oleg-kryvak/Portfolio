const switchBtn = document.querySelector('#switch');
const calculatorEl = document.querySelector('.calculator');
const calculatorStorage = document.querySelector('.calculator__storage');
const calculatorInput = document.querySelector('.calculator__input');
const display = document.querySelector('#display');
const inputs = document.querySelectorAll('input');
let value = "";

switchBtn.addEventListener('click', () => {  //toggling a dark mode
  calculatorEl.classList.toggle('dark')

});

let inputNum = '';
const storageWriter = (num1, sign, num2, result) => {
  if (!num1 || !num2) {
    alert('Write two numbers please');
    return;
  }
  const div = document.createElement('div');
  const hr = document.createElement('hr');
  div.classList.add('calculator__storage-item');
  div.textContent = `${num1} ${sign} ${num2} = ${result}`;
  calculatorStorage.prepend(div, hr);
}

const inputWriter = (element) => {
  if (element.value !== '=') {

    inputNum += element.value;
    display.value = inputNum;
  }

}



const calculator = () => {
  let arr, num;
  if (inputNum.includes('+')) {
    arr = inputNum.split('+');
   
    num = +arr[0] + +arr[1]
    num = Number.isInteger(num) ? num.toFixed(0) : num.toFixed(4);
    display.value = num
    storageWriter(arr[0], '+', arr[1], num);
    inputNum = '';
  } else if (inputNum.includes('-')) {
    arr = inputNum.split('-');
    num = +arr[0] - +arr[1];
    num = Number.isInteger(num) ? num.toFixed(0) : num.toFixed(4);
    display.value = num;
    storageWriter(arr[0], '-', arr[1], num);
    inputNum = '';
  } else if (inputNum.includes('/')) {
    arr = inputNum.split('/');
    num = +arr[0] / +arr[1];
    num = Number.isInteger(num) ? num.toFixed(0) : num.toFixed(4);
    display.value = num;
    storageWriter(arr[0], '/', arr[1], num);
    inputNum = '';
  } else if (inputNum.includes('*')) {
    arr = inputNum.split('*');
    num = +arr[0] * +arr[1];
    num = Number.isInteger(num) ? num.toFixed(0) : num.toFixed(4);
    display.value = num;
    storageWriter(arr[0], '*', arr[1], num);
    inputNum = '';
  } else {
    return;
  }

}


inputs.forEach(el => {  //going throw an array
  el.addEventListener('click', (event) => {
    const isLogic = event.target.closest('.row'); //finding keyboard
    if (isLogic) {
      inputWriter(el)
      if (event.target.value === '=') {
        calculator();
        inputWriter(el)
      }
    } else if (event.target.value === 'C') {
      inputNum = ''
      display.value = inputNum;
    }
  })
})
