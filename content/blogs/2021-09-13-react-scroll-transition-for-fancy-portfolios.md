---
title: 'React: Scroll Transition for Fancy Portfolios'
date: '2021-09-13'
tags: ['react', 'javascript', 'webdev', 'design', 'tech']
slug: 'react-scroll-transition-for-fancy-portfolios'
description: 'I saw this fancy scrolling effect on this website and it just blew my mind. I thought of recreating it and got somewhat successful :)

BTW, surely check this portfolio website by Ilya Kulbachny.'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/3IgpZdgAy9iRlgMTysNZ9m/31f89b625a6f439a828907faf298ac8e/header.jpg'
publish_status: 'published'
---

I saw this fancy scrolling effect on this [website](https://kulbachny.com/) and it just blew my mind. I thought of recreating it and got somewhat successful :)

BTW, surely check this [portfolio website](https://kulbachny.com/) by [Ilya Kulbachny](https://twitter.com/ikulbachny).

[Live Link](https://pt7c5.csb.app/)

[Code Sand Box](https://codesandbox.io/s/react-scroll-transition-for-fancy-portfolios-pt7c5)

[Github Repo](https://github.com/holdmypotion/scroll-transition)

# Setup

Run the following commands to have an initial setup to work on.

```powershell
git clone https://github.com/holdmypotion/scroll-transition.git
cd scroll-transition
git checkout starter
yarn
yarn start
```

# Final File Structure

![Final File Structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgg4vfr7lurf85cfy7wc.png)

# heroSection.js

Let's start with the hero section. We'll be using `framer-motion` to animate the image on scroll.

Copy paste this code in `src/components/heroSection.js`

```jsx
import React from 'react';
// 1.
import { motion, useViewportScroll, useTransform } from 'framer-motion';

import styles from '../styles/heroSection.module.css';
import heroImage from '../assets/images/5.jpeg';

export default function HeroSection({ offset = 1500 }) {
  // 2.
  const { scrollY } = useViewportScroll();
  // 3.
  const scale = useTransform(scrollY, [0, offset], [1, 5]);
  const opacity = useTransform(scrollY, [0, offset], [3, 0]);
  const moveDown = useTransform(scrollY, [0, offset], [0, -1000]);

  return (
    <>
      <div className={styles.imageContainer}>
        {/* 4. */}
        <motion.img
          src={heroImage}
          alt='Model'
          style={{
            opacity: opacity,
            scale: scale,
            y: moveDown,
          }}
        />
      </div>
      {/* 5. */}
      <div style={{ background: '#030303', height: `${offset}px` }}></div>
      <div style={{ background: '#030303', height: '80vh' }}></div>
    </>
  );
}
```

Let's break it down:

1. Here we import all the sass we need from framer motion
   1. [motion](https://www.framer.com/docs/component/): Grants a normal JSX element super powers (extra props to work with framer motion API)
   2. [useViewportScroll](https://www.framer.com/docs/motionvalue/#useviewportscroll): Can be used to track the position of the scroll.
   3. [useTransform](https://www.framer.com/docs/motionvalue/###usetransform): Can be used to change the value of a variable based on a changing value of another variable. (by default: the change is linear)
2. We are using the `useViewportScroll` hook to get the vertical scroll distance in pixels
3. Using the `useTransform` hook to change the value of 3 variables, `scale`, `opacity`, and `moveDown` based on the `scrollY`
4. Here we pass the dynamic values to the `styles` prop of the motion component.
5. Lastly, we are adding this empty div of height equal to the total scrolling area we set. This allows us to scroll as the above `imageContainer` is set to`position: fixed`

### Thank you for reading!

[Live Link](https://pt7c5.csb.app/)

[Code Sand Box](https://codesandbox.io/s/react-scroll-transition-for-fancy-portfolios-pt7c5)

[Github Repo](https://github.com/holdmypotion/scroll-transition)
