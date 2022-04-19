import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Ratings from './Ratings.jsx';

console.log('test Widget: ', Ratings);


describe('Ratings.jsx Unit Tests', () => {
  // it('renders Alt Text in Ratings component', () => {
  //   render(<Ratings/>);
  //   const element = screen.getByAltText('This is the rating of the product as described below.');
  //   expect(element).toBeInTheDocument();
  // })

  it('renders Ratings id', () => {
    render(<Ratings />);
    const element = screen.getByTestId('ratings-id')
    expect(element).toBeInTheDocument();
})

});