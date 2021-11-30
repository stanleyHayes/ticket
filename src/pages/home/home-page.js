import Layout from "../../components/layout/layout";
import {Alert, AlertTitle, Button, Container, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectFAQs} from "../../redux/faqs/faq-reducer";
import FaqCategory from "../../components/shared/faq-category";
import {useEffect, useState} from "react";
import {FAQ_ACTION_CREATORS} from "../../redux/faqs/faq-action-creators";
import ShareConcernDialog from "../../components/dialogs/share-concern-dialog";

const HomePage = () => {

    const {categories, faqLoading, faqError} = useSelector(selectFAQs);

    const [shareConcernDialogOpen, setShareConcernDialogOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FAQ_ACTION_CREATORS.getFAQCategories());
    }, [dispatch]);

    return (
        <Layout>
            {faqLoading && <LinearProgress variant="query" color="secondary"/>}
            <Grid container={true}>
                <Grid item={true} xs={12} lg={6} justifyItems="center">
                    <Container sx={{py: 8}}>
                        {faqError &&
                        <Alert>
                            <AlertTitle>Error</AlertTitle>
                            <Typography color="error">{faqError}</Typography>
                        </Alert>}
                        <Typography
                            sx={{mb: 4, fontSize: {lg: 40, md: 32, xs: 24}}}
                            variant="h6">Welcome to our Help Desk
                        </Typography>

                        <Typography sx={{mb: 4}} variant="body2">
                            How can we help
                        </Typography>

                        <Grid sx={{mb: 4}} container={true} spacing={3}>
                            <Grid item={true} xs={12} md={4}>
                                <Button
                                    onClick={() => setShareConcernDialogOpen(true)}
                                    fullWidth={true}
                                    disableElevation={true}
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: '#00a34d',
                                        textTransform: 'inherit'
                                    }} variant="contained">
                                    Share a concern
                                </Button>
                            </Grid>
                            <Grid item={true} xs={12} md={4}>
                                <Button
                                    fullWidth={true}
                                    sx={{
                                        borderColor: '#00a34d',
                                        color: '#00a34d',
                                        borderWidth: 1,
                                        borderRadius: 2,
                                        textTransform: 'inherit'
                                    }} variant="outlined">
                                    Check ticket status
                                </Button>
                            </Grid>
                        </Grid>


                        <Divider variant="fullWidth" sx={{mt: 4, mb: 4}}/>

                        <Typography
                            mb={2}
                            sx={{fontWeight: 500}}
                            variant="body2">
                            Get quick help
                        </Typography>

                        <Typography
                            mb={4}
                            variant="body2">
                            Select a category to find answers to our frequently asked questions
                        </Typography>

                        <Grid container={true} spacing={2}>
                            {categories && categories.map(category => {
                                return (
                                    <Grid key={category.category_id} item={true} xs={12} md={6}>
                                        <FaqCategory category={category}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </Grid>
                <Grid item={true} xs={false} lg={true}>

                </Grid>
            </Grid>

            {shareConcernDialogOpen && (
                <ShareConcernDialog
                    open={shareConcernDialogOpen}
                    handleClose={() => setShareConcernDialogOpen(false)}
                />
            )}
        </Layout>
    )
}

export default HomePage;
