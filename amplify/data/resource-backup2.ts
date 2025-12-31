import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Lead: a
    .model({
      firstName: a.string().required(),
      lastName: a.string(),
      email: a.email(),
      phone: a.phone(),
      source: a.string().default("website"),
      status: a.enum(["new", "contacted", "qualified", "converted", "lost"]),
      isQualified: a.boolean().default(false),
      qualificationScore: a.integer().default(0),
      metadata: a.json(),
      serviceType: a.string().required(),
      estimatedValue: a.float(),
      ghlContactId: a.string(),
      ghlOpportunityId: a.string(),
      vapiCallId: a.string(),
      lastContactedAt: a.datetime(),
      convertedAt: a.datetime(),
      notes: a.string(),
      callTranscript: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(["read", "create", "update", "delete"])
    ]),

  BusinessConfig: a
    .model({
      nicheId: a.string().required(),
      ghlApiKey: a.string(),
      ghlSubAccountId: a.string(),
      vapiApiKey: a.string(),
      businessName: a.string().required(),
      primaryColor: a.string(),
      logoUrl: a.url(),
      isActive: a.boolean().default(true),
      timezone: a.string().default("America/New_York"),
      settings: a.json(),
    })
    .authorization((allow) => [
      allow.owner().to(["read", "create", "update", "delete"])
    ]),

  CallLog: a
    .model({
      vapiCallId: a.string().required(),
      leadId: a.string(),
      phoneNumber: a.phone(),
      duration: a.integer(),
      status: a.enum(["completed", "failed", "no-answer", "busy"]),
      transcript: a.string(),
      extractedData: a.json(),
      qualificationResult: a.json(),
      startedAt: a.datetime(),
      endedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.owner().to(["read", "create", "update", "delete"])
    ]),

  Opportunity: a
    .model({
      leadId: a.string().required(),
      title: a.string().required(),
      description: a.string(),
      estimatedValue: a.float(),
      stage: a.enum(["new", "quoted", "scheduled", "in-progress", "completed", "cancelled"]),
      probability: a.integer().default(50),
      serviceDate: a.datetime(),
      serviceAddress: a.string(),
      ghlOpportunityId: a.string(),
      serviceMetadata: a.json(),
    })
    .authorization((allow) => [
      allow.owner().to(["read", "create", "update", "delete"])
    ]),

  Payment: a
    .model({
      leadId: a.string().required(),
      opportunityId: a.string(),
      amount: a.float().required(),
      currency: a.string().default("USD"),
      status: a.enum(["pending", "completed", "failed", "refunded"]),
      paymentMethod: a.string(),
      transactionId: a.string(),
      paymentDate: a.datetime(),
      serviceDate: a.datetime(),
      serviceDetails: a.json(),
      receiptUrl: a.url(),
      notes: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(["read", "create", "update", "delete"])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
