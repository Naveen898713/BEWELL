const resStatus = (res, status, msg) => {
  return res.status(200).send({ message: msg, status: status });
};

// Status code , message and data

const resStatusData = (res, status, msg, data) => {
  return res.status(200).send({ message: msg, data: data, status: status });
};

// Status code , message , data and token

const resStatusDataToken = (res, status, msg, data, token) => {
  return res
    .status(200)
    .send({ message: msg, token: token, data: data, status: status });
};

const resStatusToken = (res, status, msg, token) => {
  return res.status(200).send({ message: msg, token: token, status: status });
};
module.exports = {
  resStatus,
  resStatusData,
  resStatusDataToken,
  resStatusToken,
};
