import {redirect} from "react-router-dom";
import {deleteItem} from "../helper.js";
import {toast} from "react-toastify";

export async function  logoutAction() {
    //Удаление юзера
    deleteItem({key: "userName"})
    deleteItem({key: "budget"})
    deleteItem({key: "expenses"})

    toast.success("Учётная запись успешно удалена")

    //Возвращение на главную
    return redirect("/")
}
