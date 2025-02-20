import React from "react";
import {gql, useQuery} from "@apollo/client";
import {ActivitiesTable} from "../Component/ActivitiesTable";

const TOKEN_ACTIVITIES_QUERY = gql`
  query TokenActivities($token_id: String) {
    token_activities(
      where: {token_data_id_hash: {_eq: $token_id}}
      order_by: {transaction_version: desc}
    ) {
      transaction_version
      from_address
      property_version
      to_address
      token_amount
      transfer_type
    }
  }
`;

type ActivitiesTabProps = {
  // TODO: add graphql data typing
  data: any;
};

export default function ActivitiesTab({
  data: activitiesData,
}: ActivitiesTabProps) {
  const {loading, error, data} = useQuery(TOKEN_ACTIVITIES_QUERY, {
    variables: {
      token_id: activitiesData?.token_data_id_hash,
    },
  });

  if (loading || error || !data) {
    // TODO: error handling
    return null;
  }

  return <ActivitiesTable activities={data?.token_activities ?? []} />;
}
