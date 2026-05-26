import React from "react"; 
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";

function MainLayout(props) {
  const { children } = props;

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction", },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];
  
  return (
    <>
        <div className="flex min-h-screen">
            <aside className="bg-defaultBlack w-24 sm:w-56 text-special-bg2 flex flex-col justify-between px-4 py-12 flex-shrink-0">
                <div>
                    <div className="mb-10">
                        <Logo variant="secondary" />
                    </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  	className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
                </div>                
                <div>
                    <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md cursor-pointer">
                        <div className="mx-auto sm:mx-0 flex items-center justify-center">
                            <Icon.Logout size={20} color="white" />
                        </div>
                        <div className="ms-3 hidden sm:block">Logout</div>
                    </div>
                    <div className="border my-10 border-b-special-bg"></div>
                    <div className="flex flex-nowrap justify-between items-center gap-2 px-2">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center text-xs text-white">
                            AV
                        </div>
                        <div className="hidden sm:block text-xs truncate flex-1">
                            <p className="font-semibold text-white truncate">Username</p>
                            <p className="text-gray-400 text-[10px] cursor-pointer hover:underline">View Profile</p>
                        </div>
                        <div className="hidden sm:block text-xs flex-shrink-0">
                            <Icon.Detail size={16} color="white" />
                        </div>
                    </div>
                </div>
            </aside>

            <div className="bg-special-mainBg flex-1 flex flex-col min-w-0">
                <header className="border border-b border-gray-05 px-6 py-7 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="font-bold text-2x1 me-6">Username</div> 
                        <div className="text-gray-03 hidden sm:block">May 19, 2023</div> 
                    </div>
                    <div className="flex items-center">
                        <div className="me-10">
                            <NotificationsIcon className="text-gray-01 scale-110" />
                        </div> 
                        <Input backgroundColor="bg-white" border="border-white" /> 
                    </div>
                </header>
                <main className="flex-1 px-6 py-4">{children}</main>
            </div>
        </div>
    </>
  );
}

export default MainLayout;