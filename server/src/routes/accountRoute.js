const express = require('express')
const { ROLES } = require('../config/constant')
const accountsController = require('../controllers/accountController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

const router = express.Router()

router.use(verifyJWT)

router
    .route('/')
    .get(accountsController.getAccount)
    .post(accountsController.createNewAccount)
    .patch(accountsController.updateAccount)
    .delete(accountsController.deleteAccount)

router
    .route('/all')
    .get(verifyRoles(ROLES.Admin, ROLES.Mod), accountsController.getAllAccounts)

router
    .route('/page')
    .get(
        verifyRoles(ROLES.Admin, ROLES.Mod),
        accountsController.getAllAccountByPage
    )

router
    .route('/status')
    .patch(
        verifyRoles(ROLES.Admin, ROLES.Mod),
        accountsController.updateAccountStatus
    )

router
    .route('/role')
    .patch(verifyRoles(ROLES.Admin), accountsController.updateAccountRole)

router
    .route('/delete')
    .delete(verifyRoles(ROLES.Admin), accountsController.deleteOtherAccount)

module.exports = router
