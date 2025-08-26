const { Joke } = require("bee-jokes");
const joke = new Joke();
const chance = require("chance").Chance();
const fs = require("fs");

const addJoke = () => {
    const jokes = loadJokes();
    const randomName = chance.name({ nationality: "en" });
    const duplicateName = jokes.find((joke) => joke.name === randomName);
    if (!duplicateName) {
        jokes.push({
            name: randomName,
            age: chance.age(),
            joke: joke.getJoke({}).joke
        });
        saveJokes(jokes);
        console.log("New joke added!");
    } else {
        console.log("Name taken");
    }
}

const removeJoke = (name) => {
    const jokes = loadJokes();
    const jokesToKeep = jokes.filter((joke) => joke.name !== name);
    if (jokes.length > jokesToKeep.length) {
        console.log('Joke removed!');
        saveJokes(jokesToKeep);
    } else {
        console.log('Joke not found');
    }
}

const listJokes = () => {
    const jokes = loadJokes();
    console.log('List of Jokes:');
    jokes.forEach((joke) => {
        console.log(joke.joke);
    });
}

const readJoke = (name) => {
    const jokes = loadJokes();
    const joke = jokes.find((joke) => joke.name === name);
    if (joke) {
        console.log(joke.joke);
    } else {
        console.log("Joke not found");
    }
}

const getJokeByCategory = (categoryName) => {
    if (categoryName) {
        const categories = joke.getCategories();
        const realCategory = categories.find((category) => category.name === categoryName);
        if (realCategory) {
            console.log(joke.getJoke({ category: `${categoryName}` }).joke);
        } else {
            console.log("Invalid category");
        }
    } else {
        listCategories();
    }
}

const listCategories = () => {
    const categories = joke.getCategories();
    console.log("List of Categories:");
    categories.forEach((category) => {
        console.log(category.name);
    });
}

const saveJokes = (jokes) => {
    const dataJSON = JSON.stringify(jokes);
    fs.writeFileSync("jokes.json", dataJSON);
}

const loadJokes = () => {
    try {
        const dataBuffer = fs.readFileSync("jokes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
  addJoke: addJoke,
  removeJoke: removeJoke, 
  listJokes: listJokes,
  readJoke: readJoke,
  getJokeByCategory: getJokeByCategory
};
