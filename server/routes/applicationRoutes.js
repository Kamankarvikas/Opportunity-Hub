import express from 'express';
import {applyapplication} from "../controllers/applyController.js";
const router = express.Router();
router.post("/application",applyapplication);
export default router;