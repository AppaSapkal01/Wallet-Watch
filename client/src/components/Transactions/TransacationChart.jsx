import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";

import { listTransactionsAPI } from "../../services/transactions/transactionServices";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  // Fetch transactions
  const {
    data: transactions,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
    // Automatically refetch data on window focus or reconnect
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">Error: {error.message}</div>;
  }

  // Calculate totals
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  // Handle no transactions
  if (!transactions || transactions.length === 0) {
    return (
      <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200 text-center">
        <h1 className="text-2xl font-bold mb-4">No Transactions Available</h1>
        <p className="text-gray-600">There are no transactions to display at the moment.</p>
      </div>
    );
  }

  // Chart data
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income, totals?.expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">Transaction Overview</h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
