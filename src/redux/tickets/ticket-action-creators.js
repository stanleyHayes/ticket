import {TICKET_ACTION_TYPES} from "./ticket-action-types";
import axios from "axios";
import {CONSTANTS} from "../../constants/constants";

const createTicketRequest = () => {
    return {
        type: TICKET_ACTION_TYPES.CREATE_TICKET_REQUEST
    }
}

const createTicketSuccess = data => {
    return {
        type: TICKET_ACTION_TYPES.CREATE_TICKET_SUCCESS,
        payload: data
    }
}

const createTicketFail = message => {
    return {
        type: TICKET_ACTION_TYPES.CREATE_TICKET_FAIL,
        payload: message
    }
}

const createTicket = (ticket) => {
    return async dispatch => {
        try {
            dispatch(createTicketRequest());
            const response = await axios({
                url: `${CONSTANTS.SERVER_BASE_URL}/createticketproxy.php`,
                method: 'POST',
                headers: {
                    APIKEY: process.env.REACT_APP_APIKEY
                },
                data: ticket
            });
            const {data} = response.data;
            dispatch(createTicketSuccess(data));
        }catch (e) {
            const error = e.response.data;
            dispatch(createTicketFail(error));
        }
    }
}


const getTicketInfoRequest = () => {
    return {
        type: TICKET_ACTION_TYPES.GET_TICKET_REQUEST
    }
}

const getTicketInfoSuccess = data => {
    return {
        type: TICKET_ACTION_TYPES.GET_TICKET_REQUEST,
        payload: data
    }
}

const getTicketInfoFail = message => {
    return {
        type: TICKET_ACTION_TYPES.GET_TICKET_REQUEST,
        payload: message
    }
}

const getTicketInfo = (token) => {
    return async dispatch => {
        try {
            dispatch(getTicketInfoRequest());
            const response = await axios({
                url: `${CONSTANTS.SERVER_BASE_URL}/getticketinfoproxy.php`,
                method: 'POST',
                headers: {
                    APIKEY: process.env.REACT_APP_APIKEY
                },
                data: token
            });
            const {data} = response.data;
            dispatch(getTicketInfoSuccess(data));
        }catch (e) {
            const error = e.response.data;
            dispatch(getTicketInfoFail(error));
        }
    }
}


export const TICKET_ACTION_CREATORS = {createTicket, getTicketInfo};
