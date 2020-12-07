At this point, for increased predictability, we want to create a collection of all possible events that can occur in our application which will update the state. In order to represent these events,we’ll use plain old JavaScript objects but re-brand them as “actions”.

Actions are payloads of information that send an instruction on what type of transformation to make to your application’s state as well as any other relevant information. That’s basically a fancy way of saying “an action is an object which describes what sort of transformation you want to make to your state”. An object makes up a perfect data structure for an action since it can perfectly describe the type of event which occurred in your application.

Let’s check out what a typical action might looks like

const action = {
type: 'LIKE_TWEET',
id: 950788310443724800,
uid: 'tylermcginnis'
}
Well, that’s anticlimactic. As mentioned above, an action is just an object which describes some action (or event) that can occur in your application. Note that actions must have a type property to specify, well, the “type” of action which is occurring. Other than type' the structure of the action is up to you.

In short, actions are represented as objects which hold the information/any relevant information that needs to be made to the apps state.
