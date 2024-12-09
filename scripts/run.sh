#! /bin/bash
set -euxoC pipefail
cd "$(dirname "$0")"

../.venv/bin/python3 ./adjust_volume.py

