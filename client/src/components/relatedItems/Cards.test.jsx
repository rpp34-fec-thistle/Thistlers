import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Cards from './Cards.jsx';

console.log('test Widget: ', Cards);

const data = {
  overviewId: 64628,
  style_id: 398240,
  image: 'https://images.unsplash.com/photo-1550338300-f9a475b50ba2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  price: 59.00,
  salePrice: null,
  category: 'Kicks',
  name: 'Summer Shoes'
}

describe('Cards.jsx Unit Tests', () => {
  it('renders Alt Text in Card component', () => {
    render(<Cards/>);
    const element = screen.getByAltText('This is an image of the product as described below.');
    expect(element).toBeInTheDocument();
  })

  it('renders Card id', () => {
    render(<Cards />);
    const element = screen.getByTestId('test-id')
    expect(element).toBeInTheDocument();
  });

  it('renders Card data', () => {
    const {getByText} = render(<Cards key={data.overviewId} id={data.overviewId} overviewId={data.overviewId}/>);
    expect(getByText(/Kicks/)).toBeInTheDocument();
  })

});

// mock service worker
// will intercept ajax request
// don't want to actually hit api
// can define JSON object that will return a component