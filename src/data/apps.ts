export interface App {
  slug: string;
  name: string;
  hook: string;
  model: string;
  category: string;
  pricingType: 'free' | 'one-time' | 'subscription';
  availability: 'available' | 'coming-soon' | 'pre-beta';
  appStoreUrl?: string;
  icon: string;
  features131: {
    core: string;
    support: string;
    delight: string;
  };
  features: string[];
  screenshots: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export const apps: App[] = [
  {
    slug: 'taskume',
    name: 'Taskume',
    hook: 'Tasks, not systems. Clarity, not clutter.',
    model: 'Free',
    category: 'Organization',
    pricingType: 'free',
    availability: 'pre-beta',
    icon: '/icons/taskume.png',
    features131: {
      core: 'one-tap task capture',
      support: 'agent-powered reminders',
      delight: 'visual priority cues'
    },
    features: [
      'One-tap task capture',
      'Visual priority cues',
      'Accessibility-first interface',
      'Agent-powered reminders and nudges',
      'Distraction-free workflows',
      'Cognitive companion design'
    ],
    screenshots: [
      '/screenshots/taskume-1.png',
      '/screenshots/taskume-2.png',
      '/screenshots/taskume-3.png'
    ],
    faq: [
      {
        question: 'What makes Taskume different?',
        answer: 'Taskume is designed specifically for neurodivergent and ESL users, stripping away complexity and focusing on intuitive, distraction-free workflows that adapt to how real users think.'
      },
      {
        question: 'How does the agent-powered system work?',
        answer: 'Our AI agents provide smart reminders and nudges that help you stay on track without overwhelming you, adapting to your working patterns and preferences.'
      },
      {
        question: 'When will Taskume be available?',
        answer: 'Taskume is currently in pre-beta testing. Sign up for updates to be notified when it launches!'
      }
    ]
  },
  {
    slug: 'cosmic-breathe',
    name: 'Cosmic Breathe',
    hook: 'Breathe in, glow out — 30 seconds to reset.',
    model: 'Free + $1.99 one-time unlock',
    category: 'Focus & Calm',
    pricingType: 'one-time',
    availability: 'coming-soon',
    appStoreUrl: 'https://apps.apple.com/app/cosmic-breathe/id123456789',
    icon: '/icons/cosmic-breathe.png',
    features131: {
      core: '30s breathing timer',
      support: 'anxiety management',
      delight: 'calming visuals'
    },
    features: [
      '30-second guided breathing sessions',
      'Anxiety and stress management',
      'Calming visual themes',
      'Haptic feedback for grounding',
      'Offline mode',
      'Apple Health integration'
    ],
    screenshots: [
      '/screenshots/cosmic-breathe-1.png',
      '/screenshots/cosmic-breathe-2.png',
      '/screenshots/cosmic-breathe-3.png'
    ],
    faq: [
      {
        question: 'How does the breathing timer work?',
        answer: 'The app guides you through a 30-second breathing cycle with visual cues and gentle haptic feedback to help manage anxiety and promote calm.'
      },
      {
        question: 'Can I use it offline?',
        answer: 'Yes! Cosmic Breathe works completely offline once downloaded, so you can access calming tools anywhere, anytime.'
      },
      {
        question: 'How do I download Cosmic Breathe?',
        answer: 'Cosmic Breathe is available now on the App Store! Download it and start your journey to better breathing and calm.'
      }
    ]
  },
  {
    slug: 'focus-orbit',
    name: 'Focus Orbit',
    hook: 'Stay in flow with 25-minute focus sprints.',
    model: 'Free + Pro subscription',
    category: 'Focus & Calm',
    pricingType: 'subscription',
    availability: 'coming-soon',
    icon: '/icons/focus-orbit.png',
    features131: {
      core: 'pomodoro sprints',
      support: 'distraction management',
      delight: 'progress visualization'
    },
    features: [
      '25-minute Pomodoro sprints',
      'Distraction management tools',
      'Progress visualization',
      'Focus statistics and insights',
      'Custom break intervals',
      'Calming background sounds'
    ],
    screenshots: [
      '/screenshots/focus-orbit-1.png',
      '/screenshots/focus-orbit-2.png',
      '/screenshots/focus-orbit-3.png'
    ],
    faq: [
      {
        question: 'What is the Pro subscription?',
        answer: 'Pro unlocks unlimited focus sessions, advanced statistics, custom themes, and priority support for neurodivergent users.'
      },
      {
        question: 'How does distraction management work?',
        answer: 'During focus sessions, the app provides tools to minimize distractions and help maintain attention, especially helpful for ADHD and other neurodivergent conditions.'
      },
      {
        question: 'When will Focus Orbit be available?',
        answer: 'Focus Orbit is coming soon! Sign up for updates to be notified when it launches.'
      }
    ]
  },
  {
    slug: 'lunar-lists',
    name: 'Lunar Lists',
    hook: 'Tasks that feel light-years simpler.',
    model: 'Free',
    category: 'Organization',
    pricingType: 'free',
    availability: 'coming-soon',
    appStoreUrl: 'https://apps.apple.com/app/lunar-lists/id123456791',
    icon: '/icons/lunar-lists.png',
    features131: {
      core: 'minimalist to-do list',
      support: 'executive function support',
      delight: 'calming interface'
    },
    features: [
      'Minimalist task management',
      'Executive function support',
      'Calming, distraction-free interface',
      'Smart task suggestions',
      'Voice input for accessibility',
      'Widget support'
    ],
    screenshots: [
      '/screenshots/lunar-lists-1.png',
      '/screenshots/lunar-lists-2.png',
      '/screenshots/lunar-lists-3.png'
    ],
    faq: [
      {
        question: 'Is it really free?',
        answer: 'Yes! Lunar Lists is completely free with no hidden costs or premium features. We believe accessibility tools should be accessible to everyone.'
      },
      {
        question: 'How does it help with executive function?',
        answer: 'The app provides a simple, distraction-free interface that reduces cognitive load and makes task management more manageable for neurodivergent users.'
      },
      {
        question: 'How do I download Lunar Lists?',
        answer: 'Lunar Lists is available now on the App Store! Download it and start organizing your tasks with simplicity.'
      }
    ]
  }
];

export const categories = ['All', ...Array.from(new Set(apps.map(app => app.category)))];

export function getAppBySlug(slug: string): App | undefined {
  return apps.find(app => app.slug === slug);
}

export function getAppsByCategory(category: string): App[] {
  if (category === 'All') return apps;
  return apps.filter(app => app.category === category);
}
