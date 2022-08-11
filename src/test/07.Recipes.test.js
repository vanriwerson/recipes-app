import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import Recipes from '../pages/Recipes';
import { dataResponseCategories } from './mocks/dataResponseApi';
import mockFetch from './mocks/mockFetch';

describe('Testa o componente Recipes', () => {
  test(`Testa se tem os botões tem os nomes corretos que
  foram recebidos da api`, async () => {
    mockFetch(dataResponseCategories.drinks);
    const { findByRole, history } = renderWithRouterProvider(<Recipes />);
    history.push('/drinks');
    const buttonCategorieOne = await findByRole('button', {
      name: /ordinary drink/i,
    });
    const buttonCategorieTwo = await findByRole('button', {
      name: /cocktail/i,
    });
    const buttonCategorieThree = await findByRole('button', {
      name: /shake/i,
    });
    const buttonCategorieFour = await findByRole('button', {
      name: /other\/unknown/i,
    });
    const buttonCategorieFive = await findByRole('button', {
      name: /cocoa/i,
    });
    expect(buttonCategorieOne).toBeInTheDocument();
    expect(buttonCategorieTwo).toBeInTheDocument();
    expect(buttonCategorieThree).toBeInTheDocument();
    expect(buttonCategorieFour).toBeInTheDocument();
    expect(buttonCategorieFive).toBeInTheDocument();
  });
  test(`Testa se tem apenas 6 botões de categoria
  na tela`, async () => {
    mockFetch(dataResponseCategories.drinks);
    const expectedCategoryButtons = 6;
    const { findAllByTestId, history } = renderWithRouterProvider(<Recipes />);
    history.push('/drinks');
    await waitFor(async () => {
      const buttonsCategories = await findAllByTestId(/-category-filter/i);
      expect(buttonsCategories).toHaveLength(expectedCategoryButtons);
    });
  });
  test(`Testa se tem um botao de filtro com nome "ordinary drink" na rotas 
  "/drinks" e se é possível clicar nele`, async () => {
    mockFetch(dataResponseCategories.drinks);
    const { findByRole, history } = renderWithRouterProvider(<Recipes />);
    history.push('/drinks');
    await waitFor(async () => {
      const buttonOrdinary = await findByRole('button', {
        name: /ordinary drink/i,
      });
      expect(buttonOrdinary).toBeInTheDocument();
      userEvent.click(buttonOrdinary);
      userEvent.click(buttonOrdinary);
    });
  });
  test(`Testa se tem um botao de filtro com nome "beef" na rota 
  "/foods" e se é possível clicar nele`, async () => {
    mockFetch(dataResponseCategories.meals);
    const { findByRole, history } = renderWithRouterProvider(<Recipes />);
    history.push('/foods');
    await waitFor(async () => {
      const buttonBeef = await findByRole('button', {
        name: /beef/i,
      });
      expect(buttonBeef).toBeInTheDocument();
      userEvent.click(buttonBeef);
      userEvent.click(buttonBeef);
    });
  });
  test(`Testa se tem um botao de filtro com nome "all"
  e se é possível clicar nele`, async () => {
    mockFetch(dataResponseCategories.drinks);
    const { findByTestId } = renderWithRouterProvider(<Recipes />);
    await waitFor(async () => {
      const buttonAll = await findByTestId('All-category-filter');
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
    });
  });
});
