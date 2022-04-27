import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import YourOutfit from './YourOutfit.jsx';

test('on initial render, YourOutfit container should be on the DOM', () => {
  render(<YourOutfit/>)
  waitFor(() => expect(screen.getById('your-outfit-container')).toBeInTheDocument())
});