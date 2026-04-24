
# Fix remaining corrupt char in publicacion.html
$path    = 'c:\xampp\htdocs\AutoGasWeb\Publicaciones\publicacion.html'
$content = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
$orig    = $content

# Apply same replacements as fix_enc.ps1
$pairs = @(
    ,@( ([string][char]0x00C3 + [string][char]0x00A1), [string][char]0x00E1 )
    ,@( ([string][char]0x00C3 + [string][char]0x00A9), [string][char]0x00E9 )
    ,@( ([string][char]0x00C3 + [string][char]0x00AD), [string][char]0x00ED )
    ,@( ([string][char]0x00C3 + [string][char]0x00B3), [string][char]0x00F3 )
    ,@( ([string][char]0x00C3 + [string][char]0x00BA), [string][char]0x00FA )
    ,@( ([string][char]0x00C3 + [string][char]0x00B1), [string][char]0x00F1 )
    ,@( ([string][char]0x00C3 + [string][char]0x00BC), [string][char]0x00FC )
    ,@( ([string][char]0x00C3 + [string][char]0x0081), [string][char]0x00C1 )
    ,@( ([string][char]0x00C3 + [string][char]0x2030), [string][char]0x00C9 )
    ,@( ([string][char]0x00C3 + [string][char]0x201C), [string][char]0x00D3 )
    ,@( ([string][char]0x00C3 + [string][char]0x009A), [string][char]0x00DA )
    ,@( ([string][char]0x00C3 + [string][char]0x2018), [string][char]0x00D1 )
    ,@( ([string][char]0x00C2 + [string][char]0x00A1), [string][char]0x00A1 )
    ,@( ([string][char]0x00C2 + [string][char]0x00BF), [string][char]0x00BF )
    ,@( ([string][char]0x00C2 + [string][char]0x00A9), [string][char]0x00A9 )
    ,@( ([string][char]0x00C2 + [string][char]0x00B7), [string][char]0x00B7 )
    ,@( ([string][char]0x00C2 + [string][char]0x00B0), [string][char]0x00B0 )
    ,@( ([string][char]0x00C2 + [string][char]0x00AB), [string][char]0x00AB )
    ,@( ([string][char]0x00C2 + [string][char]0x00BB), [string][char]0x00BB )
    ,@( ([string][char]0x00C2 + [string][char]0x00A0), [string][char]0x0020 )
)

foreach ($pair in $pairs) {
    $content = $content.Replace($pair[0], $pair[1])
}

# Also handle the specific pattern seen: L?NEA -> LINEA (likely LÍNEA)
# The remaining corrupt char is in a comment "LINEA ROJA" area
# Pattern: Ã with char 0xED (but already handled) or some other combo
# Let's also try extended coverage for any remaining Ã or Â sequences
$content = $content -replace ([string][char]0x00C3 + '.'), {
    param($m)
    $second = [int][char]($m.Value[1])
    switch ($second) {
        0x00A1 { [string][char]0x00E1 }  # a
        0x00A9 { [string][char]0x00E9 }  # e
        0x00AD { [string][char]0x00ED }  # i
        0x00B3 { [string][char]0x00F3 }  # o
        0x00BA { [string][char]0x00FA }  # u
        0x00B1 { [string][char]0x00F1 }  # n
        default { $m.Value }
    }
}

if ($content -ne $orig) {
    [IO.File]::WriteAllText($path, $content, (New-Object Text.UTF8Encoding $false))
    Write-Host "FIXED publicacion.html"
} else {
    Write-Host "No changes needed."
}

# Show remaining corrupt patterns
$pattern = [regex]('[\u00C2\u00C3][\u0080-\u00BF\u2018\u201C\u2030\u0081\u009A]')
$hits = $pattern.Matches($content)
Write-Host "Remaining corrupt sequences: $($hits.Count)"
foreach ($h in $hits) {
    $start = [Math]::Max(0, $h.Index - 20)
    $end   = [Math]::Min($content.Length, $h.Index + 30)
    $ctx   = $content.Substring($start, $end - $start).Replace([char]13,'').Replace([char]10,' ')
    Write-Host "  -> $ctx"
}
