const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') != null ? localStorageTransaction : []

// Add transaction

function AddTransaction(e) {
    e.preventDefault()

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add text and amount')
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)

        AddTransactionList(transaction)

        updateValues()
        updateLocalStorage()



    }
}


// Generate Id
function generateId() {
    return Math.floor(Math.random() * 100000000)
}

// Add transaction to the list

function AddTransactionList(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+' 

    const item = document.createElement('li')

    // Add a class based on the value
    
    item.classList.add(transactions.amount < 0 ? 'minus' : '')

    item.innerHTML = `$(transaction.text) <span>$(sign)$(Math.abs(transaction.amount))</span>
    <button class="delete-btn" onclick=removeItem($(transaction.id)) "x"</button>
    `
    list.appendChild(item) 
} 

function updateValues() {
    const amounts = transaction.map(transactions => transactions.amount)

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0).toFixed(2)

        const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

        balance.innerText = `$${total}`
        money_plus.innerText = `$${income}`
        money_minuns.innerText = `$${expense}`
}

// remove item by id
function removeItem(id) {
    transactions = transactions.filter(transactions => transactions.id !== id)

    updateLocalStorage()
}

// update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// init app
function init(){
    list.innerHTML=''

    transactions.forEach(AddTransactionList) 

    updateValues()
}

// Add transaction

form.addEventListener('submit', AddTransaction)