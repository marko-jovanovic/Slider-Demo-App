import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Writer } from '../../../../generated/types';
import styles from './WriterDetails.module.scss';

const defaultWriter = {
  name: '',
  about: '',
  imgUrl: ''
}

export interface WriterDetailsProps {
  writer?: Writer;
}

export const WriterDetails: React.FC<WriterDetailsProps> = ({ writer }) => {
  const [writerData, setWwriterData] = useState(writer || defaultWriter);

  return (
    <Paper className={styles.writerDetails} elevation={2}>
      <div className={styles.head}>
        <Typography variant='h6'>
          Slide Details
        </Typography>
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
            InputLabelProps={{ shrink: Boolean(writer?.name) }}
            fullWidth
          />
        </Grid>

        <Grid item>
          <TextField
            value={writerData?.about}
            onChange={(e) => setWwriterData({
              ...writerData,
              name: e.target.value
            })}
            variant='outlined'
            label='Author Name'
            InputLabelProps={{ shrink: Boolean(writer?.name) }}
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
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
