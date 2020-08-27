import {TreeviewItem} from '../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/models/treeview-item';

export function formatDataDept(data, parentId) {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = {
      text: data[i].name,
      value: data[i].deptId,
      parentId: data[i].parentId,
      children: [],
    };
    if (dataItem.parentId === parentId) {
      const children = formatDataDept(data, dataItem.value);
      if (children.length > 0) {
        dataItem.children = children;
      } else {
        dataItem.children = null;
      }
      const dataTreeview = new TreeviewItem({text: dataItem.text, value: dataItem.value, children: dataItem.children});
      arr.push(dataTreeview);
    }
  }
  return arr;
}

export function formatDataModule(data, parentId) {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = {
      text: data[i].name,
      value: data[i].id,
      parentId: data[i].parentId,
      children: [],
    };
    if (dataItem.parentId === parentId) {
      const children = formatDataModule(data, dataItem.value);
      if (children.length > 0) {
        dataItem.children = children;
      } else {
        dataItem.children = null;
      }
      const dataTreeview = new TreeviewItem({
        text: dataItem.text,
        value: dataItem.value,
        children: dataItem.children,
        collapsed: true,
        checked: false,
      });
      arr.push(dataTreeview);
    }
  }
  return arr;
}
