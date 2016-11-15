
import Utils from '../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const OptUrl = {
  checkPageName: '/page/checkPageName.do',
  checkPageUrl: '/page/checkPageUrl.do',
  addPage: '/page/addPage.do',
};

class NewPageService {
  static validatePageName(pageName) {
    return ajax({
      url: OptUrl.checkPageName,
      data: { name: pageName },
    });
  }
  static validatePageUrl(pageUrl) {
    return ajax({
      url: OptUrl.checkPageUrl,
      data: { url: pageUrl },
    });
  }
  static addPage(opt) {
    return ajax({
      url: OptUrl.addPage,
      data: opt,
    });
  }
}

export default NewPageService;
