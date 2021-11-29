import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/home-page";
import TicketInfoPage from "./pages/tickets/ticket-info-page";
import FAQsPage from "./pages/faqs/faqs-page";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/faqs/:categoryID" element={<FAQsPage/>}/>
            <Route path="/ticket-status" element={<TicketInfoPage/>}/>
        </Routes>
    );
}

export default App;
