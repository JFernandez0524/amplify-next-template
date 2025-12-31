import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Lead: a.model({
    firstName: a.string().required(),
    lastName: a.string(),
    email: a.string(),
    phone: a.string(),
    serviceType: a.string().required(),
    isQualified: a.boolean().default(false),
    qualificationScore: a.integer().default(0),
    metadata: a.json(),
  }).authorization((allow) => [allow.owner()]),

  BusinessConfig: a.model({
    nicheId: a.string().required(),
    ghlApiKey: a.string(),
    ghlSubAccountId: a.string(),
    vapiApiKey: a.string(),
    businessName: a.string().required(),
    primaryColor: a.string(),
    logoUrl: a.string(),
    isActive: a.boolean().default(true),
    timezone: a.string().default("America/New_York"),
    settings: a.json(),
  }).authorization((allow) => [allow.owner()]),

  Opportunity: a.model({
    leadId: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    estimatedValue: a.float(),
    stage: a.enum(["new", "quoted", "scheduled", "completed", "cancelled"]),
    probability: a.integer().default(50),
    serviceDate: a.datetime(),
    serviceAddress: a.string(),
    ghlOpportunityId: a.string(),
    serviceMetadata: a.json(),
  }).authorization((allow) => [allow.owner()]),

  Payment: a.model({
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
    receiptUrl: a.string(),
    notes: a.string(),
  }).authorization((allow) => [allow.owner()]),

  Customer: a.model({
    email: a.string().required(),
    firstName: a.string().required(),
    lastName: a.string(),
    phone: a.string(),
    address: a.string(),
    loyaltyPoints: a.integer().default(0),
    totalSpent: a.float().default(0),
    serviceCount: a.integer().default(0),
    preferences: a.json(),
  }).authorization((allow) => [allow.owner()]),

  UserRole: a.model({
    userId: a.string().required(),
    email: a.string().required(),
    role: a.enum(["owner", "admin", "customer", "lead"]),
    permissions: a.string().array(),
    isActive: a.boolean().default(true),
  }).authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
