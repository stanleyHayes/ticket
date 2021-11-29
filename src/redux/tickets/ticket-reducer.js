import {TICKET_ACTION_TYPES} from "./ticket-action-types";

const INITIAL_STATE = {
    ticketInfo: null,
    ticketLoading: false,
    ticketError: null,
    token: null
}

const ticketsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case TICKET_ACTION_TYPES.CREATE_TICKET_REQUEST:
            return {
                ...state,
                ticketLoading: true,
                ticketError: null
            }

        case TICKET_ACTION_TYPES.CREATE_TICKET_SUCCESS:
            return {
                ...state,
                ticketLoading: false,
                ticketError: null,
                token: action.payload
            }
        case TICKET_ACTION_TYPES.CREATE_TICKET_FAIL:
            return {
                ...state,
                ticketLoading: false,
                ticketError: action.payload,
                token: null
            }

        case TICKET_ACTION_TYPES.GET_TICKET_REQUEST:
            return {
                ...state,
                ticketLoading: true,
                ticketError: null
            }

        case TICKET_ACTION_TYPES.GET_TICKET_SUCCESS:
            return {
                ...state,
                ticketLoading: false,
                ticketError: null,
                ticketInfo: action.payload
            }
        case TICKET_ACTION_TYPES.GET_TICKET_FAIL:
            return {
                ...state,
                ticketLoading: false,
                ticketError: action.payload,
                ticketInfo: null
            }
        default:
            return state;
    }
}


export default ticketsReducer;
