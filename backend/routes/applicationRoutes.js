import express from "express";
import { deleteApplication,updateApplication,getApplications , createApplication } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getApplicationStats, getApplication} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/",authMiddleware, createApplication);
router.get("/",authMiddleware,getApplications);
router.get("/stats",authMiddleware,getApplicationStats);
router.put("/:id",authMiddleware, updateApplication);
router.delete("/:id",authMiddleware,deleteApplication);
router.get("/:id", authMiddleware, getApplication);

export default router;      