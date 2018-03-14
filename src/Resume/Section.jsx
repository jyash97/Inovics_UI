import React from 'react';

import Buttons from './Buttons';

const SectionData = props => (
  <div
    className={'d-inline-block float-left my-1 ' + props.classes}
    style={{ width: '50%' }}
  >
    <h4 className="font-weight-normal m-0 p-1 border-primary">{props.name}</h4>
    <Buttons data={props.detailsArray} />
  </div>
);

const Section = props => (
  <div className="border-primary text-left p-2" key={props.title}>
    <h3
      className="text-dark text-capitalize border-primary text-left d-inline-block p-1 my-1 font-weight-normal"
      style={{ borderBottom: '4px solid' }}
    >
      {props.title}
    </h3>
    {props.data.map((value, index) => (
      <div className="text-dark text-capitalize text-left p-2" key={index}>
        <SectionData
          name={value[props.entries[0]]}
          detailsArray={value[props.entries[1]]}
          classes="text-left"
        />
        <SectionData
          name={value[props.entries[2]]}
          detailsArray={value[props.entries[3]]}
          classes="text-right px-5"
        />
      </div>
    ))}
  </div>
);

export default Section;
