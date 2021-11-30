import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Divider,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {AttachFile, Close} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HELP_TOPIC_ACTION_CREATORS} from "../../redux/help-topics/help-topic-action-creators";
import {selectHelpTopics} from "../../redux/help-topics/help-topic-reducer";
import {TICKET_ACTION_CREATORS} from "../../redux/tickets/ticket-action-creators";
import validator from "validator";

const ShareConcernDialog = ({open, handleClose}) => {

    const [concern, setConcern] = useState({countryCode: "+233"});
    const [error, setError] = useState({});

    const {personnelType, helpTopic, issueSummary, issue, nssNumber, fullName, email, phone, countryCode} = concern;

    const handleConcernChange = event => {
        setConcern({...concern, [event.target.name]: event.target.value});
    }

    const {helpTopics} = useSelector(selectHelpTopics);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(HELP_TOPIC_ACTION_CREATORS.getHelpTopics());
    }, [dispatch]);

    const handleConcernSubmit = event => {

        event.preventDefault();

        if(!helpTopic){
            setError({error, helpTopic: 'Field required'});
            return;
        }else{
            setError({error, helpTopic: null});
        }

        if(personnelType === 'NSP'){
            if(!personnelType){
                setError({error, personnelType: 'Field required'});
                return;
            }else{
                setError({error, personnelType: null});
            }
        }

        if(!issueSummary){
            setError({error, issueSummary: 'Field required'});
            return;
        }else{
            setError({error, issueSummary: null});
        }

        if(!issue){
            setError({error, issue: 'Field required'});
            return;
        }else{
            setError({error, issue: null});
        }

        if(!fullName){
            setError({error, fullName: 'Field required'});
            return;
        }else{
            setError({error, fullName: null});
        }

        if(!email){
            setError({error, email: 'Field required'});
            return;
        }else{
            setError({error, email: null});
        }

        if(!validator.isEmail(email)){
            setError({error, email: 'Invalid email'});
            return;
        }else{
            setError({error, email: null});
        }

        if(!phone){
            setError({error, phone: 'Field required'});
            return;
        }else{
            setError({error, phone: null});
        }
        dispatch(TICKET_ACTION_CREATORS.createTicket(concern));
        handleClose();
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Grid container={true} justifyContent="space-between">
                    <Grid item={true}>
                        <Typography
                            sx={{color: '#001927', fontSize: 16}}
                            variant="body2">
                            Share a concern
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Close sx={{cursor: 'pointer', color: '#001927'}} onClick={handleClose}/>
                    </Grid>
                </Grid>

                <Divider sx={{mt: 2, mb: 1}} variant="fullWidth" light={true}/>

                <form onSubmit={handleConcernSubmit}>

                    <Box mb={2}>
                        <Typography
                            mb={2}
                            sx={{color: '#001927', fontSize: 14}}
                            variant="body1">
                            Who is sharing this concern
                        </Typography>
                        <Select
                            fullWidth={true}
                            required={true}
                            name="personnelType"
                            onChange={handleConcernChange}
                            value={personnelType}
                            variant="outlined"
                            defaultValue=" "
                            size="small">
                            <MenuItem value=" ">Select Personnel Type</MenuItem>
                            <MenuItem value="NSP">National Service Personnel</MenuItem>
                            <MenuItem value="NP">Non Personnel</MenuItem>
                        </Select>
                    </Box>

                    <Box mb={2}>
                        <Typography mb={3} variant="body2">What's your concern?</Typography>

                        <Box mb={2}>
                            <Typography mb={2} variant="body2">Select topic</Typography>
                            <Select
                                fullWidth={true}
                                required={true}
                                name="helpTopic"
                                onChange={handleConcernChange}
                                value={helpTopic}
                                variant="outlined"
                                size="small">
                                {helpTopics && helpTopics.map(helpTopic => {
                                    return (
                                        <MenuItem
                                            key={helpTopic.topic_id}
                                            value={helpTopic.topic_id}>
                                            {helpTopic.topic}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </Box>

                        <Box mb={2}>
                            <Typography mb={2} variant="body2">Issue summary</Typography>
                            <TextField
                                placeholder="Summarise your issue"
                                name="summaryIssue"
                                variant="outlined"
                                size="medium"
                                value={issueSummary}
                                onChange={handleConcernChange}
                                type="text"
                                multiline={true}
                                minRows={3}
                                fullWidth={true}
                                error={Boolean(error.issueSummary)}
                                helperText={error.issueSummary}
                            />
                        </Box>

                        <Box mb={2}>
                            <Typography mb={2} variant="body2">Describe your issue</Typography>
                            <TextField
                                sx={{mb: 1}}
                                placeholder="Type here"
                                name="issue"
                                variant="outlined"
                                size="medium"
                                value={issue}
                                onChange={handleConcernChange}
                                type="text"
                                multiline={true}
                                minRows={5}
                                fullWidth={true}
                                error={Boolean(error.issue)}
                                helperText={error.issue}
                            />
                            <Button variant="outlined" size="small" startIcon={<AttachFile/>}>Attach</Button>
                        </Box>
                    </Box>

                    <Box mb={2}>
                        <Typography
                            sx={{color: '#001927', fontSize: 16}}
                            mb={3}
                            variant="body2">
                            Contact details
                        </Typography>

                        {personnelType === "NSP" && (
                            <Box mb={2}>
                                <Typography mb={2} variant="body2">NSS Number</Typography>
                                <TextField
                                    placeholder="Type your nss number"
                                    name="nssNumber"
                                    variant="outlined"
                                    size="small"
                                    value={nssNumber}
                                    onChange={handleConcernChange}
                                    type="text"
                                    fullWidth={true}
                                    error={Boolean(error.nssNumber)}
                                    helperText={error.nssNumber}
                                />
                            </Box>
                        )}

                        <Box mb={2}>
                            <Typography mb={2} variant="body2">Full name</Typography>
                            <TextField
                                placeholder="Enter full name"
                                name="fullName"
                                variant="outlined"
                                size="small"
                                value={fullName}
                                onChange={handleConcernChange}
                                type="text"
                                fullWidth={true}
                                error={Boolean(error.fullName)}
                                helperText={error.fullName}
                            />
                        </Box>

                        <Box mb={2}>
                            <Typography mb={2} variant="body2">Email address</Typography>
                            <TextField
                                placeholder="Enter email address"
                                name="email"
                                variant="outlined"
                                size="small"
                                value={email}
                                onChange={handleConcernChange}
                                type="email"
                                fullWidth={true}
                                error={Boolean(error.email)}
                                helperText={error.email}
                            />
                        </Box>

                        <Box mb={2}>
                            <Typography mb={2} variant="body2">Phone</Typography>
                            <Grid container={true} spacing={1}>
                                <Grid item={true} xs={3}>
                                    <Select
                                        endAdornment={null}
                                        fullWidth={true}
                                        required={true}
                                        name="countryCode"
                                        onChange={handleConcernChange}
                                        value={countryCode}
                                        variant="outlined"
                                        size="small">
                                        <MenuItem value="+233">
                                            <img src="/assets/images/ghana.png" alt="GH Flag"/>
                                        </MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item={true} xs={9}>
                                    <TextField
                                        placeholder="Enter phone"
                                        name="phone"
                                        variant="outlined"
                                        size="small"
                                        value={phone}
                                        onChange={handleConcernChange}
                                        type="tel"
                                        fullWidth={true}
                                        error={Boolean(error.phone)}
                                        helperText={error.phone}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Button
                        onClick={handleConcernSubmit}
                        sx={{
                            textTransform: 'capitalize',
                            backgroundColor: '#00a34d',
                            py: 1,
                            mt: 3
                        }}
                        variant="contained"
                        fullWidth={true}>
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ShareConcernDialog;
