import Layout from "../../components/layout/layout";
import {Container, Grid, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {FAQ_ACTION_CREATORS} from "../../redux/faqs/faq-action-creators";
import {selectFAQs} from "../../redux/faqs/faq-reducer";

const FAQsPage = () => {

    const {categoryID} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FAQ_ACTION_CREATORS.getFAQs(categoryID))
    }, [categoryID, dispatch]);

    const {faqLoading, faqError, faqs, categories} = useSelector(selectFAQs);

    console.log(faqs)
    return (
        <Layout>
            <Container>
                <Grid container={true}>

                </Grid>
            </Container>
        </Layout>
    )
}

export default FAQsPage;
