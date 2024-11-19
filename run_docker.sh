#! /bin/bash
set -euxoC pipefail
cd "$(dirname "$0")"

err() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
}


docker run -d -p 9000:9000 -e TZ=Asia/Tokyo -v "$(pwd)/jatos/study_assets_root:/opt/jatos_data/study_assets_root/"  jatos/jatos:latest
