import logo from "../assets/logomark.svg"
import {Form, NavLink} from "react-router-dom";

import { TrashIcon } from '@heroicons/react/24/solid'


export const Nav = ({ userName }) => {
    return (
       <nav>
           <NavLink to="/" aria-label="Домашняя страница">
               <img src={logo} alt="" height={30}/>
               <span>Budget</span>
           </NavLink>
           {
               userName && (
                   <Form
                       method="post"
                       action="/logout"
                       onSubmit={(event) => {
                           if (!confirm("Вы действительно хотите удалить пользователя?")) {
                               event.preventDefault();
                           }
                       }}
                   >
                       <button type="submit" className="btn btn--warning">
                           <span>Удалить пользователя</span>
                           <TrashIcon width={20} />
                       </button>
                   </Form>
               )
           }

       </nav>
    )
}
