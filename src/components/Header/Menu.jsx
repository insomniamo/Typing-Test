import React from "react";
import "./menu.scss";

import TimeIcon from "@icons/TimeIcon.jsx";

export default function Menu({ classNames, selectedTime, setSelectedTime }) {
    const seconds = [15, 30, 60, 120];

    return (
        <div className="menu">
            <div className="menu__time">
                <div className="menu__logo">
                    <TimeIcon />
                </div>
                <span>Время</span>
            </div>
            <ul className={`menu__list ${classNames && classNames.menu__list}`}>
                {seconds.map((second) => (
                    <li
                        className={`menu__button ${selectedTime === second ? 'menu__button--active' : ''}`}
                        key={second}
                        onClick={() => setSelectedTime(second)}
                    >
                        {second}
                    </li>
                ))}
            </ul>
        </div>

    );
}
