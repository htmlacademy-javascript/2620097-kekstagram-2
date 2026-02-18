// const checkString = (string = '', maxLength = 1) => string.length <= maxLength;

// const isPalindrome = (string) => {
//   const normalized = string.replaceAll(' ', '').toLowerCase();
//   const reversed = [...normalized].reverse().join('');
//   return normalized === reversed;
// };

// const extractNumber = (string) => {
//   const str = typeof string === 'number' ? String(string) : string;
//   const digits = str.match(/\d/g);
//   return digits ? parseInt(digits.join(''), 10) : NaN;
// };

// console.log(isPalindrome('топот'));
// console.log(isPalindrome('ДовОд'));
// console.log(isPalindrome('Кекс'));

// console.log(extractNumber('2023 год'));
// console.log(extractNumber('ECMAScript 2022'));
// console.log(extractNumber('1 кефир, 0.5 батона'));
// console.log(extractNumber('агент 007'));
// console.log(extractNumber('а я томат'));

// console.log(extractNumber(2023));
// console.log(extractNumber(-1));
// console.log(extractNumber(1.5));

// const movies = [
//   { id: 1, title: 'Die hard' },
//   { id: 2, title: 'Terminator' }
// ];

// const favoriteFilmId = 2;

// // Напиши код с использованием .find(), который найдет объект фильма с id: 2.
// // Попробуешь? Помни, что в колбэк (movie) => ... теперь будет прилетать целый объект, а не просто строка!

// const favoriteFilmTitle = movies.find((movie) => movie.id === favoriteFilmId)?.title;
// console.log(favoriteFilmTitle);


