import express from "express";
import filterCtrl from "../controllers/filter.controller.js";

const router = express.Router();

router.route("/api/filter").post(filterCtrl.filter);

export default router;
