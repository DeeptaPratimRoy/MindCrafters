// backend/controllers/userController.js

// @desc    Get logged in user profile
// @route   GET /user/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  if (req.user) {
    res.json({
      id: req.user._id, // use id for frontend consistency
      name: req.user.name, // include name
      email: req.user.email,
      createdAt: req.user.createdAt,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
