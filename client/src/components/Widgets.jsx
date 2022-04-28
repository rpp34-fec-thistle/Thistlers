import React, { useState } from 'react';
import Overview from './overview/Overview.jsx'
import Reviews from './reviews/Reviews.jsx';
import Questions from './questions/QuestionsWidget.jsx';
import RelatedItems from './relatedItems/RelatedItemsWidget.jsx'
import '../../public/style.css';
import '../../public/reviews/style.css';
import '../../public/relatedItems/style.css';
import { useParams } from 'react-router-dom';


const Widgets = () => {
  const [productId, setProductId] = useState('64620');

    const { id } = useParams();
    if (id && id !== productId) {
      setProductId(id);
    }
    return(
      <>
      <Overview product_id={productId}/>
      {/* <RelatedItems
        changeId={setProductId}
        productId={productId}/>
      <Questions product_id={productId}/>
      <Reviews product_id={productId}/> */}
      </>
    )
}

export default Widgets;