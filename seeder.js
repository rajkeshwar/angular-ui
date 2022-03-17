const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const customers = Array(100)
  .fill(null)
  .map((_) => {
    return {
      id: faker.datatype.uuid(),
      accountNo: faker.phone.phoneNumber('38########'),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      accountType: faker.random.arrayElement([ 'Savings', 'Current', 'Trade']),
      balance: faker.datatype.number({ min: 200, max: 98000 }),
      createdOn: faker.date.between('2015-01-01', '2022-03-05'),
      updatedOn: faker.date.between('2015-01-01', '2022-03-15')
    };
  });

const users = Array(100)
  .fill(null)
  .map((_) => {
    return {
      id: faker.datatype.uuid(),
      accountNo: faker.phone.phoneNumber('38########'),
      password: faker.internet.password(),
      txnPassword: faker.internet.password(),
      otp: faker.datatype.number({ min: 6, max: 6 }),
      createdOn: faker.date.between('2015-01-01', '2022-03-05'),
      updatedOn: faker.date.between('2015-01-01', '2022-03-15')
    };
  });

fs.writeFileSync(
  path.resolve(__dirname, 'db.json'),
  JSON.stringify({ customers, users }, null, 2),
  { encoding: 'utf8', flag: 'w' }
)
