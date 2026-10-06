# Downloads the selected free Unsplash photos into public\images
# Run from the project folder:  powershell -ExecutionPolicy Bypass -File .\download-photos.ps1

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$dir = Join-Path $PSScriptRoot 'public\images'
New-Item -ItemType Directory -Force -Path $dir | Out-Null

# file name = images.unsplash.com photo id
$photos = [ordered]@{
  'hero-lkw'    = 'photo-1574757974346-45bae947d89a'  # man in front of freight truck
  'lkw-fahrer'  = 'photo-1616432043562-3671ea2e5242'  # white truck on road at sunset
  'lkw-strasse' = 'photo-1675889335425-a4af2d00154d'  # white semi truck on rural road
  'lager'       = 'photo-1586528116022-aeda1613c63d'  # workers in warehouse aisle
  'backoffice'  = 'photo-1780733066250-fe359ed8214c'  # colleagues reviewing documents
}

foreach ($name in $photos.Keys) {
  $url = "https://images.unsplash.com/$($photos[$name])?fm=jpg&q=75&w=1600&fit=crop"
  Write-Host "Downloading $name ..."
  Invoke-WebRequest -Uri $url -OutFile (Join-Path $dir "$name.jpg") -UseBasicParsing
}

Copy-Item (Join-Path $dir 'hero-lkw.jpg') (Join-Path $dir 'og-image.jpg') -Force
Write-Host "Done. Photos are in public\images"
