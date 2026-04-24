
# Scan ALL js, html, and css files for corrupt double-encoded UTF-8 characters
$root  = 'c:\xampp\htdocs\AutoGasWeb'
$files = Get-ChildItem $root -Recurse -Include '*.html','*.js','*.css'

$pattern = [regex]('[\u00C2\u00C3][\u0080-\u00BF\u2018\u201C\u2030\u0081\u009A]')

$totalCorrupt = 0
foreach ($f in $files) {
    $content = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $hits    = $pattern.Matches($content)
    if ($hits.Count -gt 0) {
        $totalCorrupt += $hits.Count
        Write-Host "CORRUPT ($($hits.Count)): $($f.Name)"
        $shown = 0
        foreach ($h in $hits) {
            $start = [Math]::Max(0, $h.Index - 25)
            $len   = [Math]::Min(55, $content.Length - $start)
            $ctx   = $content.Substring($start, $len).Replace([char]13,'').Replace([char]10,' ')
            Write-Host "   -> $ctx"
            $shown++
            if ($shown -ge 3) { break }
        }
    }
}

if ($totalCorrupt -eq 0) {
    Write-Host "ALL CLEAN - No corrupt characters found in any file."
} else {
    Write-Host ""
    Write-Host "Total corrupt sequences found: $totalCorrupt"
}
