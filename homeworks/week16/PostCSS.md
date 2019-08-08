# PostCSS
相較於 SASS, LESS... 等預處理器，PostCSS 應該算 **後** 處理器。

後處理器的好處在於，有彈性、不用強背那些預處理器的語法，可以自由擴充需要的功能。

[PostCSS](https://github.com/postcss/postcss) 文件洋洋灑灑列出了一堆 plugin，整個目不暇給，最有名的就是 autoprefixer (自動補瀏覽器前綴)，嫌 plugin 不夠多的話還可以自己開發。

目前看到其他功能強大的 plugin 有:
- [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env)
    - 支援未來的 CSS 寫法 ( 是更新版的 `postcss-cssnext` )
- [`stylelint`](https://github.com/stylelint/stylelint)
    - 糾察隊 nice to have
- [`postcss-assets`](https://github.com/borodean/postcss-assets)
    - 簡化有關圖片的操作，統一路徑、尺寸、自動加上 hash 值防止 cache
- [`lost`](https://github.com/peterramsing/lost)
    - 寬度可以直接寫 `1/n`，充滿人性
- [`postcss-modules`](https://github.com/css-modules/postcss-modules#postcss-modules-) 
    - 看起來是 CSS 也能有局部作用域、非常猛！
    - 不過 render html 應該需要框架輔助，實作應該很麻煩
- [`postcss-sprites`](https://github.com/2createStudio/postcss-sprites)
    - 不用 compass 就可以自動生成 sprite 圖！
- [`postcss-utilities`](https://github.com/ismamz/postcss-utilities)
    - 內建許多常用的 utility

---

### 心得

> 作業直接加在 hw1 裡。

一開始很懶想說用 CLI 跑就好，但很多 task 打指令反而更麻煩。

gulp 以前有摸過，覺得應該比 webpack 簡單不少就先用 gulp 試試，中間卡了一陣子才發現是 modules 沒有引入（蠢） 

我喜歡 PostCSS 很棒的一點是想拆就拆，不過插件真的好多研究不完，目前只有用 `autoprefixer`、`cssnano` 而已。

---

這邊想順便問一下，`npm install` 應該是照 package.json 的 `dependencies` 去載依賴的 plugin 對嗎？

會有這疑問是因為我明明 `dependencies` 只寫了五套，但當我按下 `npm install` 發現載了很久，才看到 `node_modules/` 底下有超多 plugin。

by 覺得很驚恐的 me