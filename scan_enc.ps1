
# Scan all HTML files for any remaining double-encoded UTF-8 corruption
$root  = 'c:\xampp\htdocs\AutoGasWeb'
$files = Get-ChildItem $root -Recurse -Filter '*.html'

$corruptPattern = [regex]('[\u00C2\u00C3][\u0080-\u00BF\u2018\u201C\u2030\u0081\u009A]')

foreach ($f in $files) {
    $content = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $hits    = $corruptPattern.Matches($content)
    if ($hits.Count -gt 0) {
        Write-Host "CORRUPT ($($hits.Count) matches): $($f.Name)"
        # Show first 5 contexts
        $shown = 0
        foreach ($m in $hits) {
            $start  = [Math]::Max(0, $m.Index - 15)
            $len    = [Math]::Min(40, $content.Length - $start)
            $ctx    = $content.Substring($start, $len) -replace "`r|`n", ' '
            Write-Host "   ...${ctx}..."
            $shown++
            if ($shown -ge 5) { break }
        }
    } else {
        Write-Host "CLEAN: $($f.Name)"
    }
}
