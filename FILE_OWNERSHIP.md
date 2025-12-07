# قواعد ملكية الملفات - File Ownership Rules

⚠️ كل agent يعمل فقط على الملفات المخصصة له أدناه
⚠️ Cursor Composer Mode سيدير الـ worktrees تلقائياً

---

## 🤖 Agent #1 - Infrastructure Architect

### المسؤول الوحيد عن:
```
server/index.ts
server/config/database.ts
server/config/env.ts
server/middleware/auth.ts
server/middleware/validation.ts
server/middleware/errorHandler.ts
server/middleware/monitoring.ts
server/prisma/schema.prisma
server/utils/logger.ts
server/utils/response.ts
server/websocket/index.ts
package.json (إضافة dependencies)
tsconfig.json
docker-compose.yml
.env.example
```

### المهام:
- Express Server Setup
- Prisma Schema بجميع Models (من كل الوكلاء)
- JWT Auth + RBAC (User, Admin, Enterprise)
- Winston Logger
- Prometheus Monitoring
- WebSocket Server

### الأولوية: ⚡ يجب الإنجاز أولاً

---

## 🤖 Agent #2 - Performance Engineer

### المسؤول الوحيد عن:
```
server/routes/simulation.ts
server/services/SimulationEngine.ts
server/services/BenchmarkService.ts
server/services/CostEstimator.ts
server/models/BenchmarkData.ts
client/components/SimulationStudio/
client/services/simulationAPI.ts
```

### المهام:
- Simulation Engine (Latency, Cost, Throughput calculation)
- Benchmark Service (قاعدة بيانات معايير الأداء)
- Budget Calculator
- Frontend Components للمحاكاة التفاعلية

### Dependencies:
- استخدام Auth Middleware من Agent #1
- استخدام Logger من Agent #1

---

## 🤖 Agent #3 - System Architect

### المسؤول الوحيد عن:
```
server/routes/pipelines.ts
server/services/PipelineEngine.ts
server/services/OptimizationEngine.ts
server/services/PipelineValidator.ts
server/models/PipelineTemplates.ts
client/components/PipelineComposer/
client/services/pipelineAPI.ts
```

### المهام:
- Pipeline Engine (DAG-based)
- Pipeline Templates (RAG, Ensemble, Cascaded, Hybrid)
- Optimization Engine
- Visual Editor باستخدام React Flow

### Dependencies:
- استخدام Auth Middleware من Agent #1
- استخدام CostEstimator API من Agent #2

---

## 🤖 Agent #4 - DevOps Engineer

### المسؤول الوحيد عن:
```
server/routes/benchmarks.ts
server/services/SandboxManager.ts
server/services/ModelRunner.ts
server/services/QueueManager.ts
server/services/DataSanitizer.ts
server/docker/sandbox-templates/
client/components/LiveBenchmark/
client/services/benchmarkAPI.ts
```

### المهام:
- Sandbox Manager (Docker SDK)
- Queue System (Bull + Redis)
- Model Runner (تكامل مع APIs)
- Data Sanitization
- Frontend Components للاختبار الحي

### Dependencies:
- استخدام Auth Middleware من Agent #1
- استخدام WebSocket من Agent #1

---

## 🤖 Agent #5 - Security Engineer

### المسؤول الوحيد عن:
```
server/routes/compliance.ts
server/services/ComplianceEngine.ts
server/services/RiskAssessment.ts
server/services/DocumentGenerator.ts
server/data/regulations/GDPR.json
server/data/regulations/HIPAA.json
server/data/regulations/CCPA.json
client/components/ComplianceAdvisor/
client/services/complianceAPI.ts
```

### المهام:
- Compliance Engine (قواعد GDPR, HIPAA, CCPA)
- Risk Assessment Algorithm (0-100 score)
- Document Generator (DPA, PIA, Checklists)
- Alternative Suggestions

