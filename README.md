# 🚀 Universal Service Business Template

**Transform Any Service Business Into a Lead-Generating Machine**

This template is your "Master Blueprint" for creating professional service business websites that automatically capture, qualify, and convert phone leads into paying customers. Whether you run junk removal, house cleaning, landscaping, mobile notary, or any other service business, this system adapts to your specific industry with just a few configuration changes.

## 🎯 What This Template Does

- **Captures Leads**: Professional website that drives phone calls
- **Qualifies Prospects**: AI phone assistant asks the right questions
- **Converts Automatically**: Qualified leads become opportunities in your CRM
- **Processes Payments**: Secure Stripe integration for all services
- **Provides Customer Support**: AI chatbot answers service questions 24/7
- **Manages Operations**: AI admin agent monitors business health and automates tasks
- **Customer Portal**: Full-featured customer account management with loyalty rewards
- **Role-Based Access**: Automatic user role management (Owner, Admin, Customer, Lead)
- **Real-Time Tracking**: Service tracking with live updates for customers
- **Scales Easily**: One template, unlimited service businesses

## 🏗️ System Architecture

```
Customer Journey:
Website → AI Chatbot → Phone Call → AI Assistant (Vapi) → Qualification → Payment (Stripe)
    ↓                                      ↓                              ↓
Lead Database ←→ Admin Dashboard ←→ CRM (GoHighLevel) ←→ AI Admin Agent
    ↓                                      ↓                              ↓
Customer Portal ←→ Service Tracking ←→ Loyalty Rewards ←→ Business Intelligence
    ↓                                      ↓                              ↓
Role Management ←→ Navigation System ←→ Automated Tasks ←→ Performance Analytics
```

## 📊 User Roles & Access Control

The system automatically assigns user roles based on account type and provides appropriate access:

### 🔐 Role Hierarchy
- **Owner**: First user (business owner) - Full system access
- **Admin**: Staff members - Admin dashboard and service management
- **Customer**: Paying customers - Customer portal and service history
- **Lead**: Potential customers - Basic access and lead nurturing
- **Public**: Website visitors - Landing page and AI chat support

### 🎯 Role-Based Features
| Feature | Owner | Admin | Customer | Lead | Public |
|---------|-------|-------|----------|------|--------|
| Admin Dashboard | ✅ | ✅ | ❌ | ❌ | ❌ |
| Customer Portal | ✅ | ❌ | ✅ | ❌ | ❌ |
| Service Tracking | ✅ | ✅ | ✅ | ❌ | ❌ |
| Loyalty Rewards | ✅ | ❌ | ✅ | ❌ | ❌ |
| AI Admin Agent | ✅ | ✅ | ❌ | ❌ | ❌ |
| Payment Processing | ✅ | ✅ | ✅ | ❌ | ❌ |
| AI Customer Chat | ✅ | ✅ | ✅ | ✅ | ✅ |

### 🔄 Automatic Role Assignment
- **First registered user** → Owner (business owner)
- **Users with payment history** → Customer
- **Users with lead records** → Lead
- **New authenticated users** → Customer (default)

## 🧭 Navigation & User Experience

### 📱 Smart Navigation
- **Responsive design** works on all devices
- **Role-based menus** show relevant options only
- **Branded header** with business logo and colors
- **Prominent phone number** for immediate contact
- **User account menu** with profile and sign-out options

### 🎨 Professional Design
- **Matches your existing style** (based on your junk removal site)
- **Service-specific content** adapts to business type
- **Mobile-optimized** interface
- **Consistent branding** throughout the system

## 📋 Prerequisites

Before you start, you'll need accounts with these services:

