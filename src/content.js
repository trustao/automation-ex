import Tasks, {RepeatTask} from './task'
import log from './logger'

const TR_PREFIX = '_tr_automation'

async function sleep(ms = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


class AutoApp extends Tasks {
  constructor() {
    super()
    this.data = {
      sybValue: '天津中天启鸿网络科技有限公司',
      shopName: '飓风金康专卖店',
      ruleNo: 'CSG4418118164142',
      ruleCount: 1
    }
    this.errorSpu = []
    this.init()
  }

  init() {
    this.appendController()
    this.listenStatusChange()
    this.initSteps()
  }

  initSteps () {
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
    const checkRes = await c('#lblSysInfo:contains("操作成功！")', this.iframeDoc, 100)
    if (checkRes) {
      log('成功', this.currentGoodsNo)
    } else {
      log('失败', this.currentGoodsNo)
      this.errorSpu.push({
        no: this.currentGoodsNo,
        count: 1
      })
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
    await this.triggerSelect('#shopGoodsList_deptId', this.data.sybValue, iframeDoc)
    await sleep()
    await this.triggerSelect('#shopGoodsList_shopId', this.data.shopName, iframeDoc)
    await sleep()
    await this.triggerSelect('#shopGoodsList_jdDeliver', '否', iframeDoc)
    await this.triggerSelect('#shopGoodsList_isCombination', '否', iframeDoc)
  }

  selectNoErrorGoodsTr (dataTable) {
    return this.getTr(dataTable.find('tr:nth-child(2)'))
  }

  getTr (tr) {
    if (!tr.length) {
      throw new Error('列表无数据')
    }
    const no = tr.find('td:nth-child(6)').text()
    const isError = this.errorSpu.find(e => e.no === no)
    if (isError) {
      isError.count++
      if (isError.count > 3) {
        return this.getTr(tr.next())
      }
    } else {
      this.currentGoodsNo = no
      return tr
    }
  }



  listenStatusChange () {
    this.on('changeStatus', (status) => {
      switch (status) {
        case 'READY':
          this.changeFormDisabledStatus(false)
          $(`#${TR_PREFIX}-start`).attr('disabled', false)
          $(`#${TR_PREFIX}-paused`).attr('disabled', true)
          $(`#${TR_PREFIX}-stop`).attr('disabled', true)
          $(`#${TR_PREFIX}-continue`).attr('disabled', true)
          break
        case 'RUNNING':
          this.changeFormDisabledStatus(true)
          $(`#${TR_PREFIX}-start`).attr('disabled', true)
          $(`#${TR_PREFIX}-paused`).attr('disabled', false)
          $(`#${TR_PREFIX}-stop`).attr('disabled', false)
          $(`#${TR_PREFIX}-continue`).attr('disabled', true)
          break
        case 'PAUSED':
          this.changeFormDisabledStatus(false)
          $(`#${TR_PREFIX}-start`).attr('disabled', true)
          $(`#${TR_PREFIX}-paused`).attr('disabled', true)
          $(`#${TR_PREFIX}-stop`).attr('disabled', false)
          $(`#${TR_PREFIX}-continue`).attr('disabled', false)
          break
        case 'STOP':
          this.changeFormDisabledStatus(false)
          $(`#${TR_PREFIX}-start`).attr('disabled', false)
          $(`#${TR_PREFIX}-paused`).attr('disabled', true)
          $(`#${TR_PREFIX}-stop`).attr('disabled', true)
          $(`#${TR_PREFIX}-continue`).attr('disabled', true)
          break
      }
    })
  }

  appendController() {
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
         <label for="${TR_PREFIX}-ruleNo">编码<input type="text" id="${TR_PREFIX}-ruleNo"></label><br>
         <label for="${TR_PREFIX}-ruleCount">数量<input type="text" id="${TR_PREFIX}-ruleCount"></label><br>
         <button id="${TR_PREFIX}-submit">确认</button>
       </div>
      </div>
    `))
    $(`#${TR_PREFIX}-start`).on('click',  () => {
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
      $(`#${TR_PREFIX}-${key}`).val(this.data[key])
    })
    $(`#${TR_PREFIX}-submit`).on('click',  () => {
      Object.keys(this.data).forEach(key => {
        this.data[key] = $(`#${TR_PREFIX}-${key}`).val()
      })
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