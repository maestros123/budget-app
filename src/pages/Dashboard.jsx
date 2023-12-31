import {createBudget, createExpense, deleteItem, fetchData} from "../helper.js";
import {Link, useLoaderData} from "react-router-dom";
import {Login} from "../components/Login.jsx";
import {toast} from "react-toastify";
import {AddBudgetForm} from "../components/AddBudgetForm.jsx";
import {AddExpenseForm} from "../components/AddExpenseForm.jsx";
import {BudgetItem} from "../components/BudgetItem.jsx";
import {Table} from "../components/Table.jsx";

export function dashboardLoader() {
    const userName = fetchData("userName");
    const budget = fetchData("budget");
    const expenses = fetchData("expenses");

    return {  userName, budget, expenses }
}

export async function dashboardAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Добро пожаловать, ${values.userName}`)
        } catch (e) {
            throw new Error("Возникли проблемы во время создания аккаунта")
        }
    }

    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })

            return toast.success("Бюджет создан")
        } catch (e) {
            throw new Error("Возникла проблема с созданием бюджета")
        }
    }

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Расход ${values.newExpense} добавлен`)
        } catch (e) {
            throw new Error("Возникла проблема с созданием расходов")
        }
    }

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success(`Расход удалён`)
        } catch (e) {
            throw new Error("Возникла проблема с удалением расхода")
        }
    }
}


export const Dashboard = () => {
    const { userName, budget, expenses } = useLoaderData();

    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Добро пожаловать, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">

                        {
                            budget && budget.length > 0
                            ? (
                            <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm/>
                                <AddExpenseForm budget={budget} />
                            </div>
                                <h2>Существующие бюджеты</h2>
                                <div className="budgets">
                                    {budget.map((budg) => (
                                        <BudgetItem key={budg.id} budget={budg} />
                                    ))}
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-sm">
                                            <h2>Последние расходы</h2>
                                            <Table expenses={expenses.sort((a,b) => b.createdAt - a.createdAt).slice(0,8)}/>
                                            {expenses.length > 8 && (
                                                <Link to="expenses" className="btn btn--primary">
                                                    Показать все затраты
                                                </Link>
                                            )}
                                        </div>
                                    )
                                }
                        </div>)
                        : (
                                    <div className="grid-sm">
                                        <p>Составление бюджета это секрет финансовой свободы</p>
                                        <p>Создай бюджет чтобы начать!</p>
                                        <AddBudgetForm/>
                                    </div>
                                )
                        }
                    </div>
                </div>
            ) : <Login />}
        </>
    )
}

