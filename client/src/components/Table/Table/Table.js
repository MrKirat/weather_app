import React from 'react';
import Row from '../Row/Row';

const Table = props => {

  let rows = props.rows.map((rowData, index) => <Row key={index} data={rowData} />);

  return (
    <div className="Table">
      {rows}
    </div>
  );
}

export default Table;
