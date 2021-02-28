# 2020-spring-group-JayPath

Group project

## Install Node and NPM

If you haven't have Node.js and NPM installed on your computer:

1. Go to https://nodejs.org/en/download/.
2. Follow the installation instructions.
3. Verify that you have node installed by typing `node -v` in a command prompt.
   You can also refer to https://phoenixnap.com/kb/install-node-js-npm-on-windows to see more detailed instructions.

## Dependencies

After cloning our project, first go to the ./express folder. This is our express.js backend.

1. Try `npm install` first. This should install all dependencies specified in package.json.
2. Try `node index.js`. If it's running correctly, the console will display 'Listening on port 5000'.
3. If there are errors, please check that all packages have been installed by looking into the ./express/node_modules folder. You can install missing packages manually by `npm i <packagename>`.

The same procedure applies to the ./client folder, which is where the React.js frontend locates. The only difference is that you need to use `npm start` to start the frontend.

Note: The errors that are the most likely to be encountered are sqlite3 or react-scripts are missing. If that's the case you can run `npm i react-scripts`, `npm i react-autosuggest` in ./client and `npm i sqlite3` in ./express.

## What we have accomplished in Iteration 1

We have established a basic web application framework which can retrive all eleven cs core courses and math prerequisite courses, plus recommend three track courses to the user according to user's choice of his/her focus area in computer science. We managed to successfully build a sqlite database, a basic frontend with React and a server with Node.js where each part can communicate with one another.

## What we need to work on.

-- Need to work on the algorithm and get more input from the user in addition to focus areas and return a complete list of courses which also include other upper-level cs courses. The recommended three track courses and eleven core courses for each track now are just a rough draft of the schedule of how we can get user data and give relevant response from the server.
