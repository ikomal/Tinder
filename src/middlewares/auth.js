const authorize = (req, res, next) => {
  console.log("checking authorization");
  const token = "komal";
  const isauthorized = token === "komal";
  if (!isauthorized) {
    res.status(402).send("unauthorized access");
  } else {
    next();
  }
};

module.exports = {
    authorize,
};
