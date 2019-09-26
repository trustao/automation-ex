export default class Events {
  constructor() {
    this._events = {}
  }

  on(name, fn) {
    if (Array.isArray(name)) {
      name.forEach(str => {
        this.on(str, fn)
      })
      return
    }

    if (typeof name !== 'string') {
      throw new Error('[错误] events name must be a string')
    }

    if (this._events[name]) {
      this._events[name].push(fn)
    } else {
      this._events[name] = [fn]
    }
  }

  emit(name, ...args) {
    if (Array.isArray(name)) {
      name.forEach(str => {
        this.emit(str, ...args)
      })
      return
    }
    if (typeof name !== 'string') {
      throw new Error('[错误] events name must be a string')
    }
    if (this._events[name] && this._events[name].length) {
      this._events[name].forEach(fn => {
        fn(...args)
      })
    } else {
      // console.warn(`[提示] event "${name}" did not bind function`)
    }
  }

  off(name, fn) {
    if (Array.isArray(name)) {
      name.forEach(str => {
        this.off(str, fn)
      })
      return
    }
    if (typeof name !== 'string') {
      throw new Error('[错误] events name must be a string')
    }

    if (this._events[name]) {
      if (fn) {
        const i = this._events[name].indexOf(fn)
        if (i >= 0) this._events[name].splice(i, 1)
      } else {
        this._events[name] = null
      }
    }
  }

  once(name, fn) {
    if (typeof name !== 'string') {
      throw new Error('[错误] events name must be a string')
    }
    const func = (...args) => {
      fn(...args)
      this.off(name, func)
    }
    this.on(name, func)
  }
}