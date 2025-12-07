# 🚀 Prompt لـ Cursor Composer Mode - 8 Agents

انسخ هذا الـ Prompt والصقه في Cursor Composer Mode (مع تفعيل 8 agents)

---

```
🎯 مهمة موازية - Model Architect AI v2.0
تطبيق production-ready مع 7 ميزات متقدمة

═══════════════════════════════════════

🚨 خطوة إلزامية أولاً - لا تتخطاها!

قبل البدء في أي مهمة، يجب على كل agent:
1. قراءة ملف .cursor/rules/parallel-agents.mdc
2. السؤال: "ما هو رقمي كـ Agent؟"
3. تحديد رقمه بوضوح: "أنا Agent #X"
4. قراءة FILE_OWNERSHIP.md للتأكد من المهام

⚠️ ممنوع منعاً باتاً البدء في التنفيذ قبل هذه الخطوة!

═══════════════════════════════════════

📋 المعلومات الأساسية:

- يوجد ملف .cursor/rules/parallel-agents.mdc يحتوي على قواعد كل agent
- يوجد ملف FILE_OWNERSHIP.md يحدد ملكية الملفات
- يجب على كل agent العمل فقط على الملفات المخصصة له

═══════════════════════════════════════

🤖 توزيع الأدوار (ملخص):

Agent #1: Infrastructure Architect (الأولوية القصوى ⚡)
├─ Core: Express, Prisma, Auth, Logger, WebSocket
├─ Files: server/index.ts, server/prisma/schema.prisma, server/middleware/*, server/utils/logger.ts
└─ يجب إنجازه أولاً - الباقي يعتمدون عليه

Agent #2: Performance Engineer
├─ Simulation Engine + Budget Calculator
└─ Files: server/routes/simulation.ts, server/services/Simulation*, client/components/SimulationStudio/

Agent #3: System Architect
├─ Pipeline Composer + Visual Editor
└─ Files: server/routes/pipelines.ts, server/services/Pipeline*, client/components/PipelineComposer/

Agent #4: DevOps Engineer
├─ Live Benchmarking + Docker + Queue
└─ Files: server/routes/benchmarks.ts, server/services/Sandbox*, client/components/LiveBenchmark/

Agent #5: Security Engineer
├─ Compliance Engine + Risk Assessment
└─ Files: server/routes/compliance.ts, server/services/Compliance*, client/components/ComplianceAdvisor/

Agent #6: Data Scientist
├─ A/B Testing + Statistics
└─ Files: server/routes/experiments.ts, server/services/Experiment*, client/components/ABTesting/

Agent #7: Cloud Engineer
├─ Cloud Integration + Deployment
└─ Files: server/routes/marketplace.ts, server/services/Infra*, client/components/Marketplace/

Agent #8: ML Engineer
├─ Explainability Engine + Decision Visualizer
└─ Files: server/routes/explain.ts, server/services/Explainability*, client/components/ExplainableDecision/

═══════════════════════════════════════

📊 Prisma Models (Agent #1 يضيفها جميعاً في schema.prisma):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Core Model
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(FREE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  scenarios           Scenario[]
  pipelines           Pipeline[]
  benchmarks          Benchmark[]
  complianceProfiles  ComplianceProfile[]
  experiments         Experiment[]
  deployments         Deployment[]
}

enum Role {
  FREE
  PRO
  ENTERPRISE
  ADMIN
}

// Agent #2
model Scenario {
  id        String   @id @default(cuid())
  userId    String
  name      String
  config    Json
  results   Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Agent #3
model Pipeline {
  id            String   @id @default(cuid())
  userId        String
  name          String
  description   String?
  nodes         Json
  edges         Json
  estimatedCost Decimal? @db.Decimal(10, 4)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Agent #4
model Benchmark {
  id        String          @id @default(cuid())
  userId    String
  name      String
  status    BenchmarkStatus @default(PENDING)
  models    String[]
  dataset   Json
  results   Json?
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt
  user      User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
}

enum BenchmarkStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}

// Agent #5
model ComplianceProfile {
  id              String   @id @default(cuid())
  userId          String
  name            String
  requirements    String[]
  riskScore       Float
  recommendations Json
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Agent #6
model Experiment {
  id         String           @id @default(cuid())
  userId     String
  name       String
  hypothesis String
  models     String[]
  metrics    Json
  status     ExperimentStatus @default(DRAFT)
  results    Json?
  createdAt  DateTime         @default(now())
  updatedAt  DateTime         @updatedAt
  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
}

enum ExperimentStatus {
  DRAFT
  RUNNING
  COMPLETED
  STOPPED
}

// Agent #7
model Deployment {
  id            String           @id @default(cuid())
  userId        String
  modelName     String
  provider      String
  region        String
  status        DeploymentStatus @default(PROVISIONING)
  estimatedCost Decimal          @db.Decimal(10, 4)
  config        Json
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  user          User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
}

enum DeploymentStatus {
  PROVISIONING
  ACTIVE
  FAILED
  TERMINATED
}

// Agent #8
model Explanation {
  id                String   @id @default(cuid())
  decisionId        String
  featureImportance Json
  counterfactuals   Json
  report            String?  @db.Text
  createdAt         DateTime @default(now())
  
  @@index([decisionId])
}
```

