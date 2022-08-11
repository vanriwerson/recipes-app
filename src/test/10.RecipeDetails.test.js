import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import dataResponseDetails from './mocks/dataResponseDetails';
import mockFetch from './mocks/mockFetch';
import RecipeDetails from '../pages/RecipeDetails';
import localStorageMock from './mocks/localStorageMock';

describe('Testa o componente RecipeDetails', () => {
  const foodLink = '/foods/52771';
  const drinkLink = '/drinks/15997';

  afterEach(() => {
    window.localStorage.clear();
  });

  it('Testa se a receita detalhada for um drink é renderizada corretamente', async () => {
    mockFetch(dataResponseDetails.drink);
    const { findByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '15997' }, url: drinkLink } } />,
      { route: drinkLink },
    );
    const recipeTitle = await findByText(/GG/i);
    expect(recipeTitle).toBeInTheDocument();
  });

  it(`Testa se a receita detalhada for uma
  refeição é renderizada corretamente`, async () => {
    mockFetch(dataResponseDetails.meal);
    const { findByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    const recipeTitle = await findByText(/Spicy Arrabiata Penne/i);
    expect(recipeTitle).toBeInTheDocument();
  });

  it('Testa se o favorito foi guardado no local storage', async () => {
    mockFetch(dataResponseDetails.meal);
    const data = [{
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorageMock();
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(data));
    const { findByTestId } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    await waitFor(async () => {
      const buttonFavorite = await findByTestId('favorite-btn');
      expect(buttonFavorite).toBeInTheDocument();
      expect(buttonFavorite).toHaveAttribute('alt', 'FavoriteHeart');
      userEvent.click(buttonFavorite);
      expect(buttonFavorite).toHaveAttribute('alt', 'unFavoriteHeart');
    });
  });

  it(`Testa se ao clicar no botão para favoritar ele
   muda para um coração preenchido`, async () => {
    mockFetch(dataResponseDetails.meal);
    const { findByTestId } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    await waitFor(async () => {
      const buttonFavorite = await findByTestId('favorite-btn');
      expect(buttonFavorite).toBeInTheDocument();
      expect(buttonFavorite).toHaveAttribute('alt', 'unFavoriteHeart');
      userEvent.click(buttonFavorite);
      expect(buttonFavorite).toHaveAttribute('alt', 'FavoriteHeart');
    });
  });

  it(`Testa se ao clicar no botão compartilhar em uma comida aparece a mensagem
  "Link copied!"`, async () => {
    mockFetch(dataResponseDetails.meal);
    window.document.execCommand = jest.fn(() => true);
    const { findByTestId, findByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    await waitFor(async () => {
      const buttonShare = await findByTestId('share-btn');
      expect(buttonShare).toBeInTheDocument();
      userEvent.click(buttonShare);
      const message = await findByText(/Link copied!/i);
      expect(message).toBeInTheDocument();
    });
  });

  it(`Testa se ao clicar no botão compartilhar em uma bebida aparece a mensagem
  "Link copied!"`, async () => {
    const threeSeconds = 3000;
    mockFetch(dataResponseDetails.drink);
    window.document.execCommand = jest.fn(() => true);
    const { findByTestId, findByText, queryByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '15997' }, url: drinkLink } } />,
      { route: drinkLink },
    );
    await waitFor(async () => {
      const shareBtn = await findByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
      const message = await findByText(/Link copied!/i);
      expect(message).toBeInTheDocument();
    });
    setTimeout(() => {
      const messageNone = queryByText(/Link copied!/i);
      expect(messageNone).not.toBeInTheDocument();
    }, threeSeconds);
  });

  it(`Testa se a o clicar no botão start recipe a receita é
  salva no localstorage`, async () => {
    mockFetch(dataResponseDetails.meal);
    const expectResult = { meals: { 52771: [] } };
    localStorageMock();
    const { findByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    await waitFor(async () => {
      const recipeTitle = await findByText(/Spicy Arrabiata Penne/i);
      expect(recipeTitle).toBeInTheDocument();
      const startRecipeButton = await findByText(/Start Recipe/i);
      userEvent.click(startRecipeButton);
      expect(
        JSON.parse(
          window.localStorage.getItem('inProgressRecipes'),
        ),
      ).toEqual(expectResult);
    });
  });

  it(`Testa se a receita detalhada estiver no local storage o
  botão muda para continue recipe`, async () => {
    mockFetch(dataResponseDetails.meal);
    const data = {
      meals: {
        52771: [],
        53026: [],
      },
      cocktails: {
        15997: [],
        17203: [],
      },
    };
    localStorageMock();
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(data));
    const { findByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    await waitFor(async () => {
      const recipeTitle = await findByText(/Spicy Arrabiata Penne/i);
      expect(recipeTitle).toBeInTheDocument();
      const continueRecipeButton = await findByText(/Continue Recipe/i);
      userEvent.click(continueRecipeButton);
    });
  });
  it(`Testa se a receita estiver como done no localstorage os botões start e 
  continue não aparecem`, async () => {
    mockFetch(dataResponseDetails.meal);
    const data = [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '2022-07-22T03:48:13.888Z',
        tags: [
          'Pasta',
          'Curry',
        ],
      },
    ];
    localStorageMock();
    window.localStorage.setItem('doneRecipes', JSON.stringify(data));
    const { queryByText } = renderWithRouterProvider(
      <RecipeDetails match={ { params: { recipeId: '52771' }, url: foodLink } } />,
      { route: foodLink },
    );
    await waitFor(async () => {
      const buttonStartRecipe = queryByText(/start recipe/i);
      const buttonContinueRecipe = queryByText(/continue recipe/i);
      expect(buttonStartRecipe).toBeNull();
      expect(buttonContinueRecipe).toBeNull();
    });
  });
});
