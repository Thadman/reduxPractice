// Library Code

function createStore(reducer) {
  // have four parts
  // 1.the state
  // 2.a way to get the state
  // 3.a way to listen to the state
  // 4. a way to update the state

  // when you invoke createStore, will get an object representing the store, and the public facing API for our store with be the 3 methods.

  // have some internal state for the store to modify and access, which is local to this function
  let state;
  // have an array for the functions to be pushed into
  let listeners = [];

  // a function to get the state
  const getState = () => state;
  // a function to subscribe the listening of the state changes, and when the callback function is passed in we push it into the listeners array and then return the listeners array having filtered out the function that was passed in, so a user can 'unsubscribe' from a function. will receive a callback function from when subscribe is invoked, will use this as callback function, push onto the array of functions (user can call subscribe as many times as they want). if the user calls the function that is passed to them when they called subscribe it will remove the initial function that was passed to them when the first invoked subscribe.
  // subscribe to listen to the state changes.

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // dispatch method will change the state of the app. the method takes in an action and has access to the state with function scope, first goes to the reducer function that has been passed into the store, and use the state, which will be an empty array if undefined, and then use the action that the reducer function is, and return a brand new copy of the state by using concat(). Then can loop over the listeners array and let them know that the state has been updated and do this by invoking each listener with a forEach, uses the listeners method, and if the user invokes the unsubscribe method, the state will not be updated with a 'todos' and will not change the state onn the store for the type: 'TODO'.

  // So, when the state changes we're looping through all the listeners and invoking them so they know the state has changed.

  // dispatch is responsible to update the state predictable, by using the pure function (todos/ reducer function).

  const dispatch = (action) => {
    // call todos/reducer function
    state = reducer(state, action);
    // loop over listeners and invoke them
    listeners.forEach((listener) => listener());
  };

  // return an object with the getState method on it, so when a user creates a brand new store they have a way to get access to the internal state, by calling the getState method.
  return {
    getState,
    subscribe,
    dispatch,
  };
}

// ACTIONS THAT YOU CAN USE
// {
//   type: 'ADD_TODO',
//   todo: {
//     id: 0,
//     name: 'Learn Redux',
//     complete: false,
//   }
// }

// {
//   type: 'REMOVE_TODO',
//   id: 0,
// }

// {
//   type: 'TOGGLE_TODO',
//   id: 0,
// }

// {
//   type: 'ADD_GOAL',
//   goal: {
//     id: 0,
//     name: 'Run a marathon'
//   }
// }

// {
//   type: 'REMOVE_GOAL',
//   id: 0,
// }

// when the state in the store changes we need to call any of the functions that were passed to our subscribe methods. user can call store.subscribe as many times as they want, need to keep track of any time the user calls store.subscribe and keep track of the functions, so any time the state changes we can go through the functions and invoke each of them.

// want to give them the option to unsubscribe from the function, want to return a function that when called unsubscribes that particular function from listening to any state changes.

// 1.pure functions always return the same result if the same arguments are passed in.
// 2. they depend ony on the arguments passed into them, return value is determined by the input values and nothing else.
// 3. never produce any side effects. no interaction with the outside world. No DOM interaction, no AJAX requests etc.

// our function will take in the current state of our store and the action that has just occurred and will return us the new state based off that action.

// when the todo function is invoked it will take the current state of our store, and use concat() as that doesn't directly mutate state, and add to the todos list.

// the function is responsible for returning the next state of our application.  Have state = [], so that if it is the first action passed in, it will still run and not error out as undefined. So the function is passed the state of the store and the very first time this happens  we have the state set as undefined in the store, so we'll use es6 default parameters to set the initial state. So if the state is undefined, set it to [], and the we can do .concat() on it without it erroring out.

// the function will give us back the new state of the store.
// reducer function for the function(store) below
// community standard to use switch statement, reducer functions get very big and this is prettier.

// use Object.assign to pass in the todo (which may have different properties, so wont brek with Object.assign) and only change the complete to be the opposite of what it was. Object.assign allows us to merge objects together , so we pass in a new object and and merge it with the todos object, except for the complete, and make it the opposite to what it was. Now this won't break if we modify todos.

// create constants that are holding the values of the switch statements, just to made the code cleaner, and less finicky not with string comparisons.

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// these are actions creators, having a function for each action so we can just pass into the dispatch the actual event and not have to list the action everytime.

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

// these are reducer functions.

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.todo]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

// a reducer function that can have multiple actions on it, and then we can pass to the createStore function. Here we are passing the todos function as property and the todos part of the state and the action, as well as the goal portion of the state, as well as the action. the first time the app component is invoked the state will be undefined and so need to use es6 default parameter again and pass in an empty object so the component doesn't break. The reducer functions are now just sections of the state being passed into the store as opposed to the whole thing when we were using arrays, object being passed in with properties which are the invoked reducer functions with their portion of the state and also their action.

// this function is the app reducer or the root reducer.

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

// can create store like this, this should have 3 methods on it, getState, subscribe, dispatch, calling store.getState() = undefined as the store is initially set to nothing and getState returns the state. Set up a listener using subscribe to console.log('this message') so we are aware when the state changes. *****  const unsubscribe = store.subscribe(() => {console.log('this message', store.getState() }) ****,  and remember that subscribe will return us a function that when invoked will allow us to unsubscribe.

// so when unsubscribe is invoked **** , in this case the state will not change and there the console.log will not appear, as the listener has not been invoked and the console.log will not appear.

// need to create a collection of rules that will change the state of our app, in this case of a todo list we want to have a collection of events that can occur that would change the state of our store. We can use an object with a 'type' property which describes the events taking place that change the state of the store. we can call this an action.

// By doing this we know that if the store changes, we know that it had to be one of these events.
// We now have a list of events that are going to change the state in the app of ur store.

// actions are below, these are the types of events which will change the state of out store.

// the reducer parameter passed in here is the todos/goals function. (Normally in another file), calling this will get the new state of our store.
// passing the createStore function reducer as the app reducer, which is an object with properties of other reducer functions.

const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

// now when using action creators the code goes from this to...
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Walk the dog",
    complete: false,
  },
});

// to this, complete code in index.js, applies to all actions, remove etc.
store.dispatch(
  addTodoAction({
    id: 0,
    name: "walk the dog",
    complete: false,
  })
);
