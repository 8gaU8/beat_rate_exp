/**
 * @title beat_rate_exp
 * @description 音声聴取実験のテスト
 * @version 0.1.0
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
} from './basicTrials'
import { genTaskTrials } from './audioTrials'
import '../styles/main.scss'

const buildTimeline = (jsPsych, resultFileName, assetPaths) => {
  const preload = genPreloadTrial(assetPaths)
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
  const timeline = buildTimeline(jsPsych, resultFileName, assetPaths)
  await jsPsych.run(timeline)
  jsPsych.data.get().localSave('json', resultFileName)
  return jsPsych
}
export default run
