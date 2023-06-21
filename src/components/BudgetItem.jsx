import {calculateSpentByBudget, formatCurency, formatPercentage} from "../helper.js";
import {Form, Link} from "react-router-dom";
import {BanknotesIcon} from "@heroicons/react/24/solid/index.js";
import {TrashIcon} from "@heroicons/react/24/solid";


export const BudgetItem = ( {budget, showDelete = false} ) => {
    const {id, name, amount, color} = budget
    const spent = calculateSpentByBudget(id)

    return (
        <div className="budget" style={{"--accent": color}}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurency(amount)} заложено</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurency(spent)} портачено</small>
                <small>{formatCurency(amount- spent)} осталось</small>
            </div>
            {
                showDelete ? (
                    <Form method="post" action="delete"
                    onSubmit={(event) => {
                        if(!confirm("Вы уверены, что хотите безвозвратоно удалить данный бюджет?")) {
                            event.preventDefault()
                        }
                    }}>
                        <button type="submit" className="btn">
                            <span>Удалить бюджет</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                ) : (
                    <Link to={`/budget/${id}`} className="btn">
                        <span>Подробнее</span>
                        <BanknotesIcon width={20} />
                    </Link>
                )
            }
        </div>
    )
}
