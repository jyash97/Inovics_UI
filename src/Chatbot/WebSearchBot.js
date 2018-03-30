import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ChatBot, { Loading } from 'react-simple-chatbot';

class WebSearch extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      loading: true,
      trigger: false
    };
    this.triggetNext = this.triggetNext.bind(this);
  }

  async componentWillMount() {
    const { steps } = this.props;
    const search = steps.search.value;
    const queryUrl = `http://www.gigablast.com/search?c=main&qlangcountry=en-us&qlang=en&q=${search}&reepx=3933958019&format=json`;
    const data = await fetch(queryUrl)
      .then(res => res.json())
      .then(data => data.results);
    let dataComponent = [];
    data.filter((key, index) => index < 4).map(data =>
      dataComponent.push({
        title: data.title,
        text: data.sum,
        url: data.url
      })
    );
    this.setState({
      data: dataComponent,
      loading: false
    });
    console.log(this.state.data);
  }
  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, data } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          data.map((data, index) => {
            return (
              <div key={index}>
                <div className="text-capitalize h6 font-weight-bold">
                  <a href={data.url} target="_blank">
                    {data.title}
                  </a>
                </div>
                <div>{data.text}</div>
                <hr />
              </div>
            );
          })
        )}
        {!loading && (
          <div
            style={{
              textAlign: 'center',
              marginTop: 20
            }}
          >
            {!trigger && (
              <button
                className="btn btn-primary"
                onClick={() => this.triggetNext()}
              >
                Search Again
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

WebSearch.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func
};

WebSearch.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
};

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#20a4f3',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#20a4f3',
  botFontColor: '#fff',
  userBubbleColor: '#20a4f3',
  userFontColor: '#fff'
};

const WebSearchBot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Type your query.',
          trigger: 'search'
        },
        {
          id: 'search',
          user: true,
          trigger: '3'
        },
        {
          id: '3',
          component: <WebSearch />,
          waitAction: true,
          trigger: '1'
        }
      ]}
      width="1200px"
      inputStyle={{ width: '1355px' }}
      style={{ margin: '40px 80px' }}
    />
  </ThemeProvider>
);

export default WebSearchBot;
