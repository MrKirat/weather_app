import React from 'react';
import './Table.scss';
import Row from '../Row/Row';

const Table = props => {

  let rows = props.rows.map((rowData, index) => <Row key={index} data={rowData} />);

  return (
    <div className="defaultWrapper">
      <div className="Table">
        {rows}
      </div>
    </div>
  );
}

export default Table;
