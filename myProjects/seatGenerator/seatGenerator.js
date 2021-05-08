const arenaEl = document.querySelector('.arena');
const renderBtn = document.querySelector('.render-btn');
const sectorInput = document.querySelector('.sector__input');
const rowInput = document.querySelector('.row__input');
const seatInput = document.querySelector('.seat__input');
const inputError = document.querySelector('.error');
const priceElem = document.querySelector('.price');

const numGenerator = (start, end) => {
    let arr = [];
    for (start; start <= end; start++) {  //generating numbers
        arr.push(start);
    }
    return arr;
}
const generateSeats = () => {  // seat Creation

    let seatsStr = numGenerator(1, seatInput.value)
        .map(numberOfSeat => {
            return `
            <div class ="seat" 
            data-seat-number=${numberOfSeat}>
            
        </div>`
        }).join('');
    return seatsStr;
}

const generateRows = () => {  //row creation
    let seats = generateSeats();
    let rowStr = numGenerator(1, rowInput.value)
        .map(numberOfRow => {
            return `<div class = "row" 
            data-row-number=${numberOfRow}>
            <div class="row__number">${numberOfRow}</div>
            ${seats}
        </div>`
        }).join('');
    return rowStr;
}

const priceCounter = (selectedRow, selectedSeat, generatesSeat) => {
    
    let price = 0;
    switch (selectedRow) {
        case "1": price += 400;
        break;
        case "2": price += 380;
        break
        case "3": price += 370;
        break
        case "4": price += 350;
        break
        case "5": price += 340;
        break
        case "6": price += 320;
        break
        case "7": price += 300;
        break
        case "8": price += 275;
        break
        case "9": price += 260;
        break
        case "10": price += 230;
        break
        default: price += 200;
        break
    };
    
    let centerSeatStart = Math.floor(generatesSeat / 2) - 3;  //counting of the row's center diapazone
    let centerSeatEnd = Math.floor(generatesSeat / 2) + 4;   
    if (selectedSeat>=centerSeatStart && selectedSeat <=centerSeatEnd){  //center  seats cost more 
        price+= 120;
    }else{
        price+= 30;
    }
    return price;
}


const renderArena = () => { //arena Creation
    if (sectorInput.value < 1 || rowInput.value < 1 || seatInput.value < 1) {
        inputError.innerHTML = 'Enter natural count!'
        return;
    }
    let rows = generateRows();
    let sectorStr = numGenerator(1, sectorInput.value)
        .map(numberOfSector => {
            return `<div class = "sector" 
           data-sector-number=${numberOfSector}>
           <div class="sector__number">${numberOfSector}</div>
                ${rows}
            </div>
    `}).join('');
    arenaEl.innerHTML = sectorStr;
    priceElem.textContent = '-';
    inputError.innerHTML = ''
}

const setSelestedSeat = (event) => {
    const infoElem = document.querySelector('.info__elem');
    const isSeat = event.target.classList.contains('seat'); //checking on clicking on seat
    if (!isSeat) {
        return;  //if we didn't click on seat function stops doing
    }
    const seatNumber = event.target.dataset.seatNumber; //we get data from data attribute (camelCase!!!)
    const rowNumber = event.target.closest('.row').dataset.rowNumber; //finding closest class 'row'
    const sectorNumber = event.target.closest('.sector').dataset.sectorNumber; //finding closest class 'sector'
    infoElem.textContent = `Sector ${sectorNumber} Row ${rowNumber} Seat ${seatNumber}` // inner content in HTML
    
    let price = priceCounter(rowNumber, seatNumber, seatInput.value) //adding total price
    priceElem.textContent = price + '$';
}


arenaEl.addEventListener('click', setSelestedSeat);


renderBtn.addEventListener('click', renderArena)