### Dependencies:
- استخدام Auth Middleware من Agent #1
- مستقل نسبياً عن الوكلاء الآخرين

---

## 🤖 Agent #6 - Data Scientist

### المسؤول الوحيد عن:
```
server/routes/experiments.ts
server/services/ExperimentDesigner.ts
server/services/StatisticsEngine.ts
server/services/ExperimentReportGenerator.ts
server/utils/statistics.ts
client/components/ABTesting/
client/services/experimentAPI.ts
```

### المهام:
- Experiment Designer (Power Analysis)
- Statistics Engine (T-test, Chi-Square, Bayesian)
- Sequential Testing Support
- Report Generator التلقائي

### Dependencies:
- استخدام Auth Middleware من Agent #1
- استخدام WebSocket من Agent #1

---

## 🤖 Agent #7 - Cloud Engineer

### المسؤول الوحيد عن:
```
server/routes/marketplace.ts
server/routes/deploy.ts
server/services/InfraManager.ts
server/services/CloudIntegration.ts
server/services/TemplateGenerator.ts
server/templates/terraform/
server/templates/kubernetes/
server/templates/docker-compose/
client/components/Marketplace/
client/services/marketplaceAPI.ts
```

### المهام:
- Cloud Provider Integration (AWS, GCP, Azure)
- Terraform/Kubernetes Template Generator
- Real-time Cost API Integration
- One-Click Provisioning

### Dependencies:
- استخدام Auth Middleware من Agent #1
- استخدام CostEstimator من Agent #2

---

## 🤖 Agent #8 - ML Engineer

### المسؤول الوحيد عن:
```
server/routes/explain.ts
server/services/ExplainabilityEngine.ts
server/services/CounterfactualGenerator.ts
server/services/NLGReportGenerator.ts
server/utils/visualization.ts
client/components/ExplainableDecision/
client/services/explainAPI.ts
```

### المهام:
- Explainability Engine (Feature Importance)
- Counterfactual Generator (سيناريوهات "ماذا لو")
- Decision Tree Visualizer
- NLG Report Generator (AR/EN)

### Dependencies:
- استخدام Auth Middleware من Agent #1

---

## ⚠️ قواعد عدم التعارض (Critical Rules)

### 1. File Isolation
- كل agent يعمل **فقط** على الملفات المحددة له أعلاه
- **لا استثناءات** - أي تعديل خارج namespace محظور

### 2. Shared Resources
- **فقط Agent #1** يعدل:
  - `package.json`
  - `tsconfig.json`
  - `server/index.ts`
  - `vite.config.ts`

### 3. Dependencies
- كل agent يستخدم Middleware/Logger من Agent #1
- لا إنشاء duplicates

### 4. API Routes
- كل agent ينشئ routes منفصلة في `server/routes/`
- Agent #1 يجمعها في `server/index.ts`

### 5. Frontend Components
- كل agent ينشئ components في folder منفصل
- التكامل النهائي يتم في `client/App.tsx` لاحقاً

---

## 📊 Prisma Models (Agent #1 يضيفها جميعاً)

```prisma
// Core
model User { ... }

// Agent #2
model Scenario { ... }

// Agent #3
model Pipeline { ... }

// Agent #4
model Benchmark { ... }

// Agent #5
model ComplianceProfile { ... }

// Agent #6
model Experiment { ... }

// Agent #7
model Deployment { ... }

// Agent #8
model Explanation { ... }
```

---

## 🎯 Success Criteria

- ✅ Zero file conflicts
- ✅ كل agent أنجز مهامه بالكامل
- ✅ كل feature تعمل بشكل مستقل
- ✅ التكامل النهائي سلس
- ✅ كود production-ready (OOP, Error Handling, Logging)

---

**ملاحظة:** Cursor Composer Mode سيدير الـ worktrees الداخلية تلقائياً. لا تقلق بشأن Git branching - فقط ركز على مهامك المحددة.

