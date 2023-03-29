const fs = require("fs");

function readData() {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);
  return data;
}

function writeData(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync("data.json", jsonData);
}

function searchCarRequirements(args) {
  const data = readData();
  const { CarModel, carColour, carSeater, engineType, fuelType } = args;

  const filteredData = data.filter(
    (car) =>
      (!CarModel || car.CarModel.toLowerCase().includes(CarModel.toLowerCase())) &&
      (!carColour || car.carColour.toLowerCase().includes(carColour.toLowerCase())) &&
      (!carSeater || car.carSeater >= carSeater) &&
      (!engineType || car.engineType.toLowerCase().includes(engineType.toLowerCase())) &&
      (!fuelType || car.fuelType.toLowerCase().includes(fuelType.toLowerCase()))
  );

  return filteredData;
}

function sortPrice(args) {
  const data = readData();

  const sortedData = data.sort((a, b) => {
    if (args.sort === "asc") {
      return a.carPrice - b.carPrice;
    } else {
      return b.carPrice - a.carPrice;
    }
  });

  return sortedData;
}

function searchMostBudgetFriendly() {
  const data = readData();

  const budgetFriendlyCar = data.reduce((acc, car) => {
    if (!acc || car.carPrice < acc.carPrice) {
      return car;
    } else {
      return acc;
    }
  }, null);

  return budgetFriendlyCar;
}

function requestCustomization(args) {
  const data = readData();
  const { CarModel } = args;

  const carIndex = data.findIndex((car) => car.CarModel.toLowerCase() === CarModel.toLowerCase());

  if (carIndex === -1) {
    return "Car not found";
  }

  data[carIndex] = { ...data[carIndex], ...args };
  writeData(data);

  return "Car customized successfully";
}

function checkAvailability(args) {
  const data = readData();
  const { CarModel } = args;

  const car = data.find((car) => car.CarModel.toLowerCase() === CarModel.toLowerCase());

  if (!car) {
    return "Car not found";
  }

  return `The ${CarModel} is available`;
}

module.exports = {
  searchCarRequirements,
  sortPrice,
  searchMostBudgetFriendly,
  requestCustomization,
  checkAvailability,
};
