import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import YourOutfit from './YourOutfit.jsx';

console.log('test Widget: ', YourOutfit);


describe('YourOutfit.jsx Unit Tests', () => {
  // it('renders Alt Text in YourOutfit component', () => {
  //   render(<YourOutfit/>);
  //   const element = screen.getByAltText('This is the rating of the product as described below.');
  //   expect(element).toBeInTheDocument();
  // })

  it('renders YourOutfit id', () => {
    render(<YourOutfit />);
    const element = screen.getByTestId('your-outfit-id')
    expect(element).toBeInTheDocument();
})

});