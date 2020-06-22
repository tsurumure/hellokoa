const router = require('koa-router')()

const charset = require('superagent-charset'),
      superagent = charset(require('superagent'))
      schedule = require("node-schedule")

var rule1 = new schedule.RecurrenceRule()  
var times1 = [1, 20, 40, 60] // [1, 10, 20, 30, 40, 50, 60] // [1,6,11,16,21,26,31,36,41,46,51,56];  
rule1.minute  = times1 // minute, second
schedule.scheduleJob(rule1, function(){
  const now = new Date()
  console.log(`run! in 10 iminute, ${now}`)
  httpGet()
})

function httpGet () {
  return new Promise(resolve => {
    const eln_session = 'elnSessionId.34d26e2f0cf646cdaa1f33e6a7dc2fa3'
    superagent.get('http://gdhwater.21tb.com/els/html/courseStudyItem/courseStudyItem.updateTimestepByUserTimmer.do')
    .set('Cookie', eln_session)
    .send({ elsSign: eln_session })
    .then(rs => {
      console.log('success')
      console.log(rs.body)
      resolve({ response: rs.body, msg: '刷新成功' })
    }).catch(e => {
      console.log('error')
      resolve(e)
      // console.log(e)
    })
  })
}

router.get('/', async (ctx, next) => {

  // 汕头招聘爬虫
  // superagent.post('http://www.stzp.cn/ent/ResumeLink.ashx?r=0.42659777893044226')
  //   .send({ jwsn: '3828990', ressn: '', look: 0 })
  //   .set('Cookie', 'UM_distinctid=16b202f45152ac-0edbf39cc65d32-6353160-1fa400-16b202f45167e4; CNZZDATA49160=cnzz_eid%3D2039615932-1559611711-null%26ntime%3D1559611711; Hm_lvt_9c09fb6bb32d4dafc6fd4ec18d310d5b=1558164776,1558918781,1559359035,1559610527; Ent_LogIP=116.26.173.9; route=ef315ea0ef1cd6c37ae6c5dcf3881944; Ent_UserName=ed0001; Ent_PassWord=lIvnliC0vQE%3d; Hm_lpvt_9c09fb6bb32d4dafc6fd4ec18d310d5b=1559613635; ASP.NET_SessionId=kacrydbpw5j1dmjxy4nntmnz; Ent_Latest_Login=2019%2f')
  //   .end((err, res) => {
  //     console.log('===================================================')
  //     console.log('===================================================')
  //     console.log(res.body)
  //     console.log('===================================================')
  //     console.log('===================================================')
  //   })


  var webdriver = require('selenium-webdriver');
  var driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  await driver.get('http://www.baidu.com');
  // await driver.quit();
  console.log(driver)


  driver.findElement(webdriver.By.id('kw')).sendKeys('前端测试');
  driver.findElement(webdriver.By.id('su')).click();


  await ctx.render('index', {
    title: 'Hello'
  })


})

router.get('/gdwater-forever', async (ctx, next) => {
  const p = httpGet()
  ctx.body = await p
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
