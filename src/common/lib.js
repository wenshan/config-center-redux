//import 'antd/dist/antd.less';
//import './index.less';

import Utils from '../utils/index';
import Cookies from 'js-cookie';
const Ajax = Utils.ajax;
const Login = Utils.common.login;


global.Domain = 'http://config.gooagoo.com';
global.API = {
  init: 'http://data.${window.Domain}:8080' + '/init.json',
};
global.COOKIES_INFO = {};
COOKIES_INFO.token = Cookies.get('com.gooagoo.passpart.sso.token.name') || 'undefined';
COOKIES_INFO.user_data = {};

/* (function(){
    Ajax({
        url: API.DATAURL,
        data:{
            sso_token:COOKIES_INFO.token
        },
        method: 'get'
    }).then(resp => {
        if(resp.status === 'S'){
            let data = resp.data;
            Cookies.set('now_username', data.userName, { path: '/' });
            Cookies.set('now_shopid', data.shopId, { path: '/' });
            Cookies.set('user_data', JSON.stringify(data), { path: '/' });
            COOKIES_INFO['user_data'] = data;
        }else{
            Login();
        }
    }).catch(err => {
        Login();
    });
})();*/
