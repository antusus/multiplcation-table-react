import {useMultiplicationTableContext} from "../../providers/MultiplicationTableStateProvider";
import './answeredQuestions.css';

export default function () {
    const context = useMultiplicationTableContext();

    return (
        <div className={'answersContainer'}>
            <table className={'answersTable'}>
                <thead>
                <tr>
                    <th>Pytanie</th>
                    <th>Odpowiedź</th>
                </tr>
                </thead>
                <tbody>
                {context.answeredQuestions.map((answer, i) => (
                    <tr key={`question_${i}`} className={answer.isCorrect ? 'correctAnswer' : 'wrongAnswer'}>
                        <td className={'anseredQuestion'}>{answer.question.factorOne} x {answer.question.factorTwo}</td>
                        <td className={'anseredQuestionAnswer'}>{answer.answer}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}