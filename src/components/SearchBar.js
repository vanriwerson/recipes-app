import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestMeals, requestDrinks } from '../services/requestAPI';
import limitArrayLength from '../helpers/limitArrayLength';

function SearchBar() {
  const history = useHistory();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  const getFoodAndDrink = (endPoint) => {
    switch (searchType) {
    case 'ingredient':
      return endPoint.ingredient(searchKeyword);
    case 'name':
      return endPoint.name(searchKeyword);
    default:
      if (searchKeyword.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        return endPoint.firstLetter(searchKeyword);
      }
    }
  };

  const handleSearch = async () => {
    const maxLengthArray = 12;
    if (searchKeyword) {
      if (history.location.pathname === '/drinks') {
        const getDrinks = await getFoodAndDrink(requestDrinks);
        if (getDrinks?.drinks?.length === 1) {
          setRecipes(limitArrayLength(getDrinks?.drinks, maxLengthArray));
          history.push(`/drinks/${getDrinks?.drinks[0].idDrink}`);
        } else {
          setRecipes(limitArrayLength(getDrinks?.drinks, maxLengthArray));
        }
      } else {
        const getMeals = await getFoodAndDrink(requestMeals);
        if (getMeals?.meals?.length === 1) {
          setRecipes(limitArrayLength(getMeals?.meals, maxLengthArray));
          history.push(`/foods/${getMeals?.meals[0].idMeal}`);
        } else {
          setRecipes(limitArrayLength(getMeals?.meals, maxLengthArray));
        }
      }
    }
  };

  return (
    <div className="searchbar-container">
      <div className="wrapper">
        <input
          placeholder="Buscar"
          type="text"
          id="searchInput"
          data-testid="search-input"
          onChange={ (e) => setSearchKeyword(e.target.value) }
          value={ searchKeyword }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Search
        </button>
      </div>
      <div className="filter">

        <label htmlFor="ingredientSearchRadio">
          Ingredient
          <input
            type="radio"
            id="ingredientSearchRadio"
            data-testid="ingredient-search-radio"
            name="searchRadio"
            onClick={ (e) => setSearchType(e.target.value) }
            value="ingredient"
          />
        </label>

        <label htmlFor="nameSearchRadio">
          Name
          <input
            type="radio"
            id="nameSearchRadio"
            data-testid="name-search-radio"
            name="searchRadio"
            onClick={ (e) => setSearchType(e.target.value) }
            value="name"
          />
        </label>

        <label htmlFor="firstLetterSearchRadio">
          First letter
          <input
            type="radio"
            id="firstLetterSearchRadio"
            data-testid="first-letter-search-radio"
            name="searchRadio"
            onClick={ (e) => setSearchType(e.target.value) }
            value="firstLetter"
          />
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
