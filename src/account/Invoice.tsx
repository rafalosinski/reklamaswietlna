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
  deleteButton: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

const ProofUpload = ({ order, admin = false }) => {
  const classes = useStyles();

  const [invoiceList, setInvoiceList] = useState(order.invoices);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletingProcess, setDeletingProcess] = useState(false);

  const getInvoices = async () => {
    try {
      const { data } = await axiosInstance.get(`/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setInvoiceList(data.invoices);
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

    let invoiceId;
    const hash = uuidv4();

    try {
      const { data } = await axiosInstance.post(
        '/invoices',
        { title: 'PL12345/2021', hash: hash, order: order.id, orderId: order.orderId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        }
      );
      invoiceId = data.id;

      setUploadInProgress(true);
      const form = new FormData();
      form.append('ref', 'invoice');
      form.append('refId', invoiceId);
      form.append('field', 'file');
      form.append('files', e.target.files[0], hash);

      await axiosInstance.post('/upload', form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
        onUploadProgress: (progressEvent) =>
          setProgressValue(Math.round((progressEvent.loaded / e.target.files[0].size) * 100)),
      });
      getInvoices();
      setUploadInProgress(false);
    } catch (error) {
      console.log(error);
      setUploadInProgress(false);
    }
  };

  const handleDownloadConfirmation = async (id) => {
    if (!admin) {
      try {
        await axiosInstance.put(
          `/invoices/${id}`,
          { downloaded: true },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (admin) {
      try {
        setDeletingProcess(true);
        await axiosInstance.delete(`/invoices/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        });
        getInvoices();
        setDeletingProcess(false);
        setDeleteConfirmation(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid container direction="column">
      <Box className={classes.filesBox}>
        {invoiceList.length === 0 && 'brak faktur'}
        {invoiceList.map((invoice) => (
          <>
            <Grid container justify="space-between" key={invoice.id} alignItems="center">
              {invoice.file && (
                <>
                  <Typography>
                    <a
                      target="_blank"
                      href={invoice.file.url}
                      download
                      onClick={() => handleDownloadConfirmation(invoice.id)}
                    >
                      Faktura VAT
                    </a>
                  </Typography>
                  <Typography variant="body2" align="right" className={classes.fileInfo}>
                    <a
                      target="_blank"
                      href={invoice.file.url}
                      download
                      onClick={() => handleDownloadConfirmation(invoice.id)}
                    >
                      Pobierz
                    </a>
                    {admin && !deleteConfirmation && (
                      <a
                        className={classes.deleteButton}
                        onClick={() => setDeleteConfirmation(true)}
                      >
                        Usuń fakturę
                      </a>
                    )}

                    {admin && deleteConfirmation && !deletingProcess && (
                      <a
                        className={classes.deleteButton}
                        onClick={() => handleDeleteInvoice(invoice.id)}
                      >
                        Potwierdź usunięcie
                      </a>
                    )}
                    {admin && deletingProcess && (
                      <a
                        className={classes.deleteButton}
                        onClick={() => handleDeleteInvoice(invoice.id)}
                      >
                        Usuwanie...
                      </a>
                    )}
                  </Typography>
                </>
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
                'Dodaj fakturę'
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
