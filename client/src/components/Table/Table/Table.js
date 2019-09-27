import React from 'react';
import './Table.scss';
import Column from '../Column/Column';

const Table = props => {

  let columns = props.columns.map((columnData, index) => <Column key={index} data={columnData} />);

  return (
    <div className="defaultWrapper">
      <div className="Table">
        {columns}
      </div>
    </div>
  );
}

export default Table;
