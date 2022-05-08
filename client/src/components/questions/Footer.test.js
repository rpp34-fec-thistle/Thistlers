import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Footer from './Footer.jsx';

const productName = 'Camo Onsie';
const productId = '64620';
const selectedQuestion = {
  question_body: 'Does this run big or small?',
  question_id: '64620'
}

const onShowMoreQuestionsClick = () => {
  console.log('show more questions clicked');
}

const updateQuestionState = () => {
  console.log('update question state clicked');
}

describe('Footer Component Unit Tests', () => {
  it('renders the ADD QUESTION button', () => {
    const {getByText} = render(
    <Footer
      onShowMoreQuestionsClick={onShowMoreQuestionsClick}
      moreQuestions={false}
      productName={productName}
      productId={productId}
      updateQuestionState={updateQuestionState}
      selectedQuestion={selectedQuestion}
    />
    );
    expect(getByText('ADD A QUESTION +')).toBeInTheDocument();
  })

  it('renders the MORE ANSWERED QUESTIONS button if there are more answers to be displayed', () => {
    const {queryByText} = render(
      <Footer
      onShowMoreQuestionsClick={onShowMoreQuestionsClick}
      moreQuestions={true}
      productName={productName}
      productId={productId}
      updateQuestionState={updateQuestionState}
      selectedQuestion={selectedQuestion}
      />
    );
    expect(queryByText('MORE ANSWERED QUESTIONS')).toBeInTheDocument();
  })

  it('does not render the MORE ANSWERED QUESTIONS button if there are no more answers to be displayed', () => {
    const {queryByText} = render(
    <Footer
      onShowMoreQuestionsClick={onShowMoreQuestionsClick}
      moreQuestions={false}
      productName={productName}
      productId={productId}
      updateQuestionState={updateQuestionState}
      selectedQuestion={selectedQuestion}
      />
    );
    expect(queryByText('MORE ANSWERED QUESTIONS')).not.toBeInTheDocument();
  })
})