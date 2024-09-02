import React from "react";
import TransactionList from "../Transactions/TransactionList";
import TransactionChart from "../Transactions/TransacationChart";

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionList />
    </>
  );
};

export default Dashboard;