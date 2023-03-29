const yargs = require("yargs");
const {
  searchCarRequirements,
  sortPrice,
  searchMostBudgetFriendly,
  requestCustomization,
  checkAvailability,
} = require("./module");

const options = yargs
  .command({
    command: "search",
    describe: "Search cars based on given requirements",
    builder: {
      CarModel: {
        describe: "Model of the car",
        demandOption: false,
        type: "string",
      },
      carColour: {
        describe: "Colour of the car",
        demandOption: false,
        type: "string",
      },
      carSeater: {
        describe: "Number of seats in the car",
        demandOption: false,
        type: "number",
      },
      engineType: {
        describe: "Type of engine in the car",
        demandOption: false,
        type: "string",
      },
      fuelType: {
        describe: "Type of fuel used in the car",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      const result = searchCarRequirements(argv);
      console.log(result);
    },
  })
  .command({
    command: "sort",
    describe: "Sort cars based on price",
    builder: {
      sort: {
        describe: "Sorting order (asc or desc)",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const result = sortPrice(argv);
      console.log(result);
    },
  })
  .command({
    command: "budget",
    describe: "Find the most budget friendly car",
    handler() {
      const result = searchMostBudgetFriendly();
      console.log(result);
    },
  })
  .command({
    command: "customize",
    describe: "Customize a car with additional features",
    builder: {
      CarModel: {
        describe: "Model of the car to customize",
        demandOption: true,
        type: "string",
      },
      carColour: {
        describe: "Colour of the car",
        demandOption: false,
        type: "string",
      },
      carSeater: {
        describe: "Number of seats in the car",
        demandOption: false,
        type: "number",
      },
      engineType: {
        describe: "Type of engine in the car",
        demandOption: false,
        type: "string",
      },
      fuelType: {
        describe: "Type of fuel used in the car",
        demandOption: false,
        type: "string",
      },
      carPrice: {
        describe: "Price of the car",
        demandOption: false,
        type: "number",
      },
    },
    handler(argv) {
      const result = requestCustomization(argv);
      console.log(result);
    },
  })
  .command({
    command: "check",
    describe: "Check the availability of a car",
    builder: {
      CarModel: {
        describe: "Model of the car to check availability",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const result = checkAvailability(argv);
      console.log(result);
    },
  })
  .help()
  .argv;
