# Setup 8 Worktrees for Parallel Development
# Usage: .\setup-worktrees.ps1

$ErrorActionPreference = "Stop"
$basePath = "E:/Model-Architect-AI"
$parentDir = "E:/"

Set-Location $basePath

Write-Host "=== إعداد 8 Worktrees للتطوير الموازي ===" -ForegroundColor Cyan

$worktrees = @(
    @{ path = "${parentDir}Model-Architect-AI-wt1"; branch = "feature/core-infrastructure"; desc = "Core Infrastructure" },
    @{ path = "${parentDir}Model-Architect-AI-wt2"; branch = "feature/simulation-engine"; desc = "Simulation Engine" },
    @{ path = "${parentDir}Model-Architect-AI-wt3"; branch = "feature/pipeline-composer"; desc = "Pipeline Composer" },
    @{ path = "${parentDir}Model-Architect-AI-wt4"; branch = "feature/live-benchmarking"; desc = "Live Benchmarking" },
    @{ path = "${parentDir}Model-Architect-AI-wt5"; branch = "feature/compliance-advisor"; desc = "Compliance Advisor" },
    @{ path = "${parentDir}Model-Architect-AI-wt6"; branch = "feature/ab-testing"; desc = "A/B Testing" },
    @{ path = "${parentDir}Model-Architect-AI-wt7"; branch = "feature/marketplace-deploy"; desc = "Marketplace & Deploy" },
    @{ path = "${parentDir}Model-Architect-AI-wt8"; branch = "feature/explainability"; desc = "Explainability" }
)

$successCount = 0
$failCount = 0

foreach ($wt in $worktrees) {
    Write-Host "`n[${successCount}/8] إنشاء: $($wt.desc)..." -ForegroundColor Yellow
    
    try {
        # Check if already exists
        if (Test-Path $wt.path) {
            Write-Host "  ⚠️  المجلد موجود بالفعل: $($wt.path)" -ForegroundColor Magenta
            continue
        }
        
        # Create worktree
        $result = git worktree add $wt.path -b $wt.branch 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ نجح: $($wt.branch)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  ❌ فشل: $result" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "  ❌ خطأ: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host "`n=== النتيجة النهائية ===" -ForegroundColor Cyan
Write-Host "✅ نجح: $successCount" -ForegroundColor Green
Write-Host "❌ فشل: $failCount" -ForegroundColor Red

Write-Host "`n=== قائمة الـ Worktrees ===" -ForegroundColor Cyan
git worktree list

Write-Host "`n=== قائمة الفروع ===" -ForegroundColor Cyan
git branch --list "feature/*"

Write-Host "`n✨ تم الانتهاء! الآن يمكن توزيع الـ worktrees على 8 وكلاء." -ForegroundColor Green

