(function () {
    const TR_PREFIX = '_tr_automation'
    main()

    let sybValue = '天津中天启鸿网络科技有限公司'
    let shopName = '飓风金康专卖店'
    let ruleNo = 'CSG4418118164142'
    let ruleCount = 1

    let taskStatus = 'STOP' // RUNNING

    const steps = {
        intoShopManage: intoShopManage,
        getConditionGoods: getConditionGoods
    }

    function main() {
        console.log('执行 main')
        appendController()
    }

    function appendController() {
        $('body').append($(`
        <div class="${TR_PREFIX}-controller">
           <h3>controller</h3>     
           <button id="${TR_PREFIX}-start">开始</button>
           <button id="${TR_PREFIX}-end">停止</button>
        </div>  
    `))
        $(`#${TR_PREFIX}-start`).on('click', function () {
            startApp().then(() => {
                console.log('程序OK')
            }).catch(err => {
                console.log('程序ERROR')
                console.error(err)
            })
        })
    }

    function statusChange (status) {
        switch (status) {
            case 'STOP':
                break
            case 'RUNNING':
                break
            default:
                throw new Error('未知状态')
        }
        taskStatus = status
    }

    function taskRun () {
        Promise.race([
            startApp(),
            stopPromise()
        ]).catch(err => {
            console.log('程序停止')
            console.warn(err)
        })
    }

    let rejectTask = null

    function stopPromise() {
        return new Promise((resolve, reject) => {
            rejectTask = reject
        })
    }

    function taskStop () {
        rejectTask('用户停止程序')
    }

    async function startApp() {
        // 进入商铺管理
        await steps.intoShopManage()

        // 条件查询商品 进入修改
        await steps.getConditionGoods()

    }

    async function intoShopManage () {
        const baseInfo = await c('#top_104202')
        baseInfo.click()
        await sleep()
        const showManage = await c('#9250')
        showManage[0].click()
        await sleep(1000)
    }

    let errorSpu = []
    async function getConditionGoods () {
        const iframe = await c(`#mainIframe`)
        const iframeDoc = $(iframe[0].contentDocument)
        await selectSearchCondition(iframeDoc)
        const search = await c('#shopGoodsList_queryShopGoodsForm', iframeDoc)
        search.click()
        await sleep()
        await clickGoodsModify(iframeDoc)
        const rule = await c('#editNewCombinationRule', iframeDoc)
        rule.click()
        await sleep()
        await writeRules(iframeDoc)
    }

    async function selectSearchCondition (iframeDoc) {
        await triggerSelect('#shopGoodsList_deptId', sybValue, iframeDoc)
        await sleep()
        await triggerSelect('#shopGoodsList_shopId', shopName, iframeDoc)
        await sleep()
        await triggerSelect('#shopGoodsList_jdDeliver', '否', iframeDoc)
        await triggerSelect('#shopGoodsList_isCombination', '否', iframeDoc)
    }

    async function writeRules(iframeDoc) {
        const noInput = await c('#rulesEdit_materialShopGoodsNo', iframeDoc)
        noInput.val(ruleNo)
        iframeDoc.find('#rulesEdit_num').val(ruleCount)
        iframeDoc.find('#rulesEdit-rulesItem-add')[0].click()
    }

    async function clickGoodsModify(iframeDoc) {
        const dataTable = await c('#shopGoodsList_shopGoods-table', iframeDoc)
        const tr = selectNoErrorGoodsTr(dataTable)
        tr.find('a:contains("修改")')[0].click()
        await sleep()
    }

    function selectNoErrorGoodsTr (dataTable) {
        return getTr(dataTable.find('tr:nth-child(2)'))
    }

    function getTr (tr) {
        if (!tr.length) {
            throw new Error('列表无数据')
        }
        const no = tr.find('td:nth-child(6)').text()
        const isError = errorSpu.find(e => e.no === no)
        if (isError) {
            isError.count++
            if (isError.count > 3) {
                return getTr(tr.next())
            }
        } else {
            return tr
        }
    }


    async function triggerSelect (selectId, optionText, parent) {
        const deptId = await c(`${selectId} option:contains("${optionText}")`, parent, 20)
        const deptSelect = await c(`${selectId}`, parent, 20)
        deptSelect[0].value = deptId.val()
        deptSelect[0].dispatchEvent(new Event('change'))
    }

    async function sleep(ms = 500) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
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
                    console.log($el[0])
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

    function sendMessage (data) {
        console.log('content send message')
        return new Promise((reslove, reject) => {
            chrome.extension.sendRequest(data,function(response) {});
            resloveFn = reslove
        })
    }

    function receiveMessage () {
        chrome.extension.onRequest.addListener(
            function(request, sender, sendResponse) {
                console.log('receive message', request)
                if (request.action) {
                    if (request.action === 'close') {
                        console.log('close')
                        closeTranslate()
                    } else {
                        console.log('open')
                        startTranslate()
                    }
                }
                resloveFn && resloveFn(request)
                resloveFn = null
            });
    }

})()