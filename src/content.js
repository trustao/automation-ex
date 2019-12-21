import Tasks, {RepeatTask} from './task'
import log from './logger'
import {sleep} from "./util";

const TR_PREFIX = '_tr_automation'

class AutoApp extends Tasks {
  constructor() {
    super()
    this.data = {
      sybValue: '濮阳晰和雅居商贸有限公司',
      shopName: '天峰运动户外专营店',
      ruleNo: 'CSG4418118164142',
      ruleCount: 1,
      page: 1,
      JP: false,
      ZT: true
    }
    this.errorSpu = []
    this.init()
  }

  init() {
    this.appendController()
    this.listenStatusChange()
    this.catchError()
  }

  combinationTask () {
    this.isTagTask = false
    // 进入基础资料
    this.addStep(this.goBaseInfoPage)

    this.addStep(this.createRepeatTask())
  }

  createRepeatTask () {
    const repeat = new RepeatTask()

    // 店铺管理
    repeat.addStep(this.goShopManage)
    // 获得Iframe
    repeat.addStep(this.getIframe)
    // 选择筛选条件 查询
    repeat.addStep(this.searchGoods)
    // 进入规则页 查询
    repeat.addStep(this.goRulePage)
    // 填写规则 查询
    repeat.addStep(this.writeRules)
    // 检查规则 提交
    repeat.addStep(this.checkRule)

    return repeat
  }

  clearRulesTask () {
    this.isTagTask = true
    // 进入基础资料
    this.addStep(this.goBaseInfoPage)

    this.addStep(this.clearRuleChildTask())
  }

  clearRuleChildTask () {
    const repeat = new RepeatTask()

    // 店铺管理
    repeat.addStep(this.goShopManage)
    // 获得Iframe
    repeat.addStep(this.getIframe)
    // 选择筛选条件 查询
    repeat.addStep(this.searchGoods)
    // 进入规则页 查询
    repeat.addStep(this.goRulePage)

    // 检查规则 提交
    repeat.addStep(this.clearRules)

    return repeat
  }

  clearRules = async () => {
    const button = await c('#deleteRules', this.iframeDoc)
    button[0].click()
    await sleep()
    const confirm = await c('.modal-footer button:contains("确认")', this.iframeDoc)
    confirm[0].click()
    await sleep()
    try {
      await c('#lblSysInfo:contains("操作成功！")', this.iframeDoc, 50)
      log('成功', this.currentGoodsNo)
    } catch (e) {
      log('失败', this.currentGoodsNo)
      this.markError()
    }
    this.currentGoodsNo = ''
    this.iframeDoc.find('.modal:visible').click()
  }

  tagSingleTask () {
    this.nextPage = this.data.page
    // 进入基础资料
    this.addStep(this.goBaseInfoPage)


    this.addStep(this.createSingleTask())
  }

  createSingleTask () {
    const repeat = new RepeatTask()

    // 店铺管理
    repeat.addStep(this.goShopManage)
    // 获得Iframe
    repeat.addStep(this.getIframe)
    // 选择筛选条件 查询
    repeat.addStep(this.getTagGoodsList)

    repeat.addAssertStep(this.checkFirstCheckbox)

    return repeat
  }

  tagTask () {
    this.nextPage = this.data.page
    // 进入基础资料
    this.addStep(this.goBaseInfoPage)
    // 店铺管理
    this.addStep(this.goShopManage)
    // 获得Iframe
    this.addStep(this.getIframe)

    // 选择筛选条件 查询
    this.addStep(this.getTagGoodsList)


    this.addStep(this.createTagTask())
  }

  createTagTask () {
    const repeat = new RepeatTask()

    repeat.addStep(this.checkCheckbox)
    repeat.addStep(this.submitTag)
    repeat.addStep(sleep.bind(null, 5000))

    return repeat
  }

