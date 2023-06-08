import {Form} from "react-router-dom";
import UserPlusIcon from "@heroicons/react/24/solid/esm/UserPlusIcon.js";
import illustration from '../assets/illustration.jpg'

export const Login = () => {
    return (
        <div className="login">
            <div>
                <h1>Возьмите под контроль <span className="accent">свои деньги</span></h1>
                <p>Составление бюджета это секрет финансовой свободы. Начни уже сегодня!</p>
                <Form method="post">
                    <input
                        type="text" name="userName"
                        placeholder="Введите своё имя" required
                        aria-label="Ваше имя"
                        autoComplete="given-name"
                    />
                    <input type="hidden" name="_action" value="newUser"/>
                    <button type="submit" className="btn btn--light">
                        <span>Создать аккаунт</span>
                        <UserPlusIcon width={20}/>
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="" width={600}/>
        </div>
    )
}
