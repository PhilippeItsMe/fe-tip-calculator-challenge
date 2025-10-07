const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('number');
const tipButtons = document.querySelectorAll('.three-per-line button');
const customTipInput = document.querySelector('.three-per-line input');
const tipAmountDisplay = document.getElementById('tips-amount');
const totalDisplay = document.getElementById('total');
const resetButton = document.getElementById('reset');
const errorMessage = document.querySelector('.orange');

let selectedTipPercentage = 0;


// Add listner to inputs
billInput.addEventListener ('input', calculateTip);
peopleInput.addEventListener ('input', calculateTip);
customTipInput.addEventListener('input', handleCustomTip);


// Add listener to tip buttons
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        customTipInput.value='';
        tipButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add('active');
        selectedTipPercentage = parseFloat(button.textContent);
        calculateTip();
    });
});


// Handle custom tip input
function handleCustomTip() {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    selectedTipPercentage = parseFloat(customTipInput.value) || 0;
    calculateTip();
}


function calculateTip () {
    // Get input values
    const bill = parseFloat(billInput.value) || 0;
    const numberOfPeople = parseInt(peopleInput.value) || 0;
    
    // Notify error if number of people is zero
    if (numberOfPeople === 0) {
        errorMessage.style.display ="inline";
        return
    }
    else {
        errorMessage.style.display ="none";
    }

    // Calculate tip
    const totalTip = selectedTipPercentage / 100 * bill;
    const tipPerPerson = totalTip / numberOfPeople;
    const totalPerPerson = (bill + totalTip) / numberOfPeople;
    
    // Display results
    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
};

//Reset button
resetButton.addEventListener('click', () => {
    billInput.value='0';
    peopleInput.value='1';
    customTipInput.value='';
    tipButtons.forEach(btn => btn.classList.remove("active"));
    tipAmountDisplay.textContent ='$0.00';
    totalDisplay.textContent ='$0.00';
});
