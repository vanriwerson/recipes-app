import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestDetails } from '../services/requestAPI';

export default function useRecipeId(recipeId) {
  const [recipe, setRecipe] = useState('');
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDetailsData = pathname.includes('foods')
        ? await requestDetails.food(recipeId) : await requestDetails.drink(recipeId);
      if (pathname.includes('foods')) {
        setRecipe(recipeDetailsData.meals[0]);
      } else {
        setRecipe(recipeDetailsData.drinks[0]);
      }
    };
    getRecipe();
  }, [pathname, recipeId]);

  return { recipe };
}
