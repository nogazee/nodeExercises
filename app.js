const jokes = require('./jokes.js');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add a new object of a random name, age and a joke',
    handler() {
        jokes.addJoke();
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a joke",
    builder: {
        name: {
            describe: '',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.removeJoke(argv.name);
    }
});

yargs.command({
    command: "list",
    describe: "List the jokes",
    handler() {
        jokes.listJokes();
    }
});

yargs.command({
    command: "read",
    describe: "read a joke",
    builder: {
        name: {
        describe: "",
        demandOption: true,
        type: "string",
        }
    },
    handler(argv) {
        jokes.readJoke(argv.name);
    }
});

yargs.command({
    command: "get",
    describe: "get a joke by category",
    builder: {
        category: {
            describe: "Joke category",
            demandOption: false,
            type: "string"
        }
    },
    handler(argv) {
        jokes.getJokeByCategory(argv.category);
    }
});

yargs.parse();