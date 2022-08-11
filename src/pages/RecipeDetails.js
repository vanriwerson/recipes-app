import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Recommendation from '../components/Recommendation';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import ShareAndFavoriteButton from '../components/ShareAndFavoriteButton';
import useRecipeId from '../hooks/useRecipeId';
import useInProgressLocalStorage from '../hooks/useInProgressLocalStorage';
import useDoneRecipesLocalStorage from '../hooks/useDoneRecipesLocalStorage';

function RecipeDetails({ match: { params: { recipeId }, url } }) {
  const history = useHistory();
  const [recipeStatus, setRecipeStatus] = useState('');
  const { recipe } = useRecipeId(recipeId);
  const { recoveredInProgress, addRecipeInProgress, key } = useInProgressLocalStorage();
  const { recoveredDone } = useDoneRecipesLocalStorage();

  useEffect(() => {
    if (recoveredInProgress
      && key
      && Object.keys(recoveredInProgress).some((keyLocal) => keyLocal === key)
      && Object.keys(recoveredInProgress[key]).some((id) => id === recipeId)) {
      setRecipeStatus('inProgress');
    }
  },
  [key, recipeId, recoveredInProgress]);

  const isThisRecipeDone = () => recoveredDone && recoveredDone?.some(
    (doneRecipe) => doneRecipe.id === recipeId,
  );

  const handleClick = () => {
    if (!recipeStatus) {
      addRecipeInProgress(recipeId);
    }
    history.push(`${recipeId}/in-progress`);
  };

  return (
    <div className="recipe-details-container">
      {recipe && (
        <RecipeDetailsCard recipe={ recipe } url={ url } />
      )}
      <ShareAndFavoriteButton recipe={ recipe } recipeId={ recipeId } />
      { url.includes('foods') ? (
        <Recommendation pathName="drinks" />
      ) : (
        <Recommendation pathName="foods" />
      ) }

      {!isThisRecipeDone() && (
        <button
          data-testid="start-recipe-btn"
          className="button-start"
          type="button"
          onClick={ handleClick }
        >
          {recipeStatus === 'inProgress' ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
