// DialogManager.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// 弹框组件
function Dialog({ content, onClose }) {
  return (
    <div className="dialog">
      <div className="dialog-content">{content}</div>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
}

// 弹框管理器组件
function DialogManager() {
  const [dialogs, setDialogs] = useState([]);

  useEffect(() => {
    // 监听队列变化，并控制弹框显示逻辑
    if (dialogs.length > 0) {
      const highestPriorityDialog = getHighestPriorityDialog(dialogs);
      showPopup(highestPriorityDialog);
    } else {
      hidePopup();
    }
  }, [dialogs]);

  // 模拟接口请求回调，并根据接口返回的数据添加弹框到队列中
  function handleApiResponse(data) {
    const dialogData = processDialogData(data);
    setDialogs(prevDialogs => [...prevDialogs, dialogData]);
  }

  // 获取队列中优先级最高的弹框
  function getHighestPriorityDialog(dialogs) {
    // 在实际情况下，您可以根据弹框的优先级字段进行排序，这里简化为直接返回第一个
    return dialogs[0];
  }

  // 显示弹框
  function showPopup(dialogData) {
    const dialogRoot = document.getElementById('dialog-root');
    ReactDOM.createPortal(
      <Dialog
        content={dialogData.content}
        onClose={() => handleDialogClose(dialogData)}
      />,
      dialogRoot
    );
  }

  // 处理弹框关闭事件
  function handleDialogClose(closedDialog) {
    setDialogs(prevDialogs => prevDialogs.filter(dialog => dialog !== closedDialog));
  }

  // 隐藏弹框
  function hidePopup() {
    // 隐藏弹框的逻辑，例如设置状态或移除React Portal的内容
    const dialogRoot = document.getElementById('dialog-root');
    ReactDOM.createPortal(null, dialogRoot);
  }

  return null; // 这个组件不需要渲染任何内容，只负责逻辑控制
}

export default DialogManager;
