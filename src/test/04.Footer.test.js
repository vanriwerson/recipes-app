import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import Footer from '../components/Footer';

describe('testa o componente footer', () => {
  const drinkIcon = 'drinks-bottom-btn';
  const foodIcon = 'food-bottom-btn';

  test('Testa componentes do footer', () => {
    const { getByTestId } = renderWithRouterProvider(<Footer />);
    const drinkBtn = getByTestId(drinkIcon);
    const foodBtn = getByTestId(foodIcon);
    expect(drinkBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
  });

  test('Testa redirecionamento ao clicar nos botão drinks', () => {
    const { getByTestId, history } = renderWithRouterProvider(<Footer />);
    const drinkBtn = getByTestId(drinkIcon);

    userEvent.click(drinkBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testa redirecionamento ao clicar nos botão foods', () => {
    const { getByTestId, history } = renderWithRouterProvider(<Footer />);
    const foodBtn = getByTestId(foodIcon);

    userEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/foods');
  });
});
