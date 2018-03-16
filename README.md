This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks. Along with information about the project
and where I got the inspiration for it<br>

## Table of Contents

- [About](#about)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Supported Browsers](#supported-browsers)
- [Future Features](#future-features)

## About

I have a tendency to mindlessly browse Hacker News, Reddit, and other sites; I wanted to make a way where I could still read
interesting articles without wasting time scrolling through multiple sites and not ever clicking on anything. This actually existed a while back with [My Headline Crawler|http://www.timqian.com/my-headline] [repo|https://github.com/timqian/my-headline-crawler], but it went dark many months ago and it seems like the original creator has moved on. So this is my attempt replicating it's functionality in React. It is still missing some functionality particularly Medium articles and switching through dates.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Future Features
* Add Medium section 
* Figure out a way to cache api results since if too many users access the site the app might get rate limited.
* Add a way for users to scroll through time

