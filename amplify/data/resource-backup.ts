import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Flexible Lead model with metadata for niche-specific data
  Lead: a
    .model({
      // Core lead information
      firstName: a.string().required(),
      lastName: a.string(),
      email: a.string(),
      phone: a.string(),
      
      // Lead source and status
      source: a.string().default("website"),
      status: a.enum(["new", "contacted", "qualified", "converted", "lost"]),
      
      // Qualification data
      isQualified: a.boolean().default(false),
      qualificationScore: a.integer().default(0),
      
      // Niche-specific data stored as JSON
      metadata: a.json(),
      
      // Service details
      serviceType: a.string().required(),
      estimatedValue: a.float(),
      
      // External system IDs
      ghlContactId: a.string(),
      ghlOpportunityId: a.string(),
      vapiCallId: a.string(),
      
      // Timestamps
      lastContactedAt: a.datetime(),
      convertedAt: a.datetime(),
      
      // Notes and communication
      notes: a.string(),
      callTranscript: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete'])
    ]),

  // Business configuration for multi-tenant setup
  BusinessConfig: a
    .model({
      nicheId: a.string().required(),
      
      // API Keys and secrets
      ghlApiKey: a.string(),
      ghlSubAccountId: a.string(),
      vapiApiKey: a.string(),
      
      // Business settings
      businessName: a.string().required(),
      primaryColor: a.string(),
      logoUrl: a.string(),
      
      // Operational settings
      isActive: a.boolean().default(true),
      timezone: a.string().default("America/New_York"),
      
      // Configuration JSON for flexible settings
      settings: a.json(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete'])
    ]),

  // Call logs for tracking Vapi interactions
  CallLog: a
    .model({
      vapiCallId: a.string().required(),
      leadId: a.string(),
      
      // Call details
      phoneNumber: a.string(),
      duration: a.integer(),
      status: a.enum(["completed", "failed", "no-answer", "busy"]),
      
      // AI extracted data
      transcript: a.string(),
      extractedData: a.json(),
      qualificationResult: a.json(),
      
      // Timestamps
      startedAt: a.datetime(),
      endedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete'])
    ]),

  // Opportunities for tracking conversions
  Opportunity: a
    .model({
      leadId: a.string().required(),
      
      // Opportunity details
      title: a.string().required(),
      description: a.string(),
      estimatedValue: a.float(),
      
      // Status tracking
      stage: a.enum(["new", "quoted", "scheduled", "in-progress", "completed", "cancelled"]),
      probability: a.integer().default(50),
      
      // Service details
      serviceDate: a.datetime(),
      serviceAddress: a.string(),
      
      // External references
      ghlOpportunityId: a.string(),
      
      // Metadata for service-specific details
      serviceMetadata: a.json(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
