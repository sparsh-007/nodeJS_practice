const userData = require("../user.json");

const Joi = require("joi");
const { get } = require("../routes/userRoute");
const schema = Joi.object().keys({
  age: Joi.number().integer().min(0).max(100),
  gender: Joi.string().valid("male", "female"),
});

const getQueryError = (input) => {
  const result = schema.validate(input);
  return result.error;
};
const PASS = process.env.PASS;

const validpassword = (request) => {
  const { authorization } = request.headers;
  console.log(authorization);
  if (!authorization) {
    return false;
  }
  if (authorization !== PASS) return false;
  return true;
};

const getUser = (request, response) => {
  console.log(request.headers);
  if (!validpassword(request))
    return response.status(403).json({ message: "unauthorized request" });
  response.send(userData);
};
//in this part i learned about routig how to implement it in express

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
// how to protect our password we use enviourment variables
// so that depends on enviourment so they are global variable that can be used by any
const filterUser = (request, response) => {
  const { gender, age } = request.query;
  const error = getQueryError({ age, gender });
  if (error) {
    return response.status(422).json(error);
  }
  //   console.log(gender, age);
  // const allowedGender = new Set(["male", "female"]);
  //validation of gender

  // if (gender && !allowedGender.has(gender)) {
  //   return response
  //     .status(422)
  //     .json("please enter gender to be male or female");
  // }
  // //validation of age

  // if (age) {
  //   if (!Number(age)) {
  //     return response.status(422).json("please enter age in number format");
  //   }
  //   if (Number(age) < 0 && Number(age) > 100) {
  //     return response.status(422).json("please enter valid age");
  //   }
  // }

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
