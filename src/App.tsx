import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { counterReducer } from './redux/reducer';
import createSagaMiddleware from 'redux-saga';

import taskSaga from './redux/saga';
import Main from './component/Main';
import { theme } from './theme';
import { MuiThemeProvider } from '@material-ui/core';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const store = configureStore({ reducer: counterReducer, middleware });
sagaMiddleware.run(taskSaga);

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
