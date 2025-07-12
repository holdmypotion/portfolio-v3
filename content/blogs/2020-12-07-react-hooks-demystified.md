---
title: 'React Hooks Demystified'
date: '2020-12-07'
tags: ['react', 'webdev', 'javascript', 'tech']
slug: 'react-hooks-demystified'
description: 'In React, sharing functionalities across components without data coupling (sharing of unnecessary data or state across components) is done using hooks.

When a component uses a hook, it takes an independent copy of that functional logic.
Hence, two components using the same hook, have absolutely no idea about each other.'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/4ILybpQ4a6Q11MesM3r6Wv/d32de2463efaf00461f801c58050ecfd/react_hook_demystified.png'
---

In React, sharing functionalities across components without data coupling (sharing of unnecessary data or state across components) is done using hooks.

When a component uses a hook, it takes an independent copy of that functional logic.
Hence, two components using the same hook, have absolutely no idea about each other.

# useState()

A simple function that is used to preserve certain values from getting refreshed on each render cycle.

```jsx
const [stateName, setStateName] = useState(initialState)
// initialState could be anything: null, [/*Array*/], {/*Object*/}, etc.
```

It takes the initial state as argument and returns an array, having the first element as the state and second as a setter function to change the state.

# useEffect()

```jsx
useEffect(() => {
    // Statements to execute
    return () => {
      // Statements to clean up the not needed logic
    };
  }, [/*state on which the execution depends*/]);
```

Very crucial hook that is highly modifiable. Used to execute some statements (logic), if particular state changes.

Also returns a clean up function, that runs before the next useEffect() call.
It is a brillant way, to clear up running logic defined in the useEffect() call, that is not needed anymore and also cluttering up space.

```jsx
useEffect(() => {
    const timer = setTimeout(() => {
      /* Some Logic */
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
			/* clearing the timer */
    };
  }, []);
```

# useCallback()

Limited to certain use cases but still handy if you know.
It is used to protect a function from being created again on re-render.
On each render the whole business logic in react components is created again. But to save a function from being created again wrap useCallback() around it.

```jsx
const functionName = useCallback(() => {
	/*Function Body*/
}, [])
```

It takes in 2 argument, first being the function and second a list of dependencies on which the recreation of the function depends.

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

One potential use case:
If you have a function call in the useEffect() hook that changes the state, that means on each useEffect() execution the function is called and the state changes, that state change further triggers re-rendering of the components (hence, recreating the function), that further causes the useEffect() hook to execute again. This is go on for eternity, and you'll be stuck in an infinite loop.

Hence use useCallback, and save the function from recreation.

# useMemo()

```jsx
useMemo(()=>{/*function*/}, [/*List of dependencies*/])
```

Memoisation in Computer Science means optimizing a computer program by storing the results of expensive function calls and returning the cached result if the input is same.

As the name suggests, useMemo() kind of does the same thing.
One thing to note is that useCallback() holds a function and useMemo() holds a value.
So you would use it somewhat like this

```jsx
const productList = useMemo(() => {
    return (
      <ProducttList
        products={products}
      />
    );
  }, [products]);
```

This saves the "ProductList" component from unnecessary re-renders.

**Just a suggestion!!**
useMemo() and useCallback() are hooks used for optimization and you can very well work without them. So focus on writing the app and later dive into optimizations. 

# useRef()

I don't know why but for some reason I couldn't ever understand this hook.
But this is probably the simplest.

This is just a react way of saying

```jsx
document.querySelector("whateverElement");
```

right right!! This is so straight forward.

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef();
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### When to useRef():

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

# useReducer()

```jsx
const [stateName, dispatch] = useReducer(reducerName, initialState)
```

It takes in two arguments:

1. a reducer (We'll come to this later) 
2.  initial state

And returns an array with two elements

1. state 
2. dispatcher

If you have any idea about redux, this would be a piece of cake.

useReducer() works just like useState(), but it just separates the business logic from state updation logic. In useState() we are used to writing complex algorithm right in the function and then updating the state, but in useReducer() we have a separate code block where all the state updation logic goes.

We access the state just like any normal state but to make changes to that state we do something and that is called as "dispatching an action".

When we dispatch an action we, basically ask the reducer to execute particular "type" of updation.

```jsx
const filteredIngredientsHandler = (filteredIngredients) => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  };
```

"dispatch" takes in an object where the "type" attribute describes the type of updation and other attributes depending upon the need of the updation.

Now, let's check the reducer. 

It takes in two argument,

1. current state,
2. action.

The body of the reducer generally have a switch case statement that checks the "type" of action. Each case execute some statements that updates the state in some ways.

```jsx
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
```

So useReducer() does the same thing as useState() (Holding the state and updating it), but does that in a more elegant and explicit way.
This lets you separate the business logic and different types of state updation logic. 

# useContext()

YOU NEED TO KNOW CONTEXT API BEFORE THIS!!

This is a brilliant hook that lets you use the features of context api within react functional components.

Takes in one argument (the defined Context), and returns a state.
Use the state to access the elements within.

```jsx
import { AuthContext } from './context/auth-context';

const App = props => {
  const authContext = useContext(AuthContext);
/* Now you can access the state in the AuthContext using the variable authContext */
```

### Thank you for reading!
Leave you views.