import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ChatBot, { Loading } from 'react-simple-chatbot';

class WebSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
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
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, data } = this.state;
    return (
      <div key="dataloader">
        {loading ? (
          <Loading />
        ) : (
          data.map((data, index) => {
            return (
              <div key={data.title}>
                <div className="text-capitalize font-weight-bold">
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
            key="Trigger"
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
  background:
    'linear-gradient(to bottom, rgba(168,218,220,0.99), rgba(238,249,237,1))',
  headerBgColor: '#20a4f3',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: 'rgba(252,252,252,.8)',
  botFontColor: 'rgba(41,51,92,.8)',
  userBubbleColor: 'rgba(252,252,252,.9)',
  userFontColor: 'rgba(41,51,92,.9)'
};

const WebSearchBot = () => (
  <ThemeProvider kwy="theme" theme={theme}>
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
      key="data"
      userAvatar={JSON.parse(localStorage.getItem('userData')).image}
      headerComponent={<p />}
      contentStyle={{ minHeight: '84.8vh' }}
      style={{ minWidth: '100%', borderRadius: 0 }}
    />
  </ThemeProvider>
);

export default WebSearchBot;
