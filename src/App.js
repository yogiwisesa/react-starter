import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: {},
      Foo: null
    };
  }

  componentDidMount() {
    this.fetchApi();
    this.loadComponent();
  }

  async fetchApi() {
    const url =
      'https://newsapi.org/v2/everything?q=bitcoin&from=2019-07-19&sortBy=publishedAt&apiKey=109cafd7e6a94b0cae047707712c8c25';

    try {
      const response = await fetch(url);
      const responseParsed = await response.json();

      this.setState({
        news: responseParsed
      });
    } catch (err) {
      console.log(`Request error ${err}`);
    }
  }

  // Code splitting
  loadComponent() {
    import(/* webpackChunkName: 'Foo' */ './Foo').then(Foo => {
      this.setState({
        Foo: Foo.default
      });
    });
  }

  render() {
    const { Foo } = this.state;

    return (
      <div>
        <p> hello world </p> <img src="/dist/images/dog.jpg" /> 
        {Foo ? <Foo/> : null}
        <p> {JSON.stringify(this.state.news.articles)} </p>
      </div>
    );
  }
}

export default App;
