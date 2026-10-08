#!/usr/bin/env bash
# Downloads extra free Unsplash photos (Unsplash License) into src/assets/images if they are missing.
# Runs automatically in GitHub Actions before each build. Locally on Windows use download-photos.ps1.
set -u
dir="$(dirname "$0")/../src/assets/images"
mkdir -p "$dir"
dl() {
  [ -f "$dir/$1.jpg" ] && return 0
  curl -fsSL --retry 2 "https://images.unsplash.com/$2?fm=jpg&q=80&w=1600&fit=crop" -o "$dir/$1.jpg" || { rm -f "$dir/$1.jpg"; echo "Could not download $1 – page shows an icon instead."; }
}
dl paketzusteller photo-1543499459-d1460946bdc6   # man carrying cardboard boxes (Handy Wicaksono)
dl reinigung      photo-1627905646269-7f034dcc5738 # gloved hands cleaning a desk (Towfiqu barbhuiya)
dl saison-bau     photo-1673978483693-9e4be55b2a35 # construction worker with hard hat (d c)
dl saison-hotel   photo-1580256081112-e49377338b7f # housekeeping cart in hotel corridor (Ashwini Chaudhary)
exit 0
