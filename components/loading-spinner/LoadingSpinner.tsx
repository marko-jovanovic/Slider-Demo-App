import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  loadingText?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingText }) => {

  return (
    <div className={styles.loadingWrapper}>
      <CircularProgress />
      { loadingText && (
        <Typography className={styles.loadingText}>
          { loadingText }
        </Typography>
      )}
    </div>
  );
}

