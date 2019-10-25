/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Form from './Form';

const App = ({ store }) =>
  <Provider store={store}>
    <Form />
  </Provider>;

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
