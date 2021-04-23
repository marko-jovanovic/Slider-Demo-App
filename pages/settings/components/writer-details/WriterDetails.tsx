import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button, CircularProgress, Grid, Typography,
  IconButton, Paper, Snackbar, TextField, Tooltip
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import { Writer, UpdateWriterMutation } from '../../../../generated/types';
import { UpdateWriter } from '../../../../gql-queries/UpdateWriter';
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
  const [writerData, setWwriterData] = useState(writer || defaultWriter);

  const [updateWriter, { loading: isUpdating }] = useMutation<UpdateWriterMutation>(UpdateWriter);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Paper className={styles.writerDetails} elevation={2}>
      <div className={styles.head}>
        <Typography variant='h6'>
          Slide Details
        </Typography>
        <div className={styles.writerActions}>
          <Tooltip title='Delete Writer'>
            <IconButton className={styles.deleteBtn} size='small'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Move Writer'>
            <IconButton className={styles.moveBtn} size='small'>
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
            multiline
            fullWidth
          />
        </Grid>

        <Grid item>
          <Button
            className={styles.saveBtn}
            variant='contained'
            color='primary'
            onClick={() => {
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
                setShowSuccessMessage(true);
              }).catch(err => {
                setErrorMessage(err.message);
              });
            }}
            disabled={isUpdating}
          >
            { isUpdating && (
              <CircularProgress
                className={styles.progressIndicator}
                color='secondary'
                size={20}
              />
            )}
            <span>
              { writer ? 'Update' : 'Save' }
            </span>
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
      >
        <Alert elevation={0} variant='filled' severity='success'>
          Successfully updated!
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
