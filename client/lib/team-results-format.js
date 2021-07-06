export default function teamResultsFormat(string) {
  const newResultArray = [];
  const lastGame = string[string.length - 1];
  const secondLastGame = string[string.length - 2];
  const thirdLastGame = string[string.length - 3];
  const resultArray = [thirdLastGame, secondLastGame, lastGame];
  resultArray.forEach(letter => {
    if (letter === 'L') {
      newResultArray.push('../images/loss.png');
    }
    if (letter === 'D') {
      newResultArray.push('../images/draw.png');
    } else if (letter === 'W') {
      newResultArray.push('../images/win.png');
    }
  });
  return newResultArray;
}
