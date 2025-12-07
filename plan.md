---
name: تنفيذ موازي 8 وكلاء
overview: تقسيم المشروع على 8 worktrees متوازية يعمل عليها 8 وكلاء متخصصين في نفس الوقت، مع تحديد واضح للمسؤوليات والملفات لتجنب التعارض وضمان التكامل السلس.
todos:
  - id: wt1-setup
    content: "Worktree #1: Core Infrastructure - إعداد البنية الأساسية"
    status: pending
  - id: wt2-simulation
    content: "Worktree #2: Simulation Engine - محرك المحاكاة"
    status: pending
  - id: wt3-pipeline
    content: "Worktree #3: Pipeline Composer - محرر الأنابيب"
    status: pending
  - id: wt4-benchmark
    content: "Worktree #4: Live Benchmarking - نظام الاختبار الحي"
    status: pending
  - id: wt5-compliance
    content: "Worktree #5: Compliance Advisor - مستشار الخصوصية"
    status: pending
  - id: wt6-abtesting
    content: "Worktree #6: A/B Testing - إطار التجارب"
    status: pending
  - id: wt7-marketplace
    content: "Worktree #7: Marketplace & Deploy - سوق النشر"
    status: pending
  - id: wt8-explainability
    content: "Worktree #8: Explainability - محرك التفسير"
    status: pending
  - id: integration-merge
    content: دمج متسلسل لجميع الـ worktrees
    status: pending
  - id: frontend-integration
    content: تكامل Frontend النهائي في App.tsx
    status: pending
  - id: e2e-testing
    content: اختبارات E2E شاملة
    status: pending
  - id: documentation-final
    content: التوثيق النهائي الكامل
    status: pending
---

# خطة التنفيذ الموازي - 8 Worktrees

## استراتيجية العمل الموازي

**المنهجية:**

- 8 branches منفصلة من `main`
- كل وكيل له namespace محدد من الملفات
- التكامل المتسلسل بعد الإنجاز
- بروتوكول واضح لتجنب التعارضات

---

## Worktree #1: Core Infrastructure

**Branch:** `feature/core-infrastructure`

**المسؤول:** Infrastructure Architect

### المهام

- هيكل المشروع الأساسي (server/client split)
- PostgreSQL + Prisma Schema كامل
- نظام JWT Authentication + RBAC
- Winston Logger + Prometheus Monitoring
- WebSocket Server الأساسي

### الملفات المخصصة

```
server/index.ts
server/config/
server/middleware/auth.ts
server/middleware/validation.ts
server/middleware/monitoring.ts
server/prisma/schema.prisma
server/utils/logger.ts
server/websocket/index.ts
package.json (main dependencies)
tsconfig.json
docker-compose.yml
.env.example
```

### ملاحظات التكامل

- **يجب إنجازه أولاً** - جميع الـ worktrees تعتمد عليه
- يُدمج في `main` ثم الباقي يقومون بـ rebase

---

## Worktree #2: Simulation Engine

**Branch:** `feature/simulation-engine`

**المسؤول:** Performance Engineer

### المهام

- SimulationEngine (حساب Latency/Cost/Throughput)
- BenchmarkService (قاعدة بيانات Benchmarks)
- Budget Calculator
- API Routes: `/api/simulate/*`

### الملفات المخصصة

