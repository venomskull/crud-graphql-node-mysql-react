import { GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Message";
import { UserType } from "../TypeDefs/User";


export const CREATE_USER = {
    type: UserType,
    args: {
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(parent: any, args: any) {
        const {name, username, password} = args;
        await Users.insert({name, username, password});
        return args;
    }
};

export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        username: {type: GraphQLString},
        oldPassword: {type: GraphQLString},
        newPassword: {type: GraphQLString}
    },
    async resolve(parent: any, args: any) {
        const {username, oldPassword, newPassword} = args;
        const user = await Users.findOne({username: username});

        if (!user) {
            throw new Error('USERNAME DOESNOT EXIST');
        }
        const userPassword = user?.password;

        if (userPassword === oldPassword) {
            await Users.update({username: username}, {password: newPassword});
            return {successful: true, message: 'PASSWORD UPDATED'};
        } else {
            throw new Error('USER PASWORD MISMATCHES');
        }
    }
};

export const DELETE_USER = {
    type: MessageType,
    args: {
        id: {type: GraphQLID}
    },
    async resolve(parent: any, args: any) {
        const id = args.id;
        await Users.delete(id);
        // await Users.delete({username: username}); // if need to delete by username 

        return {successful: true, message: 'DELETED SUCCESSFULLY'};
    }
};