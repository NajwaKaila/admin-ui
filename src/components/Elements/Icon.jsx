import React from "react";
import OverviewSVG from "../../assets/icons/Overview.svg";
import TransactionSVG from "../../assets/icons/Transaction.svg";
import BalanceSVG from "../../assets/icons/wallet.svg";
import BillSVG from "../../assets/icons/Bill.svg";
import ExpenseSVG from "../../assets/icons/Expencces.svg";
import GoalSVG from "../../assets/icons/Goal.svg";
import SettingSVG from "../../assets/icons/Settings.svg";
import DetailSVG from "../../assets/icons/Icon.svg";
import ChevronRightSVG from "../../assets/icons/chevrons-right.svg";
import LogoutSVG from "../../assets/icons/Icon2.svg";

const Icon = {
  Overview: ({ size = 24, ...props }) => (
    <img src={OverviewSVG} alt="Overview" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Transaction: ({ size = 24, ...props }) => (
    <img src={TransactionSVG} alt="Transaction" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Balance: ({ size = 24, ...props }) => (
    <img src={BalanceSVG} alt="Balance" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Bill: ({ size = 24, ...props }) => (
    <img src={BillSVG} alt="Bill" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Expense: ({ size = 24, ...props }) => (
    <img src={ExpenseSVG} alt="Expense" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Goal: ({ size = 24, ...props }) => (
    <img src={GoalSVG} alt="Goal" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Setting: ({ size = 24, ...props }) => (
    <img src={SettingSVG} alt="Setting" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Detail: ({ size = 24, ...props }) => (
    <img src={DetailSVG} alt="Detail" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  ChevronRight: ({ size = 24, ...props }) => (
    <img src={ChevronRightSVG} alt="ChevronRight" style={{ width: size, height: size }} className="invert" {...props} />
  ),
  Logout: ({ size = 24, ...props }) => (
    <img src={LogoutSVG} alt="Logout" style={{ width: size, height: size }} className="invert" {...props} />
  ),
};

export default Icon;