const userData = require("../user.json");

const getUser = (request, response) => {
  response.send(userData);
};

const searchUserByUUID = (request, response) => {
  const { uuid } = request.params;
  //   console.log(uuid);
  const result = userData.data.filter((u) => u.login.uuid === uuid);
  if (result.length) {
    response.json(result);
  } else {
    response.statusStatus(404);
  }
};

const filterUser = (request, response) => {
  const { gender, age } = request.query;
  //   console.log(gender, age);
  if (gender && age) {
    const result = userData.data.filter((user) => {
      return user.gender === gender && user.dob.age === Number(age);
    });
    if (result.length) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  } else if (age) {
    const result = userData.data.filter((user) => {
      return user.dob.age === Number(age);
    });
    if (result.length) {
      response.json(result);
    } else {
      response.Status(404);
      response.send("age not found");
    }
  } else if (gender) {
    const result = userData.data.filter((user) => {
      return user.gender === gender;
    });
    if (result.length) {
      response.json(result);
    } else {
      response.status(404);
      response.send("age not found");
    }
  } else {
    response.status(404);
  }
};

module.exports = {
  getUser,
  searchUserByUUID,
  filterUser,
};
