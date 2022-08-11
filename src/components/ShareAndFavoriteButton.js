import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Heart, ShareNetwork } from 'phosphor-react';
import useFavoritesLocalStorage from '../hooks/useFavoritesLocalStorage';

const copy = require('clipboard-copy');

export default function ShareAndFavoriteButton({ recipe, recipeId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const {
    recoveredFavorites,
    removeFavorite,
    addFavorite,
  } = useFavoritesLocalStorage();
  const history = useHistory();

  useEffect(() => {
    if (recoveredFavorites
      && recoveredFavorites.some((favoriteRecipe) => favoriteRecipe.id === recipeId)) {
      setIsFavorite(true);
    }
  }, [recipeId, recoveredFavorites]);

  const handleCopy = () => {
    const threeSeconds = 3000;
    if (history.location.pathname.includes('foods')) {
      copy(`http://localhost:3000/foods/${recipeId}`);
    } else {
      copy(`http://localhost:3000/drinks/${recipeId}`);
    }
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, threeSeconds);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
      setIsFavorite(false);
    } else {
      addFavorite(recipe);
      setIsFavorite(true);
    }
  };
  return (
    <div className="share-and-favorite-button-container">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopy }
      >
        { isCopied
          ? <ShareNetwork color="white" size={ 32 } weight="fill" />
          : <ShareNetwork color="white" size={ 32 } weight="light" /> }
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        { isFavorite
          ? <Heart color="#E74343" size={ 32 } weight="fill" />
          : <Heart color="#E74343" size={ 32 } weight="light" /> }
      </button>
      {isCopied && <span>Link copied!</span>}
    </div>
  );
}

ShareAndFavoriteButton.propTypes = {
  recipe: PropTypes.shape(),
  recipeId: PropTypes.string,
}.isRequired;
