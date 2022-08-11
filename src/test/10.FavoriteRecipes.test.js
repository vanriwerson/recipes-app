import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import localStorageMock from './mocks/localStorageMock';

describe('Testa o componente Favorite Recipes', () => {
  const filterFoodBtnId = 'filter-by-food-btn';
  const filterDrinkBtnId = 'filter-by-drink-btn';
  localStorageMock();
  const data = [
    {
      id: '53060',
      type: 'food',
      nationality: 'Croatian',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Burek',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    },
    {
      id: '13501',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 'ABC',
      image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    },
  ];
  window.localStorage.setItem('favoriteRecipes', JSON.stringify(data));
  test('Testa se renderiza os filtros', async () => {
    const { findByTestId } = renderWithRouterProvider(<FavoriteRecipes />);
    const All = await findByTestId('filter-by-all-btn');
    const Food = await findByTestId(filterFoodBtnId);
    const Drinks = await findByTestId(filterDrinkBtnId);

    expect(All).toBeInTheDocument();
    expect(Food).toBeInTheDocument();
    expect(Drinks).toBeInTheDocument();
  });

  test('Testa se os filtros estão funcionando', async () => {
    const { findByTestId, findByRole } = renderWithRouterProvider(<FavoriteRecipes />);
    const All = await findByTestId('filter-by-all-btn');
    const Food = await findByTestId(filterFoodBtnId);
    const Drinks = await findByTestId(filterDrinkBtnId);

    userEvent.click(All);
    expect(await findByRole('heading', {
      name: /alcoholic/i,
    })).toBeInTheDocument();
    expect(await findByRole('heading', {
      name: /croatian - side/i,
    })).toBeInTheDocument();

    userEvent.click(Food);
    expect(await findByRole('heading', {
      name: /croatian - side/i,
    })).toBeInTheDocument();

    userEvent.click(Drinks);
    expect(await findByRole('heading', {
      name: /alcoholic/i,
    })).toBeInTheDocument();
  });

  test('Testa redirecionamento ao clicar em um carto do tipo comida', async () => {
    const { findByTestId, history } = renderWithRouterProvider(<FavoriteRecipes />);

    const Food = await findByTestId(filterFoodBtnId);
    userEvent.click(Food);

    const redirectButton = await findByTestId('redirect-food-btn');

    userEvent.click(redirectButton);

    expect(history.location.pathname).toBe('/foods/53060');
  });

  test('Testa redirecionamento ao clicar em um carto do tipo bebida', async () => {
    const { findByTestId, history } = renderWithRouterProvider(<FavoriteRecipes />);

    const Drink = await findByTestId(filterDrinkBtnId);
    userEvent.click(Drink);

    const redirectButton = await findByTestId('redirect-drink-btn');

    userEvent.click(redirectButton);

    expect(history.location.pathname).toBe('/drinks/13501');
  });

  test('Testa botão de compartilhar', async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        readText: jest.fn().mockImplementation(() => 'http://localhost:3000/foods/13501'),
      },
    });

    const { findByTestId, findAllByText } = renderWithRouterProvider(<FavoriteRecipes />);
    const compartilharBtnOne = await findByTestId('0-horizontal-share-btn');
    const compartilharBtnTwo = await findByTestId('1-horizontal-share-btn');

    expect(compartilharBtnOne).toBeInTheDocument();
    expect(compartilharBtnTwo).toBeInTheDocument();

    userEvent.click(compartilharBtnOne);

    const texto = await findAllByText('Link copied!');
    expect(texto[0]).toBeInTheDocument();

    const urlCopied = navigator.clipboard.readText();
    expect(urlCopied).toBe('http://localhost:3000/foods/13501');
    userEvent.click(compartilharBtnTwo);
  });

  test('Testa se ao clicar no botão para desfavoritar os cards', async () => {
    const { findByTestId } = renderWithRouterProvider(<FavoriteRecipes />);

    const buttonRemoveFavoriteOne = await findByTestId('0-horizontal-favorite-btn');
    userEvent.click(buttonRemoveFavoriteOne);

    const buttonRemoveFavoriteTwo = await findByTestId('0-horizontal-favorite-btn');
    userEvent.click(buttonRemoveFavoriteTwo);
  });
});
