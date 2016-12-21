import * as PlayerActionTypes from '../actiontypes/player';

const initialState = [
	{
		name: 'Jim Hoskins',
		score: 331,
	},
	{
		name: 'Andrew Chalkley',
		score: 420,
	},
	{
		name: 'Alena Holligan',
		score: 50,
	},
];

export default function Player(state=initialState, action) {
	switch(action.type) {
		case PlayerActionTypes.ADD_PLAYER:
		return [
			...state,
			{
				name: action.name,
				score: 0
			}
		];

		case PlayerActionTypes.REMOVE_PLAYER:
		return [
			...state.slice(0, action.index),
			...state.slice(action.index + 1)
		];

		case PlayerActionTypes.UPDATE_PLAYER_SCORE:
			return state.map((player,index) => {
				if(index === action.index) {
					return {
						...player,
						score: player.score + action.score
					};
				}
				return player;
			});

		default:
			return state;
	}
}