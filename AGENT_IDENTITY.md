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
