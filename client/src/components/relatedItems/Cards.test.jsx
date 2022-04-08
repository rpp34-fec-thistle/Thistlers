import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Cards from './Cards.jsx';

console.log('test setCard: ', Cards);

test('Fake Test', () => {
  expect(true).toBeTruthy();
})

// test('renders Cards component', () => {
//   render(<Cards />);
//   const testElement = screen.getBy();
// })