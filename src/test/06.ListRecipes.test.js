import React from 'react';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import ListRecipes from '../components/ListRecipes';
import { dataResponseDrinks, dataResponseMeals } from './mocks/dataResponseApi';

describe('Testa o componente ListRecipes', () => {
  test(`Testa se passado um array com varios drinks 
  os drinks são renderizados corretamente`, () => {
    const { getByRole } = renderWithRouterProvider(
      <ListRecipes
        recipes={ dataResponseDrinks.multipleDrinks.drinks }
      />,
    );
    const image = getByRole('img', {
      name: /151 Florida Bushwacker/i,
    });
    const title = getByRole('heading', {
      name: /151 Florida Bushwacker/i,
    });
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  test(`Testa se passado um array com varios pratos os pratos 
  são renderizados corretamente`, () => {
    const { getByRole } = renderWithRouterProvider(
      <ListRecipes
        recipes={ dataResponseMeals.multiplesMeals.meals }
      />,
    );
    const image = getByRole('img', {
      name: /Brown Stew Chicken/i,
    });
    const title = getByRole('heading', {
      name: /Brown Stew Chicken/i,
    });
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
