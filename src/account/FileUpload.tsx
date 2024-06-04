import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { axiosInstance } from '../configurator/utils/axiosInstance';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  filesBox: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '5px',
  },
  btn: {
    marginBottom: '5px',
    marginTop: '10px',
    padding: '5px 10px',
  },
  hiddenInput: {
    opacity: '1',
    zIndex: 999,
    // maxWidth: '95px',
    // height: '33px',
    outline: '1px solid red',
    cursor: 'pointer',
    display: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  singleFile: {
    borderBottom: '1px solid #dbdbdb',
  },
  fileInfo: {
    color: '#9c9c9c',
    '& span': {
      marginRight: '10px',
    },
    '& a': {
      marginLeft: '10px',
      color: '#000',
    },
  },
  spinner: {
    marginRight: '10px',
    marginLeft: '5px',
  },
  btnProgess: {
    color: '#454545',
    fontSize: '0.9rem',
    '& span': {
      fontWeight: 'bolder',
    },
  },
}));

const FileUpload = ({ order, admin = false }) => {
  const classes = useStyles();

  const [filesList, setFilesList] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const { data } = await axiosInstance.get(`/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setFilesList(data.uploadedFiles);
    } catch (error) {
      console.log(error);
    }
  };

  const fileUploadRef = useRef<HTMLInputElement>();

  const handleFileUploadRef = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
    console.log('clicked');
  };

  const handleFileUpload = async (e, order) => {
    setError(false);
    if (e.target.files[0].size > 209715200) {
      setError(true);
      setErrorMessage(
        'Wysyłanie nie powiodło się. Maksymalny dozwolony rozmiar pliku to 200 MB. Jeśli chcesz przesłać większy plik wyślij nam link do pliku (np. WeTransfer lub Dysk Google) lub skontaktuj się z nami w celu uzyskania dostępu do naszego FTP.'
      );
      return;
    }
    setUploadInProgress(true);
    const form = new FormData();
    form.append('ref', 'order');
    form.append('refId', order.id);
    form.append('field', 'uploadedFiles');
    form.append('files', e.target.files[0], e.target.files[0].name);
    try {
      const { data } = await axiosInstance.post('/upload', form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
        onUploadProgress: (progressEvent) =>
          setProgressValue(Math.round((progressEvent.loaded / e.target.files[0].size) * 100)),
      });
      getFiles();
      // console.log(e.target.files[0]);
      setUploadInProgress(false);
    } catch (error) {
      console.log(error);
      setUploadInProgress(false);
    }
  };

  return (
    <Grid container direction="column">
      <Box className={classes.filesBox}>
        {filesList.length === 0 && 'brak plików'}
        {filesList.map((item) => (
          <Grid container justify="space-between" className={classes.singleFile} key={item.id}>
            <Typography>{item.name}</Typography>
            <Typography variant="body2" align="right" className={classes.fileInfo}>
              <span>
                {item.size > 1000
                  ? `${(item.size / 1024 / 1.024).toFixed(2)} MB`
                  : `${(item.size / 1.024).toFixed(2)} KB`}
              </span>{' '}
              {dayjs(item.createdAt).format('DD/MM/YYYY - HH:mm')}
              {admin && (
                <a target="_blank" href={item.url} download>
                  Pobierz
                </a>
              )}
            </Typography>
          </Grid>
        ))}
      </Box>
      {!admin && (
        <Box>
          {error && <Alert severity="warning">{errorMessage}</Alert>}
          <form className={classes.form}>
            {/* <input type="hidden" name="ref" value="order" />
          <input type="hidden" name="refId" value={order.id} /> */}
            <input
              className={classes.hiddenInput}
              onChange={(e) => handleFileUpload(e, order)}
              type="file"
              name="files"
              ref={fileUploadRef}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              onClick={handleFileUploadRef}
              className={classes.btn}
              disabled={uploadInProgress}
            >
              {uploadInProgress ? (
                <>
                  <CircularProgress size={20} color="secondary" className={classes.spinner} />{' '}
                  <Typography className={classes.btnProgess}>
                    Wysyłanie pliku - <span>{progressValue}%</span>
                  </Typography>
                </>
              ) : (
                'Dodaj plik'
              )}
            </Button>
            <Typography></Typography>
          </form>
        </Box>
      )}
    </Grid>
  );
};

export default FileUpload;
