const User = require('../models/employeeSchema');
const Review = require('../models/reviewSchema');

// assign reviews to employees :: ADMIN
module.exports.assignReview = async function (req, res) {
  try {
    const users = await User.find({});
    return res.render('assign_review', { users });
  } catch (error) {
    console.log(`Error in assigning task: ${error}`);
    res.redirect('back');
  }
};

// assign review to employees :: ADMIN
module.exports.assignReviewAction = async function (req, res) {
  const { employee, reviewer } = req.body;
  try {
    if (employee === reviewer) {
      console.log(`You cannot assign reviews to yourself`);
      return res.redirect('/admin/assign-review');
    }

    // find the employee that has to write review and
    // the employee for which the review has to be written
    const to = await User.findById(employee);
    const from = await User.findById(reviewer);

    // push the users in myReviews and myEvaluations array
    to.myReviews.push(from);
    from.myEvaluations.push(to);
    to.save();
    from.save();

    console.log('Review Assigned Successfully');
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in assigning review: ${error}`);
    res.redirect('back');
  }
};

// render admin view :: ADMIN
module.exports.adminView = async function (req, res) {
  try {
    const users = await User.find({});
    return res.render('admin_view', { users });
  } catch (error) {
    console.log(`Error in showing records: ${error}`);
    res.redirect('back');
  }
};

// admin sign out
module.exports.signout = function (req, res) {
  req.logout();
  return res.redirect('/employee/signin');
};

// render add employee page :: ADMIN
module.exports.addEmployee = function (req, res) {
  return res.render('add_employee_admin');
};

// add employee action :: ADMIN
module.exports.addEmployeeAction = async function (req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password != confirmPassword) {
      return res.redirect('back');
    }
    const employee = await User.findOne({ email });

    if (employee) {
      console.log('email already exists');
      return res.redirect('back');
    }
    const newEmployee = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    });
    await newEmployee.save();
    if (!newEmployee) {
      console.log(`Error in creating employee`);
      return res.redirect('back');
    }
    return res.redirect('/admin/admin-view');
  } catch (error) {
    console.log(`Error in creating Employee: ${error}`);
    res.redirect('back');
  }
};

// delete employee :: ADMIN
module.exports.deleteEmployee = async function (req, res) {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);

    console.log('Employee Deleted Successfully');
    res.redirect('back');
  } catch (error) {
    console.log(`Error in deleting Employee: ${error}`);
    res.redirect('back');
  }
};

// Update employee view :: ADMIN
module.exports.updateEmployee = async function (req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.render('update_employee', { user });
  } catch (error) {
    console.log(`Error in updating employee :  ${error}`);
    res.redirect('back');
  }
};

// make employee admin
module.exports.makeAdmin = async function (req, res) {
  const { adminName } = req.body;
  try {
    const user = await User.findByIdAndUpdate(adminName, { isAdmin: true });
    await user.save();

    console.log('Employee made admin successfully');

    return res.redirect('back');
  } catch (error) {
    console.log(`Error in making employee admin: ${error}`);
    res.redirect('back');
  }
};

// update employee action :: ADMIN
module.exports.updateEmployeeAction = async function (req, res) {
  const { id } = req.params;
  const { name, password, admin, email } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      name,
      password,
      email,
      isAdmin: admin,
    });
    console.log('Employee updated successfully');
    return res.redirect('/admin/admin-view');
  } catch (error) {
    console.log(`Error in updating employee :  ${error}`);
    res.redirect('back');
  }
};
