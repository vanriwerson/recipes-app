import React from 'react';
import PropTypes from 'prop-types';
import getIngredientsAndMeasures from '../helpers/getIngredientsAndMeasures';

const RecipeDetailsCard = ({ recipe, url }) => {
  const { ingredients, measures } = getIngredientsAndMeasures(recipe);

  return (
    <div className="wrapper">
      <img
        src={ recipe?.strDrinkThumb || recipe.strMealThumb }
        alt={ recipe?.strDrink || recipe?.strMeal }
        data-testid="recipe-photo"
      />
      <div>
        <h1
          data-testid="recipe-title"
        >
          { recipe?.strDrink || recipe?.strMeal }
        </h1>
        <p className="category" data-testid="recipe-category">
          {`Category: ${recipe?.strAlcoholic || recipe?.strCategory}`}
        </p>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <span
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {ingredient}
              </span>
              {' '}
              <span
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {measures[i] !== null ? measures[i] : ''}
              </span>
            </li>
          ))}
        </ul>
        <p
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </p>
        {url.includes('foods') && (
          <iframe
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
          />
        )}
      </div>
    </div>
  );
};

RecipeDetailsCard.propTypes = {
  recipe: PropTypes.instanceOf(Object),
  url: PropTypes.string,
}.isRequired;

export default RecipeDetailsCard;
