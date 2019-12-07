import {ADD_ACTIVITY, UPDATE_TIME} from './actionTypes.js'

export function addActivity(card){
	type: ADD_ACTIVITY,
	card
}

export function updateTime(time){
	type: UPDATE_TIME,
	time
}
