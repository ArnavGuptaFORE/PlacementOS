# PlacementOS 🚀

**Your Complete AI-Powered Placement Preparation Platform**

PlacementOS is a production-ready, full-stack web application built to help students dominate placement season with AI-driven tools for resume optimization, case interview preparation, company research, and more.

---

## ✨ Features

### 🎯 Core Modules

1. **Resume + JD Matcher**
   - Analyze resume compatibility with job descriptions
   - Get ATS optimization tips
   - Receive improved resume bullet points
   - Track match scores and identify gaps

2. **PPT Framework Generator**
   - Generate business frameworks (SWOT, Porter's 5, BCG Matrix, etc.)
   - Receive slide-by-slide presentation structure
   - Get framework application guidance

3. **Case Study Solver**
   - Break down complex consulting cases
   - Structured problem analysis
   - Framework recommendations
   - Slide-by-slide solution outline

4. **Guesstimate Helper**
   - Master market sizing problems
   - Step-by-step calculation guidance
   - Assumption validation
   - Sensitivity analysis

5. **Company Intelligence**
   - Deep company research
   - Role-specific interview preparation
   - Likely interview questions
   - Business model analysis

6. **AI Mentor Chat**
   - 24/7 placement coach
   - Resume reviews
   - Case practice
   - Career guidance

7. **Placement Readiness Dashboard**
   - Track overall preparation progress
   - Get readiness score (0-100)
   - Identify strengths and gaps
   - Receive personalized recommendations

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** SQLite with Prisma ORM
- **AI:** Groq API (llama-3.1-70b-versatile)
- **State Management:** React Hooks
- **API:** Next.js Route Handlers

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API Key ([Get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PlacementOS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   DATABASE_URL="file:./dev.db"
   ```

4. **Setup logo**
   
   Copy your logo image to `public/logo.png`. The logo should be square (512x512px recommended).

5. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
PlacementOS/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── dashboard/               # Dashboard page
│   ├── resume-matcher/          # Resume analysis
│   ├── ppt-frameworks/          # Framework generator
│   ├── case-solver/             # Case study solver
│   ├── guesstimate/             # Market sizing helper
│   ├── company-intel/           # Company research
│   ├── chat/                    # AI mentor chat
│   └── api/                     # API routes
│       ├── resume-matcher/
│       ├── ppt-frameworks/
│       ├── case-solver/
│       ├── guesstimate/
│       ├── company-intel/
│       ├── chat/
│       └── readiness/
├── components/                   # React components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── ModuleCard.tsx
│   ├── ResultCard.tsx
│   ├── ResumeForm.tsx
│   ├── JDForm.tsx
│   ├── FrameworkCard.tsx
│   ├── CaseInputForm.tsx
│   ├── GuesstimateForm.tsx
│   ├── CompanySearchForm.tsx
│   ├── ReadinessWidget.tsx
│   └── ChatUI.tsx
├── lib/                         # Utilities and helpers
│   ├── groq.ts                  # Groq API integration
│   ├── prompts.ts               # AI prompt templates
│   └── readiness.ts             # Readiness calculation
├── prisma/
│   └── schema.prisma            # Database schema
├── public/
│   └── logo.png                 # Your logo here
├── styles/
│   └── globals.css              # Additional styles
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🎨 Branding & Design

### Color Palette

- **Primary Background:** `#0C1024` (Deep Navy)
- **Secondary Surface:** `#1A1F3C` (Navy Light)
- **Accent Color:** `#D4A857` (Gold)
- **Text Primary:** `#F4F6FB` (Cream/Off-white)

### Typography

- **Font Family:** Inter (Google Fonts)
- **Headings:** Inter SemiBold/Bold
- **Body:** Inter Regular

### Design Principles

- Rounded edges and minimal UI
- Card-based layouts
- Smooth transitions
- Apple-like clarity and elegance

---

## 🗄️ Database Schema

The app uses SQLite with the following models:

- **ResumeAnalysis** - Stores resume matching results
- **CaseSession** - Stores case solver and PPT framework sessions
- **GuesstimateSession** - Stores guesstimate solutions
- **CompanyIntelSession** - Stores company research results
- **ChatMessage** - Stores chat history

To view your database:
```bash
npx prisma studio
```

---

## 🔧 API Routes

### POST `/api/resume-matcher`
Analyze resume against job description
```json
{
  "resumeText": "string",
  "jdText": "string"
}
```

### POST `/api/ppt-frameworks`
Generate business frameworks
```json
{
  "problemText": "string"
}
```

### POST `/api/case-solver`
Solve case studies
```json
{
  "caseText": "string"
}
```

### POST `/api/guesstimate`
Solve guesstimate problems
```json
{
  "question": "string"
}
```

### POST `/api/company-intel`
Get company intelligence
```json
{
  "companyName": "string",
  "roleType": "string"
}
```

### POST `/api/chat`
Chat with AI mentor (streaming)
```json
{
  "message": "string",
  "sessionId": "string"
}
```

### GET `/api/readiness`
Get placement readiness score

---

## 🧪 Development

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
npm start
```

### Database commands
```bash
# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Linting
```bash
npm run lint
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables:
   - `GROQ_API_KEY`
   - `DATABASE_URL` (use Vercel Postgres or other cloud DB for production)
4. Deploy!

**Note:** For production, consider migrating from SQLite to PostgreSQL or another cloud database.

### Environment Variables for Production

```bash
GROQ_API_KEY=your_production_groq_key
DATABASE_URL=your_production_database_url
```

---

## 📚 Usage Guide

### For Students

1. **Start with Resume Matcher** - Ensure your resume is ATS-optimized
2. **Use Company Intel** - Research companies 48 hours before interviews
3. **Practice Cases** - Use Case Solver and PPT Frameworks regularly
4. **Master Guesstimates** - Practice at least 2-3 market sizing problems weekly
5. **Check Dashboard** - Monitor your readiness score and follow recommendations
6. **Chat with Mentor** - Get personalized guidance anytime

### Tips

- Upload different versions of your resume to track improvements
- Practice cases from various industries
- Research all companies you're interviewing with
- Aim for a readiness score of 80+ before interviews

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🆘 Troubleshooting

### "Groq API Error"
- Check that your API key is correctly set in `.env`
- Ensure you have credits in your Groq account
- Verify your internet connection

### "Database connection error"
- Run `npx prisma generate`
- Run `npx prisma migrate dev`
- Check that `prisma/dev.db` exists

### "Module not found"
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Logo not showing
- Ensure `public/logo.png` exists
- Check that the image is a valid PNG file
- Clear your browser cache

---

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review API error logs

---

## 🎯 Roadmap

- [ ] Add PDF resume upload and parsing
- [ ] Implement user authentication
- [ ] Add team collaboration features
- [ ] Create mobile app
- [ ] Add more AI models support
- [ ] Implement mock interview feature
- [ ] Add analytics and insights

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Groq](https://groq.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Database with [Prisma](https://www.prisma.io/)

---

**Made with ❤️ for placement success**

Start your journey to placement domination with PlacementOS! 🚀


