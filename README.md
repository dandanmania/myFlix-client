# myFlix Client App

This project is from [CareerFoundry's Full Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/) Achievement 3. This web app is built with React to utilize the [API from Achievement 2](https://github.com/dandanmania/movie_api) and display information of a few anime movies (Movies, Directors, Genres). Users will be able to register to gain access to the site, update their personal information, and create and manage a list of their favorite movies. Users can also deregister at any time.

Access the web app here:\
[![Netlify Status](https://api.netlify.com/api/v1/badges/3c22bf9a-e2c8-4736-9fb4-604f0dbe3fe5/deploy-status)](https://app.netlify.com/sites/dandan-myflix/deploys)\
https://dandan-myflix.netlify.app/

## Created With

- React.js

## Uses

- React Bootstrap
- React Router
- React Redux
- Parcel
- PropTypes
- Sass
- Axios

### Current Issues

- Refreshing in any of the Movie, Director, Genre Views will usually only result in an error (mainly due to how the routing is set up).

### Set Up

- Clone this repository
- Run `npm install`
- If you clone this repository and wished to use parcel to build this app, be sure to go into package.json and change:
  `"default": index.js` to `"main": src/index.html`. This was changed for the live version of the app.
- Run `parcel src/index.html` to run it locally.