  refreshShopStock = async () => {
    const btn = await c('#refreshShopStock', this.iframeDoc)
    btn.click()
    await sleep()
  }

  checkFirstCheckbox = async () => {
    const dataTable = await c('#shopGoodsList_shopGoods-table', this.iframeDoc)
    const checkbox = dataTable.find('tbody tr:first-child td:nth-child(9) input')
    const isDisable =  checkbox.prop('disabled')
    if (isDisable) {
      return this.openJDSend()
    } else {
      checkbox.click()
      return this.submitTag
    }
  }

  openJDSend () {
    const childTask = new Tasks()

    // 进入规则页 查询
    childTask.addStep(this.goRulePage)
    // 刷新规则
    childTask.addStep(this.refreshShopStock)
    // 提交
    childTask.addStep(this.submitRules)
    return childTask
  }

  getTagGoodsList = async () => {
    await this.selectSearchCondition(this.iframeDoc)
    await this.triggerSelect('select[name=shopGoodsList_shopGoods-table_length]', 100, this.iframeDoc)
    await sleep(3000)
    if (this.data.page > 1) {
      const page = await c(`#shopGoodsList_shopGoods-table_paginate a:contains(3)`, this.iframeDoc)
      page.text(this.data.page)
      page[0].click()
      console.log('page:', this.data.page)
    }
  }

  clickSearch = async () => {
    const search = await c('#shopGoodsList_queryShopGoodsForm', this.iframeDoc)
    search.click()
    await sleep()
  }

  checkCheckbox = async () => {
    if (this.nextPage !== this.data.page) {
      const next = await c(`#shopGoodsList_shopGoods-table_paginate a:contains(3)`, this.iframeDoc)
      next.text(this.nextPage)
      next[0].click()
      await sleep(3000)
      console.log('打标下一页')
    }
    const dataTable = await c('#shopGoodsList_shopGoods-table', this.iframeDoc)
    const checkboxs = dataTable.find('td:nth-child(9) input')
    checkboxs.click()
    await sleep()
  }

  submitTag = async () => {
    const checkeds = this.iframeDoc.find('td:nth-child(9) input').filter((i, e) => e.checked)
    if (!checkeds.length) {
      await sleep(5000)
      await this.clickSearch()
      return
    }
    this.iframeDoc.find('#shopGoodsList_handleJdDeliver').click()
    await sleep()
    const confirm = await c('.modal-footer button:contains("确认")', this.iframeDoc)
    confirm[0].click()
    await sleep()
    try {
      await c('#lblSysInfo:contains("操作成功")', this.iframeDoc, 50)
    } catch (e) {
      this.nextPage++
    }
    await sleep()
    this.iframeDoc.find('.modal:visible')[0].click()
  }


  checkRule = async () => {
    const rulesTable = await c(`#rulesItemTable input[value=${this.data.ruleNo}]`,  this.iframeDoc)
    if (!rulesTable.length) {
      log('错误')
      return
    }
    await this.submitRules()
  }

  submitRules = async () => {
    const button = await c('#submitRules', this.iframeDoc)
    button[0].click()
    await sleep()
    const confirm = await c('.modal-footer button:contains("确认")', this.iframeDoc)
    confirm[0].click()
    await sleep()
    try {
      await c('#lblSysInfo:contains("操作成功！")', this.iframeDoc, 50)
      log('成功', this.currentGoodsNo)
    } catch (e) {
      log('失败', this.currentGoodsNo)
      this.markError()
    }
    this.currentGoodsNo = ''
    this.iframeDoc.find('#sysAlart').click()
  }
  goBaseInfoPage = async () => {
    const baseInfo = await c('#top_104202')
    baseInfo.click()
    await sleep()
  }
  goShopManage = async () => {
    const showManage = await c('#9250')
    showManage[0].click()
    await sleep(1000)
  }

  getIframe  = async () => {
    const iframe = await c(`#mainIframe`)
    this.iframeDoc = $(iframe[0].contentDocument)
  }

