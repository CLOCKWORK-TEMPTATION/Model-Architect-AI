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
