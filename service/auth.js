const tokentoUserMap = new Map();

function setUser(id, user) {
    tokentoUserMap.set(id, user);
}

function getUser(id) {
    return tokentoUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}