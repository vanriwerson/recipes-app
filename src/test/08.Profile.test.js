import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import Profile from '../pages/Profile';

describe('Testa o componente Profile', () => {
  const testIdEmail = 'profile-email';
  const testIdBtnDone = 'profile-done-btn';
  const testIdBtnFavorite = 'profile-favorite-btn';
  const testIdBtnLogout = 'profile-logout-btn';

  test('Testa se renderiza o header com o titulo "Profile"', async () => {
    const { getByRole } = renderWithRouterProvider(<Profile />);
    const title = getByRole('heading', {
      name: /profile/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('Testa se os botões estão no Profile', () => {
    const { getByTestId } = renderWithRouterProvider(<Profile />);
    const btnDone = getByTestId(testIdBtnDone);
    const btnFavorite = getByTestId(testIdBtnFavorite);
    const btnLogout = getByTestId(testIdBtnLogout);
    expect(btnDone).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão é redirecionado', () => {
    const { getByTestId, history } = renderWithRouterProvider(<Profile />);
    const btnDone = getByTestId(testIdBtnDone);
    const btnFavorite = getByTestId(testIdBtnFavorite);
    const btnLogout = getByTestId(testIdBtnLogout);
    userEvent.click(btnDone);
    expect(history.location.pathname).toBe('/done-recipes');
    userEvent.click(btnFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se o email é visivel', () => {
    const { getByTestId } = renderWithRouterProvider(<Profile />);
    const userEmail = getByTestId(testIdEmail);
    userEvent.type(userEmail, 'teste@teste.com');
  });
});
