import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import RelatedItemsWidget from './RelatedItemsWidget';

test('on initial render, Related Items Widget should be on the DOM', () => {
  render(<RelatedItemsWidget/>)
  waitFor(() => expect(screen.getById('related-items-widget')).toBeInTheDocument())
});

test('on initial render, Related Products Container should be on the DOM', () => {
  render(<RelatedItemsWidget/>)
  waitFor(() => expect(screen.getById('related-products-container')).toBeInTheDocument())
});

test('on initial render, Your Outfit Container should be on the DOM', () => {
  render(<RelatedItemsWidget/>)
  waitFor(() => expect(screen.getById('your-outfit-container')).toBeInTheDocument())
});

test('on initial render, Comparison Modal Overlay should be on the DOM', () => {
  render(<RelatedItemsWidget/>)
  waitFor(() => expect(screen.getById('comparison-modal-overlay')).toBeInTheDocument())
});