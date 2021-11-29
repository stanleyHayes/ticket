import {FAQ_ACTION_TYPES} from "./faq-action-types";
import axios from "axios";

const getFAQCategoriesRequest = () => {
    return {
        type: FAQ_ACTION_TYPES.GET_FAQ_CATEGORIES_REQUEST
    }
}

const getFAQCategoriesSuccess = data => {
    return {
        type: FAQ_ACTION_TYPES.GET_FAQ_CATEGORIES_SUCCESS,
        payload: data
    }
}

const getFAQCategoriesFail = message => {
    return {
        type: FAQ_ACTION_TYPES.GET_FAQ_CATEGORIES_FAIL,
        payload: message
    }
}

const getFAQCategories = () => {
    return async dispatch => {
        try {
            dispatch(getFAQCategoriesRequest());
            const response = await axios({
                url: "getcategoriesproxy.php",
                method: 'POST',
                headers: {
                    APIKEY: process.env.REACT_APP_APIKEY
                }
            });
            const {categories} = response.data;
            dispatch(getFAQCategoriesSuccess(categories));
        }catch (e) {
            const error = e.response.data;
            dispatch(getFAQCategoriesFail(error));
        }
    }
}


const getFAQsRequest = () => {
    return {
        type: FAQ_ACTION_TYPES.GET_FAQS_REQUEST
    }
}

const getFAQsSuccess = data => {
    return {
        type: FAQ_ACTION_TYPES.GET_FAQS_SUCCESS,
        payload: data
    }
}

const getFAQsFail = message => {
    return {
        type: FAQ_ACTION_TYPES.GET_FAQS_FAIL,
        payload: message
    }
}

const getFAQs = (categoryID) => {
    return async dispatch => {
        try {
            dispatch(getFAQsRequest());
            const response = await axios({
                url: `getticketinfoproxy.php`,
                method: 'POST',
                headers: {
                    APIKEY: process.env.REACT_APP_APIKEY
                },
                data: {categoryid: categoryID}
            });
            const {faqsandanswers} = response.data;
            dispatch(getFAQsSuccess(faqsandanswers));
        }catch (e) {
            const error = e.response.data;
            dispatch(getFAQsFail(error));
        }
    }
}


export const FAQ_ACTION_CREATORS = {getFAQCategories, getFAQs};
