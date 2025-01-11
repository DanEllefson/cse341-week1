const maryRoute = (req, res) => {
  res.send('Mary Ellefson');
};

const danRoute = (req, res) => {
  res.send('Dan Ellefson');
};

module.exports = { maryRoute, danRoute };