═══════════════════════════════════════

⚠️ قواعد إلزامية (Critical Rules):

✅ المسموح:
- اعمل فقط على الملفات المخصصة لك في .cursor/rules/parallel-agents.mdc
- استخدم Auth Middleware من Agent #1: `import { authenticate } from '../middleware/auth'`
- استخدم Logger من Agent #1: `import logger from '../utils/logger'`
- اكتب كود production-ready (OOP, Error Handling, Logging)
- وثّق أي dependencies جديدة

❌ الممنوع:
- لا تعدل package.json (إلا Agent #1)
- لا تعدل server/index.ts (إلا Agent #1 - الباقي ينشئون routes منفصلة)
- لا تعدل tsconfig.json أو vite.config.ts
- لا تعمل على ملفات خارج namespace الخاص بك
- لا تنشئ duplicates لـ Middleware/Logger

═══════════════════════════════════════

📦 Dependencies (Agent #1 يضيفها في package.json):

**Backend Core:**
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "@prisma/client": "^5.7.0",
  "prisma": "^5.7.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "winston": "^3.11.0",
  "prom-client": "^15.1.0",
  "ws": "^8.14.2",
  "zod": "^3.22.4"
}
```

**Agent-Specific Dependencies (كل agent يوثقها):**
- Agent #2: `recharts`, `date-fns`
- Agent #3: `react-flow-renderer`, `dagre`
- Agent #4: `dockerode`, `bull`, `redis`, `multer`
- Agent #5: `pdfkit`, `docxtemplater`, `pizzip`
- Agent #6: `jstat`, `simple-statistics`
- Agent #7: `@aws-sdk/client-lambda`, `@google-cloud/run`, `@azure/arm-containerinstance`
- Agent #8: `d3`, `recharts`

═══════════════════════════════════════

🎬 ابدأوا الآن!

الخطوات:
1. كل agent يقرأ .cursor/rules/parallel-agents.mdc
2. كل agent يسأل: "ما هو رقمي؟"
3. كل agent يعرّف نفسه: "أنا Agent #X"
4. Agent #1 يبدأ فوراً (الأولوية القصوى)
5. Agents #2-8 ينتظرون حتى يكمل Agent #1 Core Infrastructure
6. بعد اكتمال Agent #1، الباقي يبدأون بالتوازي

🎯 الهدف: تطبيق production-ready كامل بـ 7 ميزات متقدمة

🚀 Let's build!
```

---

## ملاحظات مهمة:

1. **تأكد من تفعيل 8 agents** في Composer Mode
2. **انتظر حتى يحدد كل agent رقمه** قبل أن يبدأ
3. **Agent #1 له الأولوية** - يجب أن ينتهي أولاً
4. **راجع كل commit** قبل الموافقة عليه
5. **الـ worktrees تُدار تلقائياً** من Cursor

---

**جاهز للإطلاق! 🚀**

