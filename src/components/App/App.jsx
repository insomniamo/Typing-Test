import React from "react";
import { Provider } from 'react-redux';

import store from '@redux/store/store.js';

import Header from "@components/Header/Header.jsx";
import Content from "@components/Content/Content.jsx";
import Footer from "@components/Footer/Footer.jsx";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Content />
        <Footer />
      </Provider>
    );
  }
}

export default App;
