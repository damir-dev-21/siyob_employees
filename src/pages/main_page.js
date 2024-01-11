import { NavLink, useNavigate } from 'react-router-dom'

function MainPage(){
    return(
        <div>
            <div class="button-container">
                <NavLink to={"/add-employee"}>
                    <button type="button" class="full-width-button">Заявление на прием</button>
                </NavLink>
                <NavLink to={"/soon"}>
                    <button type="button" class="full-width-button">Приказ на увольнение</button>
                </NavLink>
                <NavLink to={"/soon"}>
                    <button type="button" class="full-width-button">Отпуск</button>
                </NavLink>
                <NavLink to={"/soon"}>
                    <button type="button" class="full-width-button">Табель</button>
                </NavLink>
            </div>
        </div>
    )
}

export default MainPage