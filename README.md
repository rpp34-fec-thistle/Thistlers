# Thistlers

**To get started**

Run the following commands:

1. npm install
2. npm run react-dev
3. npm run server-dev
4. open localhost:8080

# App

This project is a product landing page consisting of 4 widgets:

1. Product Overview
2. Related Items & Outfit Creation
3. Questions & Answers
4. Ratings & Reviews

# Widgets Details

## Product Overview

The Product Overview widget has 4 main components:

1. Image Gallery
2. Product Information
3. Style Selector
4. Add to Cart

_Image Gallery_

This component contains thumbnails of all the images for the selected style on the left hand side. It also displays the currently selected image at the center of the page. Additionally, this component has navigation arrows allowing the user to cycle through the styles images. Lastly, it includes a zoom/pan feature allowing the user to get a closer look at the selected image.

_Product Information_

This component contains the product information such as the name, price, rating, and category of the product. It also has a link to read additonal reviews located towards the end of the page.

_Style Selector_

This component contains the name of the selected style and clickable thumbnails allowing the user to choose a desired style.

_Add to Cart_

This component allows the user to select a size and quantity for their order and add it to their cart.

## Related Items & Outfit Creation

The Related Items & Outfit Creation widget has 2 main components:

1. Related Products
2. Your Outfits


_Related Products_

This component displays a carousel of cards that render the image, category, name, price and star rating of each item that is related to the overview item, as determined by the client.  Each card in this carousel provides a way to compare the overview item with the card item by clicking the top right star, which will then render a comparison modal that allows customers to view both items features and whether they each have the feature or not.

_Your Outfits_

This component displays a carousel of cards that render similar data to the cards displayed in Related Products.  However, the first card is not an item, but rather a way for the customer to save the overview item in their "Your Outfit" storage, which is added to the user's local storage.  The concurrent item cards will look similar to the ones in Related Products, except they will have the functionality of removing the item from Your Outfit local storage by clicking an x at the top right corner.


## Questions & Answers

## Ratings & Reviews
