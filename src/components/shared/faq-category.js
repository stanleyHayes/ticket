import {Link} from "react-router-dom";
import { Grid, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {ChevronRight} from "@mui/icons-material";

const FaqCategory = ({category}) => {
    const useStyles = makeStyles(() => {
        return {
            link: {
                textDecoration: 'none',
                width: '90%',
                display: 'block',
                color: '#001927',
                borderColor: '#e7e9eb',
                borderWidth: 2,
                borderStyle: 'solid',
                borderRadius: 8,
                padding: 8
            }
        }
    });

    const classes = useStyles();

    return (
        <Link className={classes.link} to={`/faqs/${category.category_id}`}>
            <Grid container={true} justifyContent="space-between" alignItems="center">
                <Grid item={true}>
                    <Typography
                        variant="body2"
                        sx={{
                            textTransform: 'capitalize',
                            color: '#001927',
                        }}>
                        {category.name}
                    </Typography>
                </Grid>
                <Grid item={true}>
                    <ChevronRight sx={{color: '#001925'}} />
                </Grid>
            </Grid>

        </Link>
    )
}
export default FaqCategory;
