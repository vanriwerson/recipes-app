import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getRecipeFromLocalStorage,
  setRecipeInLocalStorage,
} from '../services/localStorage';

export default function useInProgressLocalStorage() {
  const [recoveredInProgress, setRecoveredInProgress] = useState('');
  const { location: { pathname } } = useHistory();
  const [key, setKey] = useState('');

  useEffect(() => {
    const dataStorage = getRecipeFromLocalStorage('inProgressRecipes');
    if (dataStorage.length > 0 || Object.keys(dataStorage).length > 0) {
      setRecoveredInProgress(dataStorage);
    }
    if (pathname.includes('foods')) {
      setKey('meals');
    } else {
      setKey('cocktails');
    }
  }, [pathname]);

  const addRecipeInProgress = (recipeId) => {
    const localStorageUpdate = {
      ...recoveredInProgress,
      [key]: {
        [recipeId]: [],
        ...recoveredInProgress[key],
      },
    };
    setRecoveredInProgress(localStorageUpdate);
    setRecipeInLocalStorage('inProgressRecipes', localStorageUpdate);
  };

  const addIngredient = (recipeId, ingredient) => {
    if (recoveredInProgress
      && Object.keys(recoveredInProgress[key]).some((id) => id === recipeId)) {
      const localStorageUpdate = {
        ...recoveredInProgress,
        [key]: {
          ...recoveredInProgress[key],
          [recipeId]: [...recoveredInProgress[key][recipeId], ingredient],
        },
      };
      setRecoveredInProgress(localStorageUpdate);
      setRecipeInLocalStorage('inProgressRecipes', localStorageUpdate);
    } else {
      const localStorageUpdate = {
        ...recoveredInProgress,
        [key]: {
          [recipeId]: [ingredient],
          ...recoveredInProgress[key],
        },
      };
      setRecoveredInProgress(localStorageUpdate);
      setRecipeInLocalStorage('inProgressRecipes', localStorageUpdate);
    }
  };

  const removeIngredient = (recipeId, ingredient) => {
    const ingredientsUpdate = recoveredInProgress[key][recipeId].filter(
      (item) => item !== ingredient,
    );
    const localStorageUpdate = {
      ...recoveredInProgress,
      [key]: {
        ...recoveredInProgress[key],
        [recipeId]: ingredientsUpdate,
      },
    };
    setRecoveredInProgress(localStorageUpdate);
    setRecipeInLocalStorage('inProgressRecipes', localStorageUpdate);
  };

  return {
    recoveredInProgress,
    key,
    addRecipeInProgress,
    addIngredient,
    removeIngredient };
}
