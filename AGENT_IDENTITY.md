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
