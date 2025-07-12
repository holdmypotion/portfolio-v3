---
title: 'React: Marquee using Framer Motion'
date: '2021-05-02'
tags: ['react', 'javascript', 'design', 'webdev', 'tech']
slug: 'react-marquee-using-framer-motion'
description: 'This is called a "marquee" and apparently, I needed one for my portfolio website. So, I thought I might as well share it with you all!

In this blog, we''ll create an infinitely running long text (that seems to be very trendy lately) using Framer Motion and obviously react!
Let''s break it down.

Importing Framer Motion: motion is an API provided by framer-motion that supercharges a normal JSX element(div, h1, span, you name it:)), giving us a lot more props to work with.
Defining Variants: This is the actual magic that makes the stuff do weird things. Here, we are making a variable named marqueeVariants (you can name it anything) and we are describing a property named animate (again, name it whatever you like) that does all the jazz.
x: [0, -1035] → will translate the element from 0 to -1035px
Below this, we are defining the way we want our little element to translate, i.'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/5xTfIV3oghXjitvgZ6pk1l/0e10c5a7d7ae7a0faab6552cccbee2c3/Screenshot_2021-07-17_101123.png'
publish_status: 'published'
---

This is called a "marquee" and apparently, I needed one for my portfolio website. So, I thought I might as well share it with you all!

In this blog, we'll create an infinitely running long text (that seems to be very trendy lately) using [Framer Motion](https://www.framer.com/motion/) and obviously react!

[Live Link](https://corhc.csb.app/)

[Code Sand Box](https://codesandbox.io/s/holdmypotion-marquee-corhc)

[Github Repo](https://github.com/holdmypotion/marquee)

# Setup

Run the following commands to set up a react app.

```powershell
npx create-react-app marquee
cd marquee
npm i framer-motion
npm start
```

# Final File Structure

`src/`
![Final file structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h2fdu1kl5f9rs4sqmfq1.png)

# Marquee.css

Create a file `src/components/marquee.css` and paste the code below

```css
.marquee {
  position: relative;
  width: 100vw;
  max-width: 100%;
  height: 206px;
  overflow-x: hidden;
}

.track {
  position: absolute;
  white-space: nowrap;
}

.track > h1 {
  margin: 20px 0;
  font-size: 8rem;
  font-family: Antonio;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #f4955c;
  text-transform: uppercase;
}
```

# Marquee.js

Create a file `src/components/marquee.js` and paste the code below.

```jsx
import React from 'react';
// 1. Importing framer-motion
import { motion } from 'framer-motion';

import './marquee.css';

// 2. Defining Variants
const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 5,
        ease: 'linear',
      },
    },
  },
};

const Marquee = () => {
  return (
    <div>
      <div className='marquee'>
        {/* 3. Using framer motion */}
        <motion.div
          className='track'
          variants={marqueeVariants}
          animate='animate'
        >
          <h1>
            Let's Work Together. Let's Work Together. Let's Work Together. Let's
            Work Together. Let's Work Together. Let's Work Together. Let's Work
            Together
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
```

Let's break it down.

1. Importing Framer Motion:
   `motion` is an API provided by framer-motion that supercharges a normal JSX element(div, h1, span, you name it:)), giving us a lot more props to work with.
2. Defining Variants:
   This is the actual magic that makes the stuff do weird things.
   Here, we are making a variable named `marqueeVariants` (you can name it anything) and we are describing a property named `animate` (again, name it whatever you like) that does all the jazz. - `x: [0, -1035]` → will translate the element from `0` to `-1035px` - Below this, we are defining the way we want our little element to translate, i.e. the `transition`. - `repeatType: "loop"` → makes the translation go again and again, i.e. in a loop - `repeat: Infinity` → makes the loop go infinite times - `duration: 5` → time taken to complete the transition/loop. - `ease: "linear"` → makes the speed of translation equal throughout its course.
3. Apply `motion` and the variants on an element:
   - Set the `variants` property to the name of the variable defined, in our case `marqueeVariants`
   - Set the `animate` property to the name of the property defined in the `marqueeVariants`, in our case `animate`
     (AS A STRING)

# App.js

We just need to add this in our App.js and admire it while it rolls.

```jsx
import './App.css';
import Marquee from './components/marquee';

function App() {
  return (
    <div className='App'>
      <Marquee />
    </div>
  );
}

export default App;
```

Oh, I almost forgot. The font.

Here, paste this code in index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;500;600;700&display=swap');
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', 'Antonio', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #2e2e2e;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

### Thank you so much for reading

Leave your review down below.
Later.
