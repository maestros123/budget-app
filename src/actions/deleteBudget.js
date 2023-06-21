import {deleteItem, getAllMatchingItems} from "../helper.js";
import {toast} from "react-toastify";
import {redirect} from "react-router-dom";


export function deleteBudget({ params }) {
  try {
      deleteItem({
          key: "budget",
          id: params.id
      })

      const associatedExpenses = getAllMatchingItems({
          category: "expenses",
          key: "budgetId",
          value: params.id
      })

      associatedExpenses.forEach((expense) => {
          deleteItem({
              key: "expenses",
              id: expense.id
          })
      })

      toast.success("Бюджет успешно удалён")
  } catch (e) {
      throw new Error("Возникла проблема с удалением вашего бюджета")
  }
  return redirect("/")
}