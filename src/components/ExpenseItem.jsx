import {formatCurency, formatDateToLocalString, getAllMatchingItems} from "../helper";
import {Link, useFetcher} from "react-router-dom";
import {TrashIcon} from "@heroicons/react/24/solid";


export const ExpenseItem = ({ expense,showBudget }) => {
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category: "budget",
        key: "id",
        value: expense.budgetId
    })[0];

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurency(expense.amount)}</td>
            <td>{formatDateToLocalString(expense.createdAt)}</td>
            {
                showBudget && (<td>
                <Link
                to={`/budget/${budget.id}`}
                style={{"--accent": budget.color,}}
            >
                {budget.name}</Link>
            </td>)}
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense"/>
                    <input type="hidden" name="expenseId" value={expense.id}/>
                    <button type="submit" className="btn btn--warning" aria-label={`Удалить ${expense.name} расходы`}>
                        <TrashIcon width={20}/>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}
