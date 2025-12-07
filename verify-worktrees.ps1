# Verify Worktrees Setup
# Usage: .\verify-worktrees.ps1

$ErrorActionPreference = "Continue"
$parentDir = "E:/"

Write-Host "=== التحقق من إعداد الـ Worktrees ===" -ForegroundColor Cyan

$worktrees = @(
    @{ num = 1; path = "${parentDir}Model-Architect-AI-wt1"; branch = "feature/core-infrastructure" },
    @{ num = 2; path = "${parentDir}Model-Architect-AI-wt2"; branch = "feature/simulation-engine" },
    @{ num = 3; path = "${parentDir}Model-Architect-AI-wt3"; branch = "feature/pipeline-composer" },
    @{ num = 4; path = "${parentDir}Model-Architect-AI-wt4"; branch = "feature/live-benchmarking" },
    @{ num = 5; path = "${parentDir}Model-Architect-AI-wt5"; branch = "feature/compliance-advisor" },
    @{ num = 6; path = "${parentDir}Model-Architect-AI-wt6"; branch = "feature/ab-testing" },
    @{ num = 7; path = "${parentDir}Model-Architect-AI-wt7"; branch = "feature/marketplace-deploy" },
    @{ num = 8; path = "${parentDir}Model-Architect-AI-wt8"; branch = "feature/explainability" }
)

$existCount = 0
$missingCount = 0

Write-Host "`n### فحص المجلدات ###" -ForegroundColor Yellow

foreach ($wt in $worktrees) {
    $exists = Test-Path $wt.path
    $statusIcon = if ($exists) { "✅" } else { "❌" }
    $statusColor = if ($exists) { "Green" } else { "Red" }
    
    if ($exists) { $existCount++ } else { $missingCount++ }
    
    Write-Host "  ${statusIcon} Worktree #$($wt.num): $($wt.path)" -ForegroundColor $statusColor
    
    if ($exists) {
        $gitDir = Join-Path $wt.path ".git"
        if (Test-Path $gitDir) {
            $gitContent = Get-Content $gitDir -Raw
            Write-Host "      Git Link: $gitContent" -ForegroundColor Gray
        }
    }
}

Write-Host "`n### إحصائيات ###" -ForegroundColor Yellow
Write-Host "  موجود: $existCount/8" -ForegroundColor Green
Write-Host "  مفقود: $missingCount/8" -ForegroundColor $(if ($missingCount -gt 0) { "Red" } else { "Green" })

Write-Host "`n### Git Worktree List ###" -ForegroundColor Yellow
git worktree list

Write-Host "`n### Git Branches ###" -ForegroundColor Yellow
git branch --list "feature/*"

if ($missingCount -eq 0) {
    Write-Host "`n🎉 جميع الـ Worktrees جاهزة للعمل!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  يوجد $missingCount worktree(s) مفقود. قم بتشغيل setup-worktrees.ps1" -ForegroundColor Red
}

