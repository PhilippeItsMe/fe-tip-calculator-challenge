// Get DOM elements
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('number');
const tipButtons = document.querySelectorAll('.three-per-line button');
const customTipInput = document.querySelector('.three-per-line input');
const resetButton = document.querySelector('main button');
const tipAmountDisplay = document.querySelector('.output:first-child .very-big');
const totalDisplay = document.querySelector('.output:last-child .very-big');
const errorMessage = document.querySelector('.orange');

let selectedTipPercentage = 0;

// Add event listeners
billInput.addEventListener('input', calculateTip);
peopleInput.addEventListener('input', calculateTip);
customTipInput.addEventListener('input', handleCustomTip);

// Add click events to tip buttons
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tipButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get percentage from button text
        selectedTipPercentage = parseFloat(button.textContent);
        calculateTip();
    });
});

// Handle custom tip input
function handleCustomTip() {
    // Remove active class from all buttons when custom input is used
    tipButtons.forEach(btn => btn.classList.remove('active'));
    selectedTipPercentage = parseFloat(customTipInput.value) || 0;
    calculateTip();
}

// Calculate tip and update display
function calculateTip() {
    // Get input values
    const bill = parseFloat(billInput.value) || 0;
    const numberOfPeople = parseInt(peopleInput.value) || 0;
    
    // Show error if number of people is 0
    if (numberOfPeople === 0) {
        errorMessage.style.display = 'inline';
        peopleInput.classList.add('error');
        return;
    } else {
        errorMessage.style.display = 'none';
        peopleInput.classList.remove('error');
    }

    // Calculate tip and total
    const tipPercentage = selectedTipPercentage / 100;
    const totalTip = bill * tipPercentage;
    const tipPerPerson = totalTip / numberOfPeople;
    const totalPerPerson = (bill + totalTip) / numberOfPeople;

    // Update display with formatted numbers
    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Reset everything
resetButton.addEventListener('click', () => {
    // Reset inputs
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    
    // Reset tip buttons
    tipButtons.forEach(btn => btn.classList.remove('active'));
    selectedTipPercentage = 0;
    
    // Reset displays
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    
    // Reset error state
    errorMessage.style.display = 'none';
    peopleInput.classList.remove('error');
});
