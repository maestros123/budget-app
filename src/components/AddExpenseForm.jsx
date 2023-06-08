import {useFetcher} from "react-router-dom";
import {useEffect, useRef} from "react";
import {CurrencyDollarIcon} from "@heroicons/react/24/solid/index.js";
import {PlusCircleIcon} from "@heroicons/react/20/solid/index.js";


export const AddExpenseForm = ( {budget} ) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef()
    const focusRef = useRef()

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    },[isSubmitting])


    return (
        <div className="form-wrapper">
            <h2 className="h3">Добавить новый {" "} <span className="accent">{budget.length === 1 &&
                `${budget.map((budg) => budg.name)}`}</span>
                {" "} Расходы
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                {/*<div className="expense-inputs">*/}
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Название расходов</label>
                        <input type="text" name="newExpense" id="newExpense"
                        placeholder="например, кофе" ref={focusRef} required/>
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Количество</label>
                        <input type="text" step="0.1" inputMode="decimal"
                               name="newExpenseAmount" id="newExpenseAmount"
                               placeholder="Наример 100" required
                        />
                    </div>
                    <div className="grid-xs" hidden={budget.length === 1}>
                        <label htmlFor="newExpenseBudget">Категория бюджета</label>
                        <select name="newExpenseBudget" id="newExpenseBudget" required>
                            {
                                budget.sort((a,b) => a.createdAt - b.createdAt).map((budg) => {return (
                                    <option key={budg.id} value={budg.id}>{budg.name}</option>
                                )})
                            }
                        </select>
                    </div>
                    <input type="hidden" name="_action" value="createExpense"/>
                    <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                        <span>Добавить расходы</span>
                        <PlusCircleIcon width={20}/>
                    </button>
                {/*</div>*/}
            </fetcher.Form>
        </div>
    )
}
