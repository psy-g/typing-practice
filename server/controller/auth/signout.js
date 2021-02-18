module.exports = async (req, res) => {
  req.session.destroy(() => {
    req.session;
  });
  res.clearCookie();
  res.status(200).json({ message: "signout" });
};
