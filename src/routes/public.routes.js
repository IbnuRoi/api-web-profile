const { Router } = require("express");
const { getProjects, getProjectDetail, getProjectCarousel } = require("../controllers/projects.controller");

const router = Router()

// GET Method
router.get('/projects', getProjects)
router.get('/projects/:projectId', getProjectDetail)
router.get('/carousel', getProjectCarousel)

module.exports = router