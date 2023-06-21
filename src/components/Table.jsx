import {ExpenseItem} from "./ExpenseItem.jsx";


export const Table = ( { expenses, showBudget = true} ) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Название", "Количество", "Дата", showBudget ? "Бюджет" : "" , ""].map((i, index) => (
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    expenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showBudget={showBudget}/>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
