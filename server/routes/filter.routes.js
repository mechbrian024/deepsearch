import express from "express";
import filterCtrl from "../controllers/filter.controller.js";

const router = express.Router();

router.route("/api/filter/search").post(filterCtrl.search);
router.route("/api/filter/create").post(filterCtrl.create);
router.route("/api/filter/filterByName/:name").get(filterCtrl.filterByName);

export default router;
