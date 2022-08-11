// Meals:

const requestMeals = {
  ingredient: async (ingredient) => {
    const MEAL_BY_INGREDIENT_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(MEAL_BY_INGREDIENT_URL);
    const data = await response.json();
    return data;
  },
  name: async (name = '') => {
    const MEAL_BY_NAME_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(MEAL_BY_NAME_URL);
    const data = await response.json();
    return data;
  },
  firstLetter: async (firstLetter) => {
    const MEAL_BY_FIRST_LETTER_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(MEAL_BY_FIRST_LETTER_URL);
    const data = await response.json();
    return data;
  },
};

const requestDrinks = {
  ingredient: async (ingredient) => {
    const DRINK_BY_INGREDIENT_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(DRINK_BY_INGREDIENT_URL);
    const data = await response.json();
    return data;
  },
  name: async (name = '') => {
    const DRINK_BY_NAME_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(DRINK_BY_NAME_URL);
    const data = await response.json();
    return data;
  },
  firstLetter: async (firstLetter) => {
    const DRINK_BY_FIRST_LETTER_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(DRINK_BY_FIRST_LETTER_URL);
    const data = await response.json();
    return data;
  },
};

const requestCategories = {
  meal: async () => {
    const CATEGORIES_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(CATEGORIES_MEAL_URL);
    const data = await response.json();
    return data;
  },
  drink: async () => {
    const CATEGORIES_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(CATEGORIES_DRINK_URL);
    const data = await response.json();
    return data;
  },
};

const requestDetails = {
  food: async (recipeId) => {
    const FOOD_DETAILS_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const response = await fetch(FOOD_DETAILS_URL);
    const data = await response.json();
    return data;
  },
  drink: async (recipeId) => {
    const DRINK_DETAILS_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const response = await fetch(DRINK_DETAILS_URL);
    const data = await response.json();
    return data;
  },
};

const requestFilters = {
  meal: async (filter) => {
    const MEAL_FILTER_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(MEAL_FILTER_URL);
    const data = await response.json();
    return data;
  },
  drink: async (filter) => {
    const DRINK_FILTER_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(DRINK_FILTER_URL);
    const data = await response.json();
    return data;
  },
};

export {
  requestMeals,
  requestDrinks,
  requestCategories,
  requestDetails,
  requestFilters,
};