  searchGoods = async () => {
    await this.selectSearchCondition(this.iframeDoc)
    const search = await c('#shopGoodsList_queryShopGoodsForm', this.iframeDoc)
    search.click()
    await sleep()
    if (this.data.page > 1) {
      const page = await c(`#shopGoodsList_shopGoods-table_paginate a:contains(3)`, this.iframeDoc)
      page.text(this.data.page)
      page[0].click()
      console.log('page:', this.data.page)
      await sleep(1000)
    }
  }

  goRulePage = async () => {
    await this.clickGoodsModify(this.iframeDoc)
    const rule = await c('#editNewCombinationRule', this.iframeDoc)
    rule.click()
    await sleep()
  }

  triggerSelect = async (selectId, optionText, parent) => {
    const deptId = await c(`${selectId} option:contains("${optionText}")`, parent, 20)
    const deptSelect = await c(`${selectId}`, parent, 20)
    deptSelect[0].value = deptId.val()
    deptSelect[0].dispatchEvent(new Event('change'))
  }
  writeRules = async () => {
    const iframeDoc = this.iframeDoc
    const noInput = await c('#rulesEdit_materialShopGoodsNo', iframeDoc)
    noInput.val(this.data.ruleNo)
    iframeDoc.find('#rulesEdit_num').val(this.data.ruleCount)
    iframeDoc.find('#rulesEdit-rulesItem-add')[0].click()
    await sleep()
  }

  clickGoodsModify = async (iframeDoc) => {
    const dataTable = await c('#shopGoodsList_shopGoods-table', iframeDoc)
    const tr = this.selectNoErrorGoodsTr(dataTable)
    tr.find('a:contains("修改")')[0].click()
    await sleep()
  }


  selectSearchCondition = async (iframeDoc) => {
    if (this.data.sybValue) {
      await this.triggerSelect('#shopGoodsList_deptId', this.data.sybValue, iframeDoc)
      await sleep()
    }
    if (this.data.shopName) {
      await this.triggerSelect('#shopGoodsList_shopId', this.data.shopName, iframeDoc)
      await sleep()
    }

    await this.triggerSelect('#shopGoodsList_jdDeliver', this.data.JP ? '是' : '否', iframeDoc)
    await this.triggerSelect('#shopGoodsList_isCombination', this.data.ZT ? '是' : '否', iframeDoc)
  }

  selectNoErrorGoodsTr (dataTable) {
    return this.getTr(dataTable.find('tbody tr:first-child'))
  }

  getTr (tr) {
    if (!tr.length) {
      throw new Error('列表无数据')
    }
    const no = tr.find('td:nth-child(6)').text()
    const isError = this.errorSpu.find(e => e.no === no)
    if (isError && isError.count > 2) {
      this.updateErrorLog()
      return this.getTr(tr.next())
    } else {
      this.currentGoodsNo = no
      return tr
    }
  }

  updateErrorLog () {
    $(`#${TR_PREFIX}-log`).remove()
    $('body').append(`
      <div id="${`${TR_PREFIX}-log`}">
        ${this.errorSpu.filter(i => i.count >= 3).reduce((str, i) => str + `<p>${i.no}, 重试3次， 失败</p>`, '')}   
      </div> 
    `)
  }

  catchError () {
    window.addEventListener('unhandledrejection', event => {
      $(`.${TR_PREFIX}-controller`).css({'background': 'rgba(255,12,17,0.3)', 'pointer-events': 'none'})
      this.checkAppRunning().then(res => {
        if (!res) {
          if (this.currentGoodsNo) {
            this.markError()
          }
          c('.modal:visible', this.iframeDoc, 10).then(el => {
            if (el)el.click()
            this.stop()
            this.run()
            $(`.${TR_PREFIX}-controller`).css({'background': 'rgba(0,255,27,0.3)', 'pointer-events': 'auto'})
          }).catch(e => {
            this.stop()
            this.run()
            $(`.${TR_PREFIX}-controller`).css({'background': 'rgba(0,255,27,0.3)', 'pointer-events': 'auto'})
          })
        }
      })
    });
  }

