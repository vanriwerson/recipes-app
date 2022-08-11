import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipeProvider from '../../context/RecipeProvider';

const renderWithRouterProvider = (component, {
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
} = {}) => ({

  ...render(
    <RecipeProvider>
      <Router history={ history }>
        {component}
      </Router>
      ,
    </RecipeProvider>,
  ),
  history,
});

export default renderWithRouterProvider;
