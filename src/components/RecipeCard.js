import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';

export default function RecipeCard({ index, recipe }) {
  const history = useHistory();
  const [route, setRoute] = useState('');

  useEffect(() => {
    if (history.location.pathname.includes('foods')) {
      setRoute(`/foods/${recipe.idMeal}`);
    } else {
      setRoute(`/drinks/${recipe.idDrink}`);
    }
  }, [history, recipe]);

  return (
    <Link
      type="button"
      to={ route }
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <p
        data-testid={ `${index}-card-name` }
      >
        { recipe?.strDrink || recipe?.strMeal }
      </p>
      <img
        alt={ recipe?.strDrink || recipe?.strMeal }
        src={ recipe?.strDrinkThumb || recipe?.strMealThumb }
        data-testid={ `${index}-card-img` }
      />
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape(),
}.isRequired;
