import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import ListRecipes from '../components/ListRecipes';

function Recipes() {
  const {
    recipes,
    setFilter,
    setRoute,
    categories,
  } = useContext(RecipesContext);

  const history = useHistory();

  const toggleFilter = (oldState, name) => {
    if (oldState === name) {
      return '';
    }
    return name;
  };

  useEffect(() => {
    setRoute(history.location.pathname);
  }, [history.location.pathname, setRoute]);

  return (
    <>
      {history.location.pathname === '/drinks' ? (
        <Header pageTitle="Drinks" />
      ) : (
        <Header pageTitle="Foods" />
      )}
      <div className="category-filter-container">
        { categories?.length > 0 && categories.map((categorie) => (
          <button
            name={ categorie.strCategory }
            onClick={ (e) => setFilter(
              (oldState) => toggleFilter(oldState, e.target.name),
            ) }
            key={ categorie.strCategory }
            type="button"
            data-testid={ `${categorie.strCategory}-category-filter` }
          >
            {categorie.strCategory}
          </button>
        )) }
        <button
          type="button"
          onClick={ () => setFilter('') }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      <ListRecipes recipes={ recipes } />
      <Footer />
    </>
  );
}

export default Recipes;