  markError () {
    if (!this.currentGoodsNo) return
    const error = this.errorSpu.find(i => i.no === this.currentGoodsNo)
    if (error) {
      error.count++
    } else {
      this.errorSpu.push({
        no: this.currentGoodsNo,
        count: 1
      })
    }
    console.log(this.errorSpu)
    this.currentGoodsNo = ''
  }

  listenStatusChange () {
    this.on('changeStatus', (status) => {
      switch (status) {
        case 'READY':
          this.changeFormDisabledStatus(false)
          $(`#${TR_PREFIX}-start`).attr('disabled', false)
          $(`#${TR_PREFIX}-tag-run`).attr('disabled', false)
          $(`#${TR_PREFIX}-tag-single-run`).attr('disabled', false)
          $(`#${TR_PREFIX}-paused`).attr('disabled', true)
          $(`#${TR_PREFIX}-stop`).attr('disabled', true)
          $(`#${TR_PREFIX}-continue`).attr('disabled', true)
          $(`.${TR_PREFIX}-controller`).css('background', 'rgba(0, 0, 0, .3)')
          break
        case 'RUNNING':
          this.changeFormDisabledStatus(true)
          $(`#${TR_PREFIX}-start`).attr('disabled', true)
          $(`#${TR_PREFIX}-tag-run`).attr('disabled', true)
          $(`#${TR_PREFIX}-tag-single-run`).attr('disabled', true)
          $(`#${TR_PREFIX}-paused`).attr('disabled', false)
          $(`#${TR_PREFIX}-stop`).attr('disabled', false)
          $(`#${TR_PREFIX}-continue`).attr('disabled', true)
          $(`.${TR_PREFIX}-controller`).css('background', 'rgba(0,255,27,0.3)')
          break
        case 'PAUSED':
          this.changeFormDisabledStatus(false)
          $(`#${TR_PREFIX}-start`).attr('disabled', true)
          $(`#${TR_PREFIX}-tag-run`).attr('disabled', true)
          $(`#${TR_PREFIX}-tag-single-run`).attr('disabled', true)
          $(`#${TR_PREFIX}-paused`).attr('disabled', true)
          $(`#${TR_PREFIX}-stop`).attr('disabled', false)
          $(`#${TR_PREFIX}-continue`).attr('disabled', false)
          $(`.${TR_PREFIX}-controller`).css('background', 'rgba(0, 0, 0, .3)')
          break
        case 'STOP':
          this.changeFormDisabledStatus(false)
          $(`#${TR_PREFIX}-start`).attr('disabled', false)
          $(`#${TR_PREFIX}-tag-run`).attr('disabled', false)
          $(`#${TR_PREFIX}-tag-single-run`).attr('disabled', false)
          $(`#${TR_PREFIX}-paused`).attr('disabled', true)
          $(`#${TR_PREFIX}-stop`).attr('disabled', true)
          $(`#${TR_PREFIX}-continue`).attr('disabled', true)
          $(`.${TR_PREFIX}-controller`).css('background', 'rgba(0, 0, 0, .3)')
          break
      }
    })
  }

