import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

export default function ListRecipes({ recipes }) {
  return (
    <div className="list-recipes-container">
      { recipes?.map(
        (recipe, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            recipe={ recipe }
          />
        ),
      )}
    </div>
  );
}

ListRecipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()),
}.isRequired;
