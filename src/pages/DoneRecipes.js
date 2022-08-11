import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/RecipesContext';
import { ShareNetwork } from 'phosphor-react';
import Header from '../components/Header';
import useDoneRecipesLocalStorage from '../hooks/useDoneRecipesLocalStorage';

function DoneRecipes() {
  const history = useHistory();

  const { recoveredDone } = useDoneRecipesLocalStorage();

  const [mealsMade, setMealsMade] = useState([]);

  useEffect(() => {
    if (recoveredDone) {
      setMealsMade(recoveredDone);
    }
  }, [recoveredDone]);

  const shareUrl = (name, value) => {
    const url = `http://localhost:3000/${name}/${recoveredDone[value].id}`;
    navigator.clipboard.writeText(url);
    const snackbar = document.getElementsByClassName('snackbar')[value];
    snackbar.style.display = 'block';
  };

  const filtros = (value) => {
    let data = recoveredDone;
    if (value === 'food') {
      data = recoveredDone.filter((meal) => meal.type === 'food');
    }
    if (value === 'drink') {
      data = recoveredDone.filter((meal) => meal.type === 'drink');
    }
    setMealsMade(data);
  };

  return (
    <>
      <Header pageTitle="Done Recipes" />
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

      <div className="done-recipes-container">
        { mealsMade.length > 0 && mealsMade.map((recipe, index) => (

          recipe.type === 'food' ? (
            <div
              data-testid="meal-card"
              className="done-recipe-card"
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
              <div className="container-done-infos">
                <div>
                  <h5
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </h5>

                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>

                  { recipe && recipe.tags.map((tag, i) => (
                    i < 2 && (
                      <p
                        key={ tag }
                        data-testid={ `${0}-${tag}-horizontal-tag` }
                      >
                        {`Tag: ${tag}`}
                      </p>
                    )

                  ))}
                </div>
                <button
                  className="btn-share-done"
                  type="button"
                  onClick={ () => shareUrl('foods', index) }
                >
                  <ShareNetwork size={ 32 } weight="light" />
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
              data-testid="drink-card"
              className="done-recipe-card"
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
              <div className="container-done-infos">
                <div>
                  <h5
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </h5>

                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>
                </div>

                <button
                  className="btn-share-done"
                  type="button"
                  name="drinks"
                  onClick={ () => shareUrl('drinks', index) }
                >
                  <ShareNetwork size={ 32 } weight="light" />
                </button>
              </div>
              <p
                className="snackbar"
              >
                Link copied!

              </p>
            </div>

          )

        ))}
      </div>

    </>
  );
}

export default DoneRecipes;
