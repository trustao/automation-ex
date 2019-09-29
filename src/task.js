import Events from './event'
import log from './logger'
import {sleep} from "./util";

const STATUS = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  STOP: 'STOP',
  PAUSED: 'PAUSED'
}
let id = 0
export default class Tasks extends Events {
  constructor() {
    super()
    this.taskList = []
    this.status = STATUS.READY
    this.stepCount = 0
    this.id = id++
  }

  __changeStatus (status) {
    if (status === this.status) return
    const old = this.status
    this.status = status
    this.emit('changeStatus', status, old)
  }

  addStep (asyncFn) {
    if (this.status !== STATUS.READY) {
      console.error('任务已进行，无法添加')
      return
    }
    this.taskList.push(asyncFn)
  }

  addAssertStep (assertAsyncFn) {
    if (this.status !== STATUS.READY) {
      console.error('任务已进行，无法添加')
      return
    }
    const func = async () => {
      const resFn = await assertAsyncFn()
      this._runtimeTask.unshift(resFn)
    }
    this.taskList.push(func)
  }

  clearStep () {
    this.stop()
    this.taskList = []
    this.__changeStatus(STATUS.READY)
  }

  stop () {
    this.__changeStatus(STATUS.STOP)
    this._runtimeTask = []
    this.currentChildTask = null
  }

  paused () {
    this.__changeStatus(STATUS.PAUSED)
  }

  continue = async () => {
    this.__changeStatus(STATUS.RUNNING)
    if (this.currentChildTask) {
      await new Promise(resolve => {
        this.currentChildTask.once('taskEnd', () => {
          this.currentChildTask = null
          this.off('changeStatus', this.changeHandlerOnChild)
          resolve()
        })
      })
    }
    let next = true
    while (next) {
      next = await this.runStep()
    }
    if (!this.currentChildTask && !this._runtimeTask.length) {
      // log('任务结束', this.id)
      this.__changeStatus(STATUS.STOP)
      this.emit('taskEnd')
    } else {
      // log('任务暂停', this.id)
      this.emit('taskPaused')
    }
  }

  checkAppRunning = async () => {
    const instance = this.currentChildTask ? this.currentChildTask : this
    const current = instance.stepCount
    await sleep()
    let tryCount = 10
    while (tryCount) {
      log('checkRunning', instance.stepCount, current)
      if (instance.stepCount !== current) {
        tryCount = 0
        return true
      } else {
        await sleep()
        tryCount--
      }
    }
    return instance.stepCount !== current
  }

  run = async () => {
    this._runtimeTask = [...this.taskList]
    await this.continue()
  }

  runStep = async () => {
    this.stepCount++
    if (this.status !== STATUS.RUNNING) {
      return false
    }
    const asyncFn = this._runtimeTask.shift()
    if (asyncFn) {
      if (asyncFn instanceof Tasks) {
        return await this.connectChildTask(asyncFn)
      } else {
        await asyncFn()
        return true
      }
    } else {
      return  false
    }
  }

  connectChildTask = async (childTask) => {
    this.currentChildTask = childTask
    this.on('changeStatus', this.changeHandlerOnChild)
    childTask.once('taskEnd', () => {
      this.currentChildTask = null
      this.off('changeStatus', this.changeHandlerOnChild)
      this.__childResolveFn(true)
    })
    childTask.run()
    return await new Promise(resolve => {
      this.__childResolveFn = resolve
    })
  }

  changeHandlerOnChild = (status, old) => {
    switch (status) {
      case STATUS.PAUSED:
        this.currentChildTask.__changeStatus(status)
        break
      case STATUS.STOP:
        this.currentChildTask.__changeStatus(status)
        this.__childResolveFn(false)
        this.off('changeStatus', this.changeHandlerOnChild)
        this.currentChildTask = null
        break
      case STATUS.RUNNING:
        if (this.currentChildTask.status === STATUS.PAUSED) {
          this.currentChildTask.__changeStatus(status)
          this.currentChildTask.continue()
        }
        break
    }
  }
}

export class RepeatTask extends Tasks {
  constructor(props) {
    super(props);
  }

  stopOnCurrentCycleEnd () {
    this.once('cycleEnd', () => {
      this.__changeStatus(STATUS.STOP)
    })
  }

  runCycle = async () => {
    this.emit('cycleStart')
    let next = true
    while (next) {
      next = await this.runStep()
    }
    if (!this._runtimeTask.length) {
      this.emit('cycleEnd')
    }
    if (this.status === STATUS.RUNNING) {
      this._runtimeTask = [...this.taskList]
      return this.runCycle
    } else {
      log('暂停')
      return false
    }
  }

  continue = async () => {
    this.__changeStatus(STATUS.RUNNING)
    if (this.currentChildTask) {
      await new Promise(resolve => {
        this.currentChildTask.once('taskEnd', () => {
          this.currentChildTask = null
          this.off('changeStatus', this.changeHandlerOnChild)
          resolve()
        })
      })
    }
    let nextFn = this.runCycle
    while (nextFn) {
      nextFn = await nextFn()
    }
    log('停止')
  }

}