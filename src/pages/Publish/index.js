import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import {
  createArticleAPI,
  getArticleByAPI,
  updateArticleAPI,
} from "@/apis/article.js";
import { useEffect, useState } from "react";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel();

  const onFinish = (values) => {
    console.log(values);
    if (imageList.length !== type)
      return message.warning("封面类型与图片数量不匹配");
    const { title, content, channel_id } = values;
    // 按照接口文档的格式处理表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: type, //封面模式

        //这里的URL处理逻辑只是在新增时候的逻辑
        // 编辑时候需要做处理
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
          }
          return item.url;
        }), //图片列表
      },
      channel_id,
    };
    // 调用接口提交
    // 处理调用不同接口 新增接口vs编辑接口
    if (articleId) {
      updateArticleAPI({ ...reqData, id: articleId });
    } else {
      createArticleAPI(reqData);
    }
  };

  //上传回调  value.fileList拿到最终上传的文件列表，然后存入imageList中
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (value) => {
    console.log("正在上传", value);
    setImageList(value.fileList);
  };
  // 切换图片封面类型
  const [type, setType] = useState(0);
  const onTypeChange = (e) => {
    console.log("切换封面了", e.target.value);
    setType(e.target.value);
  };

  // 回填数据 id是我们需要的参数，放过来就行
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const [form] = Form.useForm();

  useEffect(() => {
    // 1，通过id获取文章详情数据
    async function getArticleDetail() {
      const res = await getArticleByAPI(articleId);
      const data = res.data;
      const { cover } = data;
      form.setFieldsValue({
        ...data,
        type: cover.type,
      });

      //回填照片列表
      setType(cover.type);
      // 显示图片(格式要求：URL：[{url:图片地址}])
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    }
    //只有有id的时候才能调用此函数
    if (articleId) {
      getArticleDetail();
    }

    // 2，调用实例方法 完成回填
  }, [articleId, form]);
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType决定选择文件框的外观样式  showUploadList控制上传列表 */}
            {/* 当配置好name，action，会在用户选择好图片后自动上传并触发oonChange函数  onChange会在整个上传过程中不断执行的*/}
            {type > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                maxCount={type}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
