import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const StepPlaceholder = () => {
  let headerWidth = Number((Math.random() * 250).toFixed(0));
  headerWidth < 100 ? (headerWidth = 100) : '';

  let paragraphWidth1 = Number((Math.random() * 300).toFixed(0));
  paragraphWidth1 < 230 ? (paragraphWidth1 = 230) : '';

  let paragraphWidth2 = paragraphWidth1 + 15;

  let stepWidth = Number((Math.random() * 200).toFixed(0));
  stepWidth < 100 ? (stepWidth = 100) : '';

  return (
    <Grid container item sm={12} style={{ marginTop: '10px' }}>
      <Grid item sm={6} style={{ paddingLeft: '20px' }}>
        <Skeleton animation="wave" width={`${headerWidth}px`} height="35px" />
        <Skeleton animation="wave" width={`${paragraphWidth1}px`} height="20px" />
        <Skeleton animation="wave" width={`${paragraphWidth2}px`} height="20px" />
      </Grid>
      <Grid item sm={6}>
        <Skeleton animation="wave" width={`${stepWidth}px`} height="65px" />
      </Grid>
      <Skeleton
        animation="wave"
        width="100%"
        height="1px"
        style={{ marginLeft: '0px', marginTop: '10px', marginBottom: '5px' }}
      />
    </Grid>
  );
};

const Placeholder = () => {
  return (
    <>
      <StepPlaceholder />
      <StepPlaceholder />
      <StepPlaceholder />
      <StepPlaceholder />
      <StepPlaceholder />
      <StepPlaceholder />
      <StepPlaceholder />
    </>
  );
};

export default Placeholder;
