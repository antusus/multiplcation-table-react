import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {selectCell, confirmCell, clearConfirmedCell} from '../../actions/index';
import {Link} from 'react-router-dom';

class MultiplicationTable extends Component {
    constructor(props) {
        super(props);
        this.onSelectedCell = this.onSelectedCell.bind(this);
        this.onClickCell = this.onClickCell.bind(this);
        this.props.clearConfirmedCell();
    }

    render() {
        return (
            <div className='main'>
                <div className='title'>Tabliczka mnożenia</div>
                <div className='mtableContainer'>
                    <table className='mtable'>
                        <tbody>
                        {this.renderTable()}
                        </tbody>
                    </table>
                    <div className='actionBar'>
                        {this.showStartButton()}
                    </div>
                </div>
            </div>
        );
    }

    showStartButton() {
        if (this.props.confirmedCell.row && this.props.confirmedCell.column) {
            return (
                <Link to="/game" className='startButton'>
                    Start dla&nbsp;
                    {this.props.confirmedCell.row}
                    &nbsp;x&nbsp;
                    {this.props.confirmedCell.column}
                </Link>);
        }
        return <div className='message'>Wybierz wartość w tabeli by rozpocząć</div>;
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
            const className = `${this.isSelectedCellClass(row, col)} ${this.isConfirmedCellClass(row, col)}`;
            return (
                <td className={className}
                    data-row={row}
                    data-column={col}
                    onMouseOver={this.onSelectedCell}
                    onClick={this.onClickCell}
                    key={col}>
                    {col * row}
                </td>
            );
        });
    };

    isSelectedCellClass(row, column) {
        const selectedRow = _.get(this.props, 'selectedCell.row');
        const selectedCol = _.get(this.props, 'selectedCell.column');
        const selected = selectedRow >= row && selectedCol >= column;
        return selected ? 'selected-cell' : '';
    };

    isConfirmedCellClass(row, column) {
        const confirmedCell = this.getConfirmedCell();
        const isConfirmed = confirmedCell.row === `${row}` && confirmedCell.column === `${column}`;
        return isConfirmed ? 'confirmed-cell' : '';
    };

    onSelectedCell(event) {
        if (this.isCellNotConfirmed()) {
            const row = event.target.dataset.row;
            const column = event.target.dataset.column;
            this.props.selectCell(row, column)
        }
    }

    isCellNotConfirmed() {
        const confirmedCell = this.getConfirmedCell();
        return !confirmedCell.row || !confirmedCell.column;
    }

    onClickCell(event) {
        if (this.isCellNotConfirmed() || this.isSameCellSelected(event.target.dataset.row, event.target.dataset.column)) {
            const row = event.target.dataset.row;
            const column = event.target.dataset.column;
            this.props.confirmCell(row, column)
        }
    }

    isSameCellSelected(row, column) {
        const confirmedCell = this.getConfirmedCell();
        return confirmedCell.row === row && confirmedCell.column === column;
    }

    getConfirmedCell() {
        const confirmedRow = _.get(this.props, 'confirmedCell.row');
        const confirmedCol = _.get(this.props, 'confirmedCell.column');
        return {row :confirmedRow, column : confirmedCol};
    }
}

const mapStateToProps = state => {
    return {
        selectedCell: state.selectedCell,
        confirmedCell: state.confirmedCell
    };
};

export default connect(mapStateToProps, {selectCell, confirmCell, clearConfirmedCell})(MultiplicationTable);