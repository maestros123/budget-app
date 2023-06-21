import {createExpense, deleteItem, getAllMatchingItems} from "../helper.js";
import {useLoaderData} from "react-router-dom";
import {BudgetItem} from "../components/BudgetItem";
import {AddExpenseForm} from "../components/AddExpenseForm";
import {Table} from "../components/Table";
import {toast} from "react-toastify";

export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budget",
        key: "id",
        value: params.id
    })[0]

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });


    if (!budget) {
        throw new Error("Бюджет не существует")
    }
    return { budget, expenses }
}

export async function budgetAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

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

export const BudgetPage = () => {
    const { budget, expenses } = useLoaderData()
    return (
        <div className="grid-lg" style={{"--accent": budget.color}}>
            <h1 className="h2"> Обзор Бюджета  <span className="accent">{budget.name}</span>
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true}/>
                <AddExpenseForm budget={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span> Затраты
                        </h2>
                        <Table expenses={expenses} showBudget={false}/>
                    </div>
                )
            }
        </div>
    )
}
