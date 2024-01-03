import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

// 封装获取频道列表的逻辑
function useChannel() {
  // 1,获取频道列表所有的逻辑
  const [channelList, setChannelList] = useState([]);
  // 在useEffect中调用接口，并存入state，获取频道列表
  useEffect(() => {
    // 封装函数，在函数体内调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    // 调用函数
    getChannelList();
  }, []);
  // 2，把组件中要用到的数据return出去
  return {
    channelList,
  };
}
export { useChannel };
