import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, IconButton, List, ListItem, ListSubheader, Paper, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { LoadingSpinner } from '../../components/loading-spinner/LoadingSpinner';
import { GetAllWritersQuery } from '../../generated/types';
import { GetWriters } from '../../gql-queries/GetWriters';
import { WriterDetails } from './components/writer-details/WriterDetails';
import styles from './settings.module.scss';

const Settings: React.FC = () => {
  const { data, loading } = useQuery<GetAllWritersQuery>(GetWriters);
  const [selectedWriterIndex, setSelectedWriterIndex] = useState(0);

  if (loading) {
    return (
      <div className={styles.settingsPage}>
        <LoadingSpinner loadingText='Please wait...' />
      </div>
    )
  }

  return (
    <Grid className={styles.settingsPage} spacing={2} direction='row' container>
      <Grid item lg={2}>
        <Paper elevation={3}>
          <List
            className={styles.writerList}
            component="nav"
            subheader={
              <ListSubheader className={styles.writerListHead} component='div'>
                <span>
                  Slides
                </span>
                <Tooltip title='Add Slide'>
                  <IconButton size='small'>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </ListSubheader>
          }>
            {
              data?.getAllWriters.map((writer, index) => (
                <Paper square elevation={2}>
                  <ListItem
                    selected={selectedWriterIndex === index}
                    onClick={() => setSelectedWriterIndex(index)}
                    button
                  >
                    { writer.name }
                  </ListItem>
                </Paper>
              ))
            }
          </List>
        </Paper>
      </Grid>

      <Grid item lg={10} key={selectedWriterIndex}>
        <WriterDetails writer={data?.getAllWriters[selectedWriterIndex]} />
      </Grid>
    </Grid>
  );
}

export default Settings;
