import express from 'express'
import { graphqlHTTP } from 'express-graphql' //allow us to initialize our express-graphql server. graphqlHTTP is a middleware
import cors from 'cors' //allow to connect react with graphql
import { createConnection } from 'typeorm'
import { schema } from './Schema'
import { Users } from './Entities/Users'

const main = async () => {
    await createConnection({
        type: 'mysql',
        database: 'graphqlCRUD',
        username: 'root',
        password: 'Deepan@123',
        logging: true,
        synchronize: false,
        entities: [Users]
    });

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));

    app.listen('3001', () => {
        console.log('🚀 SERVER IS RUNNING ON PORT 3001 --> http://localhost:3001/graphql')
    })
}

main().catch((err) => {
    console.log(err);
})