1. **AWS Account** (Free tier available)
2. **Vapi Account** (AI phone assistant) - [vapi.ai](https://vapi.ai)
3. **GoHighLevel Account** (CRM/SMS) - [gohighlevel.com](https://gohighlevel.com)
4. **Stripe Account** (Payment processing) - [stripe.com](https://stripe.com)
5. **OpenAI Account** (AI chatbot & admin agent) - [platform.openai.com](https://platform.openai.com)
6. **Domain Name** (optional but recommended)

## 🚀 Quick Start Guide

### Step 1: Clone and Setup

```bash
# Clone this repository
git clone [your-repo-url]
cd service-business-template

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### Step 2: Choose Your Business Type

Edit `.env.local` and set your business type:

```bash
# For Junk Removal Business
NEXT_PUBLIC_NICHE_ID=junk-removal

# For House Cleaning Business  
NEXT_PUBLIC_NICHE_ID=house-cleaning

# For Mobile Notary Business
NEXT_PUBLIC_NICHE_ID=mobile-notary
```

**Available Business Types:**
- `junk-removal` - Junk removal and hauling services
- `house-cleaning` - Residential cleaning services
- `mobile-notary` - Mobile notary public services
- *(More coming soon - or create your own!)*

### Step 3: Configure Environment Variables

Add your API keys to `.env.local`:

```bash
# Niche Configuration
NEXT_PUBLIC_NICHE_ID=junk-removal

# Vapi Configuration (AI Phone Assistant)
VAPI_API_KEY=your_vapi_api_key_here
VAPI_WEBHOOK_SECRET=your_webhook_secret_here

# GoHighLevel Configuration (CRM)
GHL_API_KEY=your_ghl_api_key_here
GHL_SUB_ACCOUNT_ID=your_sub_account_id_here

# Stripe Configuration (Payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# OpenAI Configuration (AI Chat & Admin Agent)
OPENAI_API_KEY=sk-your_openai_api_key_here
```

### Step 4: Customize Your Business

Open `src/config/niche-config.ts` and customize your business details:

```typescript
// Find your business type and update these fields:
business: {
  name: "Your Business Name",           // e.g., "Swift Junk Removal"
  serviceType: "Your Service",          // e.g., "Junk Removal"
  tagline: "Your Tagline",             // e.g., "Fast, Reliable, Eco-Friendly"
  description: "Your description"       // Brief description of your service
},

branding: {
  logoUrl: "/path/to/your/logo.png",   // Upload your logo to public folder
  primaryColor: "#2563eb",             // Your brand's primary color
  secondaryColor: "#1e40af",           // Secondary color
  accentColor: "#f59e0b",              // Accent color for buttons
  fontFamily: "Inter"                  // Font family
}
```

### Step 5: Deploy to AWS

```bash
# Deploy your site
npx ampx sandbox

# For production deployment
npx ampx pipeline deploy --branch main
```

Your website will be live at a URL like: `https://main.d1234567890.amplifyapp.com`

## 🤖 Setting Up AI Phone Assistant (Vapi)

### 1. Create Vapi Account
- Go to [vapi.ai](https://vapi.ai) and create an account
- Get your API key from the dashboard

### 2. Create Your AI Assistant
- In Vapi dashboard, create a new assistant
- Copy the generated Assistant ID
- Choose a professional voice (recommended: professional-male or professional-female)

### 3. Configure System Prompt
Use the generated prompt from `src/prompts/vapi-master-prompt.md` or generate it programmatically:

```bash
# Generate your custom prompt
npm run generate-prompt
```

Copy the output and paste it into your Vapi assistant's system prompt.

### 4. Set Up Phone Number
- Purchase a phone number through Vapi
- Configure it to use your assistant
- Update your website with the phone number

### 5. Configure Webhook
In Vapi assistant settings:
- **Webhook URL**: `https://your-domain.com/api/webhook/vapi`
- **Events**: Select "end-of-call-report"

## 📞 Setting Up GoHighLevel CRM

### 1. Create GoHighLevel Account
- Sign up at [gohighlevel.com](https://gohighlevel.com)
- Create a sub-account for your business

### 2. Get API Credentials
- Go to Settings → Integrations → API
- Generate an API key
- Note your Sub-Account ID

### 3. Set Up Pipeline
- Create a new pipeline called "Phone Leads"
- Create stages: "New Lead" → "Contacted" → "Qualified" → "Closed Won"
- Note the Pipeline ID and Stage IDs

### 4. Configure Custom Fields
Create these custom fields in GoHighLevel:

**For Junk Removal:**
- Truck Loads (dropdown)
- Property Type (dropdown)  
- Access Type (text)

**For House Cleaning:**
- Bedrooms (number)
- Bathrooms (number)
- Frequency (dropdown)

**For Mobile Notary:**
- Document Type (dropdown)
- Signer Count (number)
- Location (text)
- Urgency (dropdown)

Note the custom field IDs and update your config file.

## 💳 Setting Up Stripe Payments

### 1. Create Stripe Account
- Sign up at [stripe.com](https://stripe.com)
- Complete account verification for live payments

### 2. Get API Keys
- Go to Developers → API keys
- Copy your Publishable key and Secret key
- For testing, use test keys (they start with `pk_test_` and `sk_test_`)

### 3. Configure Webhooks
- Go to Developers → Webhooks
- Add endpoint: `https://your-domain.com/api/stripe/webhook`
- Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copy the webhook secret

### 4. Test Payments
Use test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

## 🤖 Setting Up AI Features

### 1. OpenAI Account
- Sign up at [platform.openai.com](https://platform.openai.com)
- Generate an API key
- Add billing information (required for API access)

### 2. AI Customer Support Chat
- Automatically appears on all pages as a floating chat button
- Uses your business knowledge base for accurate responses
- Provides 24/7 customer support with service-specific information

### 3. AI Admin Agent
- Access via `/admin` dashboard → AI Assistant tab
- Monitors business health and identifies issues automatically
- Executes automated tasks like payment reminders and follow-ups
- Provides business insights and recommendations

## 🔧 Final Configuration

### 1. Update Business Config in Database

After deployment, go to your admin dashboard:

- Navigate to `/admin` (you'll need to be logged in)
- Go to Settings tab to add your API keys securely
- Configure your pipeline and field mappings
- Test all integrations

### 2. Test the Complete System

1. **Test Website**: Visit your deployed site and try the AI chat
2. **Test Phone**: Call your Vapi number and go through qualification
3. **Test Payments**: Use Stripe test cards to process a payment
4. **Check CRM**: Verify leads appear in GoHighLevel
5. **Test SMS**: Confirm SMS notifications work
6. **Test Admin AI**: Ask the admin agent to analyze your business

## 📊 How It Works

### Customer Journey
1. **Discovery**: Customer finds your website through Google/ads
2. **Support**: AI chatbot answers questions about your services
3. **Interest**: They see your professional landing page
4. **Action**: They call your phone number
5. **Qualification**: AI assistant asks qualifying questions
6. **Payment**: Customer pays securely through Stripe
7. **Conversion**: Qualified leads become opportunities
8. **Follow-up**: Automatic SMS sent to customer
9. **Management**: AI admin agent monitors and automates tasks

### Lead Qualification Process
The AI assistant scores leads based on:
- **Urgency** (1-4 points): How soon they need service
- **Budget Awareness** (1-3 points): Understanding of costs
- **Decision Authority** (1-3 points): Can they make decisions

**Scoring:**
- 8-10 points: High priority - immediate follow-up
- 5-7 points: Medium priority - schedule callback
- 1-4 points: Low priority - nurture sequence

### Payment Processing
- **Secure Checkout**: Stripe-powered payment processing
- **Multiple Services**: Supports all service types with dynamic pricing
- **Automatic Updates**: Payment completion updates lead status
- **Receipt Management**: Automatic receipt generation and tracking

### AI Admin Agent Capabilities
- **Business Health Monitoring**: Tracks KPIs and identifies issues
- **Automated Task Execution**: Handles routine follow-ups and reminders
- **Revenue Analysis**: Monitors trends and growth opportunities
- **Lead Management**: Identifies stale leads and conversion opportunities
- **Scheduling Optimization**: Manages service capacity and conflicts

## 🎨 Customizing for Different Businesses

### Adding a New Business Type

1. **Add Configuration**: In `src/config/niche-config.ts`, add your new business:

```typescript
const LAWN_CARE_CONFIG: NicheConfig = {
  business: {
    name: "Green Lawn Services",
    serviceType: "Lawn Care",
    // ... rest of config
  },
  // ... complete configuration including qualification questions
};

// Add to registry
const NICHE_CONFIGS: Record<string, NicheConfig> = {
  'junk-removal': JUNK_REMOVAL_CONFIG,
  'house-cleaning': HOUSE_CLEANING_CONFIG,
  'mobile-notary': MOBILE_NOTARY_CONFIG,
  'lawn-care': LAWN_CARE_CONFIG, // New business type
};
```

2. **Update Knowledge Base**: Add service-specific information in `src/lib/ai/knowledge-base.ts`
3. **Update Qualification Logic**: Add industry-specific questions and pricing
4. **Customize Content**: Update hero text, features, and process steps
5. **Deploy**: Set `NEXT_PUBLIC_NICHE_ID=lawn-care` and deploy

### Customizing AI Responses

Edit the knowledge base in `src/lib/ai/knowledge-base.ts` to customize:
- Service descriptions and included/excluded items
- Pricing structures and estimates
- FAQs and common questions
- Business policies and procedures

## 📈 Customer Portal Features

### 🎯 Customer Account Management
- **Service History**: Complete transaction history with receipts and rebooking options
- **Real-Time Tracking**: Live updates on service team arrival and progress
- **Loyalty Rewards**: Points-based reward system with service-specific benefits
- **Easy Booking**: Quick access to schedule new services with preferred settings
- **Profile Management**: Update contact preferences and service requirements

### 🚛 Service-Specific Tracking

**Junk Removal Tracking:**
- Track truck arrival with 30-minute window notifications
- Progress stages: Confirmed → Dispatched → Arrival → Complete
- Estimated duration: 2-4 hours with real-time updates

**House Cleaning Tracking:**
- Cleaner arrival notifications via SMS and app
- Progress stages: Scheduled → En Route → Started → Complete  
- Estimated duration: 2-3 hours with quality checkpoints

**Mobile Notary Tracking:**
- Notary travel updates and arrival confirmations
- Progress stages: Booked → Traveling → Documents Ready → Complete
- Estimated duration: 30-60 minutes with location updates

### 🎁 Loyalty Rewards System

**Points Earning Structure:**
- 1 point per $1 spent on services
- 25 bonus points for leaving reviews
- 50 points for successful referrals
- 100 points annual birthday bonus

**Service-Specific Rewards:**
- **Junk Removal**: $10 off → Free small pickup → $50 off large cleanout → Free full truck load
- **House Cleaning**: $15 off → Free deep clean add-on → Free monthly service → VIP status with 20% off
- **Mobile Notary**: $10 off → Free document review → Priority scheduling → Annual service package

## 📈 Admin Dashboard Features

### Overview Tab
- **KPI Cards**: Total leads, conversion rates, revenue, qualification rates
- **Quick Actions**: Direct access to key management functions
- **Recent Activity**: Latest lead activity and status updates

### AI Assistant Tab
- **Business Health Analysis**: Comprehensive automated business review
- **Automated Task Execution**: Let AI handle routine administrative tasks
- **Real-time Insights**: Identify issues and opportunities immediately
- **Performance Recommendations**: Get actionable advice for growth

### Leads Management
- **Lead Tracking**: View all leads with status and qualification scores
- **Contact Management**: Direct access to customer information
- **Follow-up Scheduling**: Track and manage customer communications

### Payments & Revenue
- **Transaction Monitoring**: Real-time payment status and history
- **Revenue Analytics**: Track income trends and growth patterns
- **Payment Issues**: Identify and resolve payment problems quickly

### Opportunities Pipeline
- **Sales Tracking**: Monitor opportunities from quote to completion
- **Service Scheduling**: Manage appointments and capacity
- **Revenue Forecasting**: Track pipeline value and probability

### Business Settings
- **API Configuration**: Securely manage all integration keys
- **System Status**: Monitor health of all connected services
- **Business Information**: Update branding and contact details

## 📈 Scaling Your Business

### Multi-Location Setup
- Deploy separate instances for each location
- Use different phone numbers and GHL sub-accounts
- Customize service areas in each config

### White-Label Opportunities
- Create configs for different service types
- Deploy for clients with their branding
- Manage multiple businesses from one template

### Advanced Features
- **AI-Powered Insights**: Leverage admin agent for business optimization
- **Automated Operations**: Reduce manual work with intelligent automation
- **Payment Integration**: Accept payments directly through your website
- **24/7 Customer Support**: AI chatbot handles inquiries around the clock
- **Performance Analytics**: Track and optimize every aspect of your business

## 🛠️ Troubleshooting

### Common Issues

**Website not loading:**
- Check if Amplify deployment completed successfully
- Verify environment variables are set correctly

**AI assistant not working:**
- Confirm Vapi webhook URL is correct
- Check API keys in environment variables
- Verify assistant ID in config

**Leads not appearing in CRM:**
- Test webhook endpoint manually
- Check GHL API credentials
- Verify pipeline and field IDs

**Payments not processing:**
- Verify Stripe API keys are correct
- Check webhook endpoint configuration
- Test with Stripe test cards first

**AI chatbot not responding:**
- Verify OpenAI API key is valid
- Check API usage limits and billing
- Review error logs in browser console

**Admin AI agent issues:**
- Ensure database permissions are correct
- Verify OpenAI API access
- Check admin authentication

### Getting Help

1. **Check Logs**: View AWS CloudWatch logs for errors
2. **Test Endpoints**: Use tools like Postman to test webhooks
3. **Documentation**: Refer to service provider documentation
4. **Admin Dashboard**: Use AI assistant to diagnose issues
5. **Support**: Contact respective platform support teams

## 💰 Cost Breakdown

**Monthly Operating Costs (Estimated):**
- AWS Hosting: $5-20/month (depending on traffic)
- Vapi AI Assistant: $29-99/month (based on call volume)
- GoHighLevel: $97-297/month (CRM features)
- Stripe: 2.9% + 30¢ per transaction
- OpenAI: $5-50/month (based on AI usage)
- Domain: $10-15/year
- **Total: ~$140-450/month + transaction fees**

**ROI Calculation:**
If this system generates just 2-3 additional customers per month, it typically pays for itself many times over. The AI automation alone can save 10+ hours per week of administrative work.

## 🚀 Getting Started Guide

### Step 1: Initial Setup
1. **Clone and install** dependencies
2. **Set environment variables** for your business type
3. **Deploy to AWS** using Amplify
4. **Configure API integrations** (Vapi, GoHighLevel, Stripe, OpenAI)

### Step 2: User Management
1. **First user becomes Owner** - Sign up first to get owner privileges
2. **Add team members** - Invite staff as Admin users
3. **Customer accounts** - Created automatically when customers sign up
4. **Lead tracking** - Leads converted from phone calls and website forms

### Step 3: Business Operations
1. **Admin Dashboard** - Monitor KPIs, manage leads, track payments
2. **AI Admin Agent** - Let AI handle routine tasks and business analysis
3. **Customer Portal** - Customers can track services and earn rewards
4. **Service Tracking** - Real-time updates for all service types

### Step 4: Customer Experience
1. **Landing Page** - Professional website with AI chat support
2. **Phone Qualification** - AI assistant qualifies and converts leads
3. **Payment Processing** - Secure Stripe checkout for all services
4. **Service Tracking** - Customers track service progress in real-time
5. **Loyalty Program** - Automatic points and rewards for repeat customers

## 🔧 System Management

### User Role Management
- **Owner Access**: Full system control, can promote users to Admin
- **Admin Access**: Business operations, cannot manage other users
- **Customer Access**: Personal portal, service history, rewards
- **Lead Access**: Basic information, conversion tracking

### Navigation System
- **Smart Menus**: Show only relevant options based on user role
- **Mobile Responsive**: Professional navigation on all devices
- **Branded Design**: Matches your business colors and logo
- **Quick Actions**: Prominent phone number and key features

### Business Intelligence
- **Real-Time Analytics**: Track leads, conversions, revenue
- **AI Insights**: Automated business health monitoring
- **Performance Metrics**: KPIs specific to service businesses
- **Automated Tasks**: AI handles routine administrative work

## 🚀 Next Steps

1. **Deploy Your First Business**: Follow the setup guide above
2. **Test Everything**: Make sure all integrations work properly
3. **Configure AI Features**: Set up chatbot and admin agent
4. **Set Up User Roles**: First user becomes Owner automatically
5. **Drive Traffic**: Set up Google Ads, SEO, or other marketing
6. **Monitor Performance**: Use admin dashboard and AI insights
7. **Scale Up**: Add more locations or service types
8. **Optimize**: Use AI recommendations to improve performance

## 📱 Using the System

### For Business Owners (Owner Role):
1. **Sign up first** to automatically become the Owner
2. **Access Admin Dashboard** at `/admin` for business management
3. **Use AI Admin Agent** to automate routine tasks
4. **Monitor KPIs** and business performance
5. **Manage team members** and assign Admin roles

### For Staff Members (Admin Role):
1. **Get invited** by the business owner
2. **Access Admin Dashboard** for daily operations
3. **Manage leads** and customer communications
4. **Process payments** and track revenue
5. **Use AI insights** for business optimization

### For Customers:
1. **Sign up** through the website or after service
2. **Access Customer Portal** at `/customer-portal`
3. **Track services** in real-time
4. **Earn loyalty points** with every purchase
5. **Book new services** easily through the portal

### For Everyone:
1. **AI Chat Support** available 24/7 on all pages
2. **Professional navigation** adapts to your role
3. **Mobile-friendly** design works on all devices
4. **Secure authentication** with AWS Cognito

## 📞 Support

For technical support or customization requests:
- Use the AI admin agent for business-related questions
- Check the troubleshooting section above
- Review the documentation for each integrated service
- Consider hiring a developer for advanced customizations

---

**Ready to transform your service business? This complete system handles everything from lead generation to payment processing to business management - all powered by AI automation!**