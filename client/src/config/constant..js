export const ROLES = {
    Admin: 'Admin',
    Mod: 'Mod',
    Member: 'Member',
}

export const PRIORITY = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
}

export const SORT = {
    Default: 'Default',
    Time: 'Time',
}

export const PART = {
    Login: 'login',
    Register: 'register',
    Unauthorized: 'unauthorized',
    Dash: 'dash',
    Account: 'account',
    Profile: 'profile',
    Task: 'task',
    About: 'about',
}

// 3 to 16 characters.
// Must begin with a letter.
// Letters, numbers allowed.
export const USERNAME_REGEX = /^[A-z][A-z0-9]{2,15}$/

// 8 to 24 characters.
// Must include a letters and a number.
export const PASSWORD_REGEX = /^[A-z][A-z0-9]{2,15}$/
// export const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*[0-9])[A-z0-9]{8,24}$/

// 5 to 50 characters.
// Must begin with every characters.
export const TITLE_REGEX = /^.{5,50}$/

// 0 to 255 characters.
// Must begin with every characters.
export const DESCRIPTION_REGEX = /^.{0,255}$/
