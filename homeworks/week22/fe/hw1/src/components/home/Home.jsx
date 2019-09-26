import React from 'react';
import pic_cover from './../../img/img_01.jpg';

const Home = () => (
  <div className="home-list">
    <section className="list-item cover">
      <div className="pic">
        <img src={pic_cover} alt="" />
      </div>
      <div className="list-item__inner">
        <div className="list-item__title">
          <span>2019/09/03</span>
          <h3>React 學習筆記第一篇 </h3>
        </div>
        <div className="list-item__description">
          <p>
            一本給初學者的 React 中文入門教學書，由淺入深學習 ReactJS 生態系 (Flux, Redux, React Router, ImmutableJS, React Native, Relay/GraphQL etc.)，打造跨平台應用程式。
            </p>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
