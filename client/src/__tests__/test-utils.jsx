import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { reducer } from '../reducer';
import { render } from '@testing-library/react';
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: reducer, preloadedState }),
    route = '/'
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </Provider>
    ),
    store,
  };
}
