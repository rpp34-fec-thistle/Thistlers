import React from 'react';
import axios from 'axios';

import ImageGallery from './image-gallery/ImageGallery.jsx';
import ProductInfo from './product-info/ProductInfo.jsx';
import StyleSelector from './style-selector/StyleSelector.jsx';
import AddToCart from './add-to-cart/AddToCart.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      product_id: '64620',
      styleIndex: 0,
      styles: [],
      info: {},
      ratings: {},
      loaded: false
    }
    this.updateStyle = this.updateStyle.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  updateStyle(index) {
    this.setState({
      styleIndex: index
    })
  }

  changeView() {
    if (this.state.view === 'default') {
      this.setState({view: 'expanded'})
    } else {
      this.setState({view: 'default'})
    }
  }

  componentDidMount() {
    let endpoints = [
      `http://localhost:8080/styles/${this.state.product_id}`,
      `http://localhost:8080/products/${this.state.product_id}`,
      `http://localhost:8080/avgstars/${this.state.product_id}`
    ]
    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread((styles, products, avgstars) => {
          this.setState({
            styles: styles.data.results,
            info: products.data,
            ratings: avgstars.data.ratings,
            loaded: true
          })
        })
      )
      .catch((err) => {
        console.log('GET DATA ERROR:', err)
      })

  }

  render() {
    let page = <div></div>
    if (this.state.loaded) {
      if (this.state.view === 'default') {
        page = (
          <div className="overview-main">
            <ImageGallery
              styleIndex={this.state.styleIndex}
              stylesData={this.state.styles}
              view={this.state.view}
              changeView={this.changeView}
            />
            <div className="right-pane">
              <ProductInfo
                ratings={this.state.ratings}
                info={this.state.info}
                sale_price={this.state.styles[this.state.styleIndex]?.sale_price}
              />
              <StyleSelector
                updateStyle={this.updateStyle}
                styleIndex={this.state.styleIndex}
                styles={this.state.styles}
              />
              <AddToCart
                styles={this.state.styles}
                styleIndex={this.state.styleIndex}
              />
            </div>
          </div>
        )
      } else {
        page = (
          <div className="overview-main">
            <ImageGallery
              styleIndex={this.state.styleIndex}
              stylesData={this.state.styles}
              view={this.state.view}
              changeView={this.changeView}
            />
          </div>
        )
      }
    }
    return (page)
  }
}

export default Overview;