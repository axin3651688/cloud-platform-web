<template>
  <div>
    <a-row
      :gutter="24"
      style="background-color: white;">
      <a-col
        :span="24"
        style="border-bottom: 1px solid #EAEDF3">
        <div style="margin:25px 0px 19px 20px;">
          <div class="icon-text">
            <img src="@icons/console-user.svg" alt=""><span style="margin-left: 16px;">用户数据</span>
          </div>
        </div>
      </a-col>
      <a-col
        :span="24"
        style="padding: 20px;">
        <a-row :gutter="24">
          <a-col
            :span="6"
            style="display: flex;flex-direction: column;padding-left: 32px;">
            <span class="header-name">用户数</span>
            <span class="header-value" @click="routingHop('UserManagement')">
              {{ totalUserCount }}
              <img class="icon-console" src="@icons/Tag.svg" alt="">
            </span>
          </a-col>
          <a-col
            :span="6"
            style="display: flex;flex-direction: column">
            <span class="header-name">租户数</span>
            <span class="header-value" @click="routingHop('TenantManagement')">
              {{ totalTenancyCount }}
              <img class="icon-console" src="@icons/Tag(1).svg" alt="">
            </span>
          </a-col>
          <a-col
            :span="6"
            style="display: flex;flex-direction: column">
            <span class="header-name">即将到期</span>
            <span class="header-value" @click="routingHop('TenantManagement','expire')">
              {{ tenancyExpireCount }}
              <img class="icon-console" src="@icons/Tag(2).svg" alt="">
            </span>
          </a-col>
          <a-col
            :span="6"
            style="display: flex;flex-direction: column">
            <span class="header-name">商机数 </span>
            <span class="header-value">0 <img class="icon-console" src="@icons/Tag(3).svg" alt=""></span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row
      :gutter="24"
      style="padding-top:24px "
    >
      <a-col
        :span="6"
        style="background-color: white">
        <a-row :gutter="24">
          <a-col
            :span="24"
            style="padding: 10px 32px;border-bottom: 1px solid #EAEDF3">
            <div class="icon-text">
              <img src="@icons/console-shangji.svg" alt=""/>
              <span style="margin-left: 16px;">商机数据</span>
            </div>
          </a-col>
        </a-row>
        <a-row
          :gutter="24"
          style="border-bottom: 1px solid #EAEDF3;padding-bottom: 10px;">
          <a-col :span="24">
            <div id="myChart"></div>
            <div style="display: flex;justify-content: space-between;padding: 0 20px;">
              <span class="icon-text">
                <img src="@icons/4681.svg" alt="" style="margin-right: 16px;">未处理商机

              </span>
              <span style="color:#1665D8;cursor: pointer;">
                查看全部  →
              </span>
            </div>
          </a-col>
        </a-row>
        <business :businessList="businessList"></business>
      </a-col>

      <a-col
        :span="12"
        style="padding: 0px 24px 24px 24px">
        <div style="background-color: white">
          <a-row :gutter="24">
            <a-col
              :span="24"
              style="padding: 10px 44px;border-bottom: 1px solid #EAEDF3">
              <div class="icon-text">
                <img src="@icons/console-zuhu.svg" alt=""><span style="margin-left: 16px;">租户数据</span>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <div id="myChart2"></div>
            </a-col>
          </a-row>
        </div>
        <div style="margin-top: 20px;background-color: white">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-row :gutter="24">
                <a-col
                  :span="24"
                  style="padding: 10px 44px;border-bottom: 1px solid #EAEDF3">
                  <div class="icon-text">
                    <img src="@icons/4675.svg" alt=""><span style="margin-left: 16px;">系统数据</span>
                  </div>
                </a-col>
              </a-row>
              <a-row
                :gutter="24"
                style="padding: 20px;">
                <a-col
                  :span="8"
                  style="display: flex;flex-direction: row;align-items: center">
                  <div style="display: flex;flex-direction: column">
                    <span>CPU占用</span>
                    <span>65%</span>
                  </div>
                  <div id="myChart3"></div>
                </a-col>
                <a-col
                  :span="8"
                  style="display: flex;flex-direction: row;align-items: center">
                  <div style="display: flex;flex-direction: column">
                    <span>主进程占用</span>
                    <span>36%</span>
                  </div>
                  <div id="myChart4"></div>
                </a-col>
                <a-col
                  :span="8"
                  style="display: flex;flex-direction: row;align-items: center">
                  <div style="display: flex;flex-direction: column">
                    <span>内存占用</span>
                    <span>62%</span>
                  </div>
                  <div id="myChart5"></div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>

      <a-col
        :span="6"
        style="background-color: #fff">
        <a-row :gutter="24">
          <a-col
            :span="24"
            style="padding: 10px 32px;border-bottom: 1px solid #EAEDF3">
            <div class="icon-text">
              <img src="@icons/console-noinit.svg" alt=""><span style="margin-left: 16px;">未初始化租户</span>
            </div>
          </a-col>
        </a-row>
        <business :businessList="businessList"></business>
        <a-row :gutter="24">
          <a-col
            :span="24"
            style="padding: 10px 38px;display: flex;justify-content: flex-end;">
            <span>查看更多  →</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CnbiConsole from '@/classes/lib/CnbiConsole'
