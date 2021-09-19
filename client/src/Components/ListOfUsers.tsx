import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { DELETE_USER } from '../Graphql/Mutations';
import { GET_ALL_USERS } from '../Graphql/Queries'

function ListOfUsers() {
    const { data } = useQuery(GET_ALL_USERS);
    const [deleteUser, {error}] = useMutation(DELETE_USER);
    

    return (
        <div>
            {data && data.getAllUsers.map((user: any) => (
                <div>{user.name} / {user.username} {' '} <button onClick={() => {
                    deleteUser({
                        variables: {
                            id: user.id
                        }
                    })
                }}>Delete</button></div>
            ))}
        </div>
    )
}

export default ListOfUsers
