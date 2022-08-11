import React from 'react';
// import { screen } from '@testing-library/react';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import App from '../App';

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouterProvider(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
