import express from "express";
import UserController from "../controller/userController.js";
import {authMiddleware} from '../middleware/authenticate.js'

const router = express.Router();

// POST /signup
router.post("/signup", UserController.signup);

// POST user/ogin
router.post("/login", UserController.login);

// post api/createProfile
router.post("/createProfile/:userid", [authMiddleware.verifyjwt],UserController.createProfile);

// GET http://localhost:3000/user/profile/667440a581ef78d709491877
router.get("/profile/:userid", [authMiddleware.verifyjwt],UserController.getProfile);

// PUT http://localhost:3000/user/profile/6674fa9fcdfd3822d2750e90
router.put("/profile/:userid",[authMiddleware.verifyjwt], UserController.updateProfile);

// POST /api/t
// router.post("/logout", [authMiddleware.verifyjwt],UserController.logout);

export default router;
