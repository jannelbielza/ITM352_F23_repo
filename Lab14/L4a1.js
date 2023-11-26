let filename = __dirname + '/user_data.json';

try {
  let users_reg_data = require(filename);

  if (users_reg_data['kazman']) {
    console.log('Password for kazman:', users_reg_data['kazman'].password);
    console.log('Email for kazman:', users_reg_data['kazman'].email);
  } else {
    console.error('User kazman not found.');
  }
} catch (err) {
  console.error('Error loading user data:', err);
}