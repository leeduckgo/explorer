import React from "react";
import {gql, useQuery} from "@apollo/client";
import {TokensTable} from "../Components/TokensTable";

const TOKENS_QUERY = gql`
  query TokensData($owner_address: String) {
    current_token_ownerships(
      where: {owner_address: {_eq: $owner_address}, amount: {_gt: "0"}}
    ) {
      token_data_id_hash
      name
      collection_name
      property_version
      amount
    }
  }
`;

type TokenTabsProps = {
  address: string;
};

export default function TokenTabs({address}: TokenTabsProps) {
  const {loading, error, data} = useQuery(TOKENS_QUERY, {
    variables: {
      owner_address: address,
    },
  });

  if (loading || error || !data) {
    // TODO: error handling
    return null;
  }

  // TODO: add graphql data typing
  const tokens = data?.current_token_ownerships ?? [];

  return <TokensTable tokens={tokens} />;
}
