import {MongoClient} from 'mongodb';
import assert from 'assert';
import config from './config';
import certificates from './src/resources/json/certificates'
import users from './src/resources/json/users'
import userCertificates from './src/resources/json/userCertificates'

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    client.db('certificates').collection('certificates').insertMany(certificates)
        .then(response => {
            console.info('Certificates', response.insertedCount);
            client.db('certificates').collection('users').insertMany(users)
                .then(response => {
                    console.info('Users', response.insertedCount);
                    client.db('certificates').collection('user-certificates').insertMany(userCertificates)
                        .then(response => {
                            console.info('UserCertificates', response.insertedCount);
                            client.close();
                        });
                });
        });
});
