import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

class MultiplicationGame extends Component {

    constructor(props) {
        super(props);
        const allQuestions = this.generateAllQuestions(this.props);
        // const allQuestions = this.generateAllQuestions({confirmedCell : {row :3, column : 5}});
        const firstQuestion = _.sample(allQuestions);
        this.state = {
            confirmedCell: props.confirmedCell,
            // confirmedCell: {confirmedCell : {row :3, column : 5}},
            notAnswered: _.without(allQuestions, firstQuestion),
            answered: [],
            currentQuestion: firstQuestion,
            answer: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    handleSubmit(event) {
        const answer = parseInt(this.state.answer, 10);
        let currentQuestion = {question: this.state.currentQuestion};
        const answered = this.getAnsweredQuestions(currentQuestion.question, answer);
        let notAnswered = this.state.notAnswered;
        if (notAnswered.length >= 1) {
            currentQuestion = _.sample(notAnswered);
            notAnswered = _.without(notAnswered, currentQuestion);
            this.setState({answered, currentQuestion, notAnswered, answer: ''});
        } else {
            this.setState({answered, currentQuestion: undefined, notAnswered: []})
        }
        event.preventDefault();
    }

    getAnsweredQuestions(currentQuestion, answer) {
        const expected = currentQuestion[0] * currentQuestion[1];
        currentQuestion.correct = expected === answer;
        const answered = this.state.answered;
        answered.push(currentQuestion);
        return answered;
    };

    generateAllQuestions(props) {
        const row = parseInt(props.confirmedCell.row, 10);
        const column = parseInt(props.confirmedCell.column, 10);
        const rows = _.range(1, row + 1);
        const columns = _.range(1, column + 1);
        return _.flatMap(rows, row => columns.map(col => [row, col]));
    }

    render() {
        return (
            <div className='main'>
                {this.renderGame()}
                {this.renderStats()}
                <div className="actionBar">
                    <Link to="/" className="stopButton">Koniec</Link>
                </div>
            </div>
        );
    }

    renderGame() {
        if (this.state.currentQuestion) {
            return (
                <div>
                    <div className='title'>
                        Czas zacząć grę dla&nbsp;{this.state.confirmedCell.row}&nbsp;x&nbsp;{this.state.confirmedCell.column}
                    </div>
                    <div className='question'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='row'>
                                <label className='label'>
                                    Podaj wynik mnożenia&nbsp;{this.state.currentQuestion[0]}&nbsp;x&nbsp;{this.state.currentQuestion[1]}
                                </label>
                                <input
                                    className='answer'
                                    value={this.state.answer}
                                    type='number'
                                    autoComplete='off'
                                    onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }

    renderStats() {
        if (!this.state.currentQuestion) {
            const correctCount = _.filter(this.state.answered, {correct: true}).length;
            const wrongCount = _.filter(this.state.answered, {correct: false}).length;
            return (
                <div>
                    <div className='title'>
                        Koniec gry dla&nbsp;{this.state.confirmedCell.row}&nbsp;x&nbsp;{this.state.confirmedCell.column}
                    </div>
                    <div className='stats'>
                        <p className='statsRow'>Poprawnych odpowiedzi {correctCount}.</p>
                        <p className='statsRow'>Nie poprawnych odpowiedzi {wrongCount}.</p>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        confirmedCell: state.confirmedCell
    };
};

export default connect(mapStateToProps)(MultiplicationGame);