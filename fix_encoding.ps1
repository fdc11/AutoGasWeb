
$root  = 'c:\xampp\htdocs\AutoGasWeb'
$files = Get-ChildItem $root -Recurse -Filter '*.html'

# Map: corrupt sequence (stored as UTF-8 text) -> correct character
# These arise from Windows-1252 mis-decoding of UTF-8 bytes
$map = [ordered]@{
    # Uppercase accented
    ([string][char]0x00C3 + [string][char]0x2030) = 'É'    # É  (C3 89 -> Ã‰)
    ([string][char]0x00C3 + [string][char]0x201C) = 'Ó'    # Ó  (C3 93 -> Ã")
    ([string][char]0x00C3 + [string][char]0x2018) = 'Ñ'    # Ñ  (C3 91 -> Ã')
    ([string][char]0x00C3 + [string][char]0x0081) = 'Á'    # Á  (C3 81)
    ([string][char]0x00C3 + [string][char]0x009A) = 'Ú'    # Ú  (C3 9A)

    # Lowercase accented
    ([string][char]0x00C3 + [string][char]0x00A1) = 'á'    # á  (C3 A1)
    ([string][char]0x00C3 + [string][char]0x00A9) = 'é'    # é  (C3 A9)
    ([string][char]0x00C3 + [string][char]0x00AD) = 'í'    # í  (C3 AD)
    ([string][char]0x00C3 + [string][char]0x00B3) = 'ó'    # ó  (C3 B3)
    ([string][char]0x00C3 + [string][char]0x00BA) = 'ú'    # ú  (C3 BA)
    ([string][char]0x00C3 + [string][char]0x00B1) = 'ñ'    # ñ  (C3 B1)
    ([string][char]0x00C3 + [string][char]0x00BC) = 'ü'    # ü  (C3 BC)

    # Punctuation / symbols
    ([string][char]0x00C2 + [string][char]0x00A1) = '¡'    # ¡
    ([string][char]0x00C2 + [string][char]0x00BF) = '¿'    # ¿
    ([string][char]0x00C2 + [string][char]0x00A9) = '©'    # ©
    ([string][char]0x00C2 + [string][char]0x00B7) = '·'    # ·
    ([string][char]0x00C2 + [string][char]0x00B0) = '°'    # °
    ([string][char]0x00C2 + [string][char]0x00AB) = '«'    # «
    ([string][char]0x00C2 + [string][char]0x00BB) = '»'    # »
    ([string][char]0x00C2 + [string][char]0x00A0) = ' '    # non-breaking space -> regular space
}

$fixed = 0
foreach ($f in $files) {
    $content  = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $original = $content
    foreach ($pair in $map.GetEnumerator()) {
        $content = $content.Replace($pair.Key, $pair.Value)
    }
    if ($content -ne $original) {
        [IO.File]::WriteAllText($f.FullName, $content, (New-Object Text.UTF8Encoding $false))
        Write-Host "FIXED: $($f.Name)"
        $fixed++
    } else {
        Write-Host "OK:    $($f.Name)"
    }
}
Write-Host ""
Write-Host "Done. $fixed file(s) corrected."
