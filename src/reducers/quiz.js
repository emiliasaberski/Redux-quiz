import { createSlice } from '@reduxjs/toolkit'
import Purple from '../components/images/Purple.png'
import Green from '../components/images/Green.png'
import Orange from '../components/images/Orange.png'
import Brown from '../components/images/Brown.png'
import Pink from '../components/images/Pink.png'
import GreyOne from '../components/images/GreyOne.png'
import PurpleTwo from '../components/images/PurpleTwo.png'
import GreenThree from '../components/images/GreenThree.png'
import OrangeFour from '../components/images/OrangeFour.png'
import BrownFive from '../components/images/BrownFive.png'

// Change these to your own questions!
const questions = [
  { id: 1, questionImg: `${Purple}`, options: ['RED', 'GREEN', 'PURPLE', 'ORANGE'], correctAnswerIndex: 2, imgUrl: `${GreyOne}` },
  { id: 2, questionImg: `${Green}`, options: ['PINK', 'GREEN', 'ORANGE', 'BROWN'], correctAnswerIndex: 1, imgUrl: `${PurpleTwo}` },
  { id: 3, questionImg: `${Orange}`, options: ['PURPLE', 'ORANGE', 'PINK', 'BROWN'], correctAnswerIndex: 1, imgUrl: `${GreenThree}` },
  { id: 4, questionImg: `${Brown}`, options: ['ORANGE', 'PURPLE', 'BLACK', 'BROWN'], correctAnswerIndex: 3, imgUrl: `${OrangeFour}` },
  { id: 5, questionImg: `${Pink}`, options: ['PINK', 'BLACK', 'ORANGE', 'GREEN'], correctAnswerIndex: 0, imgUrl: `${BrownFive}` }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
