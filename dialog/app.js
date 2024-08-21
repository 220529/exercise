// App.js

import React from 'react';
import DialogManager from './DialogManager';

function App() {
  // 模拟接口请求，并在回调中调用handleApiResponse
  function fetchData() {
    // 假设接口请求返回以下数据，包含了三个弹框，分别具有不同的优先级
    const apiResponse = [
      { id: 1, content: 'This is the first dialog.', priority: 3 },
      { id: 2, content: 'This is the second dialog.', priority: 1 },
      { id: 3, content: 'This is the third dialog.', priority: 2 },
    ];

    // 模拟异步操作，将数据传递给弹框管理器
    setTimeout(() => {
      apiResponse.forEach(data => {
        handleApiResponse(data);
      });
    }, 1000);
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <DialogManager />
      <div id="dialog-root"></div>
    </div>
  );
}

export default App;
