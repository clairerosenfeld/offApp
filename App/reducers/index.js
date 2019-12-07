import {combineReducers} from 'redux'
import activities from './activities.js'
import time from './time.js'

export default combineReducers({
	activities: activities,
	time: time,
})