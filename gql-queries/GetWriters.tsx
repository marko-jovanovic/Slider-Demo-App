import { gql } from '@apollo/client';

export const GetWriters = gql`
  query getAllWriters {
    getAllWriters {
      id
      name
      about
      imgUrl
    }
  }
`;