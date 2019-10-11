import React from "react";
import RootNav from "./navigators/RootNav";
import { createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import combineReducers from './store/reducers';

const store = createStore(combineReducers, applyMiddleware(thunk));

const Root = createAppContainer(RootNav)
const App = () => {
    return (
    <Provider store={store}>
    <Root />
    </Provider>)
}
export default App;