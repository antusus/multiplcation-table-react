import React, {Component} from 'react';
import _ from 'lodash';

class MultiplicationTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className='mtable'>
                <tbody>
                {this.renderTable()}
                </tbody>
            </table>
        );
    }

    renderTable() {
        return _.range(1,11).map(row => {
            return(
                <tr key={row}>
                    {this.renderColumns(row)}
                </tr>
            )
        });
    };

    renderColumns(row) {
        return _.range(1,11).map(col => {
            return <td key={col}>{col * row}</td>
        });
    };

}

export default MultiplicationTable;