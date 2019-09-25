import React from 'react';
import './Row.scss';

const Row = props => {

  const renderingData = Object
    .keys(props.data)
    .map(key => <span key={key}>{props.data[key]}</span>);

  return (
    <div className="Row">
      {renderingData}
    </div>
  );
}

export default Row;
