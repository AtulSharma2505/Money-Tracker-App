let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Event listener for Add button
addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validate input
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter valid info');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Create a new expense object and add to the list
    const expense = { category, amount, info, date };
    expenses.push(expense);

    // Update total amount based on the category
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }
    totalAmountCell.textContent = totalAmount;

    // Add new expense to the table
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = new Date(expense.date).toLocaleDateString();

    // Create and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        // Remove the expense from the list and update total
        const index = expenses.indexOf(expense);
        if (index > -1) {
            expenses.splice(index, 1);
            if (expense.category === 'Income') {
                totalAmount -= expense.amount;
            } else if (expense.category === 'Expense') {
                totalAmount += expense.amount;
            }
            totalAmountCell.textContent = totalAmount;
        }
        // Remove the row from the table
        expenseTableBody.removeChild(newRow);
    });

    deleteCell.appendChild(deleteBtn);

    // Clear the form inputs
    categorySelect.value = '';
    amountInput.value = '';
    infoInput.value = '';
    dateInput.value = '';
});
