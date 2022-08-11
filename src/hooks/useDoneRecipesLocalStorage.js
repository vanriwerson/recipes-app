import { useEffect, useState } from 'react';
import {
  getRecipeFromLocalStorage,
  setRecipeInLocalStorage,
} from '../services/localStorage';

export default function useDoneRecipesLocalStorage() {
  const [recoveredDone, setRecoveredDone] = useState('');
  useEffect(() => {
    const dataStorage = getRecipeFromLocalStorage('doneRecipes');
    if (dataStorage.length > 0) {
      setRecoveredDone(dataStorage);
    }
  }, []);

  const removeDone = (recipeId) => {
    const doneRecipesUpdate = recoveredFavorites.filter(
      (favoriteRecipe) => favoriteRecipe.id !== recipeId,
    );
    setRecoveredDone(doneRecipesUpdate);
    setRecipeInLocalStorage('doneRecipes', doneRecipesUpdate);
  };

  const addDone = (recipe) => {
    const date = new Date();
    const doneRecipesUpdate = [
      ...recoveredDone,
      {
        id: recipe?.idDrink || recipe?.idMeal,
        type: recipe?.strAlcoholic ? 'drink' : 'food',
        nationality: recipe?.strArea || '',
        category: recipe?.strCategory || '',
        alcoholicOrNot: recipe?.strAlcoholic || '',
        name: recipe?.strDrink || recipe?.strMeal,
        image: recipe?.strDrinkThumb || recipe?.strMealThumb,
        doneDate: `Finished in
        ${
  date.getDate()}/${String(date.getMonth() + 1).padStart('2', 0)}/${date.getFullYear()}`,
        tags: recipe.strTags ? recipe.strTags.split(',') : [],
      },
    ];
    setRecoveredDone(doneRecipesUpdate);
    setRecipeInLocalStorage('doneRecipes', doneRecipesUpdate);
  };

  return { recoveredDone, removeDone, addDone };
}
