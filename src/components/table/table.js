import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {selectCell} from '../../actions/index';


class MultiplicationTable extends Component {
    constructor(props) {
        super(props);
        this.onSelectedCell = this.onSelectedCell.bind(this);
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
        return _.range(1, 11).map(row => {
            return (
                <tr key={row}>
                    {this.renderColumns(row)}
                </tr>
            )
        });
    };

    renderColumns(row) {
        return _.range(1, 11).map(col => {
            const selectedRow = _.get(this.props, 'selectedCell.row');
            const selectedCol = _.get(this.props, 'selectedCell.column');
            const selected = selectedRow >= row &&  selectedCol >= col;
            return <td className={selected ? 'selected-cell' : ''} row={row} column={col} onMouseOver={this.onSelectedCell} key={col}>{col * row}</td>
        });
    };

    onSelectedCell(event) {
        const row = event.target.getAttribute('row');
        const column = event.target.getAttribute('column');
        this.props.selectCell(row,column)
    }
}

const mapStateToProps = state => {
    return {
        selectedCell: state.selectedCell
    };
};

export default connect(mapStateToProps, {selectCell})(MultiplicationTable);