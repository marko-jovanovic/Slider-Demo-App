import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, List, ListItem, ListSubheader, Paper } from '@material-ui/core';
import { LoadingSpinner } from '../../components/loading-spinner/LoadingSpinner';
import { GetAllWritersQuery } from '../../generated/types';
import { GetWriters } from '../../gql-queries/GetWriters';
import styles from './settings.module.scss';
import { WriterDetails } from './components/writer-details/WriterDetails';

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
    <Grid spacing={2} direction='row' container>
      <Grid item lg={2}>
        <Paper elevation={3}>
          <List
            className={styles.questionList}
            component="nav"
            subheader={
              <ListSubheader className={styles.questionListHead} component='div'>
                <span>
                  Slides
                </span>
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
