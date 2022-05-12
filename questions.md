1. What is the difference between Component and PureComponent? give an example where it might break my app.

`PureComponent` and `Component` are similar, both used to define components. However, `PureComponent` internally implements the `shouldComponentUpdate` method, that is, when detected a change in `state` or `props` a **shallow comparison** will be performed deciding whether or not the component should be re-rendered.

A problem we might have when using `PureComponent` would be to mutate the `props` or `states` instead of generating a **new reference**. As `PureComponent` does a shallow comparison the content change will never be detected.

As in the example below, instead of generating a new Array every interval, we are just changing the `Array` content and never the reference, then creating a bug where only an empty `Array` is printed instead of: `[0, 1, 2, 3 , 4...]`

```js
import * as React from 'react';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      items: [],
    };

    this.intervalId = null;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.state.items.push(this.state.count);
      const items = this.state.items;
      this.setState((prevState) => ({
        items,
        count: prevState.count + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <Numbers numbers={this.state.items} />;
  }
}

class Numbers extends React.PureComponent {
  render() {
    return <div>{JSON.stringify(this.props.numbers)}</div>;
  }
}
```

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

   Because if within a component tree some component decides not to render, the children of that component can work with inconsistent context values.

3. Describe 3 ways to pass information from a component to its PARENT.

   1- With callback function. Where a function is passed from parent to child where the child executes the function by passing some parameter back.
   
   2- With Context API we can place components inside a Context Provider and from there we can access any data in any component.
   
   3- There are also several libraries for global state management, where in any part of the system we have only a single data source of truth, which can be accessed from any component.

4. Give 2 ways to prevent components from re-rendering.

   We can use `React.memo(YourComponent)` and `React.PureComponent`.

5. What is a fragment and why do we need it? Give an example where it might break my app.

   `React.Fragment` is used to encapsulate multiple components avoiding the creation of an unwanted `HTML` tag.

```js
export function MyComponent() {
  return (
    <React.Fragment>
      <One />
      <Two />
      <Three />
    </React.Fragment>
  );
}

export function App() {
  <div style={{ display: "flex", justifyContent: "space-between" }}>
	  <MyComponent />
	  <OtherComponent />
  </div>
}
```

Imagine in the example above where instead of `React.Fragment` it was a `<div />` and a developer decided to replace this `<div />` with a `React.Fragment`. From this change a bug was created in the layout of the `<App />` component as it depended on the `<div />` to correctly render the layout along with the flex styles.

6. Give 3 examples of the HOC pattern.

```js
// example 1
function WithAuthentication(Component) {
  return function (props) {
    if (props.isAuthenticated) {
      return <Component {...props} />;
    }
    return <p>do login</p>;
  };
}

// example 2
function WithIncrementer(Component) {
  return function (props) {
    return (
      <div>
        The value was {props.value}
        <Component {...props} value={props.value + 10} />
      </div>
    );
  };
}

// example 3
function WithLoading(Component) {
  return function (props) {
    if (props.isLoading) {
      return <p>loading</p>;
    }
    return <Component {...props} />;
  };
}
```

7. what's the difference in handling exceptions in promises, callbacks and async...await.

   Using `Promise` you can handle the exceptions with the `.catch` method.

   Using `async await` you can handle the exceptions using `try {} catch`.

   Using `callback` you can pass a function that should be executed if something goes wrong.

   For example:

   ```js
   readFile('file.txt', function (error) {
     if (error) {
       console.error('Failed to read file');
     }
   });
   ```

8. How many arguments does setState take and why is it async.

   `setState` can receive two arguments: the state and the callback;

   With `setState` being asynchronous we can handle multiple `setState` in batch improving performance and also helps consistency as input of props is asynchronous.

   The callback function can be used to execute something once `setState` is completed and the component is re-rendered.

   For example:

   ```js
   this.setState({ age: 10 }, () => {
     console.log(this.state.age);
   });
   ```

9. List the steps needed to migrate a Class to Function Component.

   1- Replace the `class` structure with a `function`
   
   2- Remove the `constructor`
   
   3- Replace the `this.state` to `React.useState` hook
   
   4- Remove all references to `this`
   
   5- Convert all `class` methods to `functions`
   
   6- Migrage the lifecycle methods to `React.useEffect` hook
   
   7- Remove the `render` method and `return` the component

10. List a few ways styles can be used with components.

    1. You can write CSS inline, for example:
       `<button style={{ background: 'red' }}>hi!</button>`

    2. You can use CSS classes from a `.css` file:

       ```js
       // button.css
       .button {
           background: red;
       }

       // button.js
       <button className="button">hi!</button>
       ```

    3. You can use "CSS-in-JS" from a third party library such as `styled-components`:

    ```js
    const Button = styled.button`
      background: red;
    `;

    <Button>Hi!</Button>;
    ```

    4- You can also use CSS preprocessor like `Sass`, `LESS` and `Stylus`.

11. How to render an HTML string coming from the server.

    You can render using `dangerouslySetInnerHTML`
