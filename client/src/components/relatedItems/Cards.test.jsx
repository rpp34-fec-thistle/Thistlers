import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import Cards from './Cards.jsx';

test('on initial render, Card element should be on the DOM', () => {
  render(<Cards/>)
  waitFor(() => expect(screen.getById('card')).toBeInTheDocument())
});

// import React from 'react';
// import {render, screen} from '@testing-library/react'
// // import {jsdom} from '@testing-library/jest-dom'
// import Cards from './Cards.jsx';


// const data = {
//   overviewId: 64626,
//   overviewIdName: 'Blues Suede Shoes',
//   overviewIdFeatures: ["Rubber", "FullControlSkin", "Double Stitch"],
//   eachId: 64620,
//   image: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
//   name: 'Camo Onesie',
//   price: 140.00,
//   salePrice: null,
//   category: 'Jackets',
//   features: ["Canvas", "Brass"]
// }



// describe('Cards.jsx Unit Tests', () => {
//   it('renders Alt Text in Card component', () => {
//     render(<Cards key={'rp-' + data.eachId} id={data.eachId} overviewId={data.overviewId} overviewIdName={data.overviewIdName} overviewIdFeatures={data.overviewIdFeatures}/>);
//     // this.state.image = data.image;
//     // this.props.id = data.eachId;
//     // this.props.overviewId = data.overviewId;
//     const element = screen.getByAltText('This is an image of the product as described below.');
//     expect(element).toBeInTheDocument();
//   })

//   it('renders Card id', () => {
//     render(<Cards />);
//     const element = screen.getByTestId('test-id')
//     expect(element).toBeInTheDocument();
//   });

//   it('renders Card data', () => {
//     const {getByText} = render(<Cards key={data.overviewId} id={data.overviewId} overviewId={data.overviewId}/>);
//     expect(getByText(/Kicks/)).toBeInTheDocument();
//   })

// });

// mock service worker
// will intercept ajax request
// don't want to actually hit api
// can define JSON object that will return a component