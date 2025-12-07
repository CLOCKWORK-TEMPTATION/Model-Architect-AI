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
