import React from 'react';
import './Column.scss';

const Column = props => {

  const renderingData = Object
    .keys(props.data)
    .map(key => <p className="ColumnCell" key={key}>{props.data[key]}</p>);

  return (
    <div className="Column">
      {renderingData}
    </div>
  );
}

export default Column;
