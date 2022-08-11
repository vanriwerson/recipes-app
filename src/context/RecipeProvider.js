import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  requestFilters,
  requestMeals,
  requestDrinks,
  requestCategories,
} from '../services/requestAPI';
import limitArrayLength from '../helpers/limitArrayLength';
import { getProfileFromLocalStorage } from '../services/localStorage';

function RecipeProvider({ children }) {
  const [allDoneRecipes, setAllDoneRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [route, setRoute] = useState('');
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const maxRecipes = 12;
    async function getRecipes() {
      if (route) {
        if (filter) {
          if (route === '/drinks') {
            const filteredRecipes = await requestFilters.drink(filter);
            setRecipes(limitArrayLength(filteredRecipes.drinks, maxRecipes));
          } else {
            const filteredRecipes = await requestFilters.meal(filter);
            setRecipes(limitArrayLength(filteredRecipes.meals, maxRecipes));
          }
        } else if (route === '/drinks') {
          const drinksRecomendations = await requestDrinks.name();
          setRecipes(limitArrayLength(drinksRecomendations.drinks, maxRecipes));
        } else {
          const mealsRecomendations = await requestMeals.name();
          setRecipes(limitArrayLength(mealsRecomendations.meals, maxRecipes));
        }
      }
    }
    getRecipes();
  }, [route, filter]);

  useEffect(() => {
    const maxCategories = 5;
    async function getCategories() {
      if (route) {
        if (route.includes('foods')) {
          const mealCategories = await requestCategories.meal();
          setCategories(limitArrayLength(mealCategories.meals, maxCategories));
        } else {
          const drinkCategories = await requestCategories.drink();
          setCategories(limitArrayLength(drinkCategories.drinks, maxCategories));
        }
      }
    }
    getCategories();
  }, [route]);

  useEffect(() => {
    if (getProfileFromLocalStorage()) {
      setEmail(getProfileFromLocalStorage());
    }
  }, []);

  const INITIAL_STATE_VALUE = {
    recipes,
    setRecipes,
    setFilter,
    setRoute,
    categories,
    email,
    setEmail,
    allDoneRecipes,
    setAllDoneRecipes,
  };
  return (
    <RecipesContext.Provider value={ INITIAL_STATE_VALUE }>
      { children }
    </RecipesContext.Provider>
  );
}
export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
