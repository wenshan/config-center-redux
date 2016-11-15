import Utils from '../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const API = {
  QUERY_TABLE: '/page/queryPage.do',
};

const fetchData = {
  setTableLoading(status) {
    this.props.setStoreState({
      tableLoading: status,
    });
  },
  fetchTableData() {
    const me = this;
    const storeState = this.props.getStoreState();
    const param = storeState.queryParam;
    const tablePagination = storeState.tablePagination;

    ajax({
      url: API.QUERY_TABLE,
      data: param,
      method: 'get',
      type: 'json',
    }).then(resp => {
      this.setTableLoading(false);
      this.props.setStoreState({
        tablePagination: commonUtils.merge(tablePagination, {
          total: resp.total,
          current: param.start / param.limit + 1,
        }),
      });
      const datas = resp.data || [];
      datas.forEach(d => {
        d.key = d.id;
      });
      this.props.setStoreState({
        tableData: datas,
      });
    }).catch((e) => {
      if (e.accessDeny) {
        const accessDeny = me.props.getStoreState().accessDeny;
        me.props.setStoreState({
          accessDeny: commonUtils.merge(accessDeny, { groupData: e.authUrl }),
        });
      }
    });
  },
};

export default fetchData;
