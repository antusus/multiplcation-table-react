import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {selectCell, confirmCell} from '../../actions/index';
import {Link} from 'react-router-dom';

class MultiplicationTable extends Component {
    constructor(props) {
        super(props);
        this.onSelectedCell = this.onSelectedCell.bind(this);
        this.onClickCell = this.onClickCell.bind(this);
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
            const selectedRow = _.get(this.props, 'selectedCell.row');
            const selectedCol = _.get(this.props, 'selectedCell.column');
            const selected = selectedRow >= row && selectedCol >= col;
            return (
                <td className={selected ? 'selected-cell' : ''}
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

    onSelectedCell(event) {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        this.props.selectCell(row, column)
    }

    onClickCell(event) {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        this.props.confirmCell(row, column)
    }
}

const mapStateToProps = state => {
    return {
        selectedCell: state.selectedCell,
        confirmedCell: state.confirmedCell
    };
};

export default connect(mapStateToProps, {selectCell, confirmCell})(MultiplicationTable);