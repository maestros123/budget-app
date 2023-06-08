const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budget")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// Локальное хранилище
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

//Создание бюджета
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budget") ?? [];
    return localStorage.setItem("budget", JSON.stringify([...existingBudgets, newItem]))
}

//Создание расходов
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

//Удаление элементов
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

// Общий объём расходов
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc

        return acc += expense.amount
    }, 0)
    return budgetSpent
}

//Форматирование процентов
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

//Форматирование валюты
export const formatCurency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "RUB"
    })
}
