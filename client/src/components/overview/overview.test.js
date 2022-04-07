import React from 'react'
import {render} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Overview from './Overview.jsx';

test('renders a message', () => {
  const {container, getByText} = render(<Overview />)
  expect(getByText('Hello, world!')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Overview</h1>
  `)
})
