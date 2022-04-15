import React from 'react'
import {render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Overview from '../Overview.jsx';

beforeEach(async () => {
  render(<Overview/>)
} )

test('on initial render, default view should be on the DOM', async () => {
  const image = await screen.findByTestId('s-image')
  expect(image).toBeInTheDocument()
})