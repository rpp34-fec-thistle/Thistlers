import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Footer from './Footer.jsx';

const onShowMoreQuestionsClick = () => {
  console.log('show more questioned clicked');
}

describe('Footer Component Unit Tests', () => {
  it('renders the ADD QUESTION button', () => {
    const {getByText} = render(
    <Footer
      onShowMoreQuestionsClick={onShowMoreQuestionsClick}
      moreQuestions={false}
    />
    );
    expect(getByText('ADD A QUESTION +')).toBeInTheDocument();
  })

  it('renders the MORE ANSWERED QUESTIONS button if there are more answers to be displayed', () => {
    const {queryByText} = render(
      <Footer
      onShowMoreQuestionsClick={onShowMoreQuestionsClick}
      moreQuestions={true}
      />
    );
    expect(queryByText('MORE ANSWERED QUESTIONS')).toBeInTheDocument();
  })

  it('does not render the MORE ANSWERED QUESTIONS button if there are no more answers to be displayed', () => {
    const {queryByText} = render(
    <Footer
      onShowMoreQuestionsClick={onShowMoreQuestionsClick}
      moreQuestions={false}
      />
    );
    expect(queryByText('MORE ANSWERED QUESTIONS')).not.toBeInTheDocument();
  })
})