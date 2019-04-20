# [第一週] 作業 hw1：交作業流程

---

## 階段一： 苦逼寫作業中

### 先把作業的環境設好

1. **每個人的 repository 都不一樣**，[我的在這](https://github.com/Lidemy/mentor-program-3rd-yakim-shu)
2. 先把作業 repo `clone` 下來 
3. 就看到桌面有一包 `mentor-program-3rd-yakim-shu` 資料夾啦

### 欸你在哪個伺服器

養成好習慣，永遠在新的 branch 裡面寫，不是 master！

1. Terminal 先切到該資料夾下
2. 記得新開一個 branch week 1 : `git branch week1`
3. 切換到 branch week 1 底下 : `git checkout week1`

### 啊啊啊我看到存檔點了

改了一些內容，想要 commit 之前，確認有進行以下步驟：

1. 要確認檔案的狀態，是否在 stage : `git stautus`
2. 如果**有新增的檔案**要 : `git add.`
3. 告一段落再進行提交 : `git commit -am <message>`

### 存檔失敗了，為什麼?

> 如果 commit 過不了，可能有以下原因：

1. 如果問題是 eslint 無法通過，代表作業裡的語法有不符合規範的地方
    - 把錯誤訊息拿去 google 
    - 真的解決不了，就發問啊
2. 是不是有新增的檔案忘記 `git add .` 

---

## 階段二： 交作業

終於寫完作業惹，yeah!!!!

但不是寫完就沒事，還要上傳到 GitHub repository。（ 收回歡呼 ）

1. 推到遠端 : `git push origin week1 `
2. 要是沒有錯誤訊息代表成功，走囉！去自己的 repo 看一下
3. 看到剛剛推上去的 branch `week1` 在那裡閃閃發亮，**按下 Compare & pull request 的綠色按鈕**
4. 確認兩條 branch 分別是 `base: master`、 `compare: week1`
5. 留下 whatever 的標題
6. 也可以在內容問問題

### 還沒結束唷

（ 什麼？！）

1. 跑到另一棚，交作業的 repository： [交作業專用 repo](https://github.com/Lidemy/homeworks-3rd/issues)
2. 在 Issue 的類別下，新增一個 Issue
3. 留下 **不能 whatever 的標題**，填入 [WeekX]，`X` 請填入你要交作業的週數。
4. 在內容留下 剛剛 push 上去的網址與心得
5. 重整網頁後，會看到糾察隊幫你貼標籤、招呼同學來看你

---

## 如果順利 Pass 

### Huli 每週會重複做 63 遍的事

（ 想到就頭皮發麻 ）

1. 看完作業覺得好棒棒
    - 進行 merge
    - 把 branch 刪掉
2. 看完作業覺得小問題要修
    - 一樣也先刪 branch
    - 讓學生再開一個新的 branch 進行修改
3. 關閉我剛剛新增的 Issue

### 等等別轉台、真的要結束了

 1. 回到你的 Terminal
 2. 切換回 master : `git checkout master`
 3. 把 merge 完的遠端 master 拉下來： `git pull origin master`
 4. 成功後，把寫完作業的分支刪掉： `git branch -d week_1`

> 貼心提醒： 改作業只以 Issue 為準，不要忘記傳了啊～

( 結束了，重新歡呼！！！ )
 