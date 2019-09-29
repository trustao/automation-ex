import Tasks, {RepeatTask} from './task';
import {sleep} from './util';

const mainTask = new Tasks()

mainTask.addStep(async () => {
  await sleep(200)
  console.log('main 1')
})
mainTask.addStep(async () => {
  await sleep(200)
  console.log('main 2')
})

mainTask.addAssertStep(async () => {
  await sleep(200)
  console.log('main 3, assert')
  return async () => {
    await sleep(200)
    console.log('assert fn 1')
  }
})

mainTask.addStep(async () => {
  await sleep(200)
  console.log('main 4')
})

const rep = new RepeatTask()
rep.addStep(async () => {
  await sleep(200)
  console.log('~~~~~~~~rep 1')
})
rep.addStep(async () => {
  await sleep(200)
  console.log('~~~~~~~~rep 2')
})
let f = true
rep.addAssertStep(async () => {
  await sleep(200)
  console.log('~~~~~~~~rep 3, assert')
  f = !f
  return f ? childBTask : childTask
})

const childBTask = new Tasks()

childBTask.addStep(async () => {
  await sleep(200)
  console.log('B 1')
})
childBTask.addStep(async () => {
  await sleep(200)
  console.log('B 2')
})

childBTask.addStep(async () => {
  await sleep(200)
  console.log('B 3')
})

childBTask.addStep(async () => {
  await sleep(200)
  console.log('B 4')
})

childBTask.addStep(async () => {
  await sleep(200)
  console.log('B 5')
})



const childTask = new Tasks()

childTask.addStep(async () => {
  await sleep(200)
  console.log('A 1')
})
childTask.addStep(async () => {
  await sleep(200)
  console.log('A 2')
})
childTask.addStep(async () => {
  await sleep(200)
  console.log('A 3')
})
childTask.addStep(async () => {
  await sleep(200)
  console.log('A 4')
})
childTask.addStep(async () => {
  await sleep(200)
  console.log('A 5')
})

mainTask.addStep(rep)

mainTask.run(() => {
  console.log('ok')
}).catch((err) => {
  console.error(err)
})

setTimeout(() => {
  mainTask.paused()
}, 5200)

setTimeout(() => {
  mainTask.continue()
}, 10000)
