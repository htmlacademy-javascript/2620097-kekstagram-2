const MINUTES_PER_HOUR = 60;

/**
 * Преобразует строку времени "Ч:М" в минуты от полуночи.
 * @param {string} timeStr - Время в формате "часы:минуты" (1–2 цифры для каждого)
 * @returns {number} Минуты от полуночи
 */
const parseTimeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
};

/**
 * Возвращает true, если встреча укладывается в рабочий день, иначе false.
 * @param {string} workStart - Начало рабочего дня (напр. '08:00', '8:0')
 * @param {string} workEnd - Конец рабочего дня (напр. '17:30')
 * @param {string} meetingStart - Время начала встречи
 * @param {number} durationMinutes - Продолжительность встречи в минутах
 * @returns {boolean}
 */
const isMeetingWithinWorkDay = (workStart, workEnd, meetingStart, durationMinutes) => {
  const workStartMinutes = parseTimeToMinutes(workStart);
  const workEndMinutes = parseTimeToMinutes(workEnd);
  const meetingStartMinutes = parseTimeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + durationMinutes;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

export { isMeetingWithinWorkDay };
