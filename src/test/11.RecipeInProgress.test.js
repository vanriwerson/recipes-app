import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import RecipeInProgress from '../pages/RecipeInProgress';
import mockFetch from './mocks/mockFetch';
import localStorageMock from './mocks/localStorageMock';
import dataResponseDetails from './mocks/dataResponseDetails';

describe('Testa o componente RecipeInProgress', () => {
  const routeDrinkDetail = 'drinks/15997/in-progress';
  test('Testa se renderiza o header com o titulo "Receita em Progresso"', async () => {
    mockFetch(dataResponseDetails.drink);
    const {
      getByRole,
      findByText,
    } = renderWithRouterProvider(
      <RecipeInProgress
        match={
          { params: { recipeId: '15997' }, url: routeDrinkDetail }
        }
      />,
    );
    const title = getByRole('heading', {
      name: /Pagina de Receita em Andamento/i,
    });
    expect(title).toBeInTheDocument();
    const recipeTitle = await findByText(/GG/i);
    expect(recipeTitle).toBeInTheDocument();
  });

  test('Testa se se é possivel checar um ingrediente e deschecar', async () => {
    mockFetch(dataResponseDetails.drink);
    const {
      findByText,
    } = renderWithRouterProvider(
      <RecipeInProgress
        match={
          { params: { recipeId: '15997' }, url: routeDrinkDetail }
        }
      />,
      { route: routeDrinkDetail },
    );
    const recipeTitle = await findByText(/GG/i);
    const ingredientOne = await findByText(/galliano 2 1\/2 shots/i);
    expect(recipeTitle).toBeInTheDocument();
    expect(ingredientOne).toBeInTheDocument();
    userEvent.click(ingredientOne);
    userEvent.click(ingredientOne);
  });

  test(`Testa se ao checar todos os ingredients o botão Finish
   é habilitado`, async () => {
    mockFetch(dataResponseDetails.drink);
    const {
      findByText,
      findByRole,
    } = renderWithRouterProvider(
      <RecipeInProgress
        match={
          { params: { recipeId: '15997' }, url: routeDrinkDetail }
        }
      />,
      { route: routeDrinkDetail },
    );
    const buttonFinish = await findByRole('button', {
      name: /finish recipe/i,
    });
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).toBeDisabled();
    const ingredientOne = await findByText(/galliano 2 1\/2 shots/i);
    const ingredientTwo = await findByText(/ginger ale null/i);
    const ingredientThree = await findByText(/ice null/i);
    userEvent.click(ingredientOne);
    userEvent.click(ingredientTwo);
    userEvent.click(ingredientThree);
    expect(buttonFinish).toBeEnabled();
    await waitFor(() => {
      userEvent.click(buttonFinish);
    });
  });
  test(`Testa se todos os ingredientes estavam preenchidos
  ao recarregar a pagina o botão finish recipe continua habilitado`, async () => {
    mockFetch(dataResponseDetails.drink);
    localStorageMock();
    const data = {
      cocktails: {
        15997: [
          'Ice null',
          'Ginger ale null',
          'Galliano 2 1/2 shots ',
        ],
      },
    };
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(data));
    const {
      findByRole,
    } = renderWithRouterProvider(
      <RecipeInProgress
        match={
          { params: { recipeId: '15997' }, url: routeDrinkDetail }
        }
      />,
      { route: routeDrinkDetail },
    );
    await waitFor(async () => {
      const buttonFinish = await findByRole('button', {
        name: /finish recipe/i,
      });
      expect(buttonFinish).toBeInTheDocument();
      expect(buttonFinish).toBeEnabled();
      userEvent.click(buttonFinish);
    });
  });
});
