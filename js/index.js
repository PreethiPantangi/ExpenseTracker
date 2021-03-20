let totalExpense = 0;
const incrementCounter = document.querySelector(".incrementCounter");

const expenseAmountInput = document.querySelector("#expense")
const expenseDescriptionInput = document.querySelector("#expenseDesc");

const totalExpenseOutput = document.querySelector(".totalExpense");
totalExpenseOutput.textContent = `Total : ${totalExpense}`;

const expenseTableOutput = document.querySelector(".expenseTable");

let expenseRecord = [];
let filteredArray = [];


function addExpenseTotal() {

    const expenseAmount = expenseAmountInput.value;
    let expenseDesc = expenseDescriptionInput.value;
    expenseDesc = expenseDesc.charAt(0).toUpperCase() + expenseDesc.slice(1);

    if (expenseAmount && expenseDesc) {
        document.querySelector(".error-message").textContent = '';
        const expenseItem = {}
        expenseItem.Desc = expenseDesc;
        expenseItem.Amount = parseInt(expenseAmount);
        expenseItem.currentDate = new Date();

        expenseRecord.push(expenseItem);

        totalExpense += parseInt(expenseAmount);
        const someText = `Total : ${totalExpense}`;

        totalExpenseOutput.textContent = someText;

        displayListItem(expenseRecord);

        expenseAmountInput.value = '';
        expenseDescriptionInput.value = '';
    } else {
        document.querySelector(".error-message").innerHTML = `<div class="alert alert-danger" role="alert">Please enter both amount and desc</div>`
    }

}

function getDateString(dateString) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' }
    return dateString.toLocaleDateString('en-US', options)
}

function createListItem(expenseItem) {
    return `
            <li class="list-group-item d-flex justify-content-between">
                            <div class="d-flex flex-column">
                            ${expenseItem.Desc}
                                <small class="text-muted">${getDateString(expenseItem.currentDate)}</small>
                            </div>
                            <div>
                                <span class="px-5">
                                ${expenseItem.Amount}
                                </span>
                                <button type="button" onclick="deleteItem(${expenseItem.currentDate.valueOf()})" class="btn btn-outline-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>   
                            </div>
                        </li>
            `
}

function deleteItem(dateValue) {
    for (let data of expenseRecord) {
        if (data.currentDate.valueOf() === dateValue) {
            let index = expenseRecord.indexOf(data);
            expenseRecord.splice(index, 1)
        }
    }
    displayListItem(expenseRecord);
    let totalExpense = 0;
    for (let data of expenseRecord) {
        totalExpense += data.Amount
    }

    const someText = `Total : ${totalExpense}`;
    totalExpenseOutput.textContent = someText;
}


function displayListItem(expenseRecord) {
    const allExpenses = expenseRecord.map(expense => {
        return createListItem(expense)

    });

    const joinAllExpenses = allExpenses.join('')
    expenseTableOutput.innerHTML = joinAllExpenses;
}

incrementCounter.addEventListener('click', addExpenseTotal);

function getNumberOnly(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}