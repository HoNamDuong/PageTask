// 3 to 16 characters.
// Must begin with a letter.
// Letters, numbers allowed.
const USERNAME_REGEX = /^[A-z][A-z0-9]{2,15}$/

// 8 to 24 characters.
// Must include a letters and a number.
const PASSWORD_REGEX = /^[A-z][A-z0-9]{2,15}$/
// const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*[0-9])[A-z0-9]{8,24}$/

// 5 to 50 characters.
// Must begin with every characters.
const TITLE_REGEX = /^.{5,50}$/

// 0 to 255 characters.
// Must begin with every characters.
const DESCRIPTION_REGEX = /^.{0,255}$/

const ROLES = {
    Admin: 'Admin',
    Mod: 'Mod',
    Member: 'Member',
}

const PRIORITY = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
}

module.exports = {
    USERNAME_REGEX,
    PASSWORD_REGEX,
    TITLE_REGEX,
    DESCRIPTION_REGEX,
    ROLES,
    PRIORITY,
}
