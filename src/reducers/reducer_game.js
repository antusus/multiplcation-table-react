import {LOCATION_CHANGE} from 'react-router-redux';
import {ANSWER_QUESTION} from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return handleLocationChanged(action.payload);
        }
        case ANSWER_QUESTION : {
            return handleAnswer(action.payload, state);
        }
        default:
            return state;
    }
};

function handleAnswer(answer, state) {
    let notAnswered = _.without(state.notAnswered, answer.question);
    const question = _.sample(notAnswered);
    if(question) {
        notAnswered = _.without(notAnswered, question);
    }
    return {
        start : state.start,
        notAnswered: notAnswered,
        answered: [...state.answered, answer],
        currentQuestion: question
    };
}

function handleLocationChanged(payload) {
    switch (payload.pathname) {
        case '/game': {
            if (_.get(payload, 'state.row') && _.get(payload, 'state.column')) {
                return startGameFor(parseInt(payload.state.row, 10), parseInt(payload.state.column, 10))
            } else {
                return {};
            }
        }
        default:
            return {};
    }
}

function startGameFor(row, column) {
    const allQuestions = generateAllQuestions(row, column);
    const firstQuestion = _.sample(allQuestions);
    return {
        start: {row, column},
        notAnswered: _.without(allQuestions, firstQuestion),
        answered: [],
        currentQuestion: firstQuestion
    };
}


function generateAllQuestions(row, column) {
    const rows = _.range(1, row + 1);
    const columns = _.range(1, column + 1);
    return _.flatMap(rows, row => columns.map(column => ({row, column})));
}