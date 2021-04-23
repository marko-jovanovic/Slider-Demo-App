import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button, CircularProgress, Grid, Typography,
  IconButton, Paper, Snackbar, TextField, Tooltip
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import { Writer, UpdateWriterMutation, DeleteWriterMutation } from '../../../../generated/types';
import { UpdateWriter } from '../../../../gql-queries/UpdateWriter';
import { DeleteWriter } from '../../../../gql-queries/DeleteWriter';
import useDeleteWriterFromCache from '../../hooks/useDeleteWriterFromCache';
import useSelectedWriter from '../../hooks/useSelectedWriter';
import styles from './WriterDetails.module.scss';

const defaultWriter = {
  id: 0,
  name: '',
  about: '',
  imgUrl: ''
}

export interface WriterDetailsProps {
  writer?: Writer;
}

export const WriterDetails: React.FC<WriterDetailsProps> = ({ writer }) => {
  const [writerData, setWwriterData] = useState<Writer>(writer || defaultWriter);
  const { setSelectedWriterIndex } = useSelectedWriter();
  const deleteFromCache = useDeleteWriterFromCache();

  const [updateWriter, { loading: isUpdating }] = useMutation<UpdateWriterMutation>(UpdateWriter);
  const [deleteWriter, { loading: isDeleting }] = useMutation<DeleteWriterMutation>(DeleteWriter);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setWwriterData(writer || defaultWriter);
  }, [writer]);

  const onUpdateWriterCb = useCallback(() => {
    updateWriter({
      variables: {
        input: {
          id: writerData.id,
          name: writerData.name,
          about: writerData.about,
          imgUrl: writerData.imgUrl
        }
      }
    }).then(() => {
      setSuccessMessage('Writer updated successfully!');
    }).catch(err => {
      setErrorMessage(err.message);
    });
  }, [writerData]);

  const onDeleteWriterCb = useCallback(() => {
    if (!writer) return;

    deleteWriter({
      variables: {
        input: {
          id: writer.id
        }
      }
    }).then(() => {
      setSuccessMessage('Writer deleted successfully!');
      deleteFromCache(writer.id);
      setSelectedWriterIndex(prev => prev - 1);
    }).catch(err => {
      setErrorMessage(err.message);
    });
  }, [writer]);

  const isDisabled = isUpdating || isDeleting;

  return (
    <Paper className={styles.writerDetails} elevation={2}>
      <div className={styles.head}>
        <Typography variant='h6'>
          Slide Details
        </Typography>
        <div className={styles.writerActions}>
          <Tooltip title='Delete Writer'>
            <IconButton
              className={styles.deleteBtn}
              size='small'
              onClick={onDeleteWriterCb}
              disabled={isDisabled}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Move Writer'>
            <IconButton
              className={styles.moveBtn}
              size='small'
              disabled={isDisabled}
            >
              <OpenWithIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Grid spacing={3} direction='column' container>
        <Grid item>
          <TextField
            value={writerData?.name}
            onChange={(e) => setWwriterData({
              ...writerData,
              name: e.target.value
            })}
            variant='outlined'
            label='Author Name'
            InputLabelProps={{ shrink: Boolean(writer?.name) }}
            disabled={isDisabled}
            fullWidth
          />
        </Grid>

        <Grid item>
          <TextField
            value={writerData?.imgUrl}
            onChange={(e) => setWwriterData({
              ...writerData,
              imgUrl: e.target.value
            })}
            variant='outlined'
            label='Image URL'
            InputLabelProps={{ shrink: Boolean(writer?.imgUrl) }}
            disabled={isDisabled}
            fullWidth
          />
        </Grid>

        <Grid item>
          <TextField
            value={writerData?.about}
            onChange={(e) => setWwriterData({
              ...writerData,
              about: e.target.value
            })}
            variant='outlined'
            label='About'
            InputLabelProps={{ shrink: Boolean(writer?.about) }}
            rows={6}
            disabled={isDisabled}
            multiline
            fullWidth
          />
        </Grid>

        <Grid item>
          <Button
            className={styles.saveBtn}
            variant='contained'
            color='primary'
            onClick={onUpdateWriterCb}
            disabled={isDisabled}
          >
            { isUpdating && (
              <CircularProgress
                className={styles.progressIndicator}
                color='secondary'
                size={20}
              />
            )}
            <span>
              { writerData.id ? 'Update' : 'Save' }
            </span>
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert elevation={0} variant='filled' severity='success'>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert elevation={0} variant='filled' severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
