import {calculateSpentByBudget, formatCurency, formatPercentage} from "../helper.js";


export const BudgetItem = ( {budget} ) => {
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
        </div>
    )
}
