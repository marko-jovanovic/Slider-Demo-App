import gql from "graphql-tag";

export const DeleteWriter = gql`
  mutation deleteWriter($input: WriterDeleteInput) {
    deleteWriter(input: $input) {
      id
      name
      about
      imgUrl
    }
  }
`;
