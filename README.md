# Simple React Scoreboard & Timer

This is a very simple SPA for keeping scores and a slightly less simple stopwatch. Derived from the Treehouse [React Basics](https://teamtreehouse.com/library/react-basics) and [Setting up Webpack for React](https://teamtreehouse.com/library/setting-up-webpack-dev-server) courses.

## Redux Stuff

### Redux - Player Data

Bind actionCreators to components that need to inform Redux of a state change request needPackage action creators in ready-to-use fashion.  Can be seen at front of `render()` inside the `Scoreboard` component. Files that are tied into Redux are:


* `Scoreboard`
* `AddPlayerForm`
* `Player`

### File Structure for this one

Each is tied directly to player data. The Redux logic can be found in:

```
src/
	actions/ 
	 	player.js
	actiontypes/
	 	player.js
	reducers/
	 	player.js
	containers/
	 	Scoreboard.js
	components/
	 	AddPlayerForm.js
	 	Counter.js
		Player.js
```

### File Structure for this one
We're going to chain together some exports first. 

~~` export default class className extends Component {};`~~ becomes: 

`class className  extends Component {}` and we move our export to include the `connect(action)(Component)` We'll end up with something like this:

```
const mapStateToProps = state => ({
	players: state
});
export default connect(mapStateToProps)(Scoreboard);

```

### Refactor methods to be Reduxyish
Rework the **`Scoreboard`** container component from the `render()` method. Replace the self referencing functions like `onChange()` and `onAdd()` to Redux dispatchers.

We're going to remove the self referencing functions from the component. The ones that look like this:

Methods looked like this *before*:

```babel
onScoreChange = (index, delta) => {
	this.state.players[index].score += delta;
	this.setState(this.state);
  };
```

...and after it's more like this :

```babel
const { dispatch, players } = this.props;
const updatePlayerScore = bindActionCreators(
	PlayerActionCreators.updatePlayerScore, 
	dispatch
);
```

Before, player components were the subject of some inline logic.

```
{this.state.players.map(function(player, index) {
 return (
   <Player
     name={player.name}
     score={player.score}
     key={player.name}
     onScoreChange={(delta) => this.onScoreChange(index, delta)}
     onRemove={() => this.onRemovePlayer(index)}
   />
 );
}.bind(this))}
```
#### Now, playerComponent is an object
```
const playerComponents = players.map((player, index) => ( 
  <Player 
    index={index}
    name={player.name}
    score={player.score}
    key={player.name}
    updatePlayerScore={updatePlayerScore}
    removePlayer={removePlayer}
  />
));
```

Here we bind the container back to the Redux action lifecycle.
