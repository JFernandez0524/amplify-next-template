# 🚀 Universal Service Business Template

**Transform Any Service Business Into a Lead-Generating Machine**

This template is your "Master Blueprint" for creating professional service business websites that automatically capture, qualify, and convert phone leads into paying customers. Whether you run junk removal, house cleaning, landscaping, or any other service business, this system adapts to your specific industry with just a few configuration changes.

## 🎯 What This Template Does

- **Captures Leads**: Professional website that drives phone calls
- **Qualifies Prospects**: AI phone assistant asks the right questions
- **Converts Automatically**: Qualified leads become opportunities in your CRM
- **Scales Easily**: One template, unlimited service businesses

## 🏗️ System Architecture

```
Customer Calls → AI Assistant (Vapi) → Qualification → CRM (GoHighLevel) → SMS Follow-up
     ↑                                      ↓
Website Landing Page ←→ Lead Database (AWS) ←→ Admin Dashboard
```

## 📋 Prerequisites

Before you start, you'll need accounts with these services:

1. **AWS Account** (Free tier available)
2. **Vapi Account** (AI phone assistant) - [vapi.ai](https://vapi.ai)
3. **GoHighLevel Account** (CRM/SMS) - [gohighlevel.com](https://gohighlevel.com)
4. **Domain Name** (optional but recommended)

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
```

**Available Business Types:**
- `junk-removal` - Junk removal and hauling services
- `house-cleaning` - Residential cleaning services
- *(More coming soon - or create your own!)*

### Step 3: Customize Your Business

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

### Step 4: Deploy to AWS

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

Note the custom field IDs and update your config file.

## 🔧 Final Configuration

### 1. Update Environment Variables

```bash
# In .env.local
VAPI_API_KEY=your_vapi_api_key
GHL_API_KEY=your_ghl_api_key
GHL_SUB_ACCOUNT_ID=your_sub_account_id
```

### 2. Update Business Config in Database

After deployment, go to your admin dashboard and add your business configuration:

- Navigate to `/admin` (you'll need to be logged in)
- Add your API keys securely
- Configure your pipeline and field mappings

### 3. Test the System

1. **Test Website**: Visit your deployed site
2. **Test Phone**: Call your Vapi number
3. **Check CRM**: Verify leads appear in GoHighLevel
4. **Test SMS**: Confirm SMS notifications work

## 📊 How It Works

### Customer Journey
1. **Discovery**: Customer finds your website through Google/ads
2. **Interest**: They see your professional landing page
3. **Action**: They call your phone number
4. **Qualification**: AI assistant asks qualifying questions
5. **Conversion**: Qualified leads become opportunities
6. **Follow-up**: Automatic SMS sent to customer

### Lead Qualification Process
The AI assistant scores leads based on:
- **Urgency** (1-4 points): How soon they need service
- **Budget Awareness** (1-3 points): Understanding of costs
- **Decision Authority** (1-3 points): Can they make decisions

**Scoring:**
- 8-10 points: High priority - immediate follow-up
- 5-7 points: Medium priority - schedule callback
- 1-4 points: Low priority - nurture sequence

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
  // ... complete configuration
};

// Add to registry
const NICHE_CONFIGS: Record<string, NicheConfig> = {
  'junk-removal': JUNK_REMOVAL_CONFIG,
  'house-cleaning': HOUSE_CLEANING_CONFIG,
  'lawn-care': LAWN_CARE_CONFIG, // New business type
};
```

2. **Update Qualification Questions**: Add industry-specific questions
3. **Customize Content**: Update hero text, features, and process steps
4. **Deploy**: Set `NEXT_PUBLIC_NICHE_ID=lawn-care` and deploy

### Customizing Qualification Logic

Edit the qualification questions in your config:

```typescript
qualification: {
  questions: [
    {
      id: "service_area",
      question: "What's the approximate size of your lawn?",
      type: "select",
      options: ["Small (under 1/4 acre)", "Medium (1/4 to 1/2 acre)", "Large (over 1/2 acre)"],
      required: true,
      weight: 3 // Higher weight = more important for qualification
    }
  ],
  highIntentSignals: ["need it done", "ASAP", "regular service"],
  disqualifiers: ["just browsing", "maybe next year"]
}
```

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
- Add online booking integration
- Implement SMS marketing sequences  
- Create customer portals
- Add review management

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

**SMS not sending:**
- Confirm GHL SMS permissions
- Check phone number format
- Verify sub-account has SMS credits

### Getting Help

1. **Check Logs**: View AWS CloudWatch logs for errors
2. **Test Endpoints**: Use tools like Postman to test webhooks
3. **Documentation**: Refer to Vapi and GHL documentation
4. **Support**: Contact respective platform support teams

## 💰 Cost Breakdown

**Monthly Operating Costs (Estimated):**
- AWS Hosting: $5-20/month (depending on traffic)
- Vapi AI Assistant: $29-99/month (based on call volume)
- GoHighLevel: $97-297/month (CRM features)
- Domain: $10-15/year
- **Total: ~$130-400/month**

**ROI Calculation:**
If this system generates just 2-3 additional customers per month, it typically pays for itself many times over.

## 🚀 Next Steps

1. **Deploy Your First Business**: Follow the setup guide above
2. **Test Everything**: Make sure all integrations work
3. **Drive Traffic**: Set up Google Ads, SEO, or other marketing
4. **Monitor Performance**: Track calls, conversions, and ROI
5. **Scale Up**: Add more locations or service types

## 📞 Support

For technical support or customization requests, please:
- Check the troubleshooting section above
- Review the documentation for each integrated service
- Consider hiring a developer for advanced customizations

---

**Ready to transform your service business? Start with Step 1 above and you'll have a professional lead-generating system running within a few hours!**