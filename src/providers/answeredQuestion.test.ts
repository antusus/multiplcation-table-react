import {AnsweredQuestion, Question} from './MultiplicationTableStateProvider';

describe('AnsweredQUestion', () => {
    it('is correct', () => {
        let answer = new AnsweredQuestion(new Question(2, 3), 6);

        expect(answer.isCorrect).toBeTruthy();
    });

    it('is falsy', () => {
        let answer = new AnsweredQuestion(new Question(2, 3), 7);

        expect(answer.isCorrect).toBeFalsy();
    });
});