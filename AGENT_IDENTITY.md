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
