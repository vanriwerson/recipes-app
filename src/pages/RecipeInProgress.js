import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareAndFavoriteButton from '../components/ShareAndFavoriteButton';
import getIngredientsAndMeasures from '../helpers/getIngredientsAndMeasures';
import useRecipeId from '../hooks/useRecipeId';
import useInProgressLocalStorage from '../hooks/useInProgressLocalStorage';
import useDoneRecipesLocalStorage from '../hooks/useDoneRecipesLocalStorage';

export default function RecipeInProgress({ match: { params: { recipeId } } }) {
  const history = useHistory();
  const [ingredients, setIngredient] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredientsLocal, setIngredientsLocal] = useState([]);
  const { recipe } = useRecipeId(recipeId);
  const {
    recoveredInProgress,
    key,
    addIngredient,
    removeIngredient,
  } = useInProgressLocalStorage();

  const { addDone } = useDoneRecipesLocalStorage();

  useEffect(() => {
    const {
      ingredients: ingredientsFiltered,
      measures: measuresFiltered,
    } = getIngredientsAndMeasures(recipe);
    setIngredient(ingredientsFiltered);
    setMeasures(measuresFiltered);
  }, [recipe]);

  const handleClick = (event, ingredient) => {
    if (event.target.checked) {
      addIngredient(recipeId, ingredient);
    } else {
      removeIngredient(recipeId, ingredient);
    }
  };

  const handleFinishRecipe = () => {
    addDone(recipe);
    history.push('/done-recipes');
  };

  useEffect(() => {
    if (recoveredInProgress) {
      setIngredientsLocal(recoveredInProgress[key][recipeId]);
    }
  }, [key, recoveredInProgress, recipeId]);

  return (
    <div className="recipes-inprogress-container">
      <img
        alt={ recipe.strMeal || recipe.strDrink }
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <ShareAndFavoriteButton recipe={ recipe } recipeId={ recipeId } />
      <div>
        <p
          className="category"
          data-testid="recipe-category"
        >
          {`Category: ${recipe.strCategory}`}
        </p>
        {recipe?.strAlcoholic && <p>{recipe.strAlcoholic}</p>}
        <ul>
          {ingredients?.length > 0
         && ingredients.map(
           (ingredient, index) => (
             <li
               key={ ingredient }
               data-testid={ `${index}-ingredient-step` }
               className={ ingredientsLocal?.length > 0 && ingredientsLocal.some(
                 (item) => item === `${ingredient} ${measures[index]}`,
               ) && 'done' }
             >
               <label className="inprogress-ingredient" htmlFor={ ingredient }>
                 <input
                   id={ ingredient }
                   type="checkbox"
                   checked={ ingredientsLocal?.length > 0 && ingredientsLocal.some(
                     (item) => item === `${ingredient} ${measures[index]}`,
                   ) }
                   onChange={ (e) => handleClick(e, `${ingredient} ${measures[index]}`) }
                 />
                 { `${ingredient} ${measures[index]}` }
               </label>
             </li>
           ),
         )}
        </ul>
        <p
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </p>
      </div>
      <button
        className="button-finish"
        type="button"
        disabled={ ingredientsLocal?.length < ingredients?.length }
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
