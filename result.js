// Function to navigate back to the index page
function goToIndex() {
    window.location.href = "index.html";
}

// Function to display expense details
function displayExpenseDetails() {
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    var expenseDetails = document.getElementById("expenseDetails");
    expenseDetails.innerHTML = "";
    expenses.forEach(function(expense, index) {
        var expenseCard = document.createElement("div");
        expenseCard.classList.add("expense-card");

        var expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-details");
        
        var nameParagraph = document.createElement("p");
        nameParagraph.textContent = "Item: " + expense.name;
        var amountParagraph = document.createElement("p");
        amountParagraph.textContent = "Amount: $" + expense.amount.toFixed(2);
        
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editExpense(index);
        };
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteExpense(index);
        };

        expenseInfo.appendChild(nameParagraph);
        expenseInfo.appendChild(amountParagraph);
        expenseCard.appendChild(expenseInfo);
        expenseCard.appendChild(editButton);
        expenseCard.appendChild(deleteButton);

        expenseDetails.appendChild(expenseCard);
    });
}

// Function to edit an expense
function editExpense(index) {
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    var expense = expenses[index];
    var newName = prompt("Enter new name for the expense:", expense.name);
    var newAmount = parseFloat(prompt("Enter new amount for the expense:", expense.amount));
    if (newName !== null && !isNaN(newAmount)) {
        expenses[index] = {
            name: newName,
            amount: newAmount
        };
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenseDetails();
        calculateTotalExpense();
    }
}

// Function to delete an expense
function deleteExpense(index) {
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenseDetails();
    calculateTotalExpense();
}

// Function to calculate and display total expenses
function calculateTotalExpense() {
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    var total = 0;
    expenses.forEach(function(expense) {
        total += expense.amount;
    });
    document.getElementById("totalExpense").textContent = "Total Expense: $" + total.toFixed(2);
}

// Display expense details and total expenses when the page loads
displayExpenseDetails();
calculateTotalExpense();