import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import Ratings from './Ratings.jsx';

test('on initial render, Ratings element should be on the DOM', () => {
  render(<Ratings/>)
  waitFor(() => expect(screen.getById('ratings')).toBeInTheDocument())
});