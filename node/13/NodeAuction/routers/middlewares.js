exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("로그인 되어있음");
    next();
  } else {
    res.redirect("/?loginError=로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("로그인이 되어있지 않음");
    next();
  } else {
    res.redirect("/");
  }
};
