const projectsFormat = (data) => ({
  id: data.projectId,
  name: data.name,
  projectType: data.projectType,
  date: new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }),
  imageUrl: data.imageUrl,
  sourceCode: data.githubLink,
  livePreview: data.livePreview,

  description: {
    short: data.shortDescription,
    long: data.description,
  },

  techChallenge: {
    challenge: data.challenge,
    solution: data.solution,
  },

  techStacks: data.techStacks.map((stack) => ({
    id: stack.id,
    category: stack.category,
    name: stack.name
  })),

  keyFeatures: data.keyFeatures.map((feature) => ({
    id: feature.id,
    feature: feature.feature
  })),
  
  createdAt: data.createdAt,
});

module.exports = {
    projectsFormat
}