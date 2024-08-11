import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./footermenu.scss";
import ResetIcon from "@icons/ResetIcon.jsx";
import TimeLeftIcon from "@icons/TimeLeftIcon.jsx";
import {
  setTimeLeft,
  resetTest,
} from '@redux/slices/typingSlice'; // Импорт экшенов из слайса typingSlice

export default function FooterMenu() {
  const dispatch = useDispatch(); // Получаем функцию dispatch для отправки экшенов в Redux store
  
  // Получаем необходимые данные из состояния Redux
  const { timeLeft, selectedTime } = useSelector((state) => state.typing);

  // Обработчик нажатия на кнопку сброса теста
  const handleReset = () => {
    dispatch(resetTest()); // Сбрасываем все значения теста (очищаем ввод, сбрасываем таймер, ошибки и результаты)
    dispatch(setTimeLeft(selectedTime)); // Устанавливаем оставшееся время равным изначально выбранному времени
  };

  return (
    <div className="footermenu">
      <div className="footermenu__time">
        <div className="footermenu__icon">
          <TimeLeftIcon />
        </div>
        <span>{timeLeft}</span>
      </div>
      <button className="footermenu__button" onClick={handleReset}>
        <ResetIcon />
      </button>
    </div>
  );
}
