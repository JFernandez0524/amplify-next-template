import { getNicheConfig } from '@/src/config/niche-config';

export function getKnowledgeBase() {
  const config = getNicheConfig();
  
  const baseKnowledge = {
    business: {
      name: config.business.name,
      serviceType: config.business.serviceType,
      tagline: config.business.tagline,
      description: config.business.description,
    },
    
    services: getServiceKnowledge(config.business.serviceType),
    
    pricing: getPricingKnowledge(config.business.serviceType),
    
    policies: {
      cancellation: "You can cancel or reschedule your service up to 24 hours before the scheduled time without any fees.",
      payment: "We accept all major credit cards and process payments securely through Stripe. Payment is required to confirm your booking.",
      satisfaction: "We offer a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll make it right.",
      insurance: "We are fully licensed, bonded, and insured for your protection and peace of mind.",
    },
    
    booking: {
      process: "You can book our services by calling us directly or using our online booking system. We'll confirm your appointment and send you all the details.",
      availability: "We're available 7 days a week, including evenings and weekends for your convenience.",
      emergency: "Same-day and emergency services are available for urgent needs. Additional fees may apply.",
    },
    
    contact: {
      phone: config.vapi.phoneNumber || "Call us for immediate assistance",
      hours: "Monday-Sunday: 7:00 AM - 9:00 PM",
      response: "We typically respond to inquiries within 1 hour during business hours.",
    },
    
    faqs: getFAQs(config.business.serviceType),
  };
  
  return baseKnowledge;
}

function getServiceKnowledge(serviceType: string) {
  if (serviceType.toLowerCase().includes('junk')) {
    return {
      description: "Professional junk removal and hauling services for residential and commercial properties.",
      included: [
        "Furniture removal (sofas, beds, dressers, tables)",
        "Appliance removal (refrigerators, washers, dryers)",
        "Electronics disposal (TVs, computers, printers)",
        "Construction debris removal",
        "Yard waste and landscaping debris",
        "Office cleanouts and commercial junk",
        "Estate cleanouts and downsizing",
        "Garage and basement cleanouts"
      ],
      notIncluded: [
        "Hazardous materials (paint, chemicals, asbestos)",
        "Medical waste",
        "Radioactive materials",
        "Wet paint or stains",
        "Items requiring special permits"
      ],
      process: [
        "Free on-site estimate",
        "Upfront pricing with no hidden fees",
        "We do all the lifting and loading",
        "Responsible disposal and recycling",
        "Clean-up of work area"
      ]
    };
  }
  
  if (serviceType.toLowerCase().includes('cleaning')) {
    return {
      description: "Professional residential cleaning services with flexible scheduling options.",
      included: [
        "Dusting all surfaces and furniture",
        "Vacuuming carpets and rugs",
        "Mopping hard floors",
        "Cleaning bathrooms (toilets, showers, sinks)",
        "Kitchen cleaning (counters, appliances, sink)",
        "Trash removal and recycling",
        "Making beds and organizing",
        "Window sill and baseboard cleaning"
      ],
      addOns: [
        "Inside oven cleaning",
        "Inside refrigerator cleaning",
        "Interior window cleaning",
        "Garage cleaning",
        "Basement cleaning"
      ],
      frequency: [
        "One-time deep cleaning",
        "Weekly recurring service",
        "Bi-weekly recurring service",
        "Monthly recurring service"
      ]
    };
  }
  
  if (serviceType.toLowerCase().includes('notary')) {
    return {
      description: "Mobile notary public services - we come to your location for convenient document notarization.",
      documents: [
        "Real estate documents (deeds, mortgages, refinancing)",
        "Legal documents (affidavits, powers of attorney)",
        "Financial documents (loan papers, bank forms)",
        "Personal documents (wills, healthcare directives)",
        "Business documents (contracts, agreements)",
        "Immigration documents (I-9 forms, citizenship papers)"
      ],
      locations: [
        "Your home or residence",
        "Office or workplace",
        "Hospitals and care facilities",
        "Coffee shops or public locations",
        "Real estate offices",
        "Attorney offices"
      ],
      requirements: [
        "Valid government-issued photo ID required",
        "All signers must be present",
        "Documents must be complete (no blank spaces)",
        "Signers must be willing and able to sign",
        "No expired identification accepted"
      ]
    };
  }
  
  return {
    description: `Professional ${serviceType.toLowerCase()} services with reliable, quality results.`,
    included: ["Professional service delivery", "Quality guarantee", "Insured and bonded"],
  };
}

