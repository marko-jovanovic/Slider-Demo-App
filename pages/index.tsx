import React from 'react';
import { useQuery } from '@apollo/client';
import Carousel from 'react-material-ui-carousel'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LoadingSpinner } from '../components/loading-spinner/LoadingSpinner';
import { GetAllWritersQuery, Writer } from '../generated/types';
import { GetWriters } from '../gql-queries/GetWriters';
import styles from '../scss/Home.module.scss';

const Home: React.FC = () => {
  const { data, loading } = useQuery<GetAllWritersQuery>(GetWriters);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  
  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner loadingText='Please Wait...' />
      </div>
    );
  }

  let currentPage = 0;
  let carouselPages: Array<Writer[]> = [[]];
  data?.getAllWriters.forEach(currentWriter => {
    const perPage = isMobile ? 2 : 5;

    if (carouselPages[currentPage].length === perPage) {
      carouselPages[++currentPage] = [currentWriter];
    } else {
      carouselPages[currentPage].push(currentWriter);
    }
  });

  return (
    <div className={styles.container}>
      {!data?.getAllWriters.length && (
        <Typography variant='h2'>
          There is no added writter at the moment...
        </Typography>
      )}

      {data && data.getAllWriters.length > 0 && (
        <Carousel autoPlay={false} animation='slide'>
          {
            carouselPages.map(page => (
              <Paper className={styles.carouselItem}>
                {
                  page.map(writer => (
                    <div className={styles.innerItem}>
                      <img src={writer.imgUrl} />
                      <div className={styles.transparentBox}>
                        <p className={styles.name}>
                          {writer.name}
                        </p>
                        <p className={styles.about}>
                          {writer.about}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </Paper>
            ))
          }
        </Carousel>
      )}
    </div>
  )
}

export default Home;
