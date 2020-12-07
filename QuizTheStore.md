// What are the benefits of putting your state into a single state tree?

- Shared cache
- Predictable state changes
- Improved developer tooling
- pure functions
- server rendering

What makes up the 'store'?

- The state tree
- a way to get state from the state tree getState()
- a way to listener to updates on the state tree subscribe()
- a way to update the state tree dispatch()

What does createStore return?

- An object with three properties, getState, subscribe, dispatch

What is an action?

- An object which describes what sort of transformation you want to make to your state.

What is an action creator?

- A function that returns an action.