function getPricingKnowledge(serviceType: string) {
  if (serviceType.toLowerCase().includes('junk')) {
    return {
      structure: "Pricing is based on the volume of items (truck loads) and type of materials.",
      estimates: [
        "1/4 truck load: $150-250",
        "1/2 truck load: $250-400", 
        "3/4 truck load: $400-550",
        "Full truck load: $550-750"
      ],
      factors: [
        "Volume of items",
        "Type of materials",
        "Location and accessibility",
        "Labor required",
        "Disposal fees"
      ],
      freeEstimate: "All estimates are free with no obligation. We provide upfront pricing before any work begins."
    };
  }
  
  if (serviceType.toLowerCase().includes('cleaning')) {
    return {
      structure: "Pricing is based on home size, frequency, and specific cleaning needs.",
      estimates: [
        "1-2 bedrooms: $80-120",
        "3 bedrooms: $120-180",
        "4+ bedrooms: $180-250"
      ],
      discounts: [
        "Weekly service: 15% discount",
        "Bi-weekly service: 10% discount",
        "First-time customers: $20 off"
      ],
      factors: [
        "Square footage",
        "Number of rooms",
        "Frequency of service",
        "Current condition",
        "Special requests"
      ]
    };
  }
  
  if (serviceType.toLowerCase().includes('notary')) {
    return {
      structure: "Pricing includes notary fees, travel, and service time.",
      baseRates: [
        "Standard documents: $75-100",
        "Real estate closings: $150-200",
        "Multiple signers: +$25 per additional person",
        "Same-day service: +$50 rush fee"
      ],
      included: [
        "Travel to your location",
        "Document review",
        "Notarization service",
        "Return trip if needed"
      ],
      factors: [
        "Document type and complexity",
        "Number of signers",
        "Distance traveled",
        "Time of service (evenings/weekends)",
        "Urgency level"
      ]
    };
  }
  
  return {
    structure: "Competitive pricing with transparent, upfront estimates.",
    freeEstimate: "Contact us for a free, no-obligation quote."
  };
}

function getFAQs(serviceType: string) {
  const baseFAQs = [
    {
      question: "How do I book your services?",
      answer: "You can book by calling us directly or using our online booking system. We'll confirm your appointment and provide all necessary details."
    },
    {
      question: "Do you offer free estimates?",
      answer: "Yes, we provide free, no-obligation estimates for all our services. We believe in transparent, upfront pricing."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Absolutely! We are fully licensed, bonded, and insured for your protection and peace of mind."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and process payments securely. Payment is typically required to confirm your booking."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel or reschedule up to 24 hours before your scheduled service without any fees."
    }
  ];
  
  if (serviceType.toLowerCase().includes('junk')) {
    return [
      ...baseFAQs,
      {
        question: "What items can't you remove?",
        answer: "We cannot remove hazardous materials like paint, chemicals, asbestos, medical waste, or radioactive materials. We'll let you know if any items require special disposal."
      },
      {
        question: "Do you recycle or donate items?",
        answer: "Yes! We prioritize recycling and donating items whenever possible. We're committed to environmentally responsible disposal."
      },
      {
        question: "How long does junk removal take?",
        answer: "Most jobs take 1-3 hours depending on the volume and complexity. We'll provide an estimated timeframe during your free estimate."
      }
    ];
  }
  
  if (serviceType.toLowerCase().includes('cleaning')) {
    return [
      ...baseFAQs,
      {
        question: "Do I need to be home during cleaning?",
        answer: "No, you don't need to be home. Many clients provide access and go about their day. We're fully insured and bonded for your peace of mind."
      },
      {
        question: "Do you bring your own supplies?",
        answer: "Yes, we bring all necessary cleaning supplies and equipment. If you have specific product preferences, just let us know."
      },
      {
        question: "How often should I have my home cleaned?",
        answer: "It depends on your lifestyle and preferences. Weekly or bi-weekly service is most popular for busy families, while monthly works well for lighter maintenance."
      }
    ];
  }
  
  if (serviceType.toLowerCase().includes('notary')) {
    return [
      ...baseFAQs,
      {
        question: "What do I need to bring for notarization?",
        answer: "You need a valid, government-issued photo ID (driver's license, passport, or state ID). The ID cannot be expired."
      },
      {
        question: "Can you notarize documents with blank spaces?",
        answer: "No, all documents must be completely filled out before notarization. We cannot notarize incomplete documents."
      },
      {
        question: "Do you offer same-day service?",
        answer: "Yes, same-day and emergency services are available. Additional rush fees may apply for urgent requests."
      },
      {
        question: "What if the signer doesn't speak English?",
        answer: "The signer must be able to communicate directly with the notary or have a qualified interpreter present who can translate."
      }
    ];
  }
  
  return baseFAQs;
}
