import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Cards from './Cards.jsx';

console.log('test Widget: ', Cards);


test('renders Card', () => {
  render(<Cards />);
  const element = screen.getByTestId('test-id')
  expect(element).toBeInTheDocument();
})



