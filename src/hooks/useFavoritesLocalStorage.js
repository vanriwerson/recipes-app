import { useEffect, useState } from 'react';
import {
  getRecipeFromLocalStorage,
  setRecipeInLocalStorage,
} from '../services/localStorage';

export default function useFavoritesLocalStorage() {
  const [recoveredFavorites, setRecoveredFavorites] = useState('');
  useEffect(() => {
    const dataStorage = getRecipeFromLocalStorage('favoriteRecipes');
    if (dataStorage.length > 0) {
      setRecoveredFavorites(dataStorage);
    }
  }, []);

  const removeFavorite = (recipeId) => {
    const favoriteRecipesUpdate = recoveredFavorites.filter(
      (favoriteRecipe) => favoriteRecipe.id !== recipeId,
    );
    setRecoveredFavorites(favoriteRecipesUpdate);
    setRecipeInLocalStorage('favoriteRecipes', favoriteRecipesUpdate);
  };

  const addFavorite = (recipe) => {
    const favoriteRecipesUpdate = [...recoveredFavorites,
      {
        id: recipe?.idDrink || recipe?.idMeal,
        type: recipe?.strAlcoholic ? 'drink' : 'food',
        nationality: recipe?.strArea || '',
        category: recipe?.strCategory || '',
        alcoholicOrNot: recipe?.strAlcoholic || '',
        name: recipe?.strDrink || recipe?.strMeal,
        image: recipe?.strDrinkThumb || recipe?.strMealThumb,
      },
    ];
    setRecoveredFavorites(favoriteRecipesUpdate);
    setRecipeInLocalStorage('favoriteRecipes', favoriteRecipesUpdate);
  };

  return { recoveredFavorites, removeFavorite, addFavorite };
}
