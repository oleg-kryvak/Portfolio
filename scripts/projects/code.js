
const root = document.querySelector('.root');
const list = document.querySelector('.list');
let date = document.querySelector('#date');
const inputText = document.querySelector('#input-text');
const button = document.querySelector('.button');
const errorInput = document.querySelector('.error');
const btnSetDate = document.querySelector('.btn__setdate');

const listOfMonth = [
  { id: 1, name: 'January', },
  { id: 2, name: 'Fabruary', },
  { id: 3, name: 'March', },
  { id: 4, name: 'April', },
  { id: 5, name: 'May', },
  { id: 6, name: 'July', },
  { id: 7, name: 'June', },
  { id: 8, name: 'August', },
  { id: 9, name: 'September', },
  { id: 10, name: 'October', },
  { id: 11, name: 'Novemer', },
  { id: 12, name: 'December', },
]
let classCount = 0;

const divCreator = (date, text) => {
  if (text != '') {

    const div = document.createElement('div');
    div.classList.add('list__elem')
    div.classList.add(classCount % 2 === 0 ? 'blue' : 'green')
    const dateSpan = document.createElement('span');
    const textSpan = document.createElement('span');
    const deleteBtnEl = document.createElement('span');
    const editBtnEl = document.createElement('span');
    dateSpan.classList.add('list__date');
    textSpan.classList.add('list__text');
    deleteBtnEl.classList.add('list__delete-btn');
    editBtnEl.classList.add('list__edit-btn');
    deleteBtnEl.textContent = 'x';
    editBtnEl.textContent = 'edit';
    dateSpan.textContent = 'On ' + date;
    textSpan.textContent = 'You have ' + text;
    div.append(editBtnEl, deleteBtnEl, dateSpan, textSpan);
    list.append(div);
    
  
    const deleteListElem = () => { //видалення елемента списку
      let div = (deleteBtnEl.parentNode);
      let list = (div.parentNode);
      list.removeChild(div)

    }
    deleteBtnEl.addEventListener('click', deleteListElem);


    const editListElem = () => {                    //редагування елементу списку
      if (editBtnEl.textContent === 'edit') {
        const textEdited = (editBtnEl.parentNode).lastChild;    //неходимо елемент
        const input = document.createElement('input');          //створюємо поле для вводу
        input.type = 'text';
        input.value = textEdited.textContent;                         //задаємо значенню цього поля значення вибраного елемента
        editBtnEl.parentNode.insertBefore(input, textEdited);
        editBtnEl.parentNode.removeChild(textEdited);
        editBtnEl.textContent = 'save';   //міняєм текст кнопки на save
      }
      else if (editBtnEl.textContent === 'save') {
        const input = (editBtnEl.parentNode).lastChild;
        const textEdited = document.createElement('span');
        textEdited.textContent = input.value;
        editBtnEl.parentNode.insertBefore(textEdited, input);
        editBtnEl.parentNode.removeChild(input);
        editBtnEl.textContent = 'edit';       //міняєм текст кнопки на edit
      }

    }
    editBtnEl.addEventListener('click', editListElem);
    classCount++
    errorInput.textContent = ''; // якщо помилки немає оголошення про помилку пропадає
  }
  else {
    errorInput.textContent = `Please, write something. You have to do something)`; //оголошення про помилку
  }
}
const getDate = () => { //отримання дати
  let cdate = new Date();  // визначення теперішньої дати
  let currentYear = cdate.getFullYear();
  let currentMonth = cdate.getMonth() + 1;
  let currentDate = cdate.getDate();
  let dateValue = date.value.split('-').map(item => +item)
  let [year, month, days] = dateValue; //отримання року та місяця
    

  let [monthTextName] = (listOfMonth.filter(m => m.id === month));
  if (typeof monthTextName === 'undefined') {
    alert('Вкажіть дату будь ласка!')
  } else {
    if (year < currentYear || month < currentMonth || days < currentDate) {
      alert("You cann't travel in the past")
    } else {
      let plannedDate = `${days} ${monthTextName.name} ${year}` //date in calendar
      let text = inputText.value
      divCreator(plannedDate, text);
      inputText.value = ''
    }
  }
}

button.addEventListener('click', getDate)

const setDate = () => { // встановленння теперішньої дати;
  let cdate = new Date();
  let currentYear = cdate.getFullYear();
  let currentMonth = cdate.getMonth() + 1;
  let currentDate = cdate.getDate();
  if (currentMonth < 10) {
    currentMonth = '0' + currentMonth
  }
  if (currentDate < 10) {
    currentDate = '0' + currentDate
  }
  let str = '' + currentYear + '-' + currentMonth + '-' + currentDate;
  date.value = str;
}
btnSetDate.addEventListener('click', setDate)
