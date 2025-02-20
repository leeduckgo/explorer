import React from "react";
import {useGetValidatorSet} from "../../../api/hooks/useGetValidatorSet";
import {getFormattedBalanceStr} from "../../../components/IndividualPageContent/ContentValue/CurrencyValue";
import MetricCard from "./MetricCard";

export default function TotalStake() {
  const {totalVotingPower} = useGetValidatorSet();

  return (
    <MetricCard
      data={
        totalVotingPower
          ? getFormattedBalanceStr(totalVotingPower.toString(), undefined, 3)
          : "-"
      }
      label="Actively Staked"
      tooltipText="Actively Staked refers to the amount of APT tokens currently held in staking accounts."
    />
  );
}
