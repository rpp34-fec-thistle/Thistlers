import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Overview from './Overview.jsx';

test('renders a message', () => {
  const {container, getByText} = render(<Overview />)
  expect(getByText('Overview')).toBeInTheDocument()
})