import { EleResize } from '../../assets/js/esresize.js'
import ACol from 'ant-design-vue/es/grid/Col'
import Business from './console-components/business'
const ECharts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export default {
  components: { Business, ACol },
  name: 'Console',
  data () {
    return {
      totalUserCount: null, // 用户总数
      totalTenancyCount: null, // 租户总数
      tenancyExpireCount: null, // 租户即将到期数
      deployTypeCount: null, // 租户部署情况
      ConsoleObj: null,
      barData: [50, 200, 500],
      businessList: [
        {
          companyName: '阿阿',
          name: 'hahha',
          phone: '12345678901'
        },
        {
          companyName: '支支',
          name: 'hahha',
          phone: '12345678901'
        },
        {
          companyName: '付付',
          name: 'hahha',
          phone: '12345678901'
        },
        {
          companyName: '宝宝',
          name: 'hahha',
          phone: '12345678901'
        }
      ],
      chart2: [
        // [
        //   { value: 335, name: '公有部署' },
        //   { value: 310, name: '私有部署' },
        //   { value: 135, name: '其他部署' }
        // ],
        // [
        //   '公有部署', '私有部署', '其他部署'
        // ]
      ],
      chart3: [
        [
          { value: 65, name: 'CPU占用' },
          { value: 35, name: 'CPU未占用' }
        ],
        [
          '占用', '未占用'
        ]
      ],
      chart4: [
        [
          { value: 36, name: '进程占用' },
          { value: 64, name: '进程未占用' }
        ],
        [
          '进程占用', '进程未占用'
        ]
      ],
      chart5: [
        [
          { value: 62, name: '内存占用' },
          { value: 38, name: '内存未占用' }
        ],
        [
          '内存占用', '内存未占用'
        ]
      ]
    }
  },
  created () {
    this.ConsoleObj = new CnbiConsole()
  },
  mounted () {
    this.getData()
    this.setChart1() // 柱形图
    this.getPie() // 环形图
  },
  methods: {
    // 进入界面 加载数据
    async getData () {
      // 查询用户总数
      this.totalUserCount = await this.ConsoleObj.findUserCount()
      console.log(this.totalUserCount, '用户总数')
      // 查询租户总数
      this.totalTenancyCount = await this.ConsoleObj.findTenancyCount()
      console.log(this.totalTenancyCount, '租户总数')
      // 查询租户即将到期数
      this.tenancyExpireCount = await this.ConsoleObj.findTenancyExpireCount()
      console.log(this.tenancyExpireCount, '租户即将到期数')
      // 查询租户部署情况
      this.deployTypeCount = await this.ConsoleObj.findDeployTypeCount()
      const datas = this.deployTypeCount.data
      const arr = []
      const legendDatas = []
      datas.forEach(item => {
        const obj = {}
        obj['value'] = item.num
        obj['name'] = item.name
        obj['type'] = item.type
        arr.push(obj)
        legendDatas.push(item.name)
      })
      this.chart2.push(arr)
      this.chart2.push(legendDatas)
      const dom2 = 'myChart2'
      this.setChart2(dom2, true, this.chart2)
      console.log(this.deployTypeCount, '租户部署情况')
    },

    /* 自适应图形 */
    drawLine (dom, option) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = ECharts.init(document.getElementById(dom))
      // 下钻
      const _this = this
      if (dom == 'myChart2') {
        myChart.on('click', (params) => {
          console.log(params.data.name + '==============' + params.data.type)
          const param = {
            name: 'deploy',
            type: params.data.type
          }
          _this.routingHop('TenantManagement', param)
        })
      }

      // 自适应
      const resizeDiv = document.getElementById(dom)
      // // 绘制图表
      myChart.setOption(option)
      console.log(EleResize)
      const listener = function () {
        console.log('resize')
        myChart.resize()
      }
      EleResize.on(resizeDiv, listener)
    },
    /* 柱形图 */
    setChart1 () {
      const dom = 'myChart'
      /* 柱状图数据 */
      const option = {
        tooltip: {},
        xAxis: {
          data: ['已处理', '试用中', '未处理'],
          splitLine: { // x轴刻度线
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          containLabel: true
        },
        yAxis: {
          axisLabel: {
            formatter: '{value}K',
            align: 'right',
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          name: '',
          type: 'bar',
          data: this.barData,
          barWidth: '40%',
          itemStyle: {
            normal: {
              color: function (params) { // '#FFD16E', '#7AA2EA',
                var colorList = ['#3BAD4B', '#1665D8', '#C6CAD3']
                return colorList[params.dataIndex]
              },
              // 以下为是否显示，显示位置和显示格式的设置了
              label: { // 柱状图头部显示
                show: true,
                position: 'top',
                formatter: '{c}',
                // fontSize:16,
                color: '#000000'
              }
            }
          }
        }]
      }
      this.drawLine(dom, option)
    },
    /*
    * dom 容器ID
    * showLegend 控制图例显示
    * chartData 图形数据
    */
    setChart2 (dom, showLegend, chartData) {
      const option = {
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: showLegend,
          orient: 'vertical',
          // x: 'right',
          // bottom: '20%',
          left: '70%',
          y: 'center',
          data: chartData[1]
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'left'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            center: ['30%', '50%'],
            itemStyle: {
              normal: {
                color: function (params) { // '#FFD16E', '#7AA2EA',
                  var colorList = ['#1665D8', '#38A347', '#E5482D', '#FACF55', '#7AA2EA', '#FFD16E']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: chartData[0]
          }
        ]
      }
      this.drawLine(dom, option)
    },
    // 获取当前页面所有环形图
    getPie () {
      console.log('1111111111111111')
      // const dom2 = 'myChart2'
      const dom3 = 'myChart3'
      const dom4 = 'myChart4'
      const dom5 = 'myChart5'
      // this.setChart2(dom2, true, this.chart2)
      this.setChart2(dom3, false, this.chart3)
      this.setChart2(dom4, false, this.chart4)
      this.setChart2(dom5, false, this.chart5)
    },
    /**
     * 跳转页面
     * name 路由名称
     * params 参数
     *
     **/
    routingHop (name, params) {
      if (!params) {
        this.$router.push({
          name
        })
      } else {
        if (params == 'expire') { // 即将到期
          this.$router.push({
            name: name,
            query: {
              name: 'expire'
            }
          })
        } else if (params.name == 'deploy') { // 部署类型
          this.$router.push({
            name: name,
            query: {
              name: params.name,
              type: params.type
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.header-name {
  color: #9ea0a5;
  font-size: 14px;
}
.header-value {
  font-size: 24px;
  font-weight: 400;
  color: #3e3f42;
  align-items: center;
  display: flex;
}
#myChart {
  width: 80%;
  height: 300px;
}
.myChart2 {
  width: 90%;
  height: 300px;
}
#myChart2 {
  width: 100%;
  height: 300px;
}
#myChart3 {
  width: 70%;
  height: 100px;
}
#myChart4 {
  width: 70%;
  height: 100px;
}
#myChart5 {
  width: 70%;
  height: 100px;
}
  .icon-console{
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .icon-text{
    display: flex;
    align-items: center;
  }
</style>
