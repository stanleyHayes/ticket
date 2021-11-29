import {combineReducers} from "redux";
import faqReducer from "./faqs/faq-reducer";
import ticketsReducer from "./tickets/ticket-reducer";
import helpTopicsReducer from "./help-topics/help-topic-reducer";

const rootReducer = combineReducers({
    faqs: faqReducer,
    tickets: ticketsReducer,
    helpTopics: helpTopicsReducer
});

export default rootReducer;
