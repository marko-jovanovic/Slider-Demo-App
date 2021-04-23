import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createWriter?: Maybe<Writer>;
  deleteWriter?: Maybe<Writer>;
  updateWriter?: Maybe<Writer>;
};


export type MutationCreateWriterArgs = {
  input?: Maybe<WriterCreateInput>;
};


export type MutationDeleteWriterArgs = {
  input?: Maybe<WriterDeleteInput>;
};


export type MutationUpdateWriterArgs = {
  input?: Maybe<WriterUpdateInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllWriters: Array<Writer>;
};

export type Writer = {
  __typename?: 'Writer';
  about: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  imgUrl: Scalars['String'];
  name: Scalars['String'];
};

export type WriterCreateInput = {
  about: Scalars['String'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
};

export type WriterDeleteInput = {
  id: Scalars['Int'];
};

export type WriterUpdateInput = {
  about: Scalars['String'];
  id: Scalars['Int'];
  imgUrl: Scalars['String'];
  name: Scalars['String'];
};

export type GetAllWritersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWritersQuery = (
  { __typename?: 'Query' }
  & { getAllWriters: Array<(
    { __typename?: 'Writer' }
    & Pick<Writer, 'id' | 'name' | 'about' | 'imgUrl'>
  )> }
);


export const GetAllWritersDocument = gql`
    query getAllWriters {
  getAllWriters {
    id
    name
    about
    imgUrl
  }
}
    `;

/**
 * __useGetAllWritersQuery__
 *
 * To run a query within a React component, call `useGetAllWritersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWritersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWritersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWritersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllWritersQuery, GetAllWritersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllWritersQuery, GetAllWritersQueryVariables>(GetAllWritersDocument, options);
      }
export function useGetAllWritersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllWritersQuery, GetAllWritersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllWritersQuery, GetAllWritersQueryVariables>(GetAllWritersDocument, options);
        }
export type GetAllWritersQueryHookResult = ReturnType<typeof useGetAllWritersQuery>;
export type GetAllWritersLazyQueryHookResult = ReturnType<typeof useGetAllWritersLazyQuery>;
export type GetAllWritersQueryResult = Apollo.QueryResult<GetAllWritersQuery, GetAllWritersQueryVariables>;