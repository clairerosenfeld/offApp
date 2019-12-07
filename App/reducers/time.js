const time = (state = 0, action)=>
{
	switch(action.type){
		case 'UPDATE_TIME':
			console.log(JSON.stringify(action))
			return {
				min: action.time.min,
				hour: action.time.hour
			}
				

		default:
			return state
	}
}

export default time