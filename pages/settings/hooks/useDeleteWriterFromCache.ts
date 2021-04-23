import { useApolloClient } from "@apollo/client";
import { cloneDeep } from "@apollo/client/utilities";
import { useCallback } from "react";
import { GetAllWritersQuery } from "../../../generated/types";
import { GetWriters } from "../../../gql-queries/GetWriters";

export default function useDeleteWriterFromCache() {
  const client = useApolloClient();
  
  const deleteFunc = useCallback((id: number) => {
    const prevData = client.readQuery<GetAllWritersQuery>({ query: GetWriters });
    const newData = cloneDeep(prevData);

    const index = newData?.getAllWriters.findIndex(writer => writer.id === id);
    if (index && index !== -1) {
      newData?.getAllWriters.splice(index, 1);
      client.writeQuery({
        query: GetWriters,
        data: newData
      });
    }
  }, [client]);

  return deleteFunc;
}
