import Events from './event'
import log from './logger'

const STATUS = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  STOP: 'STOP',
  PAUSED: 'PAUSED'
}

export default class Tasks extends Events {
  constructor() {
    super()
    this.taskList = []
    this.status = STATUS.READY
  }

  __changeStatus (status) {
    if (status === this.status) return
    this.status = status
    this.emit('changeStatus', status)
  }

  addStep (asyncFn) {
    if (this.status !== STATUS.READY) {
      console.error('任务已进行，无法添加')
      return
    }
    this.taskList.push(asyncFn)
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
          resolve()
        })
      })
    }
    let next = true
    while (next) {
      next = await this.runStep()
    }
    if (!this.currentChildTask && !this._runtimeTask.length) {
      log('任务结束')
      this.__changeStatus(STATUS.STOP)
      this.emit('taskEnd')
    } else {
      log('任务暂停')
      this.emit('taskPaused')
    }
  }

  run = async () => {
    this._runtimeTask = [...this.taskList]
    await this.continue()
  }

  runStep = async () => {
    if (this.status !== STATUS.RUNNING) {
      log('step STOP', this.status)
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
    let resolveFn
    this.currentChildTask = childTask
    childTask.run()
    const changeHandler = (status) => {
      console.log(status)
      switch (status) {
        case STATUS.PAUSED:
          console.log('修改状态')
          childTask.__changeStatus(status)
          break
        case STATUS.STOP:
          childTask.__changeStatus(status)
          resolveFn(false)
          this.off('changeStatus', changeHandler)
          this.currentChildTask = null
          break
        case STATUS.RUNNING:
          if (childTask.status === STATUS.PAUSED) {
            childTask.__changeStatus(status)
            childTask.continue()
          }
          break
      }
    }
    this.on('changeStatus', changeHandler)
    childTask.on('taskEnd', () => {
      resolveFn(true)
    })
    return await new Promise(resolve => {
      resolveFn = resolve
    })
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
    console.log(this.status)
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
    let nextFn = this.runCycle
    while (nextFn) {
      nextFn = await nextFn()
    }
    log('停止')
  }

  run = async () => {
    this._runtimeTask = [...this.taskList]
    await this.continue()
  }
}