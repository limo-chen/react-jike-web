import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Home = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    //1，获取渲染图表的dom节点
    const chartDom = chartRef.current;
    // 调用init方法，图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);

    // 准备图表参数
    const option = {
      xAxis: {
        type: "category",
        data: ["vue", "react", "angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 50, 80],
          type: "bar",
        },
      ],
    };
    // 使用图表参数完成渲染
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div ref={chartRef} style={{ witch: "500px", height: "400px" }}></div>
    </div>
  );
};
export default Home;
