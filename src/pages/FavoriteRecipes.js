import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Heart, ShareNetwork } from 'phosphor-react';
import Header from '../components/Header';
import useFavoritesLocalStorage from '../hooks/useFavoritesLocalStorage';
import FavoriteScreenAnimation from '../animations/FavoriteScreenAnimation';

function FavoriteRecipes() {
  const history = useHistory();
  const {
    recoveredFavorites,
    removeFavorite,
  } = useFavoritesLocalStorage();

  const [mealsMade, setMealsMade] = useState('');

  useEffect(() => {
    setMealsMade(recoveredFavorites);
  }, [recoveredFavorites]);

  const shareUrl = (name, value) => {
    const url = `http://localhost:3000/${name}/${recoveredFavorites[value].id}`;
    navigator.clipboard.writeText(url);
    const snackbar = document.getElementsByClassName('snackbar')[value];
    snackbar.style.display = 'block';
  };

  const filtros = (value) => {
    let data = recoveredFavorites;
    if (value === 'food') {
      data = recoveredFavorites.filter((meal) => meal.type === 'food');
    }
    if (value === 'drink') {
      data = recoveredFavorites.filter((meal) => meal.type === 'drink');
    }
    setMealsMade(data);
  };

  return (
    <>
      <Header pageTitle="Favorite Recipes" />
      <div className="favorite-container">
        <div className="favorite-filters-container">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            value="all"
            onClick={ (e) => filtros(e.target.value) }
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-food-btn"
            value="food"
            onClick={ (e) => filtros(e.target.value) }
          >
            Food
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            value="drink"
            onClick={ (e) => filtros(e.target.value) }
          >
            Drinks
          </button>
        </div>

        <div className="list-recipe-favorite-container">
          { mealsMade.length > 0 ? mealsMade.map((recipe, index) => (

            recipe.type === 'food' ? (
              <div
                className="card-recipe-favorite"
                data-testid="meal-card"
                key={ recipe.id }
              >
                <button
                  type="button"
                  data-testid="redirect-food-btn"
                  onClick={ () => history.push(`/foods/${recipe.id}`) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />

                  <h4
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h4>
                </button>

                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </h5>
                <div className="share-and-favorite-buttons">
                  <button
                    name="foods"
                    type="button"
                    onClick={ (e) => shareUrl(e.target.name, index) }
                  >
                    <ShareNetwork color="white" size={ 32 } />
                  </button>

                  <button
                    type="button"
                    onClick={ () => removeFavorite(recipe.id) }
                  >
                    <Heart color="#e74343" size={ 32 } weight="fill" />
                  </button>
                </div>

                <p
                  className="snackbar"
                >
                  Link copied!

                </p>

              </div>
            ) : (
              <div
                className="card-recipe-favorite"
                data-testid="drink-card"
                key={ recipe.id }
              >
                <button
                  type="button"
                  data-testid="redirect-drink-btn"
                  onClick={ () => history.push(`/drinks/${recipe.id}`) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />

                  <h4
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h4>
                </button>
                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </h5>
                <div className="share-and-favorite-buttons">
                  <button
                    name="drinks"
                    type="button"
                    onClick={ (e) => shareUrl(e.target.name, index) }
                  >
                    <ShareNetwork color="white" size={ 32 } />
                  </button>
                  <button
                    type="button"
                    onClick={ () => removeFavorite(recipe.id) }
                  >
                    <Heart color="#e74343" size={ 32 } weight="fill" />
                  </button>
                </div>
                <p
                  className="snackbar"
                >
                  Link copied!

                </p>
              </div>

            )

          )) : (
            <div className="not-found-recipe-favorite-container">
              <FavoriteScreenAnimation />
              <h2>No favorite recipes found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FavoriteRecipes;
