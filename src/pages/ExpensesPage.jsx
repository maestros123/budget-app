import {deleteItem, fetchData} from "../helper.js";
import {Table} from "../components/Table.jsx";
import {useLoaderData} from "react-router-dom";
import {toast} from "react-toastify";

export function expensesLoader() {
    const expenses = fetchData("expenses");

    return { expenses }
}

export async function expensesAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

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

export const ExpensesPage = () => {
    const {expenses} = useLoaderData()

    return (
        <div className="grid-lg">
            <h1>Все расходы</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Недавние расходы <small>({expenses.length} всего)</small></h2>
                        <Table expenses={expenses} />
                    </div>
                ) : <p>Расходов нет</p>
            }
        </div>
    )
}
