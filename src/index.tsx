import ReactDOM from 'react-dom';
import './index.css'
import { mergeStyles } from '@fluentui/react';
import reportWebVitals from './reportWebVitals';
import { MainRouter } from './routes/MainRouter';
import { ThemeHook } from './styles/ThemeHook';

// Inject some global styles
mergeStyles({
  ':global(body,html,#root>*)': {
    margin: 0,
    padding: 0,
    minHeight: '100vh',
  },
});

ReactDOM.render(
  <ThemeHook>
    <MainRouter />
  </ThemeHook>
  ,
  document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
