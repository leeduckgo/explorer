import * as React from "react";
import {Types} from "aptos";
import {Stack, Box} from "@mui/material";
import Row from "./Components/Row";
import ContentRow from "../../../components/IndividualPageContent/ContentRow";
import ContentBox from "../../../components/IndividualPageContent/ContentBox";
import {
  TableTransactionStatus,
  TransactionStatus,
} from "../../../components/TransactionStatus";
import {useGetInDevMode} from "../../../api/hooks/useGetInDevMode";
import {getLearnMoreTooltip} from "../helpers";
import TimestampValue from "../../../components/IndividualPageContent/ContentValue/TimestampValue";
import GasValue from "../../../components/IndividualPageContent/ContentValue/GasValue";
import {getFormattedTimestamp} from "../../utils";

type StateCheckpointOverviewTabProps = {
  transaction: Types.Transaction;
};

export default function StateCheckpointOverviewTab({
  transaction,
}: StateCheckpointOverviewTabProps) {
  const inDev = useGetInDevMode();
  const transactionData =
    transaction as Types.Transaction_StateCheckpointTransaction;

  return inDev ? (
    <Box marginBottom={3}>
      <ContentBox>
        <ContentRow
          title="Status:"
          value={<TransactionStatus success={transactionData.success} />}
          tooltip={getLearnMoreTooltip("status")}
        />
        <ContentRow
          title={"Version:"}
          value={transactionData.version}
          tooltip={getLearnMoreTooltip("version")}
        />
        {"timestamp" in transactionData && (
          <ContentRow
            title="Timestamp:"
            value={<TimestampValue timestamp={transactionData.timestamp} />}
            tooltip={getLearnMoreTooltip("timestamp")}
          />
        )}
        <ContentRow
          title="VM Status:"
          value={transactionData.vm_status}
          tooltip={getLearnMoreTooltip("vm_status")}
        />
      </ContentBox>
      <ContentBox>
        <ContentRow
          title="State Change Hash:"
          value={transactionData.state_change_hash}
          tooltip={getLearnMoreTooltip("state_change_hash")}
        />
        <ContentRow
          title="Event Root Hash:"
          value={transactionData.event_root_hash}
          tooltip={getLearnMoreTooltip("event_root_hash")}
        />
        <ContentRow
          title="Accumulator Root Hash:"
          value={transactionData.accumulator_root_hash}
          tooltip={getLearnMoreTooltip("accumulator_root_hash")}
        />
      </ContentBox>
    </Box>
  ) : (
    <Box marginX={2} marginTop={5}>
      <Stack direction="column" spacing={3}>
        <Row title={"Version:"} value={transactionData.version} />
        <Row
          title={"Status:"}
          value={<TableTransactionStatus success={transactionData.success} />}
        />
        <Row
          title={"State Change Hash:"}
          value={transactionData.state_change_hash}
        />
        <Row
          title={"Event Root Hash:"}
          value={transactionData.event_root_hash}
        />
        <Row
          title={"Gas Used:"}
          value={<GasValue gas={transactionData.gas_used} />}
        />
        <Row title={"VM Status:"} value={transactionData.vm_status} />
        <Row
          title={"Accumulator Root Hash:"}
          value={transactionData.accumulator_root_hash}
        />
        {"timestamp" in transactionData && (
          <Row
            title={"Timestamp:"}
            value={getFormattedTimestamp(transactionData.timestamp)}
          />
        )}
      </Stack>
    </Box>
  );
}
