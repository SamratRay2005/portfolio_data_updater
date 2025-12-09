import { Profile, Project, Education, Skill, Certification, Achievement } from './models/index.js';

export const adminOptions = {
  rootPath: '/admin',
  
  // 1. Branding: Make it look like a real product
  branding: {
    companyName: 'Samrat Portfolio',
    withMadeWithLove: false,
    theme: {
      colors: {
        primary100: '#4D70EB', // Your Brand Color
        hoverBg: '#f0f4ff',
      }
    }
  },

  // NOTE: Dashboard section removed to prevent crash. 
  // It will use the default AdminJS welcome screen.

  resources: [
    /* --- GROUP: PERSONAL --- */
    {
      resource: Profile,
      options: {
        navigation: { name: 'Personal', icon: 'User' },
        properties: {
          bio: { type: 'textarea', props: { rows: 10 } },
          _id: { isVisible: false },
          __v: { isVisible: false }
        }
      }
    },
    {
      resource: Education,
      options: {
        navigation: { name: 'Personal', icon: 'Education' },
        listProperties: ['institution', 'degree', 'year'],
        properties: { _id: { isVisible: false }, __v: { isVisible: false } }
      }
    },

    /* --- GROUP: CONTENT --- */
    {
      resource: Project,
      options: {
        navigation: { name: 'Content', icon: 'Folder' },
        listProperties: ['title', 'category', 'techStack'],
        properties: {
          description: { type: 'textarea', props: { rows: 5 } },
          details: { type: 'textarea', isArray: true },
          _id: { isVisible: false },
          __v: { isVisible: false }
        }
      }
    },
    {
      resource: Skill,
      options: {
        navigation: { name: 'Content', icon: 'Star' },
        listProperties: ['category'],
        properties: { _id: { isVisible: false }, __v: { isVisible: false } }
      }
    },
    {
      resource: Certification,
      options: {
        navigation: { name: 'Content', icon: 'Badge' },
        listProperties: ['title', 'issuer', 'year'],
        properties: { _id: { isVisible: false }, __v: { isVisible: false } }
      }
    },
    {
      resource: Achievement,
      options: {
        navigation: { name: 'Content', icon: 'Trophy' },
        properties: { _id: { isVisible: false }, __v: { isVisible: false } }
      }
    },
  ]
};