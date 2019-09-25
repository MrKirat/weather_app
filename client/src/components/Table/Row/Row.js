import React from 'react';
import './Row';
import './Row.scss';

const Row = props => {

  const renderingData = Object
    .keys(props.data)
    .map(key => <p className="RowCell" key={key}>{props.data[key]}</p>);

  return (
    <div className="Row">
      {renderingData}
    </div>
  );
}

export default Row;
