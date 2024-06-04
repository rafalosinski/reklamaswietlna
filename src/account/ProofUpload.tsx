import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import { axiosInstance } from '../configurator/utils/axiosInstance';
import { Alert } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  filesBox: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '20px',
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
  proofAcceptance: {
    marginLeft: '15px',
  },
  rejectionReasonArea: {
    width: '400px',
    marginLeft: '10px',
  },
  singleFile: {
    borderBottom: '1px solid #dbdbdb',
    marginBottom: '10px',
  },
  singleFileInfo: {
    marginBottom: '20px',
  },
  chipAccepted: {
    backgroundColor: '#b5ff78',
    color: '#3f5e26',
  },
  chipRejected: {
    backgroundColor: '#f58171',
    color: '#5e2d26',
  },
  rejectionReason: {
    marginLeft: '10px',
  },
  fileInfo: {
    color: '#9c9c9c',
    marginTop: '10px',
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

const ProofUpload = ({ order, admin = false }) => {
  const classes = useStyles();

  const [proofsList, setProofsList] = useState(order.proofs);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [proofStatus, setProofStatus] = useState<any>('pending');
  const [rejectionReason, setRejectionReason] = useState('');
  const [acceptanceButtonDisabled, setAcceptanceButtonDisabled] = useState(false);

  const handleAcceptance = async (proofId) => {
    setAcceptanceButtonDisabled(true);
    try {
      const { data } = await axiosInstance.put(
        `/proofs/${proofId}`,
        { status: proofStatus, rejectionReason: rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setAcceptanceButtonDisabled(false);
    getProofs();
  };

  const getProofs = async () => {
    try {
      const { data } = await axiosInstance.get(`/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setProofsList(data.proofs);
      console.log('getProofs');
    } catch (error) {
      console.log(error);
    }
  };

  const fileUploadRef = useRef<HTMLInputElement>();

  const handleFileUploadRef = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const handleFileUpload = async (e, order) => {
    setError(false);
    if (e.target.files[0].size > 209715200) {
      setError(true);
      setErrorMessage('Wysyłanie nie powiodło się. Maksymalny dozwolony rozmiar pliku to 200 MB.');
      return;
    }

    let proofId;
    const hash = uuidv4();

    try {
      const { data } = await axiosInstance.post(
        '/proofs',
        { hash: hash, order: order.id, orderId: order.orderId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        }
      );
      proofId = data.id;

      setUploadInProgress(true);
      const form = new FormData();
      form.append('ref', 'proof');
      form.append('refId', proofId);
      form.append('field', 'file');
      form.append('files', e.target.files[0], hash);

      await axiosInstance.post('/upload', form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
        onUploadProgress: (progressEvent) =>
          setProgressValue(Math.round((progressEvent.loaded / e.target.files[0].size) * 100)),
      });
      getProofs();
      // console.log(e.target.files[0]);
      setUploadInProgress(false);
    } catch (error) {
      console.log(error);
      setUploadInProgress(false);
    }
  };

  return (
    <Grid container direction="column">
      <Box>
        Ostateczną wizualizację do akceptacji przygotowujemy po opłaceniu zamówienia i ewentualnym
        wgraniu plików graficznych (Jeśli w zamówieniu było zaznaczone, że masz gotowy projekt)
      </Box>
      <Box className={classes.filesBox}>
        {proofsList.length === 0 && 'brak podglądów'}
        {proofsList.map((item) => (
          <>
            <Grid container justify="space-between" className={classes.singleFile} key={item.id}>
              {item.file && (
                <>
                  <Typography>
                    {' '}
                    <a target="_blank" href={item.file.url} download>
                      Zobacz projekt
                    </a>
                  </Typography>
                  <Typography variant="body2" align="right" className={classes.fileInfo}>
                    <span>
                      {item.file.size > 1000
                        ? `${(item.file.size / 1024 / 1.024).toFixed(2)} MB`
                        : `${(item.file.size / 1.024).toFixed(2)} KB`}
                    </span>{' '}
                    {dayjs(item.file.createdAt).format('DD/MM/YYYY - HH:mm')}
                    <a target="_blank" href={item.file.url} download>
                      Pobierz
                    </a>
                  </Typography>
                </>
              )}
            </Grid>
            <Grid container className={classes.singleFileInfo} alignItems="center">
              {item.status === 'accepted' && (
                <Chip className={classes.chipAccepted} label="Zaakceptowany" />
              )}
              {item.status === 'rejected' && (
                <>
                  <Chip className={classes.chipRejected} label="Odrzucony" />
                  <Typography className={classes.rejectionReason}>
                    {' '}
                    Powód odrzucenia: {item.rejectionReason}
                  </Typography>
                </>
              )}
              {item.status === 'pending' && (
                <FormControl>
                  <Select
                    variant="outlined"
                    margin="dense"
                    id="proofStatus"
                    value={proofStatus}
                    onChange={(e) => setProofStatus(e.target.value)}
                  >
                    <MenuItem value="pending">Wybierz...</MenuItem>
                    <MenuItem value="accepted">Zaakceptuj projekt</MenuItem>
                    <MenuItem value="rejected">Odrzuć projekt</MenuItem>
                  </Select>
                </FormControl>
              )}
              {item.status === 'pending' && proofStatus === 'accepted' && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.proofAcceptance}
                  onClick={() => handleAcceptance(item.id)}
                  disabled={acceptanceButtonDisabled}
                >
                  Zatwierdź
                </Button>
              )}
              {item.status === 'pending' && proofStatus === 'rejected' && (
                <TextField
                  id="rejectionReason"
                  variant="outlined"
                  placeholder="Wpisz powód odrzucenia pliku, przygotujemy kolejny - poprawiony projekt. Jeśli masz pytania zadzwoń do nas. Chętnie pomożemy."
                  multiline
                  rows={3}
                  value={rejectionReason}
                  className={classes.rejectionReasonArea}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              )}
              {item.status === 'pending' && proofStatus === 'rejected' && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.proofAcceptance}
                  disabled={rejectionReason.length < 1}
                  onClick={() => handleAcceptance(item.id)}
                >
                  Odrzuć
                </Button>
              )}
            </Grid>
          </>
        ))}
      </Box>
      {admin && (
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

export default ProofUpload;
