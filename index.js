// Function to add an expense
function addExpense() {
    var name = document.getElementById("expenseName").value.trim();
    var amount = parseFloat(document.getElementById("expenseAmount").value.trim());
    if (name !== "" && !isNaN(amount)) {
        var expense = {
            name: name,
            amount: amount
        };
        var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        // Clear input fields
        document.getElementById("expenseName").value = "";
        document.getElementById("expenseAmount").value = "";
        // Redirect to results page
        window.location.href = "results.html";
    } else {
        alert("Please enter both expense name and amount.");
    }
}