import {Form, useFetcher} from "react-router-dom";
import {CurrencyDollarIcon} from "@heroicons/react/24/solid/index.js";
import {useEffect, useRef} from "react";


export const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">Создать бюджет</h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Название бюджета</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder="например, спорт" required ref={focusRef}/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Количество</label>
                    <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="например, 3500Р"  required/>
                </div>
                <input type="hidden" name="_action" value="createBudget"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    <span>Создать бюджет</span>
                    <CurrencyDollarIcon width={20}/>
                </button>
            </fetcher.Form>

        </div>
    )
}
