import React from 'react';

import converter from './dateConverter';

const ImageCard = props => (
  <div className="container">
    <h4 className="text-dark font-weight-normal text-uppercase my-3">
      {props.heading}
    </h4>
    <div className="row p-1">
      <div className="card-columns">
        {props.data.map((data, index) => (
          <React.Fragment key={index}>
            <div className="card">
              <img className="card-img-top" src={data.image} />
              <div className="card-body">
                <h5 className="card-title my-0">{data.title}</h5>
                <p className="card-text text-muted">{converter(data.time)}</p>
                <p className="card-text text-justify">{data.description}</p>
                {props.extraData(data)}
                <a
                  className="btn btn-sm btn-primary"
                  href={data.link}
                  target="_blank"
                >
                  {data.linktitle}
                </a>
                {props.extraLinks(data)}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default ImageCard;
