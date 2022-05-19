const computerBoardRandom: { coordinate: number; ship: string }[] = [];
const generateBoard = (name: string) => {
  const shipSize = (() => {
    if (name === "destroyer") return 2;
    if (name === "submarine") return 3;
    if (name === "cruiser") return 3;
    if (name === "battleship") return 4;
    if (name === "carrier") return 5;
  })();

  const getRandomWithExclude = (
    min: number,
    max: number,
    excludeArray: number[]
  ) => {
    const randomNumber =
      Math.floor(Math.random() * (max - min + 1 - excludeArray.length)) + min;
    return (
      randomNumber +
      excludeArray
        .sort((a, b) => a - b)
        .reduce((acc, element) => {
          return randomNumber >= element - acc ? acc + 1 : acc;
        }, 0)
    );
  };

  let notAllowHorizontal: number[] = [
    7, 17, 27, 37, 47, 57, 67, 77, 87, 97, 8, 18, 28, 38, 48, 58, 68, 78, 88,
    98, 9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 10, 20, 30, 40, 50, 60, 70, 80,
    90, 100,
  ];

  const updatedNotAllowHorizontal: number[] = [
    ...notAllowHorizontal.splice(-(shipSize - 1) * 10),
  ];

  // console.log("not allow for", num, updatedNotAllowHorizontal);
  let addedShip: number[] = [];

  const newNum: number = getRandomWithExclude(
    1,
    100,
    updatedNotAllowHorizontal
  );
  for (let i = newNum; i < newNum + shipSize; i++) {
    addedShip.push(i);
  }
  // console.log("addedShip", addedShip);
  if (computerBoardRandom.some(r => addedShip.includes(r.coordinate))) {
    generateBoard(name);
  } else {
    for (let i = newNum; i < newNum + shipSize; i++) {
      // console.log("added" + i);
      computerBoardRandom.push({ coordinate: i, ship: name });
    }
  }

  // console.log("computerBoardRandhhghggghgdgfhrthfghfghdfgfhfgdhhggghgnom", computerBoardRandom);
};

const battleshipList = [
  "destroyer",
  "submarine",
  "cruiser",
  "battleship",
  "carrier",
];
battleshipList.forEach(ship => generateBoard(ship));

export default computerBoardRandom;
