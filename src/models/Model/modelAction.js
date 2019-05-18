import axios from 'axios';
import { SetCrud } from '../Module/actions/moduleActions';
import * as DEFAULT from './modelConsts';

class Model {
  constructor({
    serverURL = '',
    action = {
      save: '',
      update: '',
      select: '',
      delete: '',
    },
  }) {
    this.serverURL = serverURL;
    this.action = action;
  }

  save() {
    return (dispatch) => {
      axios.post(DEFAULT.Actions.dns_server + this.serverURL, {
        ...this,
      }).then(() => dispatch({
        type: `${this.action.save}_SUCCESS`,
        payload: dispatch(this.select()),
        setCrud: dispatch(SetCrud('READ')),
      })).catch(res => dispatch({
        type: `${this.action.save}_FAIL`,
        payload: res.error,
      }));
    };
  }

  update() {
    return (dispatch) => {
      axios.put(`${DEFAULT.Actions.dns_server + this.serverURL}/${this.id}`, {
        ...this,
      }).then(() => dispatch({
        type: `${this.action.update}_SUCCESS`,
        payload: dispatch(this.select()),
        setCrud: dispatch(SetCrud('READ')),
      })).catch(res => dispatch({
        type: `${this.action.update}_FAIL`,
        payload: res.error,
        setCrud: dispatch(SetCrud('READ')),
      }));
    };
  }

  select(params = { query: 'isactive:1', limit: 0 }) {
    return (dispatch) => {
      axios.get(DEFAULT.Actions.dns_server + this.serverURL, {
        params,
      }).then(res => dispatch({
        type: `${this.action.select}_SUCCESS`,
        payload: res.data,
      })).catch(res => dispatch({
        type: `${this.action.select}_FAIL`,
        payload: res.error,
      }));
    };
  }

  delete() {
    return (dispatch) => {
      axios.put(`${DEFAULT.Actions.dns_server + this.serverURL}/${this.id}`, {
        ...this,
        isactive: false,
      }).then(() => dispatch({
        type: `${this.action.delete}_SUCCESS`,
        payload: dispatch(this.select()),
        setCrud: dispatch(SetCrud('READ')),
      })).catch(res => dispatch({
        type: `${this.action.delete}_FAIL`,
        payload: res.error,
        setCrud: dispatch(SetCrud('READ')),
      }));
    };
  }
}

export default Model;