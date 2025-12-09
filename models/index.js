import mongoose from 'mongoose';

// 1. Profile Schema
const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  location: String,
  email: String,
  bio: { type: String, widget: 'textarea' }, // 'textarea' makes the input box bigger in UI
  avatar: String,
  socials: [{ platform: String, url: String, icon: String }],
});

// 2. Project Schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: { type: String, widget: 'textarea' },
  details: [String],
  techStack: [String],
  link: String,
  repo: String,
});

// 3. Education Schema
const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  year: String,
  details: String,
});

// 4. Skill Schema
const SkillSchema = new mongoose.Schema({
  category: String,
  items: [{ name: String, icon: String }],
});

// 5. Certification Schema
const CertificationSchema = new mongoose.Schema({
  category: String,
  title: String,
  issuer: String,
  year: String,
  link: String,
});

// 6. Achievement Schema
const AchievementSchema = new mongoose.Schema({
  category: String,
  items: [{ title: String, rank: String, link: String }],
});

// Export Models
export const Profile = mongoose.model('Profile', ProfileSchema);
export const Project = mongoose.model('Project', ProjectSchema);
export const Education = mongoose.model('Education', EducationSchema);
export const Skill = mongoose.model('Skill', SkillSchema);
export const Certification = mongoose.model('Certification', CertificationSchema);
export const Achievement = mongoose.model('Achievement', AchievementSchema);