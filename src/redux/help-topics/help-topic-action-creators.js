import {HELP_TOPICS_ACTION_TYPES} from "./help-topic-action-types";
import axios from "axios";

const getHelpTopicsRequest = () => {
    return {
        type: HELP_TOPICS_ACTION_TYPES.GET_HELP_TOPICS_REQUEST
    }
}

const getHelpTopicsSuccess = data => {
    return {
        type: HELP_TOPICS_ACTION_TYPES.GET_HELP_TOPICS_SUCCESS,
        payload: data
    }
}

const getHelpTopicsFail = message => {
    return {
        type: HELP_TOPICS_ACTION_TYPES.GET_HELP_TOPICS_FAIL,
        payload: message
    }
}

const getHelpTopics = () => {
    return async dispatch => {
        try {
            dispatch(getHelpTopicsRequest());
            const response = await axios({
                url: `/gettopicsproxy.php`,
                method: 'POST',
                headers: {
                    APIKEY: process.env.REACT_APP_APIKEY
                }
            });
            const {data} = response;
            dispatch(getHelpTopicsSuccess(data));
        }catch (e) {
            const error = e.response.data;
            dispatch(getHelpTopicsFail(error));
        }
    }
}

export const HELP_TOPIC_ACTION_CREATORS = {
    getHelpTopics
};
