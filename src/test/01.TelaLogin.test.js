import React from 'react';
import userEvent from '@testing-library/user-event';
import { Login } from '../pages';
import renderWithRouterProvider from './helper/renderWithRouterProvider';

describe('Test Component Login', () => {
  const testIdEmail = 'email-input';
  const testIdPassword = 'password-input';
  const testIdButton = 'login-submit-btn';

  test('verfica se tem na tela de login um campo de email e senha', () => {
    const { getByTestId } = renderWithRouterProvider(<Login />);
    const emailInput = getByTestId(testIdEmail);
    const passwordInput = getByTestId(testIdPassword);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  test('verifica se ao entrar na pagina o botão está desabilitado', () => {
    const { getByTestId } = renderWithRouterProvider(<Login />);
    const buttonSubmit = getByTestId(testIdButton);
    expect(buttonSubmit).toBeDisabled();
  });
  test('verifica se ao preencher os campos o botão é habilitado', () => {
    const { getByTestId } = renderWithRouterProvider(<Login />);
    const emailInput = getByTestId(testIdEmail);
    const passwordInput = getByTestId(testIdPassword);
    const buttonSubmit = getByTestId(testIdButton);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'teste123');
    expect(buttonSubmit).toBeEnabled();
  });
  test(`testa se ao clicar no botão você é redirecionado para
    a rota "/foods"`, () => {
    const { getByTestId, history } = renderWithRouterProvider(<Login />);
    const emailInput = getByTestId(testIdEmail);
    const passwordInput = getByTestId(testIdPassword);
    const buttonSubmit = getByTestId(testIdButton);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'teste123');
    expect(buttonSubmit).toBeEnabled();
    userEvent.click(buttonSubmit);
    expect(history.location.pathname).toBe('/foods');
  });
});
