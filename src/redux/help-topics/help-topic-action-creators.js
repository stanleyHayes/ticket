import {TICKET_ACTION_TYPES} from "../tickets/ticket-action-types";
import axios from "axios";
import {CONSTANTS} from "../../constants/constants";

const getHelpTopicsRequest = () => {
    return {
        type: TICKET_ACTION_TYPES.CREATE_TICKET_REQUEST
    }
}

const getHelpTopicsSuccess = data => {
    return {
        type: TICKET_ACTION_TYPES.CREATE_TICKET_SUCCESS,
        payload: data
    }
}

const getHelpTopicsFail = message => {
    return {
        type: TICKET_ACTION_TYPES.CREATE_TICKET_FAIL,
        payload: message
    }
}

const getHelpTopics = (ticket) => {
    return async dispatch => {
        try {
            dispatch(getHelpTopicsRequest());
            const response = await axios({
                url: `${CONSTANTS.SERVER_BASE_URL}/gettopicsproxy.php`,
                method: 'POST',
                headers: {
                    APIKEY: process.env.REACT_APP_APIKEY
                },
                data: ticket
            });
            const {data} = response.data;
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
