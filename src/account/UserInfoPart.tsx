import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const UserInfoPart = ({ label, value }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="p">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </div>
  );
};

export default UserInfoPart;
