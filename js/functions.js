const checkString = (string = '', maxLength = 1) => string.length <= maxLength;

console.log(checkString('проверяемая строка', 20));
console.log(checkString('проверяемая строка', 18));
console.log(checkString('проверяемая строка', 10));


const isPalindrom = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (i = string.length -1; i >= 0; i--) {
    reversed += string[i];
  }
  return string === reversed;
};
console.log(isPalindrom('топот'));
console.log(isPalindrom('ДовОд'));
console.log(isPalindrom('Кекс'));
