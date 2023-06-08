import {fetchData} from "../helper.js";
import {Outlet, useLoaderData} from "react-router-dom";

import wave from '../assets/wave.svg'
import {Nav} from "../components/Nav.jsx";

export function mainLoader() {
    const userName = fetchData("userName");
    return {  userName }
}

export const Main = () => {
    const { userName } = useLoaderData();

    return (
        <div className="layout">
            <Nav userName={userName}/>
            <main>
                <Outlet/>
            </main>
            <img src={wave} alt=""/>

        </div>
    )
}

