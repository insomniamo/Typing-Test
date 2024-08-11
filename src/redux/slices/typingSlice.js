import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputValue: '', // Текущий ввод пользователя
  timerStarted: false, // Флаг запуска таймера
  timeLeft: 15, // Оставшееся время для ввода текста
  errorsCount: 0, // Счетчик ошибок пользователя
  results: null, // Результаты теста
  selectedTime: 15, // Выбранное пользователем время для теста
  wordsPerMinute: 0, // Количество слов в минуту (WPM)
  placeholderText: "Манул - это небольшая дикая кошка, обитающая в степях и горных регионах Центральной Азии. Они известны своим густым и пушистым мехом, который помогает им выживать в суровых условиях. Манулы выглядят крупнее домашних кошек за счет своего меха, но на самом деле их размер сопоставим с обычными кошками." // Текст-заполнитель для теста
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    // Обновляет значение вводимого текста
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    
    // Устанавливает флаг запуска таймера
    setTimerStarted: (state, action) => {
      state.timerStarted = action.payload;
    },

    // Устанавливает оставшееся время
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },

    // Обновляет количество ошибок
    setErrorsCount: (state, action) => {
      state.errorsCount = action.payload;
    },

    // Сохраняет результаты теста (можно использовать для отображения итогов)
    setResults: (state, action) => {
      state.results = action.payload;
    },

    // Сбрасывает состояние теста до начальных значений
    resetTest: (state) => {
      state.inputValue = '';
      state.timerStarted = false;
      state.timeLeft = state.selectedTime;
      state.errorsCount = 0;
      state.results = null;
      state.wordsPerMinute = 0;
    },

    // Устанавливает выбранное пользователем время для теста
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
      state.timeLeft = action.payload; // Обновление оставшегося времени для синхронизации с выбранным временем
    },

    // Устанавливает текст-заполнитель (текст, который пользователь должен ввести)
    setPlaceholderText: (state, action) => {
      state.placeholderText = action.payload;
    },

    // Рассчитывает количество слов в минуту (WPM) на основе правильного ввода и прошедшего времени
    calculateWPM: (state) => {
      const inputWords = state.inputValue.trim().split(/\s+/); // Разделяем введенный текст на слова
      const placeholderWords = state.placeholderText.split(/\s+/); // Разделяем текст-заполнитель на слова

      // Подсчет количества правильно введенных слов
      const correctWords = inputWords.filter((word, index) => word === placeholderWords[index]).length;

      // Вычисление прошедшего времени в минутах
      const elapsedTimeInMinutes = (state.selectedTime - state.timeLeft) / 60;

      // Рассчет WPM: количество правильных слов делится на прошедшее время
      state.wordsPerMinute = elapsedTimeInMinutes > 0 ? Math.round(correctWords / elapsedTimeInMinutes) : 0;
    }
  },
});

export const {
  setInputValue,
  setTimerStarted,
  setTimeLeft,
  setErrorsCount,
  setResults,
  resetTest,
  setSelectedTime,
  setPlaceholderText,
  calculateWPM
} = typingSlice.actions;

export default typingSlice.reducer;
