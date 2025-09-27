1. What is JSX, and why is it used?
JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It is used in React to describe the UI structure, making it easier to visualize and manage components.
2. What is the difference between State and Props?
State: Data specific to a component that can change over time and is mutable.
Props: Data passed from a parent component to a child component, which is read-only and immutable within the child.
3. What is the useState hook, and how does it work?
useState is a React hook that allows functional components to manage state. It provides a state variable and a function to update its value, making components interactive.
4. How can you share state between components in React?
State can be shared by lifting it to a common parent component and passing it down as props. Alternatively, state management tools like Redux or Context API can be used for global state sharing.
5. How is event handling done in React?
Event handling in React involves using event props like onClick, onChange, etc., which are passed to JSX elements. React handles events through a synthetic event system, offering a consistent interface across browsers.