import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Recipes, RecipeDetails,
  Profile, DoneRecipes, FavoriteRecipes, RecipeInProgress } from '../pages';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/foods/:recipeId" component={ RecipeDetails } />
      <Route exact path="/drinks/:recipeId" component={ RecipeDetails } />
      <Route
        exact
        path="/foods/:recipeId/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:recipeId/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
