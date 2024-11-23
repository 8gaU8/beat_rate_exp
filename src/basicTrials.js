import jsPsychFullscreen from '@jspsych/plugin-fullscreen'
import { t, changeLanguage } from 'i18next'
import HtmlButtonResponsePlugin from '@jspsych/plugin-html-button-response'
import PreloadPlugin from '@jspsych/plugin-preload'
import AudioButtonResponsePlugin from '@jspsych/plugin-audio-button-response'

export function genChoseLanguage() {
  const choseLanguage = {
    type: HtmlButtonResponsePlugin,
    stimulus: '<p>Chose language / 言語を選択してください:</p>',
    choices: ['ja', 'en'],
    on_finish: (data) => {
      if (data.response === 0) changeLanguage('ja')
      else changeLanguage('en')
    },
  }
  return choseLanguage
}

export const genAdjustVolumeTrial = (stimPath) => {
  const adjustVolumeTrial = {
    type: AudioButtonResponsePlugin,
    stimulus: stimPath,
    prompt: `<p>${t('volume')}</p>`,
    choices: [t('play_again'), t('complete')],
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
    audio: assetPaths.eaudio,
  }
  return preload
}

export const genWelcomeTrial = (resultFileName) => {
  const welcome = {
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>${t('atFinishedEXP')} ${t('shareFile')}</p>
    <p>${resultFileName}</p>`,
    choices: [t('confirm')],
  }
  return welcome
}

export const genFullScreenTrial = () => {
  const fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `<p>${t('fullScr')}</p>`,
    button_label: t('confirm'),
  }
  return fullscreen
}

export const genEndMessage = (resultFileName) => {
  const trial = {
    type: HtmlButtonResponsePlugin,
    stimulus: () => {
      if (!navigator.onLine) return `<p>t['']<p>`
      return `<p>${t('expFinished')}</p>
      <p>${t('shareFile')}: ${resultFileName} <p>`
    },
    choices: [t('confirm')],
  }
  return trial
}
