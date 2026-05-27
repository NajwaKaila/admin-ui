import React from 'react';
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import CardBalance from "../components/Elements/Fragments/CardBalance";
import CardGoal from "../components/Elements/Fragments/CardGoal";
import CardUpcomingBill from '../components/Elements/Fragments/CardUpcomingBill';
import CardRecentTransaction from '../components/Elements/Fragments/CardRecentTransaction';
import CardStatistic from '../components/Elements/Fragments/CardStatistic';
import CardExpenseBreakdown from '../components/Elements/Fragments/CardExpenseBreakdown';
import { transactions, bills, expensesBreakdowns } from "../data";

function dashboard() {
    console.log(transactions);

  return (
    <>
    <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance />
          </div>
          <div className="sm:col-span-4">
            <CardGoal />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={bills} />
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>
      </MainLayout>
    </> 
  );
}

export default dashboard