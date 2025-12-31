export interface NicheConfig {
  // Business Identity
  business: {
    name: string;
    serviceType: string;
    tagline: string;
    description: string;
  };
  
  // Branding
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
  
  // Vapi Configuration
  vapi: {
    assistantId: string;
    voiceType: string;
    phoneNumber?: string;
  };
  
  // GoHighLevel Configuration
  ghl: {
    pipelineId: string;
    stageId: string;
    tagNames: string[];
    customFields: Record<string, string>; // Maps internal field names to GHL field IDs
  };
  
  // Qualification Logic
  qualification: {
    questions: QualificationQuestion[];
    highIntentSignals: string[];
    disqualifiers: string[];
  };
  
  // Landing Page Content
  content: {
    hero: {
      headline: string;
      subheadline: string;
      ctaText: string;
      backgroundImage?: string;
    };
    features: Feature[];
    testimonials?: Testimonial[];
  };
}

export interface QualificationQuestion {
  id: string;
  question: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  required: boolean;
  weight: number; // For scoring qualification
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

// Niche Configurations
const JUNK_REMOVAL_CONFIG: NicheConfig = {
  business: {
    name: "Swift Junk Removal",
    serviceType: "Junk Removal",
    tagline: "Fast, Reliable, Eco-Friendly",
    description: "Professional junk removal service for homes and businesses"
  },
  branding: {
    logoUrl: "/logos/junk-removal-logo.png",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    accentColor: "#f59e0b",
    fontFamily: "Inter"
  },
  vapi: {
    assistantId: "junk-removal-assistant-id",
    voiceType: "professional-male",
    phoneNumber: "+1234567890"
  },
  ghl: {
    pipelineId: "junk-pipeline-id",
    stageId: "new-lead-stage-id",
    tagNames: ["junk-removal", "web-lead"],
    customFields: {
      truckLoads: "custom_field_truck_loads",
      propertyType: "custom_field_property_type",
      accessType: "custom_field_access_type"
    }
  },
  qualification: {
    questions: [
      {
        id: "truck_loads",
        question: "How many truck loads of junk do you estimate?",
        type: "select",
        options: ["1 truck load", "2-3 truck loads", "4+ truck loads", "Not sure"],
        required: true,
        weight: 3
      },
      {
        id: "property_type",
        question: "What type of property is this for?",
        type: "select",
        options: ["Residential home", "Apartment", "Office", "Retail space", "Other"],
        required: true,
        weight: 2
      },
      {
        id: "timeline",
        question: "When do you need the junk removed?",
        type: "select",
        options: ["ASAP", "Within a week", "Within a month", "Just exploring"],
        required: true,
        weight: 4
      }
    ],
    highIntentSignals: ["ASAP", "within a week", "need it done", "urgent"],
    disqualifiers: ["just browsing", "maybe next year", "not sure if needed"]
  },
  content: {
    hero: {
      headline: "Fast & Reliable Junk Removal Service",
      subheadline: "Get rid of unwanted items quickly and responsibly. Same-day service available.",
      ctaText: "Get Free Quote",
      backgroundImage: "/images/junk-removal-hero.jpg"
    },
    features: [
      {
        icon: "🚛",
        title: "Same-Day Service",
        description: "Quick response times for urgent junk removal needs"
      },
      {
        icon: "♻️",
        title: "Eco-Friendly",
        description: "We donate and recycle whenever possible"
      },
      {
        icon: "💰",
        title: "Fair Pricing",
        description: "Transparent pricing with no hidden fees"
      }
    ]
  }
};

const HOUSE_CLEANING_CONFIG: NicheConfig = {
  business: {
    name: "Sparkle Clean Services",
    serviceType: "House Cleaning",
    tagline: "Your Home, Spotlessly Clean",
    description: "Professional residential cleaning services you can trust"
  },
  branding: {
    logoUrl: "/logos/cleaning-logo.png",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    accentColor: "#f59e0b",
    fontFamily: "Inter"
  },
  vapi: {
    assistantId: "cleaning-assistant-id",
    voiceType: "professional-female"
  },
  ghl: {
    pipelineId: "cleaning-pipeline-id",
    stageId: "new-lead-stage-id",
    tagNames: ["house-cleaning", "web-lead"],
    customFields: {
      bedrooms: "custom_field_bedrooms",
      bathrooms: "custom_field_bathrooms",
      frequency: "custom_field_frequency"
    }
  },
  qualification: {
    questions: [
      {
        id: "bedrooms",
        question: "How many bedrooms does your home have?",
        type: "select",
        options: ["1", "2", "3", "4", "5+"],
        required: true,
        weight: 2
      },
      {
        id: "bathrooms",
        question: "How many bathrooms?",
        type: "select",
        options: ["1", "2", "3", "4+"],
        required: true,
        weight: 2
      },
      {
        id: "frequency",
        question: "How often would you like cleaning service?",
        type: "select",
        options: ["One-time", "Weekly", "Bi-weekly", "Monthly"],
        required: true,
        weight: 4
      }
    ],
    highIntentSignals: ["weekly", "bi-weekly", "regular service", "ongoing"],
    disqualifiers: ["just curious", "maybe someday", "too expensive"]
  },
  content: {
    hero: {
      headline: "Professional House Cleaning Services",
      subheadline: "Reliable, thorough cleaning that fits your schedule and budget.",
      ctaText: "Book Cleaning",
      backgroundImage: "/images/cleaning-hero.jpg"
    },
    features: [
      {
        icon: "✨",
        title: "Deep Cleaning",
        description: "Thorough cleaning of every room and surface"
      },
      {
        icon: "🔒",
        title: "Trusted & Insured",
        description: "Background-checked cleaners, fully insured"
      },
      {
        icon: "📅",
        title: "Flexible Scheduling",
        description: "Weekly, bi-weekly, or monthly service options"
      }
    ]
  }
};

const MOBILE_NOTARY_CONFIG: NicheConfig = {
  business: {
    name: "Swift Mobile Notary",
    serviceType: "Mobile Notary",
    tagline: "Professional Notary Services at Your Location",
    description: "Certified mobile notary services for all your document needs"
  },
  branding: {
    logoUrl: "/logos/notary-logo.png",
    primaryColor: "#1f2937",
    secondaryColor: "#374151",
    accentColor: "#f59e0b",
    fontFamily: "Inter"
  },
  vapi: {
    assistantId: "notary-assistant-id",
    voiceType: "professional-female"
  },
  ghl: {
    pipelineId: "notary-pipeline-id",
    stageId: "new-lead-stage-id",
    tagNames: ["mobile-notary", "web-lead"],
    customFields: {
      documentType: "custom_field_document_type",
      signerCount: "custom_field_signer_count",
      location: "custom_field_location",
      urgency: "custom_field_urgency"
    }
  },
  qualification: {
    questions: [
      {
        id: "document_type",
        question: "What type of document needs to be notarized?",
        type: "select",
        options: ["Real Estate", "Legal Documents", "Financial Documents", "Personal Documents", "Business Documents"],
        required: true,
        weight: 3
      },
      {
        id: "signer_count",
        question: "How many people need to sign?",
        type: "select",
        options: ["1 person", "2 people", "3-5 people", "More than 5"],
        required: true,
        weight: 2
      },
      {
        id: "location",
        question: "Where would you like the notary service?",
        type: "select",
        options: ["Home", "Office", "Hospital/Care facility", "Other location"],
        required: true,
        weight: 2
      },
      {
        id: "timeline",
        question: "When do you need this service?",
        type: "select",
        options: ["Today", "Within 24 hours", "Within a week", "Flexible timing"],
        required: true,
        weight: 4
      }
    ],
    highIntentSignals: ["today", "urgent", "ASAP", "real estate closing", "need it done"],
    disqualifiers: ["just checking prices", "maybe later", "not sure when"]
  },
  content: {
    hero: {
      headline: "Professional Mobile Notary Services",
      subheadline: "Certified notary comes to you - home, office, or any location. Available 7 days a week.",
      ctaText: "Book Notary Service",
      backgroundImage: "/images/notary-hero.jpg"
    },
    features: [
      {
        icon: "📋",
        title: "All Document Types",
        description: "Real estate, legal, financial, and personal documents"
      },
      {
        icon: "🚗",
        title: "Mobile Service",
        description: "We come to your preferred location"
      },
      {
        icon: "⚡",
        title: "Same-Day Available",
        description: "Emergency and rush services available"
      },
      {
        icon: "🔒",
        title: "Secure & Certified",
        description: "Licensed, bonded, and insured notary public"
      }
    ]
  }
};

// Configuration Registry
const NICHE_CONFIGS: Record<string, NicheConfig> = {
  'junk-removal': JUNK_REMOVAL_CONFIG,
  'house-cleaning': HOUSE_CLEANING_CONFIG,
  'mobile-notary': MOBILE_NOTARY_CONFIG,
};

// Get configuration based on environment variable
export function getNicheConfig(): NicheConfig {
  const nicheId = process.env.NEXT_PUBLIC_NICHE_ID || 'junk-removal';
  const config = NICHE_CONFIGS[nicheId];
  
  if (!config) {
    throw new Error(`No configuration found for niche: ${nicheId}`);
  }
  
  return config;
}

export { NICHE_CONFIGS };
