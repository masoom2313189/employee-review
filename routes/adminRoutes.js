const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/adminController');

// render assign review page
router.get(
  '/assign-review',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.assignReview
);

// assign review action
router.post(
  '/assign-review',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.assignReviewAction
);

// admin view
router.get(
  '/admin-view',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.adminView
);

// add employee
router.get(
  '/add-employee',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.addEmployee
);

// add employee action
router.post(
  '/add-employee',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.addEmployeeAction
);

// delete employee from list
router.get(
  '/delete/:id',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.deleteEmployee
);

// update employee page
router.get(
  '/update/:id',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.updateEmployee
);

// update employee action
router.post(
  '/update/:id',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.updateEmployeeAction
);

// make employee admin
router.post(
  '/make-admin',
  passport.checkAuthentication,
  passport.checkAdmin,
  adminController.makeAdmin
);

// sign out
router.get('/signout', passport.checkAuthentication, adminController.signout);

module.exports = router;
