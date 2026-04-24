
# Fix double-encoded UTF-8 characters in all HTML files
# All replacement characters are expressed as [char] codepoints
# to avoid any editor/shell encoding issues.

$root  = 'c:\xampp\htdocs\AutoGasWeb'
$files = Get-ChildItem $root -Recurse -Filter '*.html'
$fixed = 0

# Build replacement pairs: [corrupt_2char_string, correct_1char_string]
# Corrupt sequences are two Unicode chars that represent the Windows-1252
# mis-decoding of a 2-byte UTF-8 sequence.
$pairs = @(
    # lowercase vowels with accent
    ,@( ([string][char]0x00C3 + [string][char]0x00A1), [string][char]0x00E1 )  # a-acute
    ,@( ([string][char]0x00C3 + [string][char]0x00A9), [string][char]0x00E9 )  # e-acute
    ,@( ([string][char]0x00C3 + [string][char]0x00AD), [string][char]0x00ED )  # i-acute
    ,@( ([string][char]0x00C3 + [string][char]0x00B3), [string][char]0x00F3 )  # o-acute
    ,@( ([string][char]0x00C3 + [string][char]0x00BA), [string][char]0x00FA )  # u-acute
    ,@( ([string][char]0x00C3 + [string][char]0x00B1), [string][char]0x00F1 )  # n-tilde
    ,@( ([string][char]0x00C3 + [string][char]0x00BC), [string][char]0x00FC )  # u-umlaut
    # uppercase vowels with accent
    ,@( ([string][char]0x00C3 + [string][char]0x0081), [string][char]0x00C1 )  # A-acute
    ,@( ([string][char]0x00C3 + [string][char]0x2030), [string][char]0x00C9 )  # E-acute  (0x89 W1252 = U+2030)
    ,@( ([string][char]0x00C3 + [string][char]0x201C), [string][char]0x00D3 )  # O-acute  (0x93 W1252 = U+201C)
    ,@( ([string][char]0x00C3 + [string][char]0x009A), [string][char]0x00DA )  # U-acute
    ,@( ([string][char]0x00C3 + [string][char]0x2018), [string][char]0x00D1 )  # N-tilde  (0x91 W1252 = U+2018)
    # punctuation / symbols
    ,@( ([string][char]0x00C2 + [string][char]0x00A1), [string][char]0x00A1 )  # inverted !
    ,@( ([string][char]0x00C2 + [string][char]0x00BF), [string][char]0x00BF )  # inverted ?
    ,@( ([string][char]0x00C2 + [string][char]0x00A9), [string][char]0x00A9 )  # copyright
    ,@( ([string][char]0x00C2 + [string][char]0x00B7), [string][char]0x00B7 )  # middle dot
    ,@( ([string][char]0x00C2 + [string][char]0x00B0), [string][char]0x00B0 )  # degree
    ,@( ([string][char]0x00C2 + [string][char]0x00AB), [string][char]0x00AB )  # left double angle
    ,@( ([string][char]0x00C2 + [string][char]0x00BB), [string][char]0x00BB )  # right double angle
    ,@( ([string][char]0x00C2 + [string][char]0x00A0), [string][char]0x0020 )  # NBSP -> space
)

foreach ($f in $files) {
    $content  = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8)
    $original = $content
    foreach ($pair in $pairs) {
        $content = $content.Replace($pair[0], $pair[1])
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
Write-Host "============================="
Write-Host "Done. $fixed file(s) corrected."
Write-Host "============================="
