import React from 'react';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import RecipeCard from '../components/RecipeCard';
import { dataResponseDrinks, dataResponseMeals } from './mocks/dataResponseApi';

describe('testa o componente RecipieCard', () => {
  test('Testa se passada uma bebida é renderizada corretamente ', () => {
    const { getByRole } = renderWithRouterProvider(
      <RecipeCard
        recipe={ dataResponseDrinks.singleDrink.drinks[0] }
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
  test('Testa se passado um prato é renderizada corretamente ', () => {
    const { getByRole } = renderWithRouterProvider(
      <RecipeCard
        recipe={ dataResponseMeals.singleMeal.meals[0] }
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
