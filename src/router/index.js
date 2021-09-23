const baseRoute = require("../core/routerConfig");

baseRoute.get("/", (req, res) =>
  res
    .status(200)
    .send(
      '<code>Matacare Backend...<a target="_blank" href="https://documenter.getpostman.com/view/7896471/TzsikPQV" style="text-decoration: none; cursor: pointer; color: black; font-weight: bold">&lt;Go To Docs/&gt;</a></code>'
    )
);

module.exports = baseRoute;
