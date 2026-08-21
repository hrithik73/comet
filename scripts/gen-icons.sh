#!/usr/bin/env bash
# Source of truth for the app icons. Run from the repo root after changing colors:
#   bash scripts/gen-icons.sh
# Needs ImageMagick (brew install imagemagick).
#
# The mark: a seed (dot) at the base of the trajectory leaving it — a rising
# stroke that bleeds off the top-right corner. Asymmetric on purpose; the dot is
# NOT centered, and the stroke is a segment, not a slash through the field (a
# full-bleed diagonal past the dot reads as a percent sign).
# Reads as a clean silhouette, so it survives iOS tinted mode and Android
# themed icons where only the alpha channel of the mark survives.
set -euo pipefail

INK='#14161A'      # ground
SIGNAL='#FF5C35'   # vermilion — the mark
DEV_BG='#3A3F43'   # palette.neutral.700
A=src/assets
R=224              # corner radius on the 1024 grid
# First font that exists wins — the label is baked into the PNG, so this only
# matters on the machine that regenerates the icons.
FONT=$(for f in \
  '/System/Library/Fonts/Supplemental/DIN Alternate Bold.ttf' \
  '/System/Library/Fonts/Supplemental/Arial Bold.ttf' \
  '/System/Library/Fonts/Supplemental/Verdana Bold.ttf'; do
  [ -f "$f" ] && echo "$f" && break
done)

# $1 = output, $2 = mark color, $3 = y offset (dev lifts the mark above its band)
mark() {
  local y=$3
  magick -size 1024x1024 xc:none \
    -stroke "$2" -strokewidth 96 -fill none \
    -draw 'stroke-linecap round' \
    -draw "line 500,$((540 + y)) 1160,$((-120 + y))" \
    -stroke none -fill "$2" \
    -draw "circle 300,$((740 + y)) 300,$((616 + y))" \
    "$1"
}

# $1 = color, $2 = output
ground() {
  magick -size 1024x1024 xc:none -fill "$1" \
    -draw "roundrectangle 0,0 1023,1023 $R,$R" "$2"
}

# Everything is clipped to the rounded square so the diagonal bleeds cleanly.
clip() { # $1 = file, edited in place
  magick "$1" \
    \( -size 1024x1024 xc:none -fill white -draw "roundrectangle 0,0 1023,1023 $R,$R" \) \
    -alpha set -compose DstIn -composite "$1"
}

# Prod: vermilion mark on ink.
mark /tmp/mark.png "$SIGNAL" 0
ground "$INK" /tmp/ground.png
magick /tmp/ground.png /tmp/mark.png -composite "$A/icon.png"
clip "$A/icon.png"
magick "$A/icon.png" -resize 48x48 "$A/favicon.png"

# Dev: lighter ground, mark lifted, and a signal band across the bottom carrying
# a DEV label. The band alone is what reads at 40px; the label is legible from
# the app switcher and Settings upward.
mark /tmp/mark-dev.png "$SIGNAL" -120
ground "$DEV_BG" /tmp/ground-dev.png
magick /tmp/ground-dev.png /tmp/mark-dev.png -composite \
  -fill "$SIGNAL" -draw 'rectangle 0,824 1023,1023' \
  -font "$FONT" -pointsize 128 -kerning 24 -fill "$INK" \
  -gravity southwest -annotate +104+56 'DEV' \
  "$A/icon-dev.png"
clip "$A/icon-dev.png"

# Android adaptive: the OS masks the foreground to a circle/squircle (~66% of the
# canvas), which would clip the dot, so the mark is inset to the safe zone here
# rather than bleeding as it does on iOS.
safe() { # $1 = source mark, $2 = output
  magick "$1" -resize 66% -background none -gravity center -extent 1024x1024 "$2"
}
safe /tmp/mark.png "$A/android-icon-foreground.png"
magick -size 1024x1024 "xc:$INK" "$A/android-icon-background.png"
# Monochrome layer is tinted by the OS — ship it as a white silhouette.
mark /tmp/mono.png white 0
safe /tmp/mono.png "$A/android-icon-monochrome.png"
