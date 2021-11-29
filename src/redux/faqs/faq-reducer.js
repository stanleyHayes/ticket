import {FAQ_ACTION_TYPES} from "./faq-action-types";

const INITIAL_STATE = {
    categories: [],
    faqs: [],
    faqLoading: false,
    faqError: null
}

const faqReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case FAQ_ACTION_TYPES.GET_FAQ_CATEGORIES_REQUEST:
            return {
                ...state,
                faqLoading: true,
                faqError: null
            }

        case FAQ_ACTION_TYPES.GET_FAQ_CATEGORIES_SUCCESS:
            return {
                ...state,
                faqLoading: false,
                faqError: null,
                categories: action.payload
            }
        case FAQ_ACTION_TYPES.GET_FAQ_CATEGORIES_FAIL:
            return {
                ...state,
                faqLoading: false,
                faqError: action.payload,
                categories: []
            }

        case FAQ_ACTION_TYPES.GET_FAQS_REQUEST:
            return {
                ...state,
                faqLoading: true,
                faqError: null
            }

        case FAQ_ACTION_TYPES.GET_FAQS_SUCCESS:
            return {
                ...state,
                faqLoading: false,
                faqError: null,
                faqs: action.payload
            }
        case FAQ_ACTION_TYPES.GET_FAQS_FAIL:
            return {
                ...state,
                faqLoading: false,
                faqError: action.payload,
                faqs: []
            }
        default:
            return state;
    }
}

export const selectFAQs = state => state.faqs;

export default faqReducer;
