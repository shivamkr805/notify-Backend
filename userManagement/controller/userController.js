import signupModels from "../models/signup.js";
import profileModels from "../models/profile.js";
import { createjwt } from "../../acess/userJwt.js";
const UserController = {
  async signup(req, res) {
    const data = req.body;
    const dataCont = {
      username: data.username,
      email: data.email,
      password: data.password,
      userType:data.usertype
    };
    try {
      const userData = await signupModels.create(dataCont);
      const jwt_token = createjwt({ userId: userData.email, date: Date.now() });
      res
        .send({
          id: userData._id,
          username: userData.username,
          email: userData.email,
          access_token: jwt_token,
        })
        .status(200);
    } catch (err) {
      console.log(err + " while sending data from cont to models");
    }
  },

  async login(req, res) {
    // Implement login logic
    const userdata = req.body;
    const userCont = {
      email: userdata.email,
      password: userdata.password,
    };
    const user = await signupModels
      .findOne({ email: userCont.email, password: userCont.password })
      .then((data) => {
        if (data == null) {
          res.send({ msg: "user could not found" });
        } else {
          const jwt_token = createjwt({ userId: userdata.email,date:Date.now()});
          res.send({
            msg: "welcome again",
            username: data.username,
            email: data.email,
            access_token: jwt_token,

          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async createProfile(req, res) {
    const data = req.body;
    const useid = req.params.userid;
    const dataCont = {
      _id: useid,
      fullName: data.fullName,
      D_O_B: new Date(req.body.dob),
      PhoneNumber: new Number(data.phoneNumber),
    };
    try {
      const userData = await profileModels.create(dataCont);
      res
        .send({
          id: userData.id,
          fullName: userData.fullName,
          phoneNumber: userData.PhoneNumber,
          DOB: userData.D_O_B,
        })
        .status(200)
    } catch (err) {
      console.log(err + " while sending data from cont to models");
    }
  },
  async getProfile(req, res) {
    const userid = req.params.userid;
    try {
      const userProfile = await profileModels.findById(userid);
      if (userProfile === null) {
        res.send({ msg: "userProfile could not found" });
      } else {
        res.send(userProfile);
      }
    } catch (err) {
      console.log("error while fetching the user profile " + err);
      res.send({
        msg: "internal server error while fetching your profile data",
      });
    }
  },

  async updateProfile(req, res) {
    // Implement update profile logic
    const data = req.body;
    const userid = req.params.userid;
    const dataCont = {
      _id: userid,
      fullName: data.fullName,
      D_O_B: new Date(req.body.dob),
      phoneNumber: new Number(data.phoneNumber),
    };
    try {
      const updatedData = await profileModels.findByIdAndUpdate(
        userid,
        dataCont,
        { new: true, runValidators: true }
      );
      res
        .send({
          id: updatedData.id,
          fullName: updatedData.fullName,
          phoneNumber: updatedData.PhoneNumber,
          DOB: updatedData.D_O_B,
        })
        .status(200);
    } catch (err) {
      console.log(err + " while sending data from cont to models");
    }
  },

  // async logout(req, res) {
  //   // Implement logout logic
  // },
};

export default UserController;
