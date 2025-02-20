import * as React from "react";
import {Types} from "aptos";
import {Stack, Box} from "@mui/material";
import Row from "./Components/Row";
import HashButton, {HashType} from "../../../components/HashButton";
import ContentBox from "../../../components/IndividualPageContent/ContentBox";
import ContentRow from "../../../components/IndividualPageContent/ContentRow";
import {
  TableTransactionStatus,
  TransactionStatus,
} from "../../../components/TransactionStatus";
import {useGetInDevMode} from "../../../api/hooks/useGetInDevMode";
import {getLearnMoreTooltip} from "../helpers";
import TimestampValue from "../../../components/IndividualPageContent/ContentValue/TimestampValue";
import GasValue from "../../../components/IndividualPageContent/ContentValue/GasValue";
import {getFormattedTimestamp} from "../../utils";

type BlockMetadataOverviewTabProps = {
  transaction: Types.Transaction;
};

export default function BlockMetadataOverviewTab({
  transaction,
}: BlockMetadataOverviewTabProps) {
  const inDev = useGetInDevMode();
  const transactionData =
    transaction as Types.Transaction_BlockMetadataTransaction;

  return inDev ? (
    <Box marginBottom={3}>
      <ContentBox paddingLeft={1.5}>
        <ContentRow
          title="Status:"
          value={<TransactionStatus success={transactionData.success} />}
          tooltip={getLearnMoreTooltip("status")}
        />
        <ContentRow
          title="Proposer:"
          value={
            <HashButton
              hash={transactionData.proposer}
              type={HashType.ACCOUNT}
            />
          }
          tooltip={getLearnMoreTooltip("proposer")}
        />
        <ContentRow
          title="ID:"
          value={transactionData.id}
          tooltip={getLearnMoreTooltip("id")}
        />
        <ContentRow
          title={"Version:"}
          value={transactionData.version}
          tooltip={getLearnMoreTooltip("version")}
        />
        <ContentRow
          title="Epoch:"
          value={transactionData.epoch}
          tooltip={getLearnMoreTooltip("epoch")}
        />
        <ContentRow
          title="Round:"
          value={transactionData.round}
          tooltip={getLearnMoreTooltip("round")}
        />
        <ContentRow
          title="Timestamp:"
          value={<TimestampValue timestamp={transactionData.timestamp} />}
          tooltip={getLearnMoreTooltip("timestamp")}
        />
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
        <Row title={"ID:"} value={transactionData.id} />
        <Row title={"Version:"} value={transactionData.version} />
        <Row title={"Round:"} value={transactionData.round} />
        <Row
          title={"Status:"}
          value={<TableTransactionStatus success={transactionData.success} />}
        />
        <Row
          title={"Proposer:"}
          value={
            <HashButton
              hash={transactionData.proposer}
              type={HashType.ACCOUNT}
            />
          }
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
        <Row
          title={"Timestamp:"}
          value={getFormattedTimestamp(transactionData.timestamp)}
        />
      </Stack>
    </Box>
  );
}
