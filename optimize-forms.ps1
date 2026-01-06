# PowerShell Script to Analyze Form File Sizes
# Run this to see current file sizes and optimization recommendations

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Form Files Size Analysis" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$formsPath = ".\public\forms"
$files = Get-ChildItem -Path $formsPath -File

$totalSize = 0

Write-Host "Current File Sizes:" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    $sizeMB = [math]::Round($file.Length / 1MB, 2)
    $totalSize += $file.Length
    
    $color = "Green"
    if ($sizeMB -gt 5) { $color = "Red" }
    elseif ($sizeMB -gt 2) { $color = "Yellow" }
    
    Write-Host "  📄 $($file.Name)" -ForegroundColor White
    Write-Host "     Size: $sizeMB MB" -ForegroundColor $color
    Write-Host ""
}

$totalMB = [math]::Round($totalSize / 1MB, 2)

Write-Host "Total Size: $totalMB MB" -ForegroundColor Cyan
Write-Host ""

# Recommendations
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Recommendations" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($totalMB -gt 20) {
    Write-Host "⚠️  CRITICAL: File sizes are very large!" -ForegroundColor Red
    Write-Host "   Recommended actions:" -ForegroundColor Yellow
    Write-Host "   1. Convert to PDF (60-80% size reduction)" -ForegroundColor White
    Write-Host "   2. Compress images in Word docs" -ForegroundColor White
    Write-Host "   3. Remove embedded objects" -ForegroundColor White
} elseif ($totalMB -gt 10) {
    Write-Host "⚠️  WARNING: File sizes could be optimized" -ForegroundColor Yellow
    Write-Host "   Consider converting to PDF or compressing images" -ForegroundColor White
} else {
    Write-Host "✅ File sizes are acceptable" -ForegroundColor Green
}

Write-Host ""
Write-Host "For detailed optimization instructions, see:" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT_AND_OPTIMIZATION_GUIDE.md" -ForegroundColor White
Write-Host ""
