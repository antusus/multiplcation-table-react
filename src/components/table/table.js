import React from 'react';

const MutiplicationTable = (props) => {
    return (
        <table className='mtable'>
            <tbody>
            {renderTable()}
            </tbody>
        </table>
    );
};

const renderTable = () => {
    const rows = [];
    for (let row = 1; row <= 10; row++) {
        rows.push(
            <tr key={row}>
                {renderColumns(row)}
            </tr>
        );
    }
    return rows;
};

const renderColumns = (row) => {
    const cols = [];
    for(let col = 1; col <= 10; col++) {
        cols.push(
          <td key={col}>{col * row}</td>
        );
    }
    return cols;
};

export default MutiplicationTable;