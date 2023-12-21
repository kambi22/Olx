import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-awesome-slider/dist/styles.css';
import 'bootstrap/dist/js/bootstrap.min.js'
//import swDer from './swDev'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootRducer from './Services/Reducer/index';
import combReducers from './Olex/Service/CombReducer';

const store = createStore(combReducers)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <App />
</Provider>
);

//swDer()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
