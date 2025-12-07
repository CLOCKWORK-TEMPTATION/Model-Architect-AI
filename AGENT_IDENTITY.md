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
