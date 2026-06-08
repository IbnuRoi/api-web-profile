const { Router } = require("express");
const { createProject, deleteProject, updateProject } = require("../controllers/projects.controller");
const upload = require("../middlewares/upload.middleware");


const router = Router()

// POST Method
router.post('/projects', upload.single('image'), createProject)
router.put('/projects/:projectId', upload.single('image'), updateProject)
router.delete('/projects/:projectId', deleteProject)

module.exports = router