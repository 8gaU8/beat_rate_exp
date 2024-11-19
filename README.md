# Hearing Test

## 概要
- 対応する2種類の音声を再生し、ABテストを実施する実験
- [jsPsych Builder](https://github.com/bjoluc/jspsych-builder)を使用
- デプロイはAWS EC2上で走らせるJATOSに

## 実行方法

```bash
$ git clone https://github.com/8gaU8/HearingTest
$ npm install
$ npm run start
```

## ビルド
```bash
$ npm run build
```

## JATOS用ビルド

```bash
$ npm run jatos
```

## 刺激の追加方法
- [8gaU8/recording](https://github.com/8gaU8/recording)で生成される`/rec`ディレクトリの中身を`/assets`にコピーする
- `/assets/{グループ}/{pre|post}/{被験者}_{曲名}.wav`の形式

```
assets
├── group1
│   ├── post
│   │   ├── part01_fuga.wav
│   │   ├── part01_sonate.wav
│   │   ├── part02_fuga.wav
│   │   .
│   │   . 
│   └── pre
│       ├── part01_fuga.wav
│       ├── part01_sonate.wav
│       ├── part02_fuga.wav
│       .
│       .
│
├── group2
│   ├── post
│   │   ├── part03_fuga.wav
│   │   ├── part03_sonate.wav
│   │   ├── part04_sonate.wav
│   │   .
│   │   . 
│   └── pre
│       ├── part03_fuga.wav
│       ├── part03_sonate.wav
│       ├── part04_sonate.wav
.       .
.       .

```