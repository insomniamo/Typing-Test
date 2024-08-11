import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '@components/TypingTest/typingtest.scss';

import {
  setInputValue,
  setTimerStarted,
  setTimeLeft,
  setErrorsCount,
} from '@redux/slices/typingSlice';

const TypingTest = () => {
  const dispatch = useDispatch(); // Хук для вызова экшенов Redux
  const textAreaRef = useRef(null); // Хук useRef для получения ссылки на textarea

  // Извлечение нужных значений из состояния Redux
  const {
    inputValue,
    timerStarted,
    timeLeft,
    errorsCount,
    selectedTime,
    placeholderText
  } = useSelector((state) => state.typing);

  // useEffect для установки начального времени при загрузке компонента или изменении selectedTime
  useEffect(() => {
    dispatch(setTimeLeft(selectedTime)); // Устанавливаем оставшееся время равным выбранному времени
  }, [dispatch, selectedTime]);

  // useEffect для управления таймером обратного отсчета
  useEffect(() => {
    let timer;
    if (timerStarted && timeLeft > 0) {
      // Запускаем таймер, который каждую секунду уменьшает время
      timer = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1)); // Уменьшаем оставшееся время на 1 секунду
      }, 1000);
    } else if (timeLeft === 0 && timerStarted) {
      // Останавливаем таймер, если время вышло
      clearInterval(timer);
      dispatch(setTimerStarted(false)); // Устанавливаем флаг остановки таймера
    }

    // Очищаем таймер при размонтировании компонента или изменении времени
    return () => clearInterval(timer);
  }, [timerStarted, timeLeft, dispatch]);

  // Обработчик изменения ввода текста
  const handleChange = (e) => {
    const userInput = e.target.value;

    if (!timerStarted) {
      dispatch(setTimerStarted(true)); // Запускаем таймер при первом вводе
    }

    // Проверка, добавил ли пользователь новый символ
    if (userInput.length > inputValue.length) {
      const nextCharIndex = inputValue.length;
      if (userInput[nextCharIndex] !== placeholderText[nextCharIndex]) {
        dispatch(setErrorsCount(errorsCount + 1)); // Увеличиваем счетчик ошибок, если символ введен неправильно
      }
    }

    // Обновляем значение ввода в Redux
    dispatch(setInputValue(userInput));
  };

  // Функция для отображения текста-заполнителя с подсветкой правильных и неправильных символов
  const renderPlaceholderText = () => {
    if (!placeholderText) return null; // Если текст-заполнитель отсутствует, не отображаем ничего

    return placeholderText.split('').map((char, index) => {
      let color = 'gray'; // Цвет по умолчанию (неактивный символ)
      if (index < inputValue.length) {
        color = inputValue[index] === char ? 'green' : 'red'; // Зеленый для правильного символа, красный для ошибки
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-test">
      <div className="typing-test__wrapper">
        <div className="typing-test__placeholder">
          {renderPlaceholderText()} {/* Отображаем текст-заполнитель */}
        </div>

        <textarea className="typing-test__input"
          value={inputValue} // Привязка значения к состоянию Redux
          onChange={handleChange} // Обработчик изменения ввода
          placeholder=""
          rows={3}
          autoComplete="off"
          disabled={timeLeft === 0} // Отключаем ввод, если время истекло
          ref={textAreaRef} // Привязываем ссылку на textarea
        />
      </div>
    </div>
  );
};

export default TypingTest;
