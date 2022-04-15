import React from 'react'
import {render, screen} from '@testing-library/react'
import {jsdom} from '@testing-library/jest-dom'
import Overview from './Overview.jsx';

test('on initial render, ImageGallery should be on the DOM', () => {
  render(<Overview/>)

  const imageGallery = screen.getByTestId('image-gallery')

  expect(imageGallery).toBeInTheDocument()
});

test('on initial render, ProductInfo should be on the DOM', () => {
  render(<Overview/>)

  const productInfo = screen.getByTestId('product-info')

  expect(productInfo).toBeInTheDocument()
});

test('on initial render, StyleSelector should be on the DOM', () => {
  render(<Overview/>)

  const styleSelector = screen.getByTestId('style-selector')

  expect(styleSelector).toBeInTheDocument()
});

test('on initial render, AddToCart should be on the DOM', () => {
  render(<Overview/>)

  const addToCart = screen.getByTestId('add-to-cart')

  expect(addToCart).toBeInTheDocument()
});