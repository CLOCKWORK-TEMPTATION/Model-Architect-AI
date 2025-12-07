$content = Get-Content -Path "AGENT_IDENTITY.md" -Raw
$parts = $content -split "## 📄 ملف"

foreach ($part in $parts) {
    if ([string]::IsNullOrWhiteSpace($part)) { continue }
    
    if ($part -match '^\s*(\d+):') {
        $id = $matches[1]
        
        # Use single quotes for regex to avoid escaping issues with backticks
        if ($part -match '(?ms)```markdown\s+(.*?)\s+```') {
             $extractedContent = $matches[1]
             $fileName = "AGENT_IDENTITY_$id.md"
             Set-Content -Path $fileName -Value $extractedContent -Encoding UTF8
             Write-Host "Generated: $fileName"
        }
    }
}
