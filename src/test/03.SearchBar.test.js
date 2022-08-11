import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, waitFor } from '@testing-library/react';
import mockFetch from './mocks/mockFetch';
import SearchBar from '../components/SearchBar';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import { dataResponseMeals, dataResponseDrinks } from './mocks/dataResponseApi';

describe('Testa o componente SearchBar', () => {
  const testIdIngredientSearch = 'ingredient-search-radio';
  const testIdNameSearch = 'name-search-radio';
  const testIdFirstLetterSearch = 'first-letter-search-radio';
  const testIdBtnExecSearch = 'exec-search-btn';
  const testIdInputSearch = 'search-input';

  afterEach(cleanup);

  test('Testa se os Botões estão no componente', () => {
    const { getByTestId } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const btnExecSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    expect(btnExecSearch).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
  });

  test('Testa se tem os inputs radios estão na tela', () => {
    const { getByTestId } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const ingredientSearch = getByTestId(testIdIngredientSearch);
    const nameSearch = getByTestId(testIdNameSearch);
    const letterSearch = getByTestId(testIdFirstLetterSearch);
    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(letterSearch).toBeInTheDocument();
  });

  test('Testa se não existe mais de uma categoria selecionada', () => {
    const { getByLabelText } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const ingredientSearch = getByLabelText(/ingredient/i);
    const nameSearch = getByLabelText(/name/i);
    const letterSearch = getByLabelText(/first letter/i);
    userEvent.click(ingredientSearch);
    expect(ingredientSearch).toBeChecked();
    expect(nameSearch).not.toBeChecked();
    expect(letterSearch).not.toBeChecked();
    userEvent.click(nameSearch);
    expect(ingredientSearch).not.toBeChecked();
    expect(nameSearch).toBeChecked();
    expect(letterSearch).not.toBeChecked();
    userEvent.click(letterSearch);
    expect(ingredientSearch).not.toBeChecked();
    expect(nameSearch).not.toBeChecked();
    expect(letterSearch).toBeChecked();
  });

  test(`Testa se ao selecionar ingredientes
  a requisição é feita corretamente ao endpoint`, async () => {
    mockFetch(dataResponseMeals.multiplesMeals);
    const { getByLabelText,
      getByTestId } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const ingredientSearch = getByLabelText(/ingredient/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.click(ingredientSearch);
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    });
  });
  test(`Testa se ao selecionar names
  a requisição é feita corretamente ao endpoint`, async () => {
    mockFetch(dataResponseMeals.multiplesMeals);
    const { getByLabelText,
      getByTestId } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const nameSearch = getByLabelText(/name/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'rice');
    userEvent.click(nameSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=rice');
    });
  });
  test(`Testa se ao selecionar first letter
  a requisição é feita corretamente ao endpoint`, async () => {
    mockFetch(dataResponseMeals.multiplesMeals);
    const { getByLabelText,
      getByTestId } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const firstLetterSearch = getByLabelText(/first letter/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'a');
    userEvent.click(firstLetterSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    });
  });
  test(`Testa se ao selecionar first letter
  a e colocar mais de uma letra nenhuma chamada a api é realizada`, async () => {
    window.alert = jest.fn();
    mockFetch(dataResponseMeals.multiplesMeals);
    const { getByLabelText,
      getByTestId } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const firstLetterSearch = getByLabelText(/first letter/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'aa');
    userEvent.click(firstLetterSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).not.toBeCalled();
      expect(window.alert).toBeCalled();
      window.alert.mockClear();
    });
  });
  test(`Testa se a requisição é feita corretamente
  quando estiver na rota /drinks`, async () => {
    mockFetch(dataResponseDrinks.multipleDrinks);
    const { getByLabelText,
      getByTestId, history } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    history.push('/drinks');
    const firstLetterSearch = getByLabelText(/first letter/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'a');
    userEvent.click(firstLetterSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      global.fetch.mockClear();
    });
  });
  test(`Testa se ao fazer a requisição com filtro no ingrediente e for retornado somente
  uma receita a rota e redirecionada para /foods/idreceita`, async () => {
    mockFetch(dataResponseMeals.singleMeal);
    const { findByLabelText,
      findByTestId, history } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    const ingredientSearch = await findByLabelText(/ingredient/i);
    const btnSearch = await findByTestId(testIdBtnExecSearch);
    const inputSearch = await findByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(ingredientSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
      expect(history.location.pathname).toBe('/foods/52940');
      global.fetch.mockClear();
    });
  });
  test(`Testa se ao fazer a requisição com filtro no ingrediente e for retornado somente
  uma receita a rota e redirecionada para /drinks/idreceita`, async () => {
    mockFetch(dataResponseDrinks.singleDrink);
    const { getByLabelText,
      getByTestId, history } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    history.push('/drinks');
    const ingredientSearch = getByLabelText(/ingredient/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'limon');
    userEvent.click(ingredientSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=limon');
      expect(history.location.pathname).toBe('/drinks/14588');
      global.fetch.mockClear();
    });
  });
  test(`Testa se ao fazer a requisição com filtro no nome e for retornado somente
  uma receita a rota e redirecionada para /drinks/idreceita`, async () => {
    mockFetch(dataResponseDrinks.singleDrink);
    const { getByLabelText,
      getByTestId, history } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    history.push('/drinks');
    const nameSearch = getByLabelText(/name/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'champagne');
    userEvent.click(nameSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=champagne');
      expect(history.location.pathname).toBe('/drinks/14588');
      global.fetch.mockClear();
    });
  });
  test(`Testa se deixar o campo de input vazio e tentar
    buscar nenhuma chamada a api é realizada`, async () => {
    mockFetch(dataResponseDrinks.singleDrink);
    const { getByLabelText,
      getByTestId, history } = renderWithRouterProvider(<SearchBar pageTitle="foods" />);
    history.push('/drinks');
    const ingredientSearch = getByLabelText(/ingredient/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    userEvent.click(ingredientSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).not.toBeCalled();
      expect(global.fetch).not.toBeCalledTimes(1);
      global.fetch.mockClear();
    });
  });
  test(`Testa se nenhuma receita for encontrada
    um alert e exibido`, async () => {
    window.alert = jest.fn();
    mockFetch({ drinks: null });
    const { getByLabelText,
      getByTestId, history } = renderWithRouterProvider(<SearchBar pageTitle="drinks" />);
    history.push('/drinks');
    const ingredientSearch = getByLabelText(/ingredient/i);
    const btnSearch = getByTestId(testIdBtnExecSearch);
    const inputSearch = getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'ronaldo');
    userEvent.click(ingredientSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(window.alert).toBeCalled();
      expect(window.alert).toBeCalledTimes(1);
    });
  });
});
