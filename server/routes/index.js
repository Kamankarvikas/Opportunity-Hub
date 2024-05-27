import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./companiesRoutes.js";
import jobRoute from "./jobRoutes.js";
import ApplicationRoute from "./applicationRoutes.js"

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); 
router.use(`${path}users`, userRoute);
router.use(`${path}companies`, companyRoute);
router.use(`${path}jobs`, jobRoute);
router.use(`${path}applications`, ApplicationRoute);

export default router;