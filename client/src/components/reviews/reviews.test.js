/* eslint-disable no-undef */

import React from 'react';
import Reviews from './Reviews.jsx';
import {render} from '@testing-library/react';
import {jsdom} from '@testing-library/jest-dom';

describe('Render Components', () => {
  test('It should Render the Reviews Component', () => {
    const {getByText} = render(<Reviews/>);
    expect(getByText('Reviews').toBeInTheDocument);
  });
}); 