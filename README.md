# Find Food Recipe

This application is designed to save and search recipes by parameters (ingredients, calories, diets, etc.). The project uses the [Spoonacular API](https://spoonacular.com/).

## Technologies
Project is created with:
* [Vue 2.0](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Spoonacular API](https://spoonacular.com/)

## Project setup
```
npm install
```

### Environment variables

```
API_KEY = 'Your Spoonacular API key'
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Sample deployment using Node Server
```
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get(/.*/, (req, res) => {
    return res.sendFile(path.join(__dirname, "dist/index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listen on ${port}`);
});

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Demo
https://findfoodrecipe.herokuapp.com/

### Contact
Created by pidudkiewicz632 (pidudkiewicz932@gmail.com).

