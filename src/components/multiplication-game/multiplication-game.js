import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class MultiplicationGame extends Component {
    render() {
        return (
            <div className='main'>
                <div className='title'>Czas zacząć grę dla {this.props.confirmedCell.row} x {this.props.confirmedCell.column}</div>
                <div className="game">GRA TU BĘDZIE</div>
                <div className="actionBar">
                    <Link to="/" className="stopButton">Stop</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        confirmedCell: state.confirmedCell
    };
};

export default connect(mapStateToProps)(MultiplicationGame);