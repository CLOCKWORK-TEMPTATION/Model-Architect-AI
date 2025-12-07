
---

## 📄 ملف 1: `E:/Model-Architect-AI-wt1/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #1 - Infrastructure Architect

## 🆔 هويتك
- **الاسم:** Infrastructure Architect
- **الرقم:** Agent #1
- **Worktree:** E:/Model-Architect-AI-wt1
- **Branch:** feature/core-infrastructure
- **الأولوية:** يجب الإنجاز أولاً (جميع الوكلاء يعتمدون عليك)

---

## 🎯 مسؤولياتك الحصرية

### Backend Infrastructure
1. إنشاء هيكل المشروع الأساسي (server/ و client/)
2. إعداد PostgreSQL + Prisma ORM مع Schema كامل لجميع الوكلاء
3. نظام JWT Authentication + RBAC (User, Admin, Enterprise)
4. نظام Logging (Winston) مع مستويات متعددة
5. نظام Monitoring (Prometheus Metrics)
6. WebSocket Server الأساسي للتحديثات الفورية
7. إعداد Docker Compose للتطوير المحلي

### Configuration Files
- إعداد `package.json` مع جميع Dependencies
- إعداد `tsconfig.json` للـ TypeScript
- إعداد `vite.config.ts` للـ Vite
- إعداد `.env.example` مع جميع المتغيرات

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── index.ts (Express App Setup)
├── config/
│   ├── database.ts
│   └── env.ts
├── middleware/
│   ├── auth.ts (JWT Verification + RBAC)
│   ├── validation.ts (Request Validation)
│   ├── errorHandler.ts
│   └── monitoring.ts (Prometheus Metrics)
├── prisma/
│   └── schema.prisma (ALL MODELS FROM ALL AGENTS)
├── utils/
│   ├── logger.ts (Winston Logger)
│   └── response.ts (Standardized API Responses)
└── websocket/
    └── index.ts (WebSocket Server Setup)

client/
├── App.tsx (Router Setup - يُحدث لاحقاً)
├── main.tsx
└── index.html

