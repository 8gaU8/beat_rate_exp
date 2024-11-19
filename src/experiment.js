/**
 * @title beat_rate_exp
 * @description 音声聴取実験のテスト
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import { initJsPsych } from 'jspsych'
import '../styles/main.scss'

import { buildTimeline } from './trials'

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
