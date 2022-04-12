import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Cards from './Cards.jsx';

console.log('test Widget: ', Cards);

test('Fake Test', () => {
  expect(true).toBeTruthy();
})

test('renders Widget', () => {
  const {getByText} = render(<Cards />);
  expect(getByText('henlo')).toBeInTheDocument();
})