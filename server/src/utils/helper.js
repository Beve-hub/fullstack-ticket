const bcrypt = require('bcryptjs');
 

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

function comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
    hashPassword,
    comparePasswords
};