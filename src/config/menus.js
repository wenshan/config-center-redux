// modules
import Home from '../modules/home/index';
import Receipt from '../modules/receipt/index';

import Slot from '../modules/configure/slot/index';
import Keyword from '../modules/configure/play/index';
import Play from '../modules/configure/keyword/index';

import Kwdevice from '../modules/device/kwdevice/index';
import Computationrule from '../modules/device/computationrule/index';

import Analysis from '../modules/analysis/index';

import Counter from '../modules/containers/index';;


const menus = [{
    key: 'home',
    title: '首页',
    component: Home,
    icon: '',
},{
    key: 'receipt',
    title: '小票列表',
    component: Receipt,
    icon: '',
},{
  key: 'configure',
  title: '全局配置',
  component: Slot,
  icon: '',
  children: [{
    key: 'slot',
    title: 'Slot类型',
    icon: '',
    component: Slot,
  }, {
    key: 'keyword',
    title: '全局关键词',
    component: Keyword,
    icon: '',
  },{
    key: 'play',
    title: '支付方式',
    component: Play,
    icon: '',
  }],
},{
  key: 'device',
  title: '设备配置',
  icon: '',
  component: Kwdevice,
  children: [{
    key: 'kwdevice',
    title: '关键词配置',
    component: Kwdevice,
    icon: '',
  },{
    key: 'computationrule',
    title: '计算规则',
    component: Computationrule,
    icon: '',
  }]
},{
  key: 'analysis',
  title: '模拟解析',
  component: Analysis,
  icon: '',
},{
  key: 'counter',
  title: 'Counter',
  component: Counter,
  icon: '',
}];
export default menus;
