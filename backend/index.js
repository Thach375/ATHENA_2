// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

async function generatePassword(raw) {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(raw, salt);
  console.log(result);
}

generatePassword('athena@12345');
