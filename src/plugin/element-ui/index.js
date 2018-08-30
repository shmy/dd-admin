import { MessageBox, Message, Notification, Button, Select, Menu, MenuItem, Submenu, Tooltip, Dialog, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, Tabs, TabPane, Table, TableColumn, Card, Form, FormItem, Input, Option, Col, Row, DatePicker, TimePicker, Switch, CheckboxGroup, Checkbox, Radio, RadioGroup, Badge, Tag, Pagination, Popover, Cascader, InputNumber, OptionGroup } from 'element-ui'
import success from './success'
export default {
  install (Vue) {
    // confirm
    Vue.prototype.$confirm = (...args) => MessageBox.confirm(...args)
    // alert
    Vue.prototype.$alert = (...args) => MessageBox.alert(...args)
    // prompt
    Vue.prototype.$prompt = (...args) => MessageBox.prompt(...args)
    // message
    Vue.prototype.$message = {
      // success: (...args) => Message.success(...args),
      warning: (...args) => Message.warning(...args),
      info: (...args) => Message.info(...args),
      error: (...args) => Message.error(...args),
      closeAll: () => Message.closeAll(),
      success: msg => {
        Message({
          message: success(window.h, msg),
          iconClass: '__ignore'
          // showClose: true
        })
      }
    }
    // notify
    Vue.prototype.$notify = {
      success: (...args) => Notification.success(...args),
      warning: (...args) => Notification.warning(...args),
      info: (...args) => Notification.info(...args),
      error: (...args) => Notification.error(...args),
      closeAll: () => Notification.closeAll()
    }

    Vue.use(Button)
    Vue.use(Select)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Submenu)
    Vue.use(Tooltip)
    Vue.use(Dialog)
    Vue.use(ButtonGroup)
    Vue.use(Dropdown)
    Vue.use(DropdownItem)
    Vue.use(DropdownMenu)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Card)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Option)
    Vue.use(Col)
    Vue.use(Row)
    Vue.use(DatePicker)
    Vue.use(TimePicker)
    Vue.use(Switch)
    Vue.use(CheckboxGroup)
    Vue.use(Checkbox)
    Vue.use(Radio)
    Vue.use(DatePicker)
    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(Badge)
    Vue.use(Tag)
    Vue.use(Pagination)
    Vue.use(Popover)
    Vue.use(Cascader)
    Vue.use(InputNumber)
    Vue.use(OptionGroup)
  }
}
