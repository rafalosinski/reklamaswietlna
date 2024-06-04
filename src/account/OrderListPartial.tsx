import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  infoBox: {
    boxShadow: 'none',
    width: '100%',
  },
  margin0: {
    margin: '0px',
    padding: '0px',
  },
  accordionSummary: {
    padding: '0px',
  },
  accordionSummaryText: {
    borderBottom: '1px dashed #969696',
  },
}));

const OrderListPartial = ({ label, children }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item container sm={12} justify="flex-start" alignContent="center">
        <Accordion className={classes.infoBox}>
          <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.accordionSummaryText}>{label}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.margin0}>{children}</AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default OrderListPartial;
