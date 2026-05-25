import React from 'react';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignIn from '../components/Elements/Fragments/FormSignIn';

function signIn() {
  return (
    <AuthLayout>
        <FormSignIn />
    </AuthLayout>
  );
}

export default signIn