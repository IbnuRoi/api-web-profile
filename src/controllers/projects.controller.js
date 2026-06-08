const {
  getProjectsService,
  createProjectService,
  deleteProjectService,
  getProjectdetailService,
  updateProjectService,
  getCarouselService,
} = require("../services/projects.service");
const response = require("../utils/response");

// GET Controller
// GET: List of All Projects
const getProjects = async (req, res) => {
  try {
    const {data, metadata} = await getProjectsService(req);
    response(200, data, "List all projects", res, metadata);
  } catch (err) {
    response(500, err.message, "Server Error!", res)
  }
};

// GET: Project Detail Controller
const getProjectDetail = async (req, res) => {
  try {
    const {data, metadata} = await getProjectdetailService(req)
    response(200, data, `Succesfully Get Data with projectId`, res, metadata)
  } catch (err) {
    if(err.message.includes('not found')) {
      response(404, null, err.message, res)
    } else {
      response(500, null, err.message, res)
    }
  }
}

// GET: List Project for Carousel
const getProjectCarousel = async(req, res) => {
  try {
    const data = await getCarouselService()
    response(200, data, `Succesfully Get Data for Carousel`, res)
  } catch (err) {
    response(500, err.message, "Server Error!", res)
  }
}

// POST Controller
// POST: Add New Project
const createProject = async (req, res) => {
  try {
    if (!req.file) {
      return response(400, "Data Empty!", "No Image Uploaded!", res)
    }
    const projectId = await createProjectService(req);
    const data = `Succesfully add new project with id: ${projectId}`
    response(201, data, "Project Created Successfully!", res);
  } catch (err) {
    response(500, err.message, "Server Error!", res)
  }
};

// PUT Controller
// PUT: Update data project by projectId
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params

    if(!projectId) {
      return response(400, "Data Empty!", "Project ID is required", res)
    }

    const data = await updateProjectService(projectId, req)
    response(200, data, "Project Update Successfully", res);
  } catch (err) {
    if (err.message === 'Project not found') {
      return res.status(404).json({ message: err.message })
    }
    res.status(500).json({ message: err.message })
  }
}

// DELETE Controller
// DELETE: Delete project by projectId
const deleteProject = async (req, res) => {
  try {
    const data = await deleteProjectService(req)
    response(200, data, 'Delete Project Succesfully!', res)
  } catch (err) {
    if(err.message.includes('not found')) {
      response(404, null, err.message, res)
    } else {
      response(500, null, err.message, res)
    }
  }
}

module.exports = {
  getProjects,
  getProjectCarousel,
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject
};
