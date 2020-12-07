action creators return different actions, and actions are object representation of different events that can occur in your application.can add properties to these objects to go along with the actions that are occurring, and the property is the specific action, ie a item to a list.

reducers are responsible for taking in the current specific portion of state, and the specific action that was dispatched to go along with it, and then depending on that action will return a brand new state from that action. cannot modify state directly, reducers are pure functions, need a new array returned.

have a root reducer, using combineReducers, and the root can take all the reducer functions and pass them in as one.

Store will be an object with 3 properties on it, subscribe, dispatch and getState. store is responsible for 4 things, holding the state, getting the state, notifying when the state updates, updating the state.

When we want to update state, we use store.dispatch() and pass it the specific action that was occurring, we wrapped them in action creators, so we invoke the action creator and that returns us the action object, which lets Redux know that an action has occurred, which then goes through all the reducers and see if the state will change due to the action that has just happened and when it matches will return a brand new portion of the state for that portion of the state. If there are no changes it will return the state as it was originally.

when you dispatch, Redux will go through all the reducers to return a brand new portion of the state, and if if doesn't match will return the state the same.
