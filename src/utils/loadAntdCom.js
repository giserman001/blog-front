import {
  Button,
  Form,
  Input,
  Table,
  Select,
  Checkbox,
  Radio,
  Layout,
  Breadcrumb,
  Menu,
  Pagination,
  DatePicker,
  InputNumber,
  TimePicker,
  Avatar,
  Popover,
  Dropdown,
  Modal,
  Switch,
  Tag,
  Divider,
} from 'ant-design-vue';

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  MailOutlined,
  SmileOutlined,
  DownOutlined,
} from '@ant-design/icons-vue';
import { Icon } from '../components/index';

export default function lazyLoadAntComponent(app) {
  // 注册antd组件
  [
    Button,
    Table,
    Form,
    Input,
    Select,
    Checkbox,
    Radio,
    Layout,
    Breadcrumb,
    Menu,
    Pagination,
    DatePicker,
    TimePicker,
    InputNumber,
    Avatar,
    Popover,
    Dropdown,
    Modal,
    Switch,
    Tag,
    Divider,
  ].forEach(com => app.use(com));

  // 加载自定义组件和图标
  [
    Icon,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    MailOutlined,
    SmileOutlined,
    DownOutlined,
  ].forEach(com => app.component(com.name, com));
}
