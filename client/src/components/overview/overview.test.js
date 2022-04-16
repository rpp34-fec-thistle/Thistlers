import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Overview from './Overview.jsx';

test('on initial render, ImageGallery should be on the DOM', () => {
  render(<Overview/>)
  waitFor(() => expect(screen.getByTestId('image-gallery')).toBeInTheDocument())

});

test('on initial render, ProductInfo should be on the DOM', () => {
  render(<Overview/>)
  waitFor(() => expect(screen.getByTestId('product-info')).toBeInTheDocument())
});

test('on initial render, StyleSelector should be on the DOM', () => {
  render(<Overview/>)
  waitFor(() => expect(screen.getByTestId('style-selector')).toBeInTheDocument())

});

test('on initial render, AddToCart should be on the DOM', () => {
  render(<Overview/>)


  waitFor(() => expect(screen.getByTestId('add-to-cart')).toBeInTheDocument())

});