const fs = require('fs');
const crypto = require('crypto');

const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const existingEnvPath = '.env';
const secretToken = 'ACCESS_TOKEN_KEY';
const refreshToken = 'REFRESH_TOKEN_KEY';

// Verificăm dacă fișierul .env există
if (fs.existsSync(existingEnvPath)) {
  // Citirea conținutului existent al fișierului .env
  const existingEnvContent = fs.readFileSync(existingEnvPath, 'utf-8');

  // Verificăm dacă cheile există deja în conținutul fișierului .env
  if (
    existingEnvContent.includes(secretToken) &&
    existingEnvContent.includes(refreshToken)
  ) {
    console.log(
      `The keys "${secretToken}" and "${refreshToken}" already exist in the .env file. There is no need to generate them.`
    );
  } else {
    // Generarea cheilor
    const secretKey = generateRandomSecret();
    const refreshSecretKey = generateRandomSecret();

    // Actualizarea sau adăugarea cheilor în conținutul fișierului .env
    let updatedEnvContent = existingEnvContent;
    if (!existingEnvContent.includes(secretToken)) {
      updatedEnvContent += `\n${secretToken.toUpperCase()}=${secretKey}`;
    }
    if (!existingEnvContent.includes(refreshToken)) {
      updatedEnvContent += `\n${refreshToken.toUpperCase()}=${refreshSecretKey}`;
    }

    // Scrierea conținutului actualizat în fișierul .env
    fs.writeFileSync(existingEnvPath, updatedEnvContent);

    console.log('Secrets generated and added to .env file.');
  }
} else {
  console.error(
    'The .env file does not exist. Make sure it has been created in the current directory.'
  );
}
