import gql from "graphql-tag";

export const UpdateWriter = gql`
  mutation updateWriter($input: WriterUpdateInput) {
    updateWriter(input: $input) {
      id
      name
      about
      imgUrl
    }
  }
`;
