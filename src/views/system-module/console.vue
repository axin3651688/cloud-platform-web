<template>
  <div>
    <a-row :gutter="24" style="background-color: white;padding: 10px 0">
      <a-col :span="24" style="border-bottom: 1px solid #EAEDF3">
        <div style="margin-left: 38px;margin-bottom: 10px;">
          <a-icon type="edit"/><span style="margin-left: 21px;">服务地址</span>
        </div>
      </a-col>
      <a-col :span="24" style="margin-top: 10px;">
        <a-row :gutter="24">
          <a-col :span="6" style="display: flex;flex-direction: column;padding-left: 38px;">
            <span class="header-name">用户数</span>
            <span class="header-value">1234567</span>
          </a-col>
          <a-col :span="6" style="display: flex;flex-direction: column">
            <span class="header-name">租户数</span>
            <span class="header-value">1234567</span>
          </a-col>
          <a-col :span="6" style="display: flex;flex-direction: column">
            <span class="header-name">即将到期</span>
            <span class="header-value">1234567</span>
          </a-col>
          <a-col :span="6" style="display: flex;flex-direction: column">
            <span class="header-name">商机数</span>
            <span class="header-value">1234567</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 20px;">
      <a-col :span="6" style="background-color: white">
        <a-row :gutter="24" >
          <a-col :span="24" style="padding: 10px 38px;border-bottom: 1px solid #EAEDF3">
            <a-icon type="edit"/><span style="margin-left: 21px;">商机数据</span>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="border-bottom: 1px solid #EAEDF3;padding-bottom: 10px;">
          <a-col :span="24" >
            <div id="myChart"></div>
            <div style="display: flex;justify-content: space-between;padding: 0 28px;">
              <span>
                <a-icon type="edit" style="margin-right: 21px;"/>未处理商机
              </span>
              <span style="color:#1665D8">
                查看全部 <a-icon type="edit" style="margin-left: 21px;"/>
              </span>
            </div>
          </a-col>
        </a-row>
        <business :businessList="businessList"></business>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="10">
        <div style="background-color: white">
          <a-row :gutter="24" >
            <a-col :span="24" style="padding: 10px 38px;border-bottom: 1px solid #EAEDF3">
              <a-icon type="edit"/><span style="margin-left: 21px;">租户数据</span>
            </a-col>
          </a-row>
          <a-row :gutter="24" >
            <a-col :span="24">
              <div id="myChart2"></div>
            </a-col>
          </a-row>
        </div>
        <div style="margin-top: 20px;background-color: white">
          <a-row :gutter="24" >
            <a-col :span="24">
              <a-row :gutter="24" >
                <a-col :span="24" style="padding: 10px 38px;border-bottom: 1px solid #EAEDF3">
                  <a-icon type="edit"/><span style="margin-left: 21px;">系统数据</span>
                </a-col>
              </a-row>
              <a-row :gutter="24" style="padding: 20px;">
                <a-col :span="8" style="display: flex;flex-direction: row;align-items: center">
                  <div style="display: flex;flex-direction: column">
                    <span>CPU占用</span>
                    <span>23%</span>
                  </div>
                  <div id="myChart3"></div>
                </a-col>
                <a-col :span="8" style="display: flex;flex-direction: row;align-items: center">
                  <div style="display: flex;flex-direction: column">
                    <span>主进程占用</span>
                    <span>56%</span>
                  </div>
                  <div id="myChart4"></div>
                </a-col>
                <a-col :span="8" style="display: flex;flex-direction: row;align-items: center">
                  <div style="display: flex;flex-direction: column">
                    <span>内存占用</span>
                    <span>93%</span>
                  </div>
                  <div id="myChart5"></div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="6" style="background-color: #fff">
        <a-row :gutter="24" >
          <a-col :span="24" style="padding: 10px 38px;border-bottom: 1px solid #EAEDF3">
            <a-icon type="edit"/><span style="margin-left: 21px;">未初始化租户</span>
          </a-col>
        </a-row>
        <business :businessList="businessList"></business>
        <a-row :gutter="24" >
          <a-col
            :span="24"
            style="padding: 10px 38px;display: flex;justify-content: flex-end;">
            <span>查看更多</span> <a-icon
              type="
            edit"/>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
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
  data () {
    return {
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
        [
          { value: 335, name: '公有部署' },
          { value: 310, name: '私有部署' },
          { value: 234, name: '其他不熟' },
          { value: 135, name: '不部署' }
        ],
        [
          '公有部署', '私有部署', '其他不熟', '不部署'
        ]
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
  mounted () {
    this.setChart1() // 柱形图
    this.getPie() // 环形图
  },
  methods: {
    /* 自适应图形 */
    drawLine (dom, option) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = ECharts.init(document.getElementById(dom))
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
          data: ['已处理', '试用中', '未处理']
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
          }
        },
        series: [{
          name: '',
          type: 'bar',
          data: this.barData,
          barWidth: '30%',
          itemStyle: {
            normal: {
              color: function (params) { // '#FFD16E', '#7AA2EA',
                var colorList = ['#3BAD4B', '#1665D8', '#C6CAD3']
                return colorList[params.dataIndex]
              },
              // 以下为是否显示，显示位置和显示格式的设置了
              label: { // 柱状图头部显示
                show: false,
                position: 'top',
                formatter: '{c}K',
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
      const dom2 = 'myChart2'
      const dom3 = 'myChart3'
      const dom4 = 'myChart4'
      const dom5 = 'myChart5'
      this.setChart2(dom2, true, this.chart2)
      this.setChart2(dom3, false, this.chart3)
      this.setChart2(dom4, false, this.chart4)
      this.setChart2(dom5, false, this.chart5)
    }
  }
}
</script>

<style scoped>
  .header-name{
    color: #9EA0A5;
    font-size:14px;
  }
  .header-value{
    font-size: 24px;
    font-weight:400;
    color: #3E3F42
  }
  #myChart{
    width: 80%;height: 300px;
  }
  .myChart2{
    width: 90%;height: 300px;
  }
  #myChart2{
    width: 100%;height: 300px;
  }
  #myChart3{
    width: 70%;height: 100px;
  }
  #myChart4{
    width: 70%;height: 100px;
  }
  #myChart5{
    width: 70%;height: 100px;
  }
</style>
