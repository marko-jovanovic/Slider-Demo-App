import { useQuery } from '@apollo/client';
import React from 'react';
import { GetAllWritersQuery } from '../generated/types';
import { GetWriters } from '../gql-queries/GetWriters';
import styles from '../scss/Home.module.scss';

const Home: React.FC = () => {
  const { data, loading } = useQuery<GetAllWritersQuery>(GetWriters);
  console.log('DATA: ', data);

  return (
    <div className={styles.container}>
      Home
    </div>
  )
}

export default Home;
