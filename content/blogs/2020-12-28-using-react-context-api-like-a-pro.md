---
title: 'Using React Context API Like a Pro'
date: '2020-12-28'
tags: ['react', 'javacript', 'webdev', 'reactnative', 'tech']
slug: 'using-react-context-api-like-a-pro'
description: 'If you''ve been hearing the term "Context API" and feel totally confused about it (like me, some days ago) or you have no clue what this even means, look no further! I''ve got you covered (for the most part, I believe)'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/5Wvm6I1wA7tLS9R1EAXUd8/e28144333acfa6f62d45fb1c7aca1f6a/headerImage.png'
---

If you've been hearing the term "Context API" and feel totally confused about it (like me, some days ago) or you have no clue what this even means, look no further! I've got you covered (for the most part, I believe)

# Concept behind Context API

One thing to note: You can very well work without Context API by using normal "prop drilling". Context API does only one thing and that is "it reduces coupling between non-related components".

React Components should only hold the logic necessary for their operation.
One component, one role. (Mind you that "role" highly depends on the type of task you are creating the component for) 

Each react program has some components that hold certain states on which the program depend on. These states are passed from "parent components" to "children components" through "props".

Now, passing states between components that are not necessarily in a parent-child relationship, is handled through context API.

# Consider this Example

Have a look at the component Diagram below

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ng1frxov237s4lzg3n8p.png)

Here the SearchBar.js Component, down in the component tree, has a state that takes in the search input from the user

```jsx
// SearchBar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SearchBar.module.css";
import SearchLogo from "../../assets/search.svg";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.searchBar}>
      <input
        placeholder="Search"
        type="text"
        className={styles.input}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <Link
        to="/search-result"
      >
        <img src={SearchLogo} alt="Search Logo | magnifying glass" />
      </Link>
    </div>
  );
};

export default SearchBar;
```

The state ("searchQuery") is actually what we need in the SearchResult.js component to filter out products or whatever.

## Ways to achieve this

1. Define the state and setState function in App.js, pass them as props to Layout.js, pass them further to Header.js, at last pass them to the SearchBar.js Component.
Now use, the setState function to travel all the way back to App.js component and change the state.

OR

2. UseContext API!!!

# Creating a Context

First thing we need to do is to define our context. The way I like to do this is by creating a HOC(Higher Order Component), that wraps the App component.

Like so...

(Don't trip on the seeing the SearchContextProvider component. We'll define it in just a second.)

```jsx
// index.js

import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import SearchContextProvider from "./context/search-context";

ReactDOM.render(
  <React.StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Now, let's create a "context" and also the SearchContextProvider component

SearchContextProvider is just a simple HOC component, but with a special feature that it wraps the children components with a Context.Provider.

The most important thing to note is the value prop on SearchContext.Provider. ( Down in the code )
Whatever you put in the value prop, it becomes available to the children component.

Now you can use the "query" state and "searchHandler" function in any component inside the App component

```jsx
import React, { useState } from "react";

// query is the state
// SearchHandler is a function for changing the state.
export const SearchContext = React.createContext({
  query: "",
  searchHandler: () => {},
});

// Defining a simple HOC component
const SearchContextProvider = (props) => {
  const [query, setQuery] = useState("");

  const searchHandler = (query) => {
    setQuery(query);
  };

  return (
    <SearchContext.Provider
      value={{ query: query, searchHandler: searchHandler }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
```

PS: Don't be confused by the redundant code in the createContext function. It is totally optional.
I write this for better intellisense and code completion.

This works fine as well!

```jsx
export const SearchContext = React.createContext();
```

# Using the Context

Using the context is super intuitive and as simple as it could be.
Use it just like any other state or function!!!

New lines we would like to add to the SearchBar.js component

```jsx
...
import React, { useState, useContext } from "react";
import { SearchContext } from "../../context/search-context";
...

const SearchBar = (props) => {
...
  const searchContext = useContext(SearchContext);

  const searchQueryHandler = () => {
    searchContext.searchHandler(searchQuery);
  };
...
}
```

SearchBar.js using the context API looks something like this 

```jsx
// SearchBar.js

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { SearchContext } from "../../context/search-context";
import styles from "./SearchBar.module.css";
import SearchLogo from "../../assets/search.svg";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchContext = useContext(SearchContext);

  const searchQueryHandler = () => {
    searchContext.searchHandler(searchQuery);
  };

  return (
    <div className={styles.searchBar}>
      <input
        placeholder="Search"
        type="text"
        className={styles.input}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <Link
        to="/search-result"
        onClick={searchQueryHandler}
      >
        <img src={SearchLogo} alt="Search Logo | magnifying glass" />
      </Link>
    </div>
  );
};

export default SearchBar;
```

This makes a copy of the searchQuery state and stores it in the query variable defined in our little context.

Now we could use the same state wherever we would like

```jsx
// SearchResult.js

import React, { useContext } from "react";
import { SearchContext } from "../../context/search-context";

import styles from "./SearchResult.module.css";
import ProductSection from "../../components/ProductSection/ProductSection";

const SearchResult = ({ products, ...props }) => {
  const searchContext = useContext(SearchContext);
  let filteredProducts;
  if (products) {
    filteredProducts = products.filter((product) => {
      if (
        product.title.toLowerCase().includes(searchContext.query) ||
        product.tags.toLowerCase().includes(searchContext.query)
      ) {
        return product;
      }
      return null;
    });
  }
  return (
    <div>
      <div className={styles.title}>
        <h1>Search Results</h1>
      </div>
      <div className={styles.container}>
        {filteredProducts && (
          <ProductSection
            products={filteredProducts}
            sectionSlug="search-result"
          />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
```

Just a simple filtration logic, checking if "title" or "tags" contain the string stored in the searchContext.query variable.

Lines to focus on in the above code.

```jsx
import React, { useContext } from "react";
import { SearchContext } from "../../context/search-context";
...

const SearchResult = ({ products, ...props }) => {
  const searchContext = useContext(SearchContext);

  let filteredProducts;
  if (products) {
    filteredProducts = products.filter((product) => {
      if (
        product.title.toLowerCase().includes(searchContext.query) ||
        product.tags.toLowerCase().includes(searchContext.query)
      ) {
        return product;
      }
      return null;
    });
  }
return (
  ...
)

}
```

Just a simple filtration logic, checking if "tags" or the "title" contains the string stored in the searchContext.query variable.

### Thank you so much for reading

Would love to hear your thoughts