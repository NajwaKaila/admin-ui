import React from 'react';
import Logo from "../Elements/Logo";

function AuthLayout(props) {
    const { children } = props;

    return (
        <main className="min-h-screen bg-[#f5f5f7] flex justify-center items-center">
            <div className="w-full max-w-[340px]">
                <Logo />
                {children}
            </div>
        </main>
    );
}

export default AuthLayout;