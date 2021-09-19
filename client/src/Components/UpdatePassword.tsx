import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { UPDATE_PASSWORD } from '../Graphql/Mutations';

function UpdatePassword() {
    const [userName, setUserName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD);

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <input type="text" placeholder='username..' onChange={e => setUserName(e.target.value)} />
            <input type="password" placeholder='current password..' onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='new password..' onChange={e => setNewPassword(e.target.value)} />
            <button onClick={() => {
                updatePassword({
                    variables: {
                        username: userName,
                        oldPassword: currentPassword,
                        newPassword: newPassword
                    }
                });
            }}>Update Password</button>
        </div>
    )
}

export default UpdatePassword
