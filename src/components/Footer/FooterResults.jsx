import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MistakeIcon from "@icons/MistakeIcon.jsx";
import "./footerresults.scss";
import { calculateWPM } from '@redux/slices/typingSlice'; // Импорт экшена для вычисления WPM

export default function FooterResults() {
  const dispatch = useDispatch(); // Получаем функцию dispatch для отправки экшенов в Redux store
  
  // Извлекаем необходимые данные из состояния Redux
  const { errorsCount, wordsPerMinute, timeLeft } = useSelector((state) => state.typing);

  useEffect(() => {
    // Вызываем calculateWPM при завершении времени (timeLeft === 0)
    if (timeLeft === 0) {
      dispatch(calculateWPM()); // Вычисляем WPM (слова в минуту)
    }
  }, [timeLeft, dispatch]); // useEffect зависит от timeLeft и dispatch

  return (
    <div className="footerresults">
      <div className='footerresults__item'>
        <span>WPM:</span>
        <span>{wordsPerMinute}</span>
      </div>
      <div className='footerresults__item'>
        <div className='footerresults__icon'>
          <MistakeIcon />
        </div>
        <span>{errorsCount}</span>
      </div>
    </div>
  );
}
