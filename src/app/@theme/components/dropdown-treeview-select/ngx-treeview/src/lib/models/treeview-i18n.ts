import { Injectable } from '@angular/core';
import { TreeviewSelection } from './treeview-item';

@Injectable()
export abstract class TreeviewI18n {
  abstract getText(selection: TreeviewSelection): string;
  abstract getAllCheckboxText(): string;
  abstract getFilterPlaceholder(): string;
  abstract getFilterNoItemsFoundText(): string;
  abstract getTooltipCollapseExpandText(isCollapse: boolean): string;
}

@Injectable()
export class DefaultTreeviewI18n extends TreeviewI18n {
  getText(selection: TreeviewSelection): string {
    if (selection.uncheckedItems.length === 0) {
      if (selection.checkedItems.length > 0) {
        return this.getAllCheckboxText();
      } else {
        return '';
      }
    }

    switch (selection.checkedItems.length) {
      case 0:
        return 'Chọn';
      case 1:
        return selection.checkedItems[0].text;
      default:
        return `${selection.checkedItems.length} được chọn`;
    }
  }

  getAllCheckboxText(): string {
    return 'Tất cả';
  }

  getFilterPlaceholder(): string {
    return 'Tìm kiếm';
  }

  getFilterNoItemsFoundText(): string {
    return 'Không có kết quả';
  }

  getTooltipCollapseExpandText(isCollapse: boolean): string {
    return isCollapse ? 'Expand' : 'Collapse';
  }
}
