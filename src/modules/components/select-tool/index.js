import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';

import { message, notification } from 'antd';
import Utils from '../../../utils/index';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;

const Option = Select.Option;
const API = {
  SEARCHMALL: Domain + '/choose_shop_entity.json',
  SEARHSHOP: Domain + '/choose_shop_entity.json',
};

const SelectTool = React.createClass({
  getInitialState(){
    return {
      Store:[
      {
        "shop_id": "1A08RV8DIJV5DA00A1B8B974M52AAN5M",
        "shop_name": "测试商家",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A0C25V2B93G1P00A1B8AMS4MD43PUL1",
        "shop_name": "ChinumsFormat测试1",
        "shop_entity_list":[],
      },
      {
        "shop_id": "1A0C25V2B93G1P00A1B8AMS4MD43PUL1",
        "shop_name": "内部测试机构",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A2264JQ52AT1V00A1B8B9743N2B15NR",
        "shop_name": "银联商务",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A24DVSJPUANPC00A1B8AMS4RL2AQV7K",
        "shop_name": "华住生活圈",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A36AIIO7L587200A1B8AMS43P2ASLR0",
        "shop_name": "重庆龙湖西城天街",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A38GJ9788RJV500A1B8B974142ATD2P",
        "shop_name": "龙湖长楹天街",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A38GJ9788RJV500A1B8B974142ATD2P",
        "shop_name": "龙湖长楹天街调试",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A6PSBN42CQSC400A1B8AMS4Q42ANPF5",
        "shop_name": "天津乐天百货商场",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1A71QKJU1QF57000A1B8B974K42AVU22",
        "shop_name": "湖北银购悦单测试",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ABS52CJSF9N1R00A1B8B974RE2DIIOM",
        "shop_name": "K11",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ACB71V99TIQEN00A1B8B974FT2DIC3D",
        "shop_name": "湖北银联商务",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ACB71V99TIQEN00A1B8B974FT2DIC3D",
        "shop_name": "湖北银联商务悦单",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ACB71V99TIQEN00A1B8B974FT2DIC3D",
        "shop_name": "银联商务湖北分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ACVQ01UHJ4SK300A1B8AMS4T82E9T99",
        "shop_name": "上海正大广场",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ADAOK3STOS12V00A1B8B974R82E8TRD",
        "shop_name": "上海银联商务悦单",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ADAOK3STOS12V00A1B8B974R82E8TRD",
        "shop_name": "银联商务上海分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ADF8DAI1E00RL00A1B8AMS4M72DUPKA",
        "shop_name": "沈阳万象城",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ADF8DPBBQ1EHR00A1B8AMS4M82DUPKB",
        "shop_name": "沈阳万象汇",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ADFRSHTT2O5G500A1B8AMS4QO2DUPOR",
        "shop_name": "北京银联商务有限公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AE3O0TCVG8SL000A1B8B974Q22E615M",
        "shop_name": "吉林银联商务悦单",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AE3O0TCVG8SL000A1B8B974Q22E615M",
        "shop_name": "银联商务吉林分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AE4629VVVP31N00A1B8B9747M2E1MD3",
        "shop_name": "银联商务湖南分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AEBIIQMG82CJ100A1B8B974H92E1MMM",
        "shop_name": "福建银联商务悦单",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AEBIIQMG82CJ100A1B8B974H92E1MMM",
        "shop_name": "银联商务福建分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AEEQTJ2CCBQNT00A1B8AMS4Q62DMQTG",
        "shop_name": "济南银联商务",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AEEQTJ2CCBQNT00A1B8AMS4Q62DMQTG",
        "shop_name": "济南银联商务悦单",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AEEQTJ2CCBQNT00A1B8AMS4Q62DMQTG",
        "shop_name": "银联商务山东分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AEH7B17DBECMJ00A1B8B974MK2DOPU9",
        "shop_name": "银联商务海南分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AF02AQA2EROCH00A1B8B974QJ441958",
        "shop_name": "银联商务河北分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AF0MFJ86U4C9U00A1B8B9741O4419CD",
        "shop_name": "杭州印力西溪",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AF0MFJ86U4C9U00A1B8B9741O4419CD",
        "shop_name": "测试商家",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AF5HATHFHPLDD00A1B8AMS4EH3RB92S",
        "shop_name": "银联商务厦门分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AFI5Q21JBOOUO00A1B8AMS4C82ED4RT",
        "shop_name": "银联商务甘肃分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AFO2OLCPD1IEI00A1B8AMS4JP2ED63E",
        "shop_name": "银联商务浙江分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AG1I1AMD7UJSC00A1B8AMS45N2ED6LC",
        "shop_name": "银联商务安徽分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AGCDVLBLEAHK300A1B8AMS4772DM45O",
        "shop_name": "银联商务内蒙古分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AGJHFN7MLHFJD00A1B8B974BU2DR174",
        "shop_name": "银联商务山西分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AGJNAG4DSKRBT00A1B8AMS4ML2DM4L6",
        "shop_name": "银联商务江苏分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AGMI5HDAF3Q8V00A1B8AMS4412EAS8C",
        "shop_name": "银联商务河南分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AGMPMNKOQM73M00A1B8AMS47S2EASC7",
        "shop_name": "龙湖长楹天街调试",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AGUJBR60IPSNU00A1B8AMS4LV2EATQA",
        "shop_name": "广州银联网络支付有限公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AHBBPT6NO29A000A1B8B974LI2F748D",
        "shop_name": "银联商务大连分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AHQ2Q935LUH9900A1B8B974OC2DMHQK",
        "shop_name": "南京金茂广场"
      },
      {
        "shop_id": "1AI9J4NQMP8ODR00A1B8B974P62DQ5A6",
        "shop_name": "浙江天虹百货",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AI9KHSI19K7J400A1B8AMS4UC2DUJDC",
        "shop_name": "厦门中华城"
      },
      {
        "shop_id": "1AIJTL73B3CCRG00A1B8B974122DQ5I2",
        "shop_name": "沈阳兴隆大奥莱"
      },
      {
        "shop_id": "1AIU874Q5HRB1100A1B8B9743L2DQ5KL",
        "shop_name": "快钱测试店",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AJDKA6BA3FT8F00A1B8B974I02DQ630",
        "shop_name": "深圳海上世界",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AJLS9H67MG5E600A1B8AMS47U2DT9L7",
        "shop_name": "成都环球中心",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AK0DRV3060T9M00A1B8B974JF2EDIDP",
        "shop_name": "银联商务青岛分公司",
        "shop_entity_list":[],
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AK2ML27ASSEBG00A1B8B9747TBURPIP",
        "shop_name": "银联商务广西分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AKAPG3CB150JC00A1B8AMS42ND49B5F",
        "shop_name": "珠海华发",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AKKDH2BO2TR6300A1B8B974HF2DNPUG",
        "shop_name": "中粮祥云小镇",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AKNN9K5DKAFHA00A1B8AMS4DT2DQS24",
        "shop_name": "小南国",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AKNN9K5DKAFHA00A1B8AMS4DT2DQS24",
        "shop_name": "武汉银商",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AL48F0NVBMHS900A1B8AMS4342DQSNB",
        "shop_name": "深圳宝能",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AL4DN1815V6VM00A1B8AMS4L52DQT9C",
        "shop_name": "龙湖星悦荟",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AL4DN1815V6VM00A1B8AMS4L52DQT9C",
        "shop_name": "龙湖西苑星悦荟",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AL8R5ICH4VS3L00A1B8AMS4Q02DQTE7",
        "shop_name": "成都水锦界"
      },
      {
        "shop_id": "1ALC19DLQSJVBU00A1B8B974JJ2DNR0K",
        "shop_name": "武商众圆",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ALC6K1Q93M6FE00A1B8B974JS2DNR0T",
        "shop_name": "成都珠江广场",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ALR1R5571AEHU00A1B8B974QLHGJ5AO",
        "shop_name": "重庆龙湖北城天街",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1ALTV7HKOJ19Q700A1B8AMS45TQEA68T",
        "shop_name": "立减演示",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AM7V94RUQTHVL00A1B8AMS4BFQEA6EF",
        "shop_name": "大兴龙湖天街",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AMB1NIIUJA50O00A1B8B974KGHGJ64J",
        "shop_name": "银联商务宁夏分公司",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AMCVP6MS1EFAP00A1B8AMS4OPQEA6RP",
        "shop_name": "重庆龙湖星悦汇",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AMCVP6MS1EFAP00A1B8AMS4OPQEA6RP",
        "shop_name": "重庆龙湖星悦荟",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AMDB9H464D47V00A1B8B974MMHGJ66P",
        "shop_name": "西安龙湖曲江星悦荟",
        "shop_entity_list":[]
      },
      {
        "shop_id": "1AMDLQRIAB61SG00A1B8B974TBHGJ6DE",
        "shop_name": "银联商务陕西分公司",
        "shop_entity_list":[]
      }
    ],
      Index: 0,
      Sindex: 0,
      terminaValue: 0
    };
  },
  componentDidMount(){
    this._getAllMallList();
  },
  _getAllMallList(){
    const idx = 0;
    const store = this.state.Store;
    Ajax({
      url: API.SEARCHMALL,
      data: {'action':'get_list'},
      type: 'json',
      method:'post'
    }).then(resp => {
      if (resp.status == 'S') {

        var dataShopList = resp.data.shop_list;
        var dataEntityList = resp.data.shop_entity_list;

        dataShopList.map((item, idx) => {
          var tempArr = [];
            dataEntityList.map((key, li) => {

              if(item.shop_name == key.shop_name){
                tempArr.push(key);
                dataShopList[idx]['shop_entity_list'] = tempArr;
              }

            });
        });

        this.setState({
          Store: dataShopList
        });

      }
    }).catch(err => {
      Permission(err);
    });
  },
  _getShopList(){
    const idx = this.state.Index || 0;
    const store = this.state.Store;
    const postData = {};
    postData['action'] = 'get_list';
    postData['shop_id'] = store[idx]['shop_id'];

    if(!store[idx]['shop_entity_list']){
      Ajax({
        url: API.SEARHSHOP,
        data: postData,
        type: 'json',
        method:'post'
      }).then(resp => {
        if (resp.status == 'S') {
          store[idx]['shop_entity_list'] = resp.data.shop_entity_list;
          this.setState({
            Store: store
          });
        }
      }).catch(err => {
        Permission(err);
      });
    }

  },
  _handleMallChange(value){
    this.setState({
      Index: value
    });

    this._getShopList();
  },
  _handleShopChange(value){
    this.setState({
      Sindex: value
    });
  },
  _handleTerminalChange(value){
      this.setState({
        terminaValue: value
      });
  },
  _searchBotton(){
    const index = this.state.Index;
    const terminalNumber = this.state.terminaValue || this.state.Store[index]['shop_entity_list'][this.state.Sindex]['terminal_number'][0];
    const shopEntity = this.state.Store[index]['shop_entity_list'][this.state.Sindex];
    const mallEntity = this.state.Store[index];
    this.props.terminalOnChange(terminalNumber, shopEntity, mallEntity);
  },
  render() {
    const index = this.state.Index;
    var shopListOpion = [];
    var terminalNumber = [];
    var mallListOpion = [];

    var shopListOpionValue = '';
    var terminalNumberValue = '';
    var mallListOpionValue = '';

    this.state.Store.map((item,idx) =>{
      mallListOpion.push(<Option value={idx}>{item.shop_name}</Option>);
    });

    mallListOpionValue = this.state.Store[this.state.Index].shop_name;
    if(this.state.Store[index] && this.state.Store[this.state.Index]['shop_entity_list'] !== undefined && this.state.Store[this.state.Index]['shop_entity_list'].length >= 0 && this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex]){
      this.state.Store[index]['shop_entity_list'].map((item,idx) =>{
        shopListOpion.push(<Option value={idx}>{item.shop_entity_name} ({item.receipt_count})</Option>);
      });
      shopListOpionValue = this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex]['shop_entity_name'] + '(' + this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex]['receipt_count'] + ')';

      if(this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex] && this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex]['terminal_number'] != undefined){
        this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex]['terminal_number'].map(item =>{
          terminalNumber.push(<Option value={item}>{item}</Option>);
        });
        terminalNumberValue = this.state.Store[this.state.Index]['shop_entity_list'][this.state.Sindex]['terminal_number'][0];
      }

    }else{
      this._getShopList();
    }

    return (
      <Row>
        <Col span={4}>

        </Col>
        <Col span={5}>
          <Select size="large" defaultValue={mallListOpionValue} style={{ width: 200 }} onChange={this._handleMallChange}>
          {mallListOpion}
          </Select>
          </Col>
          <Col span={5}>
          <Select size="large" value={shopListOpionValue} style={{ width: 200 }} onChange={this._handleShopChange}>
          {shopListOpion}
          </Select>
          </Col>
          <Col span={5}>
          <Select size="large" value={terminalNumberValue} style={{ width: 200 }} onChange={this._handleTerminalChange}>
          {terminalNumber}
          </Select>
        </Col>
        <Col span={1}>
            <Button type="primary" icon="search" onClick={this._searchBotton}>Search</Button>
        </Col>
      </Row>
    );
  }
});

export default SelectTool;