```
server/routes/simulation.ts
server/services/SimulationEngine.ts
server/services/BenchmarkService.ts
server/services/CostEstimator.ts
server/models/BenchmarkData.ts
client/components/SimulationStudio/ScenarioBuilder.tsx
client/components/SimulationStudio/BudgetCalculator.tsx
client/components/SimulationStudio/LiveComparison.tsx
client/services/simulationAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- Auth Middleware من Worktree #1

### Prisma Models المطلوبة

```prisma
model Scenario {
  id String @id
  userId String
  config Json
  results Json?
  createdAt DateTime
}
```

---

## Worktree #3: Pipeline Composer

**Branch:** `feature/pipeline-composer`

**المسؤول:** System Architect

### المهام

- PipelineEngine (DAG-based)
- قوالب Pipeline جاهزة (RAG, Ensemble, Cascaded)
- Optimization Engine
- Visual Editor (React Flow)
- API Routes: `/api/pipelines/*`

### الملفات المخصصة

```
server/routes/pipelines.ts
server/services/PipelineEngine.ts
server/services/OptimizationEngine.ts
server/models/PipelineTemplates.ts
client/components/PipelineComposer/VisualEditor.tsx
client/components/PipelineComposer/ComponentLibrary.tsx
client/components/PipelineComposer/ConfigPanel.tsx
client/components/PipelineComposer/CostPredictor.tsx
client/services/pipelineAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- استدعاء CostEstimator API من Worktree #2

### Prisma Models المطلوبة

```prisma
model Pipeline {
  id String @id
  userId String
  name String
  nodes Json
  edges Json
  estimatedCost Decimal?
}
```

### Package Dependencies

```json
"react-flow-renderer": "^10.3.17",
"dagre": "^0.8.5"
```

---

## Worktree #4: Live Benchmarking

**Branch:** `feature/live-benchmarking`

**المسؤول:** DevOps Engineer

### المهام

- SandboxManager (Docker SDK)
- Queue System (Bull + Redis)
- ModelRunner (تكامل مع APIs)
- Data Sanitization
- API Routes: `/api/benchmarks/*`

### الملفات المخصصة

```
server/routes/benchmarks.ts
server/services/SandboxManager.ts
server/services/ModelRunner.ts
server/services/QueueManager.ts
server/docker/sandbox-templates/
client/components/LiveBenchmark/DataUploader.tsx
client/components/LiveBenchmark/TestConfigurator.tsx
client/components/LiveBenchmark/ProgressMonitor.tsx
client/components/LiveBenchmark/ResultsComparer.tsx
client/services/benchmarkAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- WebSocket من Worktree #1 للتحديثات الفورية

### Prisma Models المطلوبة

```prisma
model Benchmark {
  id String @id
  userId String
  status String
  models String[]
  dataset Json
  results Json?
  createdAt DateTime
}
```

### Package Dependencies

```json
"dockerode": "^4.0.2",
"bull": "^4.12.0",
"redis": "^4.6.0"
```

---

## Worktree #5: Compliance Advisor

**Branch:** `feature/compliance-advisor`

**المسؤول:** Security Engineer

### المهام

- ComplianceEngine (قاعدة قواعد GDPR/HIPAA/إلخ)
- Risk Assessment Algorithm
- DocumentGenerator (DPA, PIA)
- Alternative Suggestions
- API Routes: `/api/compliance/*`

### الملفات المخصصة

```
server/routes/compliance.ts
server/services/ComplianceEngine.ts
server/services/RiskAssessment.ts
server/services/DocumentGenerator.ts
server/data/regulations/GDPR.json
server/data/regulations/HIPAA.json
server/data/regulations/CCPA.json
client/components/ComplianceAdvisor/RequirementsWizard.tsx
client/components/ComplianceAdvisor/RiskDashboard.tsx
client/components/ComplianceAdvisor/RecommendationList.tsx
client/components/ComplianceAdvisor/DocumentExporter.tsx
client/services/complianceAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- مستقل نسبياً عن الباقي

### Prisma Models المطلوبة

```prisma
model ComplianceProfile {
  id String @id
  userId String
  requirements String[]
  riskScore Float
  recommendations Json
}
```

### Package Dependencies

```json
"pdfkit": "^0.14.0",
"docxtemplater": "^3.42.0"
```

---

## Worktree #6: A/B Testing Framework

**Branch:** `feature/ab-testing`

**المسؤول:** Data Scientist

### المهام

- ExperimentDesigner (Power Analysis)
- StatisticsEngine (T-tests, Chi-Square, Bayesian)
- Sequential Testing Support
- Auto Report Generator
- API Routes: `/api/experiments/*`

### الملفات المخصصة

```
server/routes/experiments.ts
server/services/ExperimentDesigner.ts
server/services/StatisticsEngine.ts
server/services/ExperimentReportGenerator.ts
server/utils/statistics.ts
client/components/ABTesting/ExperimentCreator.tsx
client/components/ABTesting/MonitoringDashboard.tsx
client/components/ABTesting/ReportViewer.tsx
client/services/experimentAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- WebSocket من Worktree #1

### Prisma Models المطلوبة

```prisma
model Experiment {
  id String @id
  userId String
  name String
  hypothesis String
  models String[]
  metrics Json
  status String
  results Json?
}
```

### Package Dependencies

```json
"jstat": "^1.9.6",
"simple-statistics": "^7.8.3"
```

---

## Worktree #7: Marketplace & Deployment

**Branch:** `feature/marketplace-deploy`

**المسؤول:** Cloud Engineer

### المهام

- Cloud Provider Integration (AWS/GCP/Azure SDKs)
- Terraform/Kubernetes Template Generator
- Real-time Cost API Integration
- One-Click Provisioning
- API Routes: `/api/marketplace/*`, `/api/deploy/*`

### الملفات المخصصة

```
server/routes/marketplace.ts
server/routes/deploy.ts
server/services/InfraManager.ts
server/services/CloudIntegration.ts
server/services/TemplateGenerator.ts
server/templates/terraform/
server/templates/kubernetes/
server/templates/docker-compose/
client/components/Marketplace/DecisionMarketplace.tsx
client/components/Marketplace/DeploymentWizard.tsx
client/components/Marketplace/TemplateExporter.tsx
client/services/marketplaceAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- CostEstimator API من Worktree #2

### Prisma Models المطلوبة

```prisma
model Deployment {
  id String @id
  userId String
  modelName String
  provider String
  region String
  status String
  estimatedCost Decimal
  config Json
}
```

### Package Dependencies

```json
"@aws-sdk/client-lambda": "^3.490.0",
"@google-cloud/run": "^9.0.0",
"@azure/arm-containerinstance": "^9.1.0"
```

---

## Worktree #8: Explainability Engine

**Branch:** `feature/explainability`

**المسؤول:** ML Engineer

### المهام

- ExplainabilityEngine (Feature Importance)
- CounterfactualGenerator (What-if Scenarios)
- Decision Tree Visualizer
- Multi-language NLG Report Generator
- API Routes: `/api/explain/*`

### الملفات المخصصة

```
server/routes/explain.ts
server/services/ExplainabilityEngine.ts
server/services/CounterfactualGenerator.ts
server/services/NLGReportGenerator.ts
server/utils/visualization.ts
client/components/ExplainableDecision/DecisionExplorer.tsx
client/components/ExplainableDecision/ScenarioComparator.tsx
client/components/ExplainableDecision/ExportableReport.tsx
client/services/explainAPI.ts
```

### Dependencies

- Prisma Schema من Worktree #1
- يعمل على نتائج النظام الأصلي (AnalysisResult)

### Prisma Models المطلوبة

```prisma
model Explanation {
  id String @id
  decisionId String
  featureImportance Json
  counterfactuals Json
  report String?
}
```

### Package Dependencies

```json
"d3": "^7.8.5",
"recharts": "^2.10.0"
```

---

## بروتوكول التكامل

### Timeline المقترح

**  :** Worktree #1 فقط

- Infrastructure Architect ينجز Core Setup
- يُدمج في `main`
- جميع الوكلاء الآخرين يقومون بـ `git pull origin main`

**  :** التطوير الموازي

- Worktrees #2 حتى #8 تعمل بالتوازي
- لا تعارض لأن كل وكيل له namespace محدد

**:** الدمج المتسلسل

1. Merge `feature/simulation-engine` → `main`
2. الباقي rebase من `main`
3. Merge `feature/pipeline-composer` → `main`
4. الباقي rebase من `main`
5. Merge `feature/live-benchmarking` → `main`
6. الباقي rebase من `main`
7. Merge `feature/compliance-advisor` → `main`
8. Merge `feature/ab-testing` → `main`
9. Merge `feature/marketplace-deploy` → `main`
10. Merge `feature/explainability` → `main`

**  8:** Frontend Integration

- دمج كل المكونات في [`client/App.tsx`](client/App.tsx)
- إعداد React Router
- اختبارات E2E شاملة

---

## القواعد الذهبية لتجنب التعارض

### الملفات الممنوع تعديلها (إلا Worktree #1)

```
package.json
package-lock.json
tsconfig.json
vite.config.ts
server/index.ts (الـ routes فقط تُضاف)
client/App.tsx (يُحدث في المرحلة الأخيرة)
```

### آلية إضافة Dependencies

كل وكيل ينشئ ملف في worktree الخاص به:

```
DEPENDENCIES.md
---
## NPM Packages Required
- package-name: version
- package-name2: version

## Environment Variables
- VAR_NAME: description
```

Worktree #1 يجمع كل المتطلبات ويضيفها دفعة واحدة.

### آلية توثيق التكامل

كل worktree يحتوي:

```
INTEGRATION_NOTES.md
---
## API Endpoints Added
POST /api/resource
GET /api/resource/:id

## Prisma Models Needed
model ResourceName { ... }

## Shared Types
export interface Type { ... }
```

### الملف المشترك للـ Types

ينشأ في Worktree #1:

```typescript
// server/types/shared.ts
// كل وكيل يوثق Types المطلوبة في INTEGRATION_NOTES
// ثم تُضاف هنا مركزياً
```

---

## خطوات التنفيذ العملية

### 1. إعداد الـ Worktrees (يقوم به مدير المشروع)

```bash
# Create 8 worktrees
git worktree add ../Model-Architect-AI-wt1 -b feature/core-infrastructure
git worktree add ../Model-Architect-AI-wt2 -b feature/simulation-engine
git worktree add ../Model-Architect-AI-wt3 -b feature/pipeline-composer
git worktree add ../Model-Architect-AI-wt4 -b feature/live-benchmarking
git worktree add ../Model-Architect-AI-wt5 -b feature/compliance-advisor
git worktree add ../Model-Architect-AI-wt6 -b feature/ab-testing
git worktree add ../Model-Architect-AI-wt7 -b feature/marketplace-deploy
git worktree add ../Model-Architect-AI-wt8 -b feature/explainability
```

### 2. توزيع المهام على الوكلاء

كل وكيل يستلم:

- رابط الـ worktree
- قسم الخطة الخاص به
- قائمة الملفات المخصصة له
- Dependencies المطلوبة

### 3. مراقبة التقدم

كل وكيل ينشئ ملف:

```
PROGRESS.md
---
- [x] Task 1
- [x] Task 2
- [ ] Task 3
```

### 4. الدمج النهائي

مدير المشروع يقوم بالـ merges حسب الترتيب المحدد مع حل أي تعارضات بسيطة.

---

## الملاحظات الحرجة للوكلاء

### للوكيل #1 (Core Infrastructure)

أنت الأساس. يجب إنجاز:

- Prisma Schema كامل (بناءً على Models المطلوبة من كل الوكلاء)
- Auth System جاهز للاستخدام
- Logger جاهز للاستدعاء
- WebSocket Server جاهز

### لباقي الوكلاء (#2-#8)

- **لا تعدل** `package.json` مباشرة - وثق في `DEPENDENCIES.md`
- **لا تعدل** `server/index.ts` - أنشئ routes منفصلة فقط
- **لا تعدل** `client/App.tsx` - أنشئ components منفصلة
- **استخدم** الـ Logger من Worktree #1
- **استخدم** Auth Middleware من Worktree #1
- **وثّق** كل شيء في `INTEGRATION_NOTES.md`

---

**الآن جاهزون للتنفيذ!**