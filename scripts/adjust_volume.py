from pathlib import Path

from pydub import AudioSegment
from pydub.utils import ratio_to_db


def main():
    root = Path("../assets_org/")
    tar_root = Path("../assets")

    dirnames = ["pre", "post", "test"]

    TARGET_RMS = 700

    for dirname in dirnames:
        org_dir = root / dirname
        dist_dir = tar_root / dirname
        if not dist_dir.exists():
            dist_dir.mkdir()

        for path in org_dir.glob("*.wav"):
            print("adjusting... ", f"{dirname}/{path.name}")
            dist_path = dist_dir / path.name
            seg = AudioSegment.from_file(path)
            rms = seg.rms
            db = ratio_to_db(TARGET_RMS / rms)
            new_seg = seg + db

            new_seg.export(dist_path, format="wav")


if __name__ == "__main__":
    # change directory to script location
    import os

    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    main()
