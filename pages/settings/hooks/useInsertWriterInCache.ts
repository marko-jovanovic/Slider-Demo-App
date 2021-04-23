import { useApolloClient } from "@apollo/client";
import { cloneDeep } from "@apollo/client/utilities";
import { useCallback } from "react";
import { CreateWriterMutation, GetAllWritersQuery } from "../../../generated/types";
import { GetWriters } from "../../../gql-queries/GetWriters";

export default function useInsertWriterInCache() {
  const client = useApolloClient();
  
  const insertFunc = useCallback((writer: CreateWriterMutation['createWriter']) => {
    const prevData = client.readQuery<GetAllWritersQuery>({ query: GetWriters });
    const newData = cloneDeep(prevData);

    if (writer) {
      newData?.getAllWriters.push(writer);
      
      client.writeQuery({
        query: GetWriters,
        data: newData
      });
    }
  }, [client]);

  return insertFunc;
}
