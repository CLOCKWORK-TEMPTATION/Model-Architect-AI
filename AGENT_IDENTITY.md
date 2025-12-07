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
