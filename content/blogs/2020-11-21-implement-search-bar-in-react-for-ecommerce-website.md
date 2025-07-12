---
title: 'Implement Search Bar in React for Ecommerce Website'
date: '2020-11-21'
tags: ['javascript', 'react', 'webdev', 'tech']
slug: 'implement-search-bar-in-react-for-ecommerce-website'
description: 'I observed that in eCommerce websites filtering products based on certain filters or user inputs is a super common thing.

In this little tutorial, I''ll be trying to layout the mechanics of filtering data from a state based on the search input.

Of course you can go all out and add all the fancy toggle filters, advanced search options and whatnot. But the concept of filtering stays the same, more or less.

Hope you enjoy!'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/4Ddjn5rzHqzaQLbpYtl9Av/df34ee25873c879433634d04b0586a57/Implement_Search_Bar_in_React_for_Ecommerce_Website.png'
---

I observed that in eCommerce websites filtering products based on certain filters or user inputs is a super common thing.

In this little tutorial, I'll be trying to layout the mechanics of filtering data from a state based on the search input.

Of course you can go all out and add all the fancy toggle filters, advanced search options and whatnot. But the concept of filtering stays the same, more or less.

Hope you enjoy!

# Sketching out a product state

Let's try to make a close to real ecommerce product list. The aim here is to use "tags", "title", "category" fields to look for the products. The tag filed contains few descriptions of what the product is. Just like Instagram #hashtags

```json
{
      id: 1,
      title: "Check Textured Coat",
      category: "Coat",
      price: "175.4",
      tags: "coat check textured camel brown long sleeves buttoned cuffs",
    },
    {
      id: 2,
      title: "Contrast Check Coat",
      category: "Coat",
      price: "155.4",
      tags: "coat camel black grey marl lapel collar hip flap pockets",
    },
    {
      id: 3,
      title: "White Coat",
      category: "Coat",
      price: "125.4",
      tags: "coat camel white short sleeves double-breasted button",
    },
    {
      id: 4,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain purple long baggy hood",
    },
    {
      id: 5,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain black long baggy hood",
    },
    {
      id: 6,
      title: "Basic short Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain gray grey short hood",
    },
]
```

SearchBarSection.js up-until now!

```jsx
// SearchBarSection.js

import React, {useState} from "react";

const SearchBarSection = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Check Textured Coat",
      category: "Coat",
      price: "175.4",
      tags: "coat check textured camel brown long sleeves buttoned cuffs",
    },
    {
      id: 2,
      title: "Contrast Check Coat",
      category: "Coat",
      price: "155.4",
      tags: "coat camel black grey marl lapel collar hip flap pockets",
    },
    {
      id: 3,
      title: "White Coat",
      category: "Coat",
      price: "125.4",
      tags: "coat camel white short sleeves double-breasted button",
    },
    {
      id: 4,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain purple long baggy hood",
    },
    {
      id: 5,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain black long baggy hood",
    },
    {
      id: 6,
      title: "Basic short Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain gray grey short hood",
    },
  ]);
  return <div></div>;
};

export default SearchBarSection;
```

# UI Component

We are just looking to setup a search bar and a display section. So lets get through with a basic UI first.

