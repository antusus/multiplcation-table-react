import React from 'react';
import {
    AnsweredQuestion,
    MultiplicationTableStateProvider,
    Question
} from '../../providers/MultiplicationTableStateProvider';
import AnsweredQuestions from './index';
import {render} from '@testing-library/react';

describe('AnsweredQuestions component', () => {
    function getUi(answers: AnsweredQuestion[]) {
        return (
            <MultiplicationTableStateProvider answeredQuestions={answers}>
                <AnsweredQuestions/>
            </MultiplicationTableStateProvider>
        );
    }

    it('should render', () => {
        const {container} = render(getUi([new AnsweredQuestion(new Question(2, 3), 6)]));
        expect(container.querySelector('.answersContainer')).toBeInTheDocument();
        expect(container.querySelector('.answersTable')).toBeInTheDocument();
        const questionColumn = container.querySelector('.anseredQuestion');
        expect(questionColumn).toBeInTheDocument();
        expect(questionColumn).toHaveTextContent('2 x 3');
        let answerColumn = container.querySelector('.anseredQuestionAnswer');
        expect(answerColumn).toBeInTheDocument();
        expect(answerColumn).toHaveTextContent('6');
    });
});