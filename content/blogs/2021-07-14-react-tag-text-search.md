---
title: 'React: Tag Text Search'
date: '2021-07-14'
tags: ['react', 'javascript', 'webdev', 'tech']
slug: 'react-tag-text-search'
description: 'I recently fabricated this ''Tag-Text-Search'' functionality for my blog. So, here is a little article just about it.

BTW, the source code for the blog is public and you can surely go check it here.

In this blog we''ll be using Context API to make the setup work. So, go ahead if you have a basic understanding of it and if not, you can definitely go have a look at my article on Using React Context API Like a Pro'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/3vZDNzK6CWNeqrGLhqurO8/9d632299763e21e7420129e4a8938c5c/FI.png'
publish_status: 'published'
---

I recently fabricated this 'Tag-Text-Search' functionality for my [blog](https://www.rahsand.tech). So, here is a little article just about it.

BTW, the source code for the blog is public and you can surely go check it [here](https://github.com/holdmypotion/portfolio-v2).

In this blog, we'll be using [Context API](https://reactjs.org/docs/context.html) to make the setup work. So, go ahead if you have a basic understanding of it and if not, you can definitely go have a look at my article on [Using React Context API Like a Pro](https://www.rahsand.tech/blog/using-react-context-api-like-a-pro)

[Live Link](https://ecb0r.csb.app/)

[Code Sand Box](https://codesandbox.io/s/tag-text-serach-ecb0r)

[Github Repo](https://github.com/holdmypotion/tag-text-search/)

# Setup

Run the following commands to have an initial setup to work on.

```powershell
npx create-react-app tag-text-search
cd tag-text-search
yarn start
```

# Final File Structure

![React: Tag-Text-Search | File Structure](//images.contentful.com/8z3meboy5dgi/4mRdbM61R8MmAAFkaZb0jk/d474b2be393af6c990467259f7ce3b8e/filestructure.png)

# The Side Bar

I think it is better to start with creating a side bar that shall contain the search bar and the tags.

`src/sideBar/sideBar.js`

```jsx
import SearchBar from './searchBar';
import TagSection from './tagSection';
import styles from '../../styles/sideBar.module.css';

export default function SideBar() {
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.container}>
        <SearchBar />
        <TagSection />
      </div>
    </div>
  );
}
```

We'll be creating the `sideBar.module.css` in a moment. But let's first finish off the `SerachBar` and the `TagSection`

Wait, no! As a matter of fact, let's be done with all the styling right now right here.
Here you go, paste the code below in `src/styles/sideBar.module.css`

```css
.stickyContainer {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  height: 0;
  z-index: 20;
  width: 30%;
  max-width: 30%;
}

.container {
  position: absolute;
  z-index: 20;
  display: inline-block;
  height: 100vh;
  left: 20px;
  padding: 1rem;
  top: 0;
  background: var(--baseLight);
  border-radius: 2px;
  z-index: 10;
  transition: 0.8s;
}

.sb__container {
  background: var(--base);
  border-radius: 2px;
  transition: 0.4s;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 2px solid transparent;
  width: 100%;
}

.sb__container:focus-within {
  background: var(--baseLight);
  border: 2px solid var(--primary);
}

.sb__container svg {
  margin-left: 0.5rem;
  padding-top: 0.2rem;
}

.sb__input {
  font-family: Antonio;
  background: var(--base);
  outline: none;
  color: var(--primary);
  font-size: 1rem;
  letter-spacing: 0.5px;
  width: 100%;
  padding: 5px;
  border: none;
  transition: 0.4s;
}

.sb__input:focus-within {
  background: var(--baseLight);
}

.sb__input::placeholder {
  color: var(--primary);
}

.ts__flexContainer {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}

.ts__heading {
  text-transform: capitalize;
  font-size: 1.7rem;
}

.ts_selectedTagContainer {
  margin-bottom: 1.5rem;
  margin-top: 0.3rem;
}

.ts__unselectedTagContainer {
  overflow-y: auto;
  height: 100%;
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ts__selectedTag {
  cursor: pointer;
  margin: 0.2rem 0;
  margin-right: 0.4rem;
  position: relative;
  color: black;
  border: 2px solid var(--primary);
  padding: 5px 15px;
  overflow: hidden;
  transition: 1s all ease;
  background: transparent;
  font-family: Antonio;
  font-weight: bold;
  letter-spacing: 0.04em;
  border-radius: 2px;
  outline: none;
  background: var(--primary);
  font-size: 1rem;
}

.ts__unselectedTag {
  cursor: pointer;
  margin: 0.5rem 0;
  position: relative;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 5px 15px;
  overflow: hidden;
  transition: 1s all ease;
  background: transparent;
  font-family: Antonio;
  font-weight: bold;
  letter-spacing: 0.04em;
  border-radius: 2px;
  outline: none;
  background: var(--base);
  font-size: 1rem;
}
```

This has all the styles we would be needing for the `SideBar` , the `SearchBar`, and the `TagSection`.

As you can see we are using a couple of CSS variables so we better create them as well.

Paste this code in `src/index.css`

```css
:root {
  --base: #e3e3e3;
  --baseLight: #c8c7c7;
  --primary: #f1762d;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

## Search Bar

I do have a blog that is just based on this search functionality, in case you want to check that out. [Implement Search Bar in React for Ecommerce Website](https://www.rahsand.tech/blog/implement-search-bar-in-react-for-ecommerce-website)

Alright now, let's code the `SearchBar`. It is pretty straightforward as opposed to the `TagSection`

Just copy the code below in `src/components/sideBar/serachBar.js`

```jsx
import { useContext } from 'react';
import { SearchContext } from '../../store/search-context';
import styles from '../../styles/sideBar.module.css';

const SearchBar = () => {
  const { query, searchHandler } = useContext(SearchContext);

  return (
    <div className={styles.sb__container}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10.9167 9.66667H10.2583L10.025 9.44166C10.8417 8.49166 11.3333 7.25833 11.3333 5.91667C11.3333 2.925 8.90833 0.5 5.91667 0.5C2.925 0.5 0.5 2.925 0.5 5.91667C0.5 8.90833 2.925 11.3333 5.91667 11.3333C7.25833 11.3333 8.49166 10.8417 9.44166 10.025L9.66667 10.2583V10.9167L13.8333 15.075L15.075 13.8333L10.9167 9.66667ZM5.91667 9.66667C3.84167 9.66667 2.16667 7.99167 2.16667 5.91667C2.16667 3.84167 3.84167 2.16667 5.91667 2.16667C7.99167 2.16667 9.66667 3.84167 9.66667 5.91667C9.66667 7.99167 7.99167 9.66667 5.91667 9.66667Z'
          fill='#F1762D'
        />
      </svg>
      <input
        className={styles.sb__input}
        placeholder='Search'
        type='text'
        onChange={(e) => searchHandler(e.target.value)}
        value={query}
      />
      <span>
        <i></i>
      </span>
    </div>
  );
};

export default SearchBar;
```

Now, we still have one thing that we need to create to make this work, `SearchContext`. So let's get on with it.

### Search Context

The idea is, you define a `state` and the `setState` function in the Context and now you can essentially 'get the state' or 'update the state' from any of the components wrapped in the Context (whole application mostly :))

Paste the code below in `src/store/search-context.js`

```jsx
import { useState, createContext } from 'react';

export const SearchContext = createContext({
  query: '',
  searchHandler: () => {},
});

const SearchContextProvider = (props) => {
  const [query, setQuery] = useState('');

  const searchHandler = (query) => {
    setQuery(query.toLowerCase());
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

Time to look at `searchBar.js` and `serach-context.js` simultaneously.

The state that is being updated by the `onChange` function on the input in the `serachBar.js` is the state defined in the context, i.e. `query`, and the function that is updating the state is also coming from the context, i.e. `searchHandler`.

We are all set but one thing. We never wrapped our application with the context. The way I like to do this is by creating an `index.js` in `src/store` and export a component named `Context`.

Here, paste the code below in `src/store/index.js`

```jsx
import SearchContextProvider from './search-context';

export default function Context({ children }) {
  return <SearchContextProvider>{children}</SearchContextProvider>;
}
```

The reason I like to do this is because I can create multiple contexts in multiple files and then combine them all in this file. (You'll see this later when we create the `filter-context.js` for tag filtering functionality)

Finally, we need to wrap our application with this context.

Paste this code in `src/App.js`

```jsx
import SideBar from './components/sideBar/sideBar';
import Context from './store';

function App() {
  return (
    <Context>
      <SideBar />
    </Context>
  );
}

export default App;
```

## Tag Section

Alright now! Let me lay out the concept behind this functionality.

Essentially there are two lists

1. Unselected Tags
2. Selected Tags

Initially, we put all the tags in the 'Unselected Tags' list and keep the 'Selected Tags' list empty.

Then we create two functions namely, `selectTagHandler` and `unselectTagHandler`. The `selectTagHandler` puts the selected tag into the 'Selected Tags' list and removes it from the 'Unselected Tags' list, and the `unselectTagsHandler` does exactly the opposite.

Finally, both of these functions update the `fillter-contenxt` (that we'll be creating shortly) with the 'Selected Tags' list for us to access later and use to filter articles. But more on that later. Okay, enough formulation! Let's jump right into creating the Tag Section

At first, let's have the `TAGS` array.

Paste this into `src/data/data.js`

```jsx
export const TAGS = [
  'react',
  'books-notes',
  'web-dev',
  'design',
  'javascript',
  'reactnative',
  'mobile-dev',
];
```

Paste the code below into `src/components/sideBar/tagSection.js`

```jsx
import { useState } from 'react';
import { TAGS } from '../../data/data';
import styles from '../../styles/sideBar.module.css';

export default function TagSection() {
  // 1.
  const [unselectedTags, setUnselectedTags] = useState(TAGS);
  const [selectedTags, setSelectedTags] = useState([]);

  // 2.
  const selectTagHandler = (tag) => {
    const updatedSelectedTags = selectedTags.concat(tag);
    setSelectedTags(updatedSelectedTags);
    setUnselectedTags(
      unselectedTags.filter((unselectedTag) => unselectedTag !== tag),
    );
  };

  // 3.
  const unselectTagHandler = (tag) => {
    setUnselectedTags(unselectedTags.concat(tag));
    const updatedSelectedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag,
    );
    setSelectedTags(updatedSelectedTags);
  };

  const selectedTagsList = selectedTags.map((tag) => (
    <button
      className={styles.ts__selectedTag}
      key={tag}
      onClick={() => unselectTagHandler(tag)}
    >
      #{tag}
    </button>
  ));

  const unselectedTagsList = unselectedTags.map((tag) => (
    <button
      key={tag}
      className={styles.ts__unselectedTag}
      onClick={() => selectTagHandler(tag)}
    >
      #{tag}
    </button>
  ));

  return (
    <div className={styles.ts__flexContainer}>
      <div className={styles.ts__flexContainer}>
        <h2 className={styles.ts__heading}>You Selected</h2>
        <div className={styles.ts_selectedTagContainer}>{selectedTagsList}</div>
      </div>
      <div className={styles.ts__flexContainer}>
        <h2 className={styles.ts__heading}>To Select From</h2>
        <div className={styles.ts__unselectedTagContainer}>
          {unselectedTagsList}
        </div>
      </div>
    </div>
  );
}
```

Let's break it down.

1. Firstly we create two arrays (or lists), `unselectedTags` and `selectedTags`. You'll notice that the `unselectedTags` is prepopulated with the `TAGS` array just like we planned, and the `selectedTags` is empty.
2. `selectTagHandler` takes an argument `tag` and uses that to populate `selectedTags` array using the [.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method that comes with the JS Arrays. Now we also need to remove the selected tag from the `unselectedTags` array and for that, we use the [.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method, again, that comes with the JS Arrays.
3. `unselectTagHandler` does exactly the opposite of the function we just discussed, i.e. `selectTagHandler`. Takes an argument, named `tag` - updates the `unselectedTags` array with it - remove it out from the `selectedTags` array.

### Creating the filter context

As you have witnessed all the logic related to state management is right here in the `TagSection` component. But, in order to filter out articles based on the selected tags we need access to the `selectedTags` array. To achieve this we create the filter-context in which we basically keep a copy of `selectedTags` array. So when we update the `selectedTags` array in the `TagSection` we also update the state in our filter context.

I'll show you how!

Paste the code below in `src/store/filter-context.js`

```jsx
import { useState, createContext } from 'react';

export const FilterContext = createContext({
  tags: [],
  tagSelector: () => {},
});

const FilterContextProvider = (props) => {
  const [tags, setTags] = useState([]);

  const tagSelector = (tagsList) => {
    setTags(tagsList);
  };

  return (
    <FilterContext.Provider value={{ tags: tags, tagSelector: tagSelector }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
```

Pretty straightforward, right. Whatever you pass (essentially a list) to the `tagSelector` function, is used to update the state `tags`. This is the state that we'll be using later in another component to filter out articles.

But this is not done yet, firstly we shall wrap our application with this context.

Paste the code below into `src/store/index.js`

```jsx
import SearchContextProvider from './search-context';
import FilterContextProvider from './filter-context';

export default function Context({ children }) {
  return (
    <SearchContextProvider>
      <FilterContextProvider>{children}</FilterContextProvider>
    </SearchContextProvider>
  );
}
```

And secondly, we need to add an extra bit of logic to our happy little rainbow-colored `TagSection` component.

Just paste the whole code into `src/components/sideBar/tagSection.js` and I'll explain the added lines just below it.

```jsx
import { useState, useContext } from 'react';
import { TAGS } from '../../data/data';
import { FilterContext } from '../../store/filter-context';
import styles from '../../styles/sideBar.module.css';

export default function TagSection() {
  // 1.
  const filterContext = useContext(FilterContext);

  const [unselectedTags, setUnselectedTags] = useState(TAGS);
  const [selectedTags, setSelectedTags] = useState([]);

  const selectTagHandler = (tag) => {
    const updatedSelectedTags = selectedTags.concat(tag);
    setSelectedTags(updatedSelectedTags);
    setUnselectedTags(
      unselectedTags.filter((unselectedTag) => unselectedTag !== tag),
    );
    // 2.
    filterContext.tagSelector(updatedSelectedTags);
  };

  const unselectTagHandler = (tag) => {
    setUnselectedTags(unselectedTags.concat(tag));
    const updatedSelectedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag,
    );
    setSelectedTags(updatedSelectedTags);
    // 3.
    filterContext.tagSelector(updatedSelectedTags);
  };

  const selectedTagsList = selectedTags.map((tag) => (
    <button
      className={styles.ts__selectedTag}
      key={tag}
      onClick={() => unselectTagHandler(tag)}
    >
      #{tag}
    </button>
  ));

  const unselectedTagsList = unselectedTags.map((tag) => (
    <button
      key={tag}
      className={styles.ts__unselectedTag}
      onClick={() => selectTagHandler(tag)}
    >
      #{tag}
    </button>
  ));

  return (
    <div className={styles.ts__flexContainer}>
      <div className={styles.ts__flexContainer}>
        <h2 className={styles.ts__heading}>You Selected</h2>
        <div className={styles.ts_selectedTagContainer}>{selectedTagsList}</div>
      </div>
      <div className={styles.ts__flexContainer}>
        <h2 className={styles.ts__heading}>To Select From</h2>
        <div className={styles.ts__unselectedTagContainer}>
          {unselectedTagsList}
        </div>
      </div>
    </div>
  );
}
```

Let's break it down

1. Here we are storing the object returned by the `FilterContext` in a constant named `filterContext`.
2. And, now we are passing the same exact array to the `filterContext.tagSelector` function that we passed to `setSeletectTags`array. Hence this makes a copy of the array `selectedTags` in the `filter-context`, namely `tags` array.

Phew! we are almost done. Only thing left to do is, Creating an articles array - Creating a component to render those articles - And before that, filtering them using tags and the search query.

# Main Content

Alright now, this will probably feel less overwhelming so let's be done with it.

Styling first, shall we?

Paste this code in `src/styles/mainContent.module.css`

```css
.container {
  width: 70%;
  margin-left: auto;
}

.thumbnailContainer {
  padding: 2rem 2rem;
  background-color: gray;
  border-radius: 10px;
  margin: 2rem;
  display: inline-block;
  width: 200px;
}
```

Now, let's create an `ARTICLES` array. Paste the code below in `src/data/data.js`

```jsx
export const ARTICLES = [
  {
    id: '1',
    title: 'Using React Context API Like a Pro',
    body: 'If you\'ve been hearing the term "Context API" and feel totally confused about it (like me, some days ago) or you have no clue what this even means, look no further! I\'ve got you covered (for the most part, I believe)',
    tags: ['react', 'web-dev', 'javascript'],
  },
  {
    id: '2',
    title: 'Never Split the difference - Book Notes',
    body: 'If you\'ve been hearing the term "Context API" and feel totally confused about it (like me, some days ago) or you have no clue what this even means, look no further! I\'ve got you covered (for the most part, I believe)',
    tags: ['books-notes'],
  },
  {
    id: '3',
    title: 'Design in React',
    body: 'If you\'ve been hearing the term "Context API" and feel totally confused about it (like me, some days ago) or you have no clue what this even means, look no further! I\'ve got you covered (for the most part, I believe)',
    tags: ['design', 'react', 'javascript', 'web-dev'],
  },
  {
    id: '4',
    title: 'Design in React Native',
    body: 'If you\'ve been hearing the term "Context API" and feel totally confused about it (like me, some days ago) or you have no clue what this even means, look no further! I\'ve got you covered (for the most part, I believe)',
    tags: ['design', 'react', 'reactnative', 'javascript', 'mobile-dev'],
  },
];

export const TAGS = [
  'react',
  'books-notes',
  'web-dev',
  'design',
  'javascript',
  'reactnative',
  'mobile-dev',
];
```

Alright, we are almost done. Paste the code below into `src/components/mainContent.js`

```jsx
import { useContext } from 'react';
import { SearchContext } from '../store/search-context';
import { FilterContext } from '../store/filter-context';
import styles from '../styles/mainContent.module.css';

export default function MainContent({ articles }) {
  const searchContext = useContext(SearchContext);
  const { tags } = useContext(FilterContext);
  let filteredArticles = null;
  if (articles) {
    // 1. Tag Search
    filteredArticles = articles.filter((article) => {
      if (tags.length === 0) {
        return article;
      }
      if (tags.some((val) => article.tags.includes(val))) {
        return article;
      } else {
        return null;
      }
    });

    // 2. Text Search
    filteredArticles = filteredArticles.filter((article) => {
      if (article.title.toLowerCase().includes(searchContext.query)) {
        return article;
      } else {
        return null;
      }
    });
  }

  return (
    <div className={styles.container}>
      {filteredArticles !== null &&
        filteredArticles.map((article) => {
          return (
            <div className={styles.thumbnailContainer} key={article.id}>
              <h2>{article.title}</h2>
            </div>
          );
        })}
    </div>
  );
}
```

Let's break it down. We are calling both our contexts and retrieving both the `query`state and `tags` state.

1. Firstly, we filter the articles using tags. If `tags.length === 0`, in other words, if no tag is selected → return all the articles. if `tags.some(val => article.tags.includes(val))`, i.e. if any of the tags selected are there in the tags array associated with the article object → return that article otherwise → return nothing.
2. Secondly, we are further filtering the articles based on the search query. If `(article.title.toLowerCase().includes(searchContext.query))`, in other words, if a part of the title of the article matches with the search query (no matter the casing) → return that article otherwise → return nothing.

Alright, let's import this component into `App.js`, pass the articles and finish the remaining coffee (at least for me :)).

Paste the code below in `App.js`

```jsx
import SideBar from './components/sideBar/sideBar';
import Context from './store';
import MainContent from './components/mainContent';
import { ARTICLES } from './data/data';

function App() {
  return (
    <Context>
      <SideBar />
      <MainContent articles={ARTICLES} />
    </Context>
  );
}

export default App;
```

There you have it. An ugly-looking but working 'tag-text-search' functionality. If you want to see it in action, do visit my [blog](https://www.rahsand.tech/blog) (in case you aren't already on it :)

### Thank you for reading!

Would love to hear you thoughts on this!

[Live Link](https://ecb0r.csb.app/)

[Code Sand Box](https://codesandbox.io/s/tag-text-serach-ecb0r)

[Github Repo](https://github.com/holdmypotion/tag-text-search/)