  appendController() {
    $(`#${TR_PREFIX}-start`).on('click',  () => {
      this.clearStep()
      this.combinationTask()
      this.run()
    })
    $(`#${TR_PREFIX}-tag-run`).on('click',  () => {
      this.clearStep()
      this.tagTask()
      this.run()
    })
    $('body').append($(`
      <div class="${TR_PREFIX}-controller">
       <h3>controller</h3>
       <div>
         <button id="${TR_PREFIX}-start">
            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
            开始
         </button>
         <button id="${TR_PREFIX}-stop">停止</button>
         
         <button id="${TR_PREFIX}-continue">继续</button>
         <button id="${TR_PREFIX}-paused">暂停</button>
       </div>
       <div class="${TR_PREFIX}-form">
         <label for="${TR_PREFIX}-sybValue">事业部<input type="text" id="${TR_PREFIX}-sybValue"></label><br>
         <label for="${TR_PREFIX}-shopName">店铺名称<input type="text" id="${TR_PREFIX}-shopName"></label><br>
         <label style="display: flex;justify-content: center;align-items: center;" for="${TR_PREFIX}-JP">
            <span style="width: 50px;">京配</span>
            <input type="checkbox" id="${TR_PREFIX}-JP">
         </label><br>
         <label style="display: flex;justify-content: center;align-items: center;" for="${TR_PREFIX}-ZT">
            <span style="width: 50px;">组套</span>
            <input type="checkbox" id="${TR_PREFIX}-ZT">
         </label><br>
         <label for="${TR_PREFIX}-ruleNo">编码<input type="text" id="${TR_PREFIX}-ruleNo"></label><br>
         <label for="${TR_PREFIX}-ruleCount">数量<input type="text" id="${TR_PREFIX}-ruleCount"></label><br>
         <label for="${TR_PREFIX}-page">页码
           <input id="${TR_PREFIX}-page" />
         </label><br>
         <p style="font-size: 12px;color: #888;">修改后请点击确认再开始任务。</p>
         <button id="${TR_PREFIX}-submit">确认</button>
       </div>
       <button  id="${TR_PREFIX}-tag-run">
         <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
         批量打标   
       </button>
       <button  id="${TR_PREFIX}-tag-single-run">
         <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
         逐条打标   
       </button>
       <button  id="${TR_PREFIX}-clear-rules">
         <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
         清除规则   
       </button>
      </div>
    `))
    $(`#${TR_PREFIX}-tag-single-run`).on('click',  () => {
      this.clearStep()
      this.tagSingleTask()
      this.run()
    })
    $(`#${TR_PREFIX}-clear-rules`).on('click',  () => {
      this.clearStep()
      this.clearRulesTask()
      this.run()
    })
    $(`#${TR_PREFIX}-stop`).on('click',  () => {
      this.stop()
    }).attr('disabled', true)
    $(`#${TR_PREFIX}-continue`).on('click',  () => {
      this.continue()
    }).attr('disabled', true)
    $(`#${TR_PREFIX}-paused`).on('click',  () => {
      this.paused()
    }).attr('disabled', true)
    Object.keys(this.data).forEach(key => {
      const $el = $(`#${TR_PREFIX}-${key}`)
      if (typeof this.data[key] === 'boolean') {
        $el.prop('checked', this.data[key])
      } else {
        $el.val(this.data[key])
      }
    })
    $(`#${TR_PREFIX}-submit`).on('click',  () => {
      Object.keys(this.data).forEach(key => {
        const $el = $(`#${TR_PREFIX}-${key}`)
        this.data[key] = $el[0].type === 'checkbox' ? $el.prop('checked') : $el.val()
      })
      console.log(this.data)
    })
  }

  changeFormDisabledStatus (status) {
    Object.keys(this.data).forEach(key => {
      $(`#${TR_PREFIX}-${key}`).attr('disabled', status)
    })
    $(`#${TR_PREFIX}-submit`).attr('disabled', status)
  }
}

function c(el, parent, t = 10) {
  return new Promise((resolve, reject) => {
    let i = 0
    check(el)
    function check(el) {
      if (i > t) {
        reject(`异常：check element "${el}" error`)
      }
      const $el = parent ? parent.find(el) : $(el)
      if ($el && $el.length) {
        resolve($el)
      } else {
        i++
        setTimeout(() => {
          check(el)
        }, 300)
      }
    }
  })
}

new AutoApp()
