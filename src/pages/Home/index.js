import BarChart from "./components/BarChart";

const Home = () => {
  return (
    <div>
      <div>
        <BarChart
          title="三大框架满意度"
          data={[1, 2, 3]}
          series={[70, 50, 30]}
        />
        <BarChart
          title="三大框架使用率"
          data={[2, 6, 7]}
          series={[70, 20, 50]}
        />
      </div>
    </div>
  );
};
export default Home;
