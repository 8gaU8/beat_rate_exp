import AudioKeyboardResponsePlugin from '@jspsych/plugin-audio-keyboard-response'
import HtmlButtonResponsePlugin from '@jspsych/plugin-html-button-response'
import SurveyLikertPlugin from '@jspsych/plugin-survey-likert'

const genInstruction = () => {
  const instruction = {
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>ピアノ音声が再生されます</p>
      <p>ビート感を感じる度合いを7段階で評価してください</p>`,
    choices: ['開始'],
  }
  return instruction
}

const genRestTrial = (restId, restCount) => {
  const restTrial = {
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>休憩 (${restId}/${restCount})</p>`,
    choices: ['再開'],
  }
  return restTrial
}

const genTaskBlock = (stimPath, stimId, stimLength) => {
  const audioTrial = {
    type: AudioKeyboardResponsePlugin,
    stimulus: stimPath,
    choices: 'NO_KEYS',
    prompt: `<p style="font-size:48px;">Audio (${stimId}/${stimLength})</p>`,
    trial_ends_after_audio: true,
  }

  const likertScale7 = [
    'Strongly Agree',
    'Agree',
    'Somewhat Agree',
    'Neutral',
    'Somewhat Disagree',
    'Disagree',
    'Strongly Disagree',
  ]
  const answerTrial = {
    type: SurveyLikertPlugin,
    questions: [
      {
        prompt: `Do you feel Beat? (${stimId}/${stimLength})`,
        labels: likertScale7,
      },
    ],
    on_finish: (data) => {
      // eslint-disable-next-line no-param-reassign
      data.stimulus = stimPath
    },
  }
  return [audioTrial, answerTrial]
}

/**
 * 一連の音声刺激のトライアルを作成
 * @param {*} assetPaths
 * @returns
 */
export const genTaskTrials = (jsPsych, assetPaths) => {
  const stimData = jsPsych.randomization
    .factorial([assetPaths.audio], 1)
    .map((x) => x[0])
    .filter((path) => !path.includes('test'))

  const stimLength = stimData.length
  const restCount = 5
  const restInterval = Math.trunc(stimLength / restCount)

  let trials = [genInstruction()]
  let restId = 1

  for (let stimId = 0; stimId < stimLength; stimId += 1) {
    const trial = genTaskBlock(stimData[stimId], stimId + 1, stimLength)
    trials = trials.concat(trial)

    if (
      (stimId + 1) % restInterval === 0 &&
      stimLength - stimId > restInterval
    ) {
      const restTrial = genRestTrial(restId, restCount)
      trials.push(restTrial)
      trials.push(genInstruction())
      restId += 1
    }
  }
  return trials
}

export default genTaskTrials
