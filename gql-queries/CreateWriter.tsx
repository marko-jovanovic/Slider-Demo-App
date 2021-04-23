import gql from "graphql-tag";

export const CreateWriter = gql`
  mutation createWriter($input: WriterCreateInput) {
    createWriter(input: $input) {
      id
      name
      about
      imgUrl
    }
  }
`;
