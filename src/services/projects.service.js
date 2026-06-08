const { v4: uuidv4 } = require('uuid')
const {
  getProjectsQuery,
  createProjectQuery,
  getProjectDetailQuery,
  deleteProjectQuery,
  updateProjectQuery,
  getCountProjects,
  getCarouselQuery,
  getPaginationProjectQuery,
} = require("../repositories/projects");
const { projectsFormat } = require("../utils/formatter/projectFormatter");
const cloudinary = require('../utils/cloudinary');

// Get list all data
const getProjectsService = async (req) => {
  const query = req.query

  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 9
  const skip = (page - 1) * limit

  const totalProjects = await getCountProjects()

  const totalPages = Math.ceil(totalProjects/limit)

  const nextPage = page < totalPages ? page + 1 : null

  const prevPage = page > 1 ? page - 1 : null

  const metadata = {
    page,
    limit,
    totalProjects,
    totalPages,
    nextPage,
    prevPage
  }

  const data = await getProjectsQuery(skip, limit);

  const result = {
    data: data.map(projectsFormat),
    metadata
  }

  return result
};

// Get project by projectId
const getProjectdetailService = async (req) => {
  const { projectId } = req.params
  const data = await getProjectDetailQuery(projectId)

  if (!data) {
    throw new Error(`Project with projectId ${projectId} not found`)
  }

  const pagination = await getPaginationProjectQuery(projectId)

  const result = {
    data: projectsFormat(data),
    metadata: pagination
  }
  return result
}

// Get List Project for Carousel
const getCarouselService = async() => {
  const result = await getCarouselQuery()

  if (!result) {
    throw new Error(`Error on Query Database!`)
  }

  return result.map(projectsFormat)
}

// Add New Project
const createProjectService = async (req) => {
  const {username} = req.user
  const values = req.body
  values.keyFeatures = JSON.parse(values.keyFeatures ?? '[]')
  values.techStacks = JSON.parse(values.techStacks ?? '[]')
  let dataImg = null

  try {
    if (!req.file) {
      throw new Error('Image not uploaded yet')
    }
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    const dataImg = await cloudinary.uploader.upload(fileStr, {
      // Upload File
      folder: 'project_banner'
    })
    const img = {
      imageId: dataImg.public_id,
      imageUrl: dataImg.secure_url
    }
    const result = await createProjectQuery(username, img, values)
    return result.projectId
  } catch (err) {
    if (dataImg?.public_id) {
      await cloudinary.uploader.destroy(dataImg.public_id)
    }
    throw err
  }
};

// Update Project
const updateProjectService = async (projectId, req) => {

  // Cek existing project by projectId
  const project = await getProjectDetailQuery(projectId)
  if (!project) throw new Error('Project not found')

  const values = req.body
  values.keyFeatures = JSON.parse(values.keyFeatures ?? '[]')
  values.techStacks = JSON.parse(values.techStacks ?? '[]')

  let img = {
    imageId: project.imageId,
    imageUrl: project.imageUrl
  }
  let newImg = null

  try {
    if (req.file) {
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      newImg = await cloudinary.uploader.upload(fileStr, {
        // Upload File
        folder: 'project_banner'
      })
      img = {
        imageId: newImg.public_id,
        imageUrl: newImg.secure_url
      }
    }

    const result = await updateProjectQuery(project.projectId, img, values)

    // Hapus gambar lama
    if(req.file && project.imageId) {
      await cloudinary.uploader.destroy(project.imageId)
    }

    return result

  } catch (err) {
    if(newImg?.public_id) {
      await cloudinary.uploader.destroy(newImg.public_id)
    }
    throw err
  }
}

// Delete project based on projectId
const deleteProjectService = async (req) => {
  const { projectId } = req.params

  const exist = await getProjectDetailQuery(projectId)
  if (!exist) {
    throw new Error(`Project with ID: ${projectId} not found`)
  }

  const data = await deleteProjectQuery(exist.projectId)
  await cloudinary.uploader.destroy(data.imageId)

  const result = `Project ${data.name} with ID: ${data.projectId} has been succesfully deleted`

  return result
}

module.exports = {
  getProjectsService,
  createProjectService,
  getProjectdetailService,
  getCarouselService,
  updateProjectService,
  deleteProjectService,
};
