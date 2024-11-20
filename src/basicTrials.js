import jsPsychFullscreen from '@jspsych/plugin-fullscreen'
import HtmlButtonResponsePlugin from '@jspsych/plugin-html-button-response'
import PreloadPlugin from '@jspsych/plugin-preload'
import AudioButtonResponsePlugin from '@jspsych/plugin-audio-button-response'
import { genTaskTrials } from './audioTrials'

export const genAdjustVolumeTrial = (stimPath) => {
  const adjustVolumeTrial = {
    type: AudioButtonResponsePlugin,
    stimulus: stimPath,
    prompt: `<p>ボリュームを調節してください</p>`,
    choices: ['もう一度再生する', '完了'],
    trial_ends_after_audio: false,
  }
  const adjutVolumeLoop = {
    timeline: [adjustVolumeTrial],
    loop_function: (data) => {
      if (data.values()[0].response === 0) return true
      return false
    },
  }
  return adjutVolumeLoop
}

export const genPreloadTrial = (assetPaths) => {
  const preload = {
    type: PreloadPlugin,
    audio: assetPaths.audio,
  }
  return preload
}

export const genWelcomeTrial = (resultFileName) => {
  const welcome = {
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>実験中はネットワークが切れない安定な環境で実験を行って下さい</p>
    <p>実験が終了したら${resultFileName}を実験者に共有してください</p>`,
    choices: ['確認'],
  }
  return welcome
}

export const genFullScreenTrial = () => {
  const fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: '<p>実験はフルスクリーンで行います</p>',
    button_label: '確認',
  }
  return fullscreen
}

export const genEndMessage = (resultFileName) => {
  const trial = {
    type: HtmlButtonResponsePlugin,
    stimulus: () => {
      if (!navigator.onLine) return '<p>ネットワークから切断されました。<p>'
      return `<p>実験は正常に終了しました</p>
      <p>${resultFileName} を実験者に共有してください<p>`
    },
    choices: ['確認'],
  }
  return trial
}

export const buildTimeline = (jsPsych, resultFileName, assetPaths) => {
  const preload = genPreloadTrial(assetPaths)
  const welcome = genWelcomeTrial(resultFileName)
  const fullscreen = genFullScreenTrial()
  const adjutVolumeLoop = genAdjustVolumeTrial()
  const taskTrials = genTaskTrials(jsPsych, assetPaths)
  const endMessage = genEndMessage(resultFileName)

  let timeline = [preload, welcome, fullscreen, adjutVolumeLoop]
  timeline = timeline.concat(taskTrials)
  timeline.push(endMessage)
  return timeline
}
