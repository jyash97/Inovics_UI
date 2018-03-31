import React from 'react';

import converter from './dateConverter';
import Navigation from '../Chatbot/Navigation';

const ImageCard = props => (
  <React.Fragment>
    <div className="container">
      <div className="alert alert-primary">
        <span className="text-dark font-weight-bold text-uppercase my-3">
          {props.heading}
        </span>
      </div>
      <div className="row p-1">
        <div className={'card-columns ' + props.classes}>
          {props.data.map((data, index) => (
            <React.Fragment key={index}>
              <div className="card">
                {data.image === '' ? null : (
                  <img
                    className="card-img-top"
                    src={data.image}
                    alt={data.title}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title my-0">{data.title}</h5>
                  <p className="card-text text-muted">
                    {data.time ? converter(data.time) : null}
                  </p>
                  <p className="card-text text-justify">{data.description}</p>
                  {props.extraData(data)}
                  {data.linktitle ? (
                    <a
                      className="btn btn-sm btn-primary"
                      href={data.link}
                      target="_blank"
                    >
                      {data.linktitle}
                    </a>
                  ) : null}
                  {props.extraLinks(data)}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    <Navigation />
  </React.Fragment>
);

export default ImageCard;
