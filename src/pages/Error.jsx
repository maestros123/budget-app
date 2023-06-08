import {Link, useNavigate, useRouteError} from "react-router-dom";

import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid/index.js";


export const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="error">
            <h1>О нет! У нас возникли проблемы!</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => navigate(-1)}>
                    <ArrowUturnLeftIcon width={20}/>
                    <span>Вернуться назад</span>
                </button>
                <Link to="/" className="btn btn--dark">
                    <HomeIcon  width={20}/>
                    <span>На главную</span>
                </Link>
            </div>
        </div>
    )
}
