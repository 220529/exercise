import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import Loading from '$common/components/Loading';

import Paser from "../../components/paser";
import "./index.less";

const answer = {
  name: "哒哒哒",
  postUrl: "https://lagou-zhaopin-fe.lagou.com/fed/lg-app-fed/2023-draw/report/1/1.png"
}

export default React.memo(props => {

  const posterRef = useRef();
  const [base64, setBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const share = async () => {
    setLoading(true);
    try {
      // const el = document.getElementById("mycanvas");

      const mycanvas = document.createElement("canvas");
      // mycanvas.style.width = posterRef.current.offsetWidth;
      // mycanvas.style.height = posterRef.current.offsetHeight;

      const canvas = await html2canvas(posterRef.current, {
        useCORS: true
      });
      // 将 Canvas 转换为图片数据或者其他操作
      const imgData = canvas.toDataURL('image/png');
      setBase64(imgData);
      // 此时 imgData 就是生成的图片数据
      // console.log(imgData);

      const a = document.createElement('a');
      a.href = imgData;
      a.download = `${Date.now()}.png`;
      a.click();

    } catch (error) {
      console.log("createPoster.err", error);
    }
    setLoading(false)
  }

  const handler = () => {
    const content = posterRef.current;
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match the content
    canvas.width = content.offsetWidth;
    canvas.height = content.offsetHeight;

    debugger
    // Render the DOM content to the canvas
    const renderToCanvas = () => {
      // Clear the canvas
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the HTML content to the canvas
        const data = new XMLSerializer().serializeToString(content);
        const DOMURL = self.URL || self.webkitURL || self;
        const img = new Image();
        const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        const url = DOMURL.createObjectURL(svgBlob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          DOMURL.revokeObjectURL(url);
          console.log("end...");
        };

        img.src = url;
      } catch (error) {
        console.log("error", error);
      }
    };

    renderToCanvas()
  }

  return (
    <div className="test2">
      <button className='btn' onClick={share}>哒哒哒哒</button>
      <div className='aa'>
        <Paser answer={answer} canvas ref={posterRef} />
      </div>

      {base64 ? (
        <div className='imgData'>
          <img src={base64} />
        </div>
      ) : null}

      {loading && <Loading style={{ background: '#f5f5f5a3' }}>加载中...</Loading>}

      <canvas id="mycanvas"></canvas>
    </div>
  )
})