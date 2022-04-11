import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Ratings from './Ratings.jsx';
import Cards from './Cards.jsx';

const RelatedProducts = () => {

  const [overviewId, setOverviewId] = useState(64620);
  const [relatedProductsIds, setRelatedProductsIds] = useState([]);
  const [relatedProductsData, setRelatedProductsData] = useState([]);


  const fetchProductsIds = () => {

    const relatedIdsAPI = `http://localhost:8080/products/${overviewId}/related`;

    axios(relatedIdsAPI)
      .then((data) => {
        var result = data.data;
        setRelatedProductsIds(result);
        return result;
      })
      .catch((err) => {
        console.log('error in setRelatedProductsIds');
        return err;
      })

  };

  const fetchProductsData = () => {

    console.log('relatedProductsIds: ', relatedProductsIds);
    const newArr = [];

    relatedProductsIds.forEach((id) => {

      const relatedStylesAPI = `http://localhost:8080/styles/${id}`;
      const relatedProductsAPI = `http://localhost:8080/products/${id}`;

      const getRelatedStyles = axios.get(relatedStylesAPI);

      const getRelatedProducts = axios.get(relatedProductsAPI);

      axios.all([getRelatedStyles, getRelatedProducts])
        .then(axios.spread((...data) => {
          const stylesData = data[0].data;
          const productsData = data[1].data;
          let stylesObj = {
            id: stylesData.product_id,
            style: stylesData.results.style_id,
            image: stylesData.results[0].photos[0].thumbnail_url,
            price: stylesData.results[0].original_price,
            salePrice: stylesData.results[0].sale_price
          };
          let productsObj = {
            category: productsData.category,
            name: productsData.name
          };
          const sumData = Object.assign(stylesObj, productsObj)
          console.log('related item object: ', sumData);
          return sumData;
        }))
        .then((data) => {
          newArr.push(data);
          return newArr;
        })
        .else((err) => {
          console.log('error from axios.all');
          return err;
        })
    })

    setRelatedProductsData(newArr);

  };

  // useEffect(() => {
  //   Promise.all([
  //     setOverviewId(64620),
  //     fetchProductsIds()
  //   ]).then(() => {
  //     fetchProductsData()
  //   })
  //     .catch((err) => {
  //       console.log('load state error: ', err);
  //     })
  // }, [relatedProductsIds]);


  return (
    <>
    <div className="related-products-carousel">
      <Cards /> <Cards /> <Cards /> <Cards />
    </div>
    </>

  )
};

export default RelatedProducts;


    // {/* {
    //   relatedProductsData.map((eachProduct) =>
    //     <div className="related-item-card" key={eachProduct.id}>
    //       <div className="related-item-card-image">
    //         <img src={eachProduct.image} />
    //       </div>
    //       <div className="related-item-card-description">
    //         {eachProduct.category}
    //         {eachProduct.name}
    //         {eachProduct.price}
    //         <Ratings />
    //       </div>
    //     </div>
    //   )
    // } */}