package.json
package-lock.json
tsconfig.json
vite.config.ts
docker-compose.yml
.env.example
.gitignore
```

---

## ⚠️ القواعد الإلزامية

### ✅ المسموح
1. أنت الوحيد الذي يعدل `package.json` مباشرة
2. أنت الوحيد الذي يعدل `tsconfig.json` و `vite.config.ts`
3. أنت مسؤول عن دمج جميع Prisma Models من الوكلاء الآخرين
4. يجب إنشاء Middleware قابلة لإعادة الاستخدام للوكلاء الآخرين

### ❌ الممنوع
1. لا تعمل على ملفات routes محددة (كل وكيل يُنشئ routes الخاصة به)
2. لا تعمل على ملفات services محددة (كل وكيل مسؤول عن services الخاصة به)
3. لا تعمل على components محددة (ستُدمج لاحقاً)

---

## 🔗 Prisma Schema - جميع Models

يجب تضمين هذه Models في `schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Core Models
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(FREE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
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

// Agent #2 - Simulation Engine
model Scenario {
  id        String   @id @default(cuid())
  userId    String
  name      String
  config    Json     // { taskComplexity, dataVolume, responseTimeSLA, etc. }
  results   Json?    // { estimatedCost, latency, throughput, etc. }
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Agent #3 - Pipeline Composer
model Pipeline {
  id            String   @id @default(cuid())
  userId        String
  name          String
  description   String?
  nodes         Json     // DAG nodes
  edges         Json     // DAG edges
  estimatedCost Decimal? @db.Decimal(10, 4)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Agent #4 - Live Benchmarking
model Benchmark {
  id        String   @id @default(cuid())
  userId    String
  name      String
  status    BenchmarkStatus @default(PENDING)
  models    String[]
  dataset   Json     // User uploaded data
  results   Json?    // { accuracy, latency, cost, etc. }
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
}

enum BenchmarkStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}

// Agent #5 - Compliance Advisor
model ComplianceProfile {
  id              String   @id @default(cuid())
  userId          String
  name            String
  requirements    String[] // ['GDPR', 'HIPAA', etc.]
  riskScore       Float
  recommendations Json
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Agent #6 - A/B Testing
model Experiment {
  id         String   @id @default(cuid())
  userId     String
  name       String
  hypothesis String
  models     String[]
  metrics    Json     // { primaryMetric, secondaryMetrics, etc. }
  status     ExperimentStatus @default(DRAFT)
  results    Json?    // { pValue, confidenceInterval, winner, etc. }
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
}

enum ExperimentStatus {
  DRAFT
  RUNNING
  COMPLETED
  STOPPED
}

// Agent #7 - Marketplace & Deployment
model Deployment {
  id            String   @id @default(cuid())
  userId        String
  modelName     String
  provider      String   // AWS, GCP, Azure
  region        String
  status        DeploymentStatus @default(PROVISIONING)
  estimatedCost Decimal  @db.Decimal(10, 4)
  config        Json
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
}

enum DeploymentStatus {
  PROVISIONING
  ACTIVE
  FAILED
  TERMINATED
}

// Agent #8 - Explainability
model Explanation {
  id                String   @id @default(cuid())
  decisionId        String   // Reference to analysis result
  featureImportance Json
  counterfactuals   Json
  report            String?  @db.Text
  createdAt         DateTime @default(now())
  
  @@index([decisionId])
}
```

---

## 📦 Dependencies الأساسية

أضف هذه في `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@prisma/client": "^5.7.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1",
    "winston": "^3.11.0",
    "prom-client": "^15.1.0",
    "ws": "^8.14.2",
    "zod": "^3.22.4",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "@google/genai": "^1.31.0",
    "lucide-react": "^0.556.0",
    "react-markdown": "^10.1.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/ws": "^8.5.10",
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0",
    "prisma": "^5.7.0",
    "tsx": "^4.7.0",
    "nodemon": "^3.0.2"
  }
}
```

---

## 🔌 Environment Variables

في `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/model_architect_ai"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# API Keys
GEMINI_API_KEY="your-gemini-api-key"

# Server
PORT=3001
NODE_ENV="development"

# Redis (for Agent #4)
REDIS_URL="redis://localhost:6379"

# WebSocket
WS_PORT=3002
```

---

## ✅ حالة الإنجاز

- [ ] هيكل المشروع (server/client)
- [ ] Prisma Schema مع جميع Models
- [ ] Auth Middleware (JWT + RBAC)
- [ ] Logger (Winston)
- [ ] Monitoring (Prometheus)
- [ ] WebSocket Server
- [ ] Docker Compose
- [ ] Configuration Files
- [ ] Documentation (README.md)
- [ ] Tests (Basic Auth Tests)

---

## 📝 ملاحظات التكامل

بعد الإنجاز، أنشئ ملف `INTEGRATION_NOTES.md`:

```markdown
## Middleware المتاحة للوكلاء الآخرين

### Auth Middleware
```typescript
import { authenticate, authorize } from './middleware/auth';

// Protect route
router.get('/protected', authenticate, handler);

// Require specific role
router.post('/admin', authenticate, authorize(['ADMIN']), handler);
```

### Logger
```typescript
import logger from './utils/logger';

logger.info('Message');
logger.error('Error', { metadata });
```

### Validation
```typescript
import { validate } from './middleware/validation';
import { z } from 'zod';

const schema = z.object({ ... });
router.post('/endpoint', validate(schema), handler);
```
```

---

## 🚀 خطوة البدء

1. اقرأ هذا الملف بالكامل ✅
2. أنشئ `DEPENDENCIES.md` (اجمع متطلبات الوكلاء الآخرين)
3. ابدأ التطوير
4. اختبر كل component
5. وثّق في `INTEGRATION_NOTES.md`
6. أبلغ المدير عند الإنجاز

**أنت الأساس. نجاح المشروع يبدأ من عملك!**
```

---

## 📄 ملف 2: `E:/Model-Architect-AI-wt2/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #2 - Performance Engineer

## 🆔 هويتك
- **الاسم:** Performance Engineer
- **الرقم:** Agent #2
- **Worktree:** E:/Model-Architect-AI-wt2
- **Branch:** feature/simulation-engine
- **التبعية:** يعتمد على Agent #1 (انتظر الدمج ثم rebase)

---

## 🎯 مسؤولياتك الحصرية

1. **SimulationEngine**: محرك حساب الأداء (Latency, Cost, Throughput)
2. **BenchmarkService**: قاعدة بيانات معايير الأداء الحقيقية
3. **CostEstimator**: حاسبة تكلفة دقيقة لكل نموذج
4. **Budget Calculator**: أداة تفاعلية لحساب الميزانيات
5. **Frontend Components**: واجهات المحاكاة التفاعلية
6. **API Routes**: `/api/simulate/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   └── simulation.ts
├── services/
│   ├── SimulationEngine.ts
│   ├── BenchmarkService.ts
│   └── CostEstimator.ts
└── models/
    └── BenchmarkData.ts

client/
├── components/SimulationStudio/
│   ├── ScenarioBuilder.tsx
│   ├── BudgetCalculator.tsx
│   ├── LiveComparison.tsx
│   └── index.ts
└── services/
    └── simulationAPI.ts
```

---

## ⚠️ القواعد الإلزامية

### ✅ المسموح
1. إنشاء routes الخاصة بك في `server/routes/simulation.ts`
2. إنشاء services في `server/services/`
3. إنشاء components في namespace الخاص بك فقط
4. استخدام Prisma Client, Auth Middleware, Logger من Agent #1

### ❌ الممنوع
1. **لا تعدل** `package.json` - وثّق في `DEPENDENCIES.md`
2. **لا تعدل** `server/index.ts` - فقط أنشئ routes منفصلة
3. **لا تعدل** `client/App.tsx` - سيُدمج لاحقاً
4. **لا تعمل** على ملفات خارج namespace الخاص بك

---

## 🔗 Dependencies المطلوبة

أنشئ ملف `DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "recharts": "^2.10.0",
  "date-fns": "^2.30.0"
}
```

## Environment Variables
لا توجد متغيرات إضافية مطلوبة.
```

---

## 🔌 استخدام Middleware من Agent #1

```typescript
// في server/routes/simulation.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import logger from '../utils/logger';

const router = Router();

router.post('/simulate/scenario', authenticate, async (req, res) => {
  logger.info('Simulation request', { userId: req.user.id });
  // ... your logic
});

export default router;
```

---

## 📊 Prisma Model (موجود في Agent #1)

```prisma
model Scenario {
  id        String   @id @default(cuid())
  userId    String
  name      String
  config    Json
  results   Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 🎨 Frontend Components Structure

### ScenarioBuilder.tsx
- Sliders للمتغيرات (Task Complexity, Data Volume, Response Time SLA)
- Dropdowns لنوع البيانات
- Preview للسيناريو

### BudgetCalculator.tsx
- حساب تكلفة يومية/شهرية/سنوية
- مقارنة تكاليف بين النماذج
- Charts باستخدام Recharts

### LiveComparison.tsx
- جدول مقارنة فوري بين النماذج
- Heatmap للأداء/التكلفة
- Sorting & Filtering

---

## 📝 API Endpoints المطلوبة

```typescript
POST   /api/simulate/scenario      // إنشاء سيناريو جديد
GET    /api/simulate/scenarios     // جلب سيناريوهات المستخدم
GET    /api/simulate/scenario/:id  // جلب سيناريو محدد
POST   /api/simulate/run/:id       // تشغيل محاكاة
DELETE /api/simulate/scenario/:id  // حذف سيناريو
GET    /api/simulate/benchmarks    // جلب معايير الأداء
```

---

## ✅ حالة الإنجاز

- [ ] SimulationEngine (Backend Logic)
- [ ] BenchmarkService
- [ ] CostEstimator
- [ ] API Routes
- [ ] ScenarioBuilder Component
- [ ] BudgetCalculator Component
- [ ] LiveComparison Component
- [ ] API Client (simulationAPI.ts)
- [ ] Tests
- [ ] Documentation

---

## 📝 ملاحظات التكامل

بعد الإنجاز، أنشئ `INTEGRATION_NOTES.md`:

```markdown
## API Endpoints Added
- POST /api/simulate/scenario
- GET /api/simulate/scenarios
- ... (list all)

## Shared Types (للوكلاء الآخرين)
```typescript
export interface SimulationConfig {
  taskComplexity: number;
  dataVolume: number;
  responseTimeSLA: number;
  dataType: 'text' | 'code' | 'multimodal';
}

export interface SimulationResult {
  estimatedLatency: number;
  estimatedCost: number;
  throughput: number;
}
```

## كيفية الاستخدام من وكلاء آخرين
```typescript
import { CostEstimator } from '../services/CostEstimator';

const cost = await CostEstimator.calculate(modelName, tokenCount);
```
```

---

## 🚀 خطوة البدء

1. اقرأ هذا الملف ✅
2. انتظر دمج Agent #1 في main
3. نفذ `git rebase origin/main`
4. أنشئ `DEPENDENCIES.md`
5. ابدأ التطوير
6. وثّق في `INTEGRATION_NOTES.md`
```

---

## 📄 ملف 3: `E:/Model-Architect-AI-wt3/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #3 - System Architect

## 🆔 هويتك
- **الاسم:** System Architect
- **الرقم:** Agent #3
- **Worktree:** E:/Model-Architect-AI-wt3
- **Branch:** feature/pipeline-composer
- **التبعية:** Agent #1 (Core), Agent #2 (CostEstimator API)

---

## 🎯 مسؤولياتك الحصرية

1. **PipelineEngine**: محرك DAG-based لبناء Pipelines
2. **Pipeline Templates**: قوالب جاهزة (RAG, Ensemble, Cascaded, Hybrid)
3. **OptimizationEngine**: محرك تحسين تلقائي للـ Pipelines
4. **Visual Editor**: محرر بصري باستخدام React Flow
5. **API Routes**: `/api/pipelines/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   └── pipelines.ts
├── services/
│   ├── PipelineEngine.ts
│   ├── OptimizationEngine.ts
│   └── PipelineValidator.ts
└── models/
    └── PipelineTemplates.ts

client/
├── components/PipelineComposer/
│   ├── VisualEditor.tsx
│   ├── ComponentLibrary.tsx
│   ├── ConfigPanel.tsx
│   ├── CostPredictor.tsx
│   └── index.ts
└── services/
    └── pipelineAPI.ts
```

---

## ⚠️ القواعد الإلزامية

### ✅ المسموح
1. إنشاء Pipeline Routes والـ Services
2. استخدام CostEstimator من Agent #2 عبر API Call
3. إنشاء Visual Editor مع React Flow

### ❌ الممنوع
1. **لا تعدل** `package.json` - وثّق في `DEPENDENCIES.md`
2. **لا تعمل** على ملفات خارج namespace الخاص بك

---

## 🔗 Dependencies المطلوبة

`DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "react-flow-renderer": "^10.3.17",
  "dagre": "^0.8.5",
  "@types/dagre": "^0.7.52"
}
```
```

---

## 📊 Prisma Model

```prisma
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
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 📝 API Endpoints

```typescript
POST   /api/pipelines              // إنشاء pipeline
GET    /api/pipelines              // جلب pipelines المستخدم
GET    /api/pipelines/:id          // جلب pipeline محدد
PUT    /api/pipelines/:id          // تحديث pipeline
DELETE /api/pipelines/:id          // حذف pipeline
GET    /api/pipelines/templates    // جلب القوالب الجاهزة
POST   /api/pipelines/:id/optimize // تحسين pipeline
POST   /api/pipelines/:id/export   // تصدير (Docker/K8s)
```

---

## ✅ حالة الإنجاز

- [ ] PipelineEngine (DAG Logic)
- [ ] Pipeline Templates
- [ ] OptimizationEngine
- [ ] Visual Editor (React Flow)
- [ ] API Routes
- [ ] Tests
- [ ] Documentation
```

---

## 📄 ملف 4: `E:/Model-Architect-AI-wt4/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #4 - DevOps Engineer

## 🆔 هويتك
- **الاسم:** DevOps Engineer
- **الرقم:** Agent #4
- **Worktree:** E:/Model-Architect-AI-wt4
- **Branch:** feature/live-benchmarking
- **التبعية:** Agent #1 (Core + WebSocket)

---

## 🎯 مسؤولياتك الحصرية

1. **SandboxManager**: نظام Containerization باستخدام Docker SDK
2. **QueueManager**: نظام Queue باستخدام Bull + Redis
3. **ModelRunner**: تشغيل النماذج وتكامل APIs
4. **Data Sanitization**: تنظيف وتأمين البيانات
5. **API Routes**: `/api/benchmarks/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   └── benchmarks.ts
├── services/
│   ├── SandboxManager.ts
│   ├── ModelRunner.ts
│   ├── QueueManager.ts
│   └── DataSanitizer.ts
└── docker/
    └── sandbox-templates/

client/
├── components/LiveBenchmark/
│   ├── DataUploader.tsx
│   ├── TestConfigurator.tsx
│   ├── ProgressMonitor.tsx
│   ├── ResultsComparer.tsx
│   └── index.ts
└── services/
    └── benchmarkAPI.ts
```

---

## 🔗 Dependencies المطلوبة

`DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "dockerode": "^4.0.2",
  "bull": "^4.12.0",
  "redis": "^4.6.0",
  "@types/dockerode": "^3.3.23",
  "multer": "^1.4.5-lts.1",
  "@types/multer": "^1.4.11"
}
```

## Environment Variables
```env
REDIS_URL="redis://localhost:6379"
DOCKER_HOST="unix:///var/run/docker.sock"
MAX_CONCURRENT_BENCHMARKS=5
```
```

---

## 📊 Prisma Model

```prisma
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
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum BenchmarkStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}
```

---

## 📝 API Endpoints

```typescript
POST   /api/benchmarks/upload      // رفع dataset
POST   /api/benchmarks/run         // بدء benchmark
GET    /api/benchmarks             // جلب benchmarks
GET    /api/benchmarks/:id         // جلب benchmark محدد
GET    /api/benchmarks/:id/status  // WebSocket للتحديثات
DELETE /api/benchmarks/:id         // حذف benchmark
```

---

## ✅ حالة الإنجاز

- [ ] SandboxManager + Docker Integration
- [ ] QueueManager + Redis
- [ ] ModelRunner
- [ ] DataSanitizer
- [ ] API Routes
- [ ] WebSocket Integration
- [ ] Frontend Components
- [ ] Tests
- [ ] Documentation
```

---

## 📄 ملف 5: `E:/Model-Architect-AI-wt5/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #5 - Security & Compliance Engineer

## 🆔 هويتك
- **الاسم:** Security & Compliance Engineer
- **الرقم:** Agent #5
- **Worktree:** E:/Model-Architect-AI-wt5
- **Branch:** feature/compliance-advisor
- **التبعية:** Agent #1 (Core) - مستقل نسبياً

---

## 🎯 مسؤولياتك الحصرية

1. **ComplianceEngine**: قاعدة قواعد (GDPR, HIPAA, CCPA, إلخ)
2. **Risk Assessment**: خوارزمية تقييم المخاطر (0-100)
3. **DocumentGenerator**: توليد وثائق (DPA, PIA, Checklists)
4. **Alternative Suggestions**: اقتراح بدائل آمنة
5. **API Routes**: `/api/compliance/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   └── compliance.ts
├── services/
│   ├── ComplianceEngine.ts
│   ├── RiskAssessment.ts
│   └── DocumentGenerator.ts
├── data/
│   └── regulations/
│       ├── GDPR.json
│       ├── HIPAA.json
│       ├── CCPA.json
│       └── ...

client/
├── components/ComplianceAdvisor/
│   ├── RequirementsWizard.tsx
│   ├── RiskDashboard.tsx
│   ├── RecommendationList.tsx
│   ├── DocumentExporter.tsx
│   └── index.ts
└── services/
    └── complianceAPI.ts
```

---

## 🔗 Dependencies المطلوبة

`DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "pdfkit": "^0.14.0",
  "@types/pdfkit": "^0.13.3",
  "docxtemplater": "^3.42.0",
  "pizzip": "^3.1.6"
}
```
```

---

## 📊 Prisma Model

```prisma
model ComplianceProfile {
  id              String   @id @default(cuid())
  userId          String
  name            String
  requirements    String[]
  riskScore       Float
  recommendations Json
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 📝 API Endpoints

```typescript
POST   /api/compliance/assess              // تقييم التوافق
GET    /api/compliance/regulations         // قائمة القوانين
GET    /api/compliance/alternatives/:model // البدائل الآمنة
POST   /api/compliance/documents/generate  // توليد وثائق
GET    /api/compliance/profiles            // جلب profiles
```

---

## ✅ حالة الإنجاز

- [ ] ComplianceEngine + Rules Database
- [ ] Risk Assessment Algorithm
- [ ] Document Generator
- [ ] API Routes
- [ ] Frontend Components
- [ ] Tests
- [ ] Documentation
```

---

## 📄 ملف 6: `E:/Model-Architect-AI-wt6/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #6 - Data Scientist

## 🆔 هويتك
- **الاسم:** Data Scientist
- **الرقم:** Agent #6
- **Worktree:** E:/Model-Architect-AI-wt6
- **Branch:** feature/ab-testing
- **التبعية:** Agent #1 (Core + WebSocket)

---

## 🎯 مسؤولياتك الحصرية

1. **ExperimentDesigner**: تصميم تجارب مع Power Analysis
2. **StatisticsEngine**: اختبارات إحصائية (T-test, Chi-Square, Bayesian)
3. **Sequential Testing**: Early Stopping Rules
4. **Report Generator**: تقارير تلقائية
5. **API Routes**: `/api/experiments/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   └── experiments.ts
├── services/
│   ├── ExperimentDesigner.ts
│   ├── StatisticsEngine.ts
│   └── ExperimentReportGenerator.ts
└── utils/
    └── statistics.ts

client/
├── components/ABTesting/
│   ├── ExperimentCreator.tsx
│   ├── MonitoringDashboard.tsx
│   ├── ReportViewer.tsx
│   └── index.ts
└── services/
    └── experimentAPI.ts
```

---

## 🔗 Dependencies المطلوبة

`DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "jstat": "^1.9.6",
  "simple-statistics": "^7.8.3",
  "@types/jstat": "^1.9.5"
}
```
```

---

## 📊 Prisma Model

```prisma
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
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum ExperimentStatus {
  DRAFT
  RUNNING
  COMPLETED
  STOPPED
}
```

---

## 📝 API Endpoints

```typescript
POST   /api/experiments           // إنشاء تجربة
GET    /api/experiments           // جلب تجارب
GET    /api/experiments/:id       // جلب تجربة محددة
PUT    /api/experiments/:id       // تحديث تجربة
POST   /api/experiments/:id/start // بدء تجربة
POST   /api/experiments/:id/data  // إضافة بيانات
GET    /api/experiments/:id/report // توليد تقرير
```

---

## ✅ حالة الإنجاز

- [ ] ExperimentDesigner
- [ ] StatisticsEngine
- [ ] Report Generator
- [ ] API Routes
- [ ] Frontend Components
- [ ] WebSocket Integration
- [ ] Tests
- [ ] Documentation
```

---

## 📄 ملف 7: `E:/Model-Architect-AI-wt7/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #7 - Cloud Infrastructure Engineer

## 🆔 هويتك
- **الاسم:** Cloud Infrastructure Engineer
- **الرقم:** Agent #7
- **Worktree:** E:/Model-Architect-AI-wt7
- **Branch:** feature/marketplace-deploy
- **التبعية:** Agent #1 (Core), Agent #2 (CostEstimator)

---

## 🎯 مسؤولياتك الحصرية

1. **InfraManager**: تكامل مع Cloud Providers (AWS, GCP, Azure)
2. **Template Generator**: توليد Terraform/Kubernetes/Docker
3. **Real-time Pricing**: جلب أسعار حقيقية من APIs
4. **One-Click Provisioning**: نشر بنقرة واحدة
5. **API Routes**: `/api/marketplace/*`, `/api/deploy/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   ├── marketplace.ts
│   └── deploy.ts
├── services/
│   ├── InfraManager.ts
│   ├── CloudIntegration.ts
│   └── TemplateGenerator.ts
└── templates/
    ├── terraform/
    ├── kubernetes/
    └── docker-compose/

client/
├── components/Marketplace/
│   ├── DecisionMarketplace.tsx
│   ├── DeploymentWizard.tsx
│   ├── TemplateExporter.tsx
│   └── index.ts
└── services/
    └── marketplaceAPI.ts
```

---

## 🔗 Dependencies المطلوبة

`DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "@aws-sdk/client-lambda": "^3.490.0",
  "@aws-sdk/client-sagemaker": "^3.490.0",
  "@google-cloud/run": "^9.0.0",
  "@google-cloud/aiplatform": "^3.16.0",
  "@azure/arm-containerinstance": "^9.1.0",
  "handlebars": "^4.7.8"
}
```

## Environment Variables
```env
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
GCP_PROJECT_ID=""
GCP_CREDENTIALS_PATH=""
AZURE_CLIENT_ID=""
AZURE_CLIENT_SECRET=""
```
```

---

## 📊 Prisma Model

```prisma
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
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum DeploymentStatus {
  PROVISIONING
  ACTIVE
  FAILED
  TERMINATED
}
```

---

## 📝 API Endpoints

```typescript
GET    /api/marketplace/decisions       // قائمة القرارات
POST   /api/deploy/provision            // نشر نموذج
GET    /api/deploy/templates/:modelId   // جلب templates
GET    /api/deploy/cost-estimate        // تقدير التكلفة
GET    /api/deploy/deployments          // جلب deployments
DELETE /api/deploy/deployments/:id     // إيقاف deployment
```

---

## ✅ حالة الإنجاز

- [ ] Cloud Provider Integration
- [ ] Template Generator
- [ ] Real-time Pricing API
- [ ] One-Click Provisioning
- [ ] API Routes
- [ ] Frontend Components
- [ ] Tests
- [ ] Documentation
```

---

## 📄 ملف 8: `E:/Model-Architect-AI-wt8/AGENT_IDENTITY.md`

```markdown
# 🤖 وكيل #8 - ML Engineer

## 🆔 هويتك
- **الاسم:** ML Engineer
- **الرقم:** Agent #8
- **Worktree:** E:/Model-Architect-AI-wt8
- **Branch:** feature/explainability
- **التبعية:** Agent #1 (Core)

---

## 🎯 مسؤولياتك الحصرية

1. **ExplainabilityEngine**: Feature Importance للقرارات
2. **CounterfactualGenerator**: سيناريوهات "ماذا لو"
3. **Decision Tree Visualizer**: تصور مسار القرار
4. **NLG Report Generator**: تقارير بلغة طبيعية (AR/EN)
5. **API Routes**: `/api/explain/*`

---

## 📁 الملفات المخصصة لك فقط

```
server/
├── routes/
│   └── explain.ts
├── services/
│   ├── ExplainabilityEngine.ts
│   ├── CounterfactualGenerator.ts
│   └── NLGReportGenerator.ts
└── utils/
    └── visualization.ts

client/
├── components/ExplainableDecision/
│   ├── DecisionExplorer.tsx
│   ├── ScenarioComparator.tsx
│   ├── ExportableReport.tsx
│   └── index.ts
└── services/
    └── explainAPI.ts
```

---

## 🔗 Dependencies المطلوبة

`DEPENDENCIES.md`:

```markdown
## NPM Packages
```json
{
  "d3": "^7.8.5",
  "@types/d3": "^7.4.3",
  "recharts": "^2.10.0"
}
```
```

---

## 📊 Prisma Model

```prisma
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

---

## 📝 API Endpoints

```typescript
POST   /api/explain/decision             // تحليل قرار
GET    /api/explain/counterfactuals/:id  // سيناريوهات بديلة
POST   /api/explain/report/generate      // توليد تقرير
GET    /api/explain/explanations/:id     // جلب explanation
```

---

## ✅ حالة الإنجاز

- [ ] ExplainabilityEngine
- [ ] CounterfactualGenerator
- [ ] NLG Report Generator
- [ ] Decision Tree Visualizer
- [ ] API Routes
- [ ] Frontend Components
- [ ] Tests
- [ ] Documentation
```

---
