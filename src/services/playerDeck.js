import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerRoot } from "../components/common/constants";

export const playerDeckApi = createApi({
  reducerPath: "playerDeckApi",
  baseQuery: fetchBaseQuery({ baseUrl: ServerRoot }),
  endpoints: (builder) => ({
    getAllPlayerDecks: builder.query({
      query: () => "playerDecks",
    }),
    addPlayerDeck: builder.mutation({
      query: ({id, ...newDeck}) => ({
        url: "playerDecks/" + id,
        method: "PUT",
        body: newDeck,
      }),
    }),
  }),
});

export const { useGetAllPlayerDecksQuery, useAddPlayerDeckMutation } =
  playerDeckApi;
