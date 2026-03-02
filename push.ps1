# Budgy auto-deploy script
# Uso: .\push.ps1 "messaggio commit"

$msg = if ($args[0]) { $args[0] } else { "update" }
$ts = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()

# Aggiorna il timestamp nel service worker
(Get-Content sw.js) -replace 'budgy-__TIMESTAMP__', "budgy-$ts" | Set-Content sw.js

git add .
git commit -m $msg
git push

# Ripristina il placeholder per il prossimo deploy
(Get-Content sw.js) -replace "budgy-$ts", 'budgy-__TIMESTAMP__' | Set-Content sw.js
git add sw.js
git commit -m "restore sw placeholder" --allow-empty-message
git push

Write-Host "✅ Deploy completato! L'app si aggiornerà alla prossima apertura." -ForegroundColor Green
