import React from 'react';

import Indiviual from './Indiviual';
import Data from './Data.json';

class DataComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        {Data.map(
          i =>
            i.name === 'entertainment' ||
            i.name === 'jobs' ||
            i.name === 'cricket' ? (
              <React.Fragment key={i.name}>
                <div className="w-100 my-3" />
                <Indiviual {...i} />
              </React.Fragment>
            ) : (
              <Indiviual key={i.name} {...i} />
            )
        )}
      </React.Fragment>
    );
  }
}

export default DataComponent;
