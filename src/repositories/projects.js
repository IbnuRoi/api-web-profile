const { v4: uuidv4 } = require('uuid')
const prisma = require("../utils/prisma");

// Query List Data
const getProjectsQuery = async (skip, limit) => {
  const result = await prisma.projects.findMany({
    include: {
      keyFeatures: true,
      techStacks: true
    },
    orderBy: {
      date: 'desc'
    },
    skip: skip,
    take: limit
  })

  return result
};

// Query Get Project by projectId
const getProjectDetailQuery = async (projectId) => {
  const result = await prisma.projects.findUnique({
    where: {projectId: projectId},
    include: {
      keyFeatures: true,
      techStacks: true
    }
  })

  return result
}

// Query Count All Projects
const getCountProjects = async () => {
  const result = await prisma.projects.count()

  return result
}

// Query Get Project Carousel
const getCarouselQuery = async () => {
  const result = await prisma.projects.findMany({
    include:{
      keyFeatures: true,
      techStacks: true
    },
    orderBy: {
      date: 'desc'
    },
    take: 6
  })

  return result
}

// Query Project for Pagination on Project Detail
const getPaginationProjectQuery = async(projectId) => {
  const allData = await prisma.projects.findMany({
    select: {
      projectId: true,
      name: true
    },
    orderBy: {
      date: 'desc'
    }
  })


  const currentIndex = allData.findIndex(p => p.projectId === projectId)

  if(currentIndex === -1) return {prev: null, next: null}

  const result = {
    index: currentIndex + 1,
    totalProjects: allData.length,
    prev: currentIndex > 0 ? allData[currentIndex - 1] : null,
    next: currentIndex < allData.length - 1 ? allData[currentIndex + 1] : null
  }

  return result
}

// Query Add New Project
const createProjectQuery = async (user, img, data) => {
  const result = await prisma.$transaction(async (tx) => {

    const projectId = uuidv4()

    // Create New Project
    const newProject = await tx.projects.create({
      data: {
        projectId,
        username: user,
        name: data.name,
        date: new Date(data.date),
        projectType: data.projectType,
        shortDescription: data.shortDescription,
        description: data.description,
        challenge: data.challenge,
        solution: data.solution,
        imageId: img.imageId,
        imageUrl: img.imageUrl,
        githubLink: data.githubLink,
        livePreview: data.livePreview
      }
    })

    // Create key features
    await tx.keyFeatures.createMany({
      data: data.keyFeatures.map((feature) => ({
        feature,
        projectId
      }))
    })

    await tx.techStacks.createMany({
      data: data.techStacks.map((stack) => ({
        ...stack,
        projectId
      }))
    })

    return newProject
  })

  return result
}

// Update Query by projectId
const updateProjectQuery = async (projectId, img, data) => {
  const result = await prisma.$transaction(async (tx) => {
    const updatedProject = await tx.projects.update({
      where: { projectId },
      data: {
        name: data.name,
        projectType: data.projectType,
        shortDescription: data.shortDescription,
        description: data.description,
        challenge: data.challenge,
        solution: data.solution,
        imageId: img.imageId,
        imageUrl: img.imageUrl,
        githubLink: data.githubLink,
        livePreview: data.livePreview
      }
    })

    await Promise.all([
      tx.keyFeatures.deleteMany({ where: { projectId }}),
      tx.techStacks.deleteMany({ where: { projectId }})
    ])

    await tx.keyFeatures.createMany({
      data: data.keyFeatures.map((feature) => ({
        feature,
        projectId
      }))
    })

    await tx.techStacks.createMany({
      data: data.techStacks.map((stack) => ({
        ...stack,
        projectId
      }))
    })

    return updatedProject
  })

  return result
}

// Delete Query by projectId
const deleteProjectQuery = async (projectId) => {
  const result = await prisma.projects.delete({
    where:{projectId}
  })

  return result
}

module.exports = {
  getProjectsQuery,
  getProjectDetailQuery,
  getCountProjects,
  getCarouselQuery,
  getPaginationProjectQuery,
  createProjectQuery,
  updateProjectQuery,
  deleteProjectQuery,
};