const activities = (state = [], action)=>
{
	switch(action.type){
		case 'ADD_ACTIVITY':
			return [
				...state, {
					name: action.card.name,
					emoji: action.card.emoji
				}
			]
		default:
			return state
	}
}

export default activities