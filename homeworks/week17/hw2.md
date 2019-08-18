# 作業 hw2： Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

### 輸出結果

```javascript
i: 0
i: 1
i: 2
i: 3
i: 4
5 ( 等 i 印完出現 )
5 ( 大約一秒後 )
5 ( 大約二秒後 )
5 ( 大約三秒後 )
5 ( 大約四秒後 )
```

---

### 解釋輸出


##### 跑第一個迴圈

（ 為了方便區分，幫每個 Timer 加上編號 ）

```javascript
// 第一圈， i: 0
console.log('i: ' + i) // => 輸出 0
setTimeout(() => {
    console.log(i) // => 建立一個 Timer_1，丟進 Web API 等待時間到
}, i * 1000)

// Timer 列表：
[ Timer_1 ] call back: console.log(i) 
[ Timer_1 ] 時間: 0 * 1000 => 0 毫秒 // => 時間只有 0 毫秒，立刻丟進 Callback Queue
```


##### 跑第二個迴圈

```javascript
// 第二圈， i: 1
console.log('i: ' + i) // => 輸出 1
setTimeout(() => {
    console.log(i) // => 建立一個 Timer_2，丟進 Web API 等待時間到
}, i * 1000)

// Callback Queue： 等待 Call Stack 清空中
[ Timer_1 ] call back: console.log(i) 
[ Timer_1 ] 時間: 0 * 1000 => 0 毫秒

// Timer 列表：
[ Timer_2 ] call back: console.log(i) 
[ Timer_2 ] 時間: 1 * 1000 => 1000 毫秒
```

##### ... 重複同樣動作到第五圈

```javascript
// 第五圈， i: 4
console.log('i: ' + i) // => 輸出 4
setTimeout(() => {
    console.log(i) // => 建立一個 Timer_5，丟進 Web API 等待時間到
}, i * 1000)

// Callback Queue： 等待 Call Stack 清空中
[ Timer_1 ] call back: console.log(i) 
[ Timer_1 ] 時間: 0 * 1000 => 0 毫秒

// Timer 列表：
[ Timer_2 ~ Timer_5 ] call back: console.log(i) 
[ Timer_2 ] 時間: 1 * 1000 => 1000 毫秒
[ Timer_3 ] 時間: 2 * 1000 => 2000 毫秒
[ Timer_4 ] 時間: 3 * 1000 => 3000 毫秒
[ Timer_5 ] 時間: 4 * 1000 => 4000 毫秒
```


##### Call Stack 已清空，把 Callback Queue 等待中的任務移到 Call Stack 中執行

```javascript
// i 因為閉包的關係被保留下來，而迴圈跑完、此時的 i 為 5 
// 執行 Timer_1 的 call back
console.log(i) // => 輸出 5

// Timer 列表：
[ Timer_2 ~ Timer_5 ] call back: console.log(i) 
[ Timer_2 ] 時間: 1 * 1000 => 1000 毫秒
[ Timer_3 ] 時間: 2 * 1000 => 2000 毫秒
[ Timer_4 ] 時間: 3 * 1000 => 3000 毫秒
[ Timer_5 ] 時間: 4 * 1000 => 4000 毫秒
```

##### （ 約略 1 秒後 ）Timer_2 時間到期，移到 Callback Queue

因為 Call Stack 已清空，又立即移到 Call Stack 中執行

```javascript
// i 還是為 5 
// 執行 Timer_2 的 call back
console.log(i) // => 輸出 5

// Timer 列表：
[ Timer_3 ~ Timer_5 ] call back: console.log(i) 
[ Timer_3 ] 時間: 2 * 1000 => 2000 毫秒
[ Timer_4 ] 時間: 3 * 1000 => 3000 毫秒
[ Timer_5 ] 時間: 4 * 1000 => 4000 毫秒
```



##### （ 每隔一秒 ）... 重複以上步驟直到 Callback Queue 跟 Call Stack 都清空，程式結束