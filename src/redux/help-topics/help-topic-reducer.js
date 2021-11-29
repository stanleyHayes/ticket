import {HELP_TOPICS_ACTION_TYPES} from "./help-topic-action-types";

const INITIAL_STATE = {
    helpTopics: [],
    helpTopicsLoading: false,
    helpTopicsError: null
}

const helpTopicsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case HELP_TOPICS_ACTION_TYPES.GET_HELP_TOPICS_REQUEST:
            return {
                ...state,
                helpTopicsLoading: true,
                helpTopicsError: null
            }

        case HELP_TOPICS_ACTION_TYPES.GET_HELP_TOPICS_SUCCESS:
            return {
                ...state,
                helpTopicsLoading: false,
                helpTopicsError: null,
                helpTopics: action.payload
            }
        case HELP_TOPICS_ACTION_TYPES.GET_HELP_TOPICS_FAIL:
            return {
                ...state,
                helpTopicsLoading: false,
                helpTopicsError: action.payload,
                helpTopics: []
            }
        default:
            return state;
    }
}


export default helpTopicsReducer;
