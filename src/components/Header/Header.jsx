import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Logo from "@icons/Logo.jsx";
import BurgerButton from "@icons/BurgerButton.jsx";
import Menu from "./Menu.jsx";
import { setSelectedTime } from '@redux/slices/typingSlice.js';
import "./header.scss";

export default function Header() {
    const dispatch = useDispatch(); // Получаем функцию dispatch для отправки экшенов в Redux store
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false); // Локальное состояние для управления открытием/закрытием бургер-меню
    const [localSelectedTime, setLocalSelectedTime] = useState(15); // Локальное состояние для выбранного времени, используется для синхронизации с Redux

    // Функция для переключения состояния бургер-меню (открыто/закрыто)
    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    // Используем useEffect для отслеживания изменения размера окна и автоматического закрытия бургер-меню на больших экранах
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsBurgerMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize); // Добавляем обработчик события изменения размера окна

        return () => {
            window.removeEventListener("resize", handleResize); // Удаляем обработчик при размонтировании компонента
        };
    }, []);

    // Функция для изменения выбранного времени
    // Сначала обновляется локальное состояние, затем это состояние отправляется в Redux store
    const handleTimeChange = (time) => {
        setLocalSelectedTime(time);
        dispatch(setSelectedTime(time));
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__row">
                    <div className="header__column header__column--logo">
                        <Logo />
                    </div>
                    <Menu 
                        selectedTime={localSelectedTime} 
                        setSelectedTime={handleTimeChange} 
                    /> {/* Основное меню */}
                    <button className="header__button" onClick={toggleBurgerMenu}>
                        <BurgerButton />
                    </button>
                </div>
                {isBurgerMenuOpen && (
                    <Menu 
                        classNames={{ menu__list: "menu__list--mini" }}
                        selectedTime={localSelectedTime} 
                        setSelectedTime={handleTimeChange} 
                    />
                )}
            </div>
        </header>
    );
}
