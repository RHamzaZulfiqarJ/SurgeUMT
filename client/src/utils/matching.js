export const parseResume = (resumeText) => {
  const skillKeywords = [
    'react', 'vue', 'angular', 'javascript', 'typescript', 'python', 'java',
    'node.js', 'django', 'flask', 'express', 'postgresql', 'mongodb', 'mysql',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'figma', 'ui/ux',
    'rest api', 'graphql', 'redux', 'leadership', 'product management',
    'agile', 'scrum', 'mobile design', 'prototyping'
  ];

  const text = resumeText.toLowerCase();
  const foundSkills = skillKeywords.filter(skill => text.includes(skill));

  return foundSkills.map(skill =>
    skill.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
};

export const calculateMatchScore = (candidateSkills, requiredTags) => {
  if (!candidateSkills || !requiredTags || candidateSkills.length === 0 || requiredTags.length === 0) {
    return 0;
  }

  const normalizedCandidate = candidateSkills.map(s => s.toLowerCase());
  const normalizedRequired = requiredTags.map(s => s.toLowerCase());

  const intersection = normalizedCandidate.filter(skill =>
    normalizedRequired.includes(skill)
  );

  const union = [...new Set([...normalizedCandidate, ...normalizedRequired])];

  const jaccardScore = (intersection.length / union.length) * 100;

  return Math.round(jaccardScore);
};
