import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import Header from '../components/Header';

describe('Test component', () => {
  const testIdTitle = 'page-title';
  const testIdImgProfile = 'profile-top-btn';
  const testIdImgSearch = 'search-top-btn';
  const testIdBtnProfile = 'profile-btn';
  const testIdBtnSearch = 'search-btn';
  test('Testa se o titulo e os botões de Profile e Search no Header', () => {
    const { getByTestId } = renderWithRouterProvider(<Header pageTitle="profile" />);
    const title = getByTestId(testIdTitle);
    const imgProfile = getByTestId(testIdImgProfile);
    const imgSearch = getByTestId(testIdImgSearch);
    expect(title).toBeInTheDocument();
    expect(imgProfile).toBeInTheDocument();
    expect(imgSearch).toBeInTheDocument();
  });
  test('Testa quando for clicado o botão é redirecionado para o Profile', () => {
    const {
      getByTestId,
      history,
    } = renderWithRouterProvider(<Header pageTitle="home" />);
    const buttonProfile = getByTestId(testIdBtnProfile);
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
  });
  test('Testa o botão do search', () => {
    const { getByTestId } = renderWithRouterProvider(<Header pageTitle="home" />);
    const buttonSearch = getByTestId(testIdBtnSearch);
    userEvent.click(buttonSearch);
  });
});
