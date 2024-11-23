/**
 * @title beat_rate_exp
 * @description 拍感評価実験
 * @version 0.2.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import { initJsPsych } from 'jspsych'

import {
  genAdjustVolumeTrial,
  genEndMessage,
  genFullScreenTrial,
  genPreloadTrial,
  genWelcomeTrial,
  genChoseLanguage,
} from './basicTrials'

import { genTaskTrials } from './audioTrials'
import '../styles/main.scss'
import { initI18Next } from './initI18n'

const buildTimeline = (jsPsych, resultFileName, assetPaths) => {
  const preload = genPreloadTrial(assetPaths)
  // const choseLanguage = genChoseLanguage()
  const welcome = genWelcomeTrial(resultFileName)
  const fullscreen = genFullScreenTrial()
  const adjutVolumeLoop = genAdjustVolumeTrial('assets/test/volTest.wav')
  const taskTrials = genTaskTrials(jsPsych, assetPaths)
  const endMessage = genEndMessage(resultFileName)

  let timeline = [preload, welcome, fullscreen, adjutVolumeLoop]
  timeline = timeline.concat(taskTrials)
  timeline.push(endMessage)
  return timeline
}

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths }) {
  const jsPsych = initJsPsych({
    auto_preload: true,
  })

  const isoDate = new Date().toISOString()
  const resultFileName = `result_${isoDate}.json`

  // タイムライン構築

  await initI18Next()
  const timeline1 = [genChoseLanguage()]
  await jsPsych.run(timeline1)
  const timeline2 = buildTimeline(jsPsych, resultFileName, assetPaths)
  await jsPsych.run(timeline2)
  jsPsych.data.get().localSave('json', resultFileName)
  return jsPsych
}
export default run
