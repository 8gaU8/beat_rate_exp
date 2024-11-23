import AudioKeyboardResponsePlugin from '@jspsych/plugin-audio-keyboard-response'
import HtmlButtonResponsePlugin from '@jspsych/plugin-html-button-response'
import SurveyLikertPlugin from '@jspsych/plugin-survey-likert'
import { t } from 'i18next'

const genInstruction = () => {
  const instruction = {
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>${t('playPiano')}</p>
      <p>${t('rateLikert')}</p>`,
    choices: [t('start')],
  }
  return instruction
}

const genRestTrial = (restId, restCount) => {
  const restTrial = {
    type: HtmlButtonResponsePlugin,
    stimulus: `<p>${t('rest')} (${restId}/${restCount})</p>`,
    choices: [t('resume')],
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
    t('Likert1'),
    t('Likert2'),
    t('Likert3'),
    t('Likert4'),
    t('Likert5'),
    t('Likert6'),
    t('Likert7'),
  ]
  const answerTrial = {
    type: SurveyLikertPlugin,
    questions: [
      {
        prompt: `${t('doYouFeelBeat')} 
        (${stimId}/${stimLength})`,
        labels: likertScale7,
        button_label: t('continue'),
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
    .filter((path) => path.split('/')[1] !== 'locales')
    .filter((path) => path.split('/')[1] !== 'test')

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
