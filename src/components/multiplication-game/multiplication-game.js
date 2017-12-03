import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {answerQuestion} from '../../actions';

class MultiplicationGame extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.focusAnswerInput = this.focusAnswerInput.bind(this);
        this.state = {answer: ''};
    }

    componentDidMount() {
        console.log('input', this.answerInput);
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
        if (_.get(this.props, 'game.start.row') && _.get(this.props, 'game.start.column')) {
            return this.renderGameTable();
        } else {
            return <div>Czekaj. Gra jest ładowana.</div>
        }
    }

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    handleSubmit(event) {
        const answer = parseInt(this.state.answer, 10);
        this.props.answerQuestion(this.props.game.currentQuestion, answer);
        this.setState({answer: ''});
        event.preventDefault();
    }

    renderGameTable() {
        if (this.props.game.currentQuestion) {
            return (
                <div>
                    <div className='title'>
                        Czas zacząć grę
                        dla&nbsp;{this.props.game.start.row}&nbsp;x&nbsp;{this.props.game.start.column}
                    </div>
                    <div className='progress'>Pozostało pytań {this.props.game.notAnswered.length + 1}</div>
                    <div className='question'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='row'>
                                <label className='label'>
                                    Podaj wynik mnożenia&nbsp;
                                    {this.props.game.currentQuestion.row}
                                    &nbsp;x&nbsp;
                                    {this.props.game.currentQuestion.column}
                                </label>
                                <input
                                    id='answer'
                                    className='answer'
                                    value={this.state.answer}
                                    name='answer'
                                    type='number'
                                    autoComplete='off'
                                    onChange={this.handleChange}
                                    autoFocus/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }

    renderStats() {
        if (this.props.game.start && !this.props.game.currentQuestion) {
            const correct = _.filter(this.props.game.answered, {correct: true});
            const wrong = _.filter(this.props.game.answered, {correct: false});
            console.log('stats', this.props.game);
            return (
                <div>
                    <div className='title'>
                        Koniec gry dla&nbsp;{this.props.game.start.row}&nbsp;x&nbsp;{this.props.game.start.column}
                    </div>
                    <div className='stats'>
                        <p className='statsRow'>Poprawnych odpowiedzi {correct.length}.</p>
                        <p className='statsRow'>Nie poprawnych odpowiedzi {wrong.length}.</p>
                    </div>
                    <div className='wrongAnswers'>
                        {wrong.map(wrongAnswer => MultiplicationGame.renderWrong(wrongAnswer))}
                    </div>
                </div>
            );
        }
    }

    focusAnswerInput() {
        this.answerInput.focus();
    }

    static renderWrong(answer) {
        const question = answer.question;
        return <div className='wrong'>{question.row}&nbsp;x&nbsp;{question.column}</div>
    }
}

const mapStateToProps = state => {
    return {
        confirmedCell: state.confirmedCell,
        game: state.game
    };
};

export default connect(mapStateToProps, {answerQuestion})(MultiplicationGame);