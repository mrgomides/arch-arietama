import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import * as SysRoutes from './routes/indexRoutes.jsx';

class App extends React.Component {
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.error(err));
  }

  callApi = async () => {
    const response = await window.fetch('/api/system');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <BrowserRouter>
        <SysRoutes.default />
      </BrowserRouter>
    );
  }
}

export default App;
