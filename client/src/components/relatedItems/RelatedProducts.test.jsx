import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import RelatedProducts from './RelatedProducts.jsx';

console.log('test Widget: ', RelatedProducts);


describe('RelatedProducts.jsx Unit Tests', () => {
  // it('renders Alt Text in RelatedProducts component', () => {
  //   render(<RelatedProducts/>);
  //   const element = screen.getByAltText('This is the rating of the product as described below.');
  //   expect(element).toBeInTheDocument();
  // })

  it('renders RelatedProducts id', () => {
    render(<RelatedProducts />);
    const element = screen.getByTestId('related-products-id')
    expect(element).toBeInTheDocument();
})

});