But before we get into it, might as well import this in App.js and have a look at our marvelous (laughs a lot of em'!) design on the browser

App.js

```jsx
// App.js

import SearchBarSection from "./Projects/SearchBarSection/SearchBarSection";

function App() {
  return (
    <div>
      <SearchBarSection />
    </div>
  );
}

export default App;
```

### Search Bar

Just the UI of the search bar. We'll implement the input functionalities in the later section.

```html
return (
    <div className="searchBarSection">
      <div class="searchBar">
        <input className="input" />
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
```

SearchBarSection.js up-until now!

```jsx
// SearchBarSection.js

import React, {useState} from "react";
import "./SearchBarSection.css";

const SearchBarSection = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Check Textured Coat",
      category: "Coat",
      price: "175.4",
      tags: "coat check textured camel brown long sleeves buttoned cuffs",
    },
    {
      id: 2,
      title: "Contrast Check Coat",
      category: "Coat",
      price: "155.4",
      tags: "coat camel black grey marl lapel collar hip flap pockets",
    },
    {
      id: 3,
      title: "White Coat",
      category: "Coat",
      price: "125.4",
      tags: "coat camel white short sleeves double-breasted button",
    },
    {
      id: 4,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain purple long baggy hood",
    },
    {
      id: 5,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain black long baggy hood",
    },
    {
      id: 6,
      title: "Basic short Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain gray grey short hood",
    },
  ]);
  return (
    <div className="searchBarSection">
      <div class="searchBar">
        <input className="input" />
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBarSection;
```

```css
/* SearchBarSection.css */

.searchBarSection {
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchBar {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid;
  border-radius: 20px;
}

.input {
  width: 250px;
  border: none;
  border-radius: 20px;
}

.button {
  background-color: transparent;
  border: none;
  width: 25px;
  border-radius: 20px;
}
```

### Product Display

I don't want to focus much on UI enhancements in this blog. This is more on the technical implementation side.

So we'll be displaying the products WITHOUT IMAGES.

```html
<div className="display">
  {products.map((product) => (
    <div className="product">
      <h6>{product.category}</h6>
      <h3>{product.title}</h3>
      <h5>{product.price}</h5>
    </div>
  ))}
</div>
```

We are not yet filtering the products based on search input and hence we see the whole list.
We'll do that in the next section. 

SearchBarSection.js up until now!

```jsx
import React, {useState} from "react";
import "./SearchBarSection.css";

const SearchBarSection = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Check Textured Coat",
      category: "Coat",
      price: "175.4",
      tags: "coat check textured camel brown long sleeves buttoned cuffs",
    },
    {
      id: 2,
      title: "Contrast Check Coat",
      category: "Coat",
      price: "155.4",
      tags: "coat camel black grey marl lapel collar hip flap pockets",
    },
    {
      id: 3,
      title: "White Coat",
      category: "Coat",
      price: "125.4",
      tags: "coat camel white short sleeves double-breasted button",
    },
    {
      id: 4,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain purple long baggy hood",
    },
    {
      id: 5,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain black long baggy hood",
    },
    {
      id: 6,
      title: "Basic short Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain gray grey short hood",
    },
  ]);

  return (
    <div className="searchBarSection">
      <div class="searchBar">
        <input className="input" />
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="display">
        {products.map((product) => (
          <div className="product">
            <h6>{product.category}</h6>
            <h3>{product.title}</h3>
            <h5>{product.price}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBarSection;
```

Adding in some CSS.

```css
.display {
  display: flex;
  flex-wrap: wrap;
}

.product {
  margin: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 20px;
  background-color: #f9d5d3;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
```

SearchBarSection.css up until now!

```css
/* SearchBarSection.css */

.searchBarSection {
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchBar {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid;
  border-radius: 20px;
}

.input {
  width: 250px;
  border: none;
  border-radius: 20px;
}

.button {
  background-color: transparent;
  border: none;
  width: 25px;
  border-radius: 20px;
}

.display {
  display: flex;
  flex-wrap: wrap;
}

.product {
  margin: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 20px;
  background-color: #f9d5d3;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
```

# Setting up search functionality

The first thing we need to setup is a state to store the search input.

```jsx
const [search, setSearch] = useState("");
```

Now let's try to filter out the products based on this search state.
Here we are searching the string stored in the search state within tags, title and category string.

You can see some examples on [Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

```jsx
const filteredProducts = products.filter((product) => {
    if (
      product.tags.toLowerCase().includes(search) ||
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    ) {
      return product;
    }
  });
```

Perfect! We are almost done. Let's just quickly setup the onChange attribute on the input to set the "search" state on each character input.

```jsx

<input
  className="input"
  onChange={(e) => {
    setSearch(e.target.value.toLowerCase());
  }}
/>
```

Last little tweak and it's done! Just replace the "product" in the "display" div with "filteredProducts"

```jsx
<div className="display">
  {filteredProducts.map((product) => (
    <div className="product">
      <h6>{product.category}</h6>
      <h3>{product.title}</h3>
      <h5>{product.price}</h5>
    </div>
  ))}
</div>
```

SearchBarSection.js final!

```jsx
import React, {useState} from "react";
import "./SearchBarSection.css";

const SearchBarSection = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Check Textured Coat",
      category: "Coat",
      price: "175.4",
      tags: "coat check textured camel brown long sleeves buttoned cuffs",
    },
    {
      id: 2,
      title: "Contrast Check Coat",
      category: "Coat",
      price: "155.4",
      tags: "coat camel black grey marl lapel collar hip flap pockets",
    },
    {
      id: 3,
      title: "White Coat",
      category: "Coat",
      price: "125.4",
      tags: "coat camel white short sleeves double-breasted button",
    },
    {
      id: 4,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain purple long baggy hood",
    },
    {
      id: 5,
      title: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain black long baggy hood",
    },
    {
      id: 6,
      title: "Basic short Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
      tags: "hoodie solid plain gray grey short hood",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    if (
      product.tags.toLowerCase().includes(search) ||
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    ) {
      return product;
    }
  });

  return (
    <div className="searchBarSection">
      <div class="searchBar">
        <input
          className="input"
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="display">
        {filteredProducts.map((product) => (
          <div className="product">
            <h6>{product.category}</h6>
            <h3>{product.title}</h3>
            <h5>{product.price}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBarSection;
```

SearchBarSection.css final!

```css
/* SearchBarSection.css */

.searchBarSection {
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchBar {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid;
  border-radius: 20px;
}

.input {
  width: 250px;
  border: none;
  border-radius: 20px;
}

.button {
  background-color: transparent;
  border: none;
  width: 25px;
  border-radius: 20px;
}

.display {
  display: flex;
  flex-wrap: wrap;
}

.product {
  margin: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 20px;
  background-color: #f9d5d3;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
```

Oh oh! I almost forgot.

App.js

```jsx
// App.js

import SearchBarSection from "./Projects/SearchBarSection/SearchBarSection";

function App() {
  return (
    <div>
      <SearchBarSection />
    </div>
  );
}

export default App;
```

## Thank you!