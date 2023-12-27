// 柱状图组件
// 1，功能代码放到组件中
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

// 2，可变的部分抽象成prop参数
const BarChart = ({ title, data, series }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    //1，获取渲染图表的dom节点
    const chartDom = chartRef.current;
    // 调用init方法，图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);

    // 准备图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: data,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: series,
          type: "bar",
        },
      ],
    };
    // 使用图表参数完成渲染
    option && myChart.setOption(option);
  }, []);
  return <div ref={chartRef} style={{ witch: "500px", height: "400px" }}></div>;
};

export default BarChart;
