# Web Programming HW#3

在 public folder 中，我放入裝著 close button 圖片的 img folder，並把 index.html 中的 div#root 移除，重要改變多在 src folder 中進行。

## App.js
設置之後會用到的多數 useState，照講義切版為Header, Main and Footer，第一個較簡單，放在 Component folder 中，後兩個放在 Container folder 中。
1. Header.js：按照講義和提供的 css 檔架構。
2. useState：todo list 相關、記錄目前的檢視模式 (all/active/completed 等)。
3. todo list 中的每個物件包含：任務內容、是否完成以及任務 id (一個 session 中絕不重複)。

 
## Main.js & Item.js
主要實現了新增任務、刪除任務以及切換顯示模式等功能，並把每一條 todo list items map 到 \<Item />：
1. 除了講義設定格式，額外用 form 把 input & label 包起來，主要用 onSubmit 和 onChange 實現新增 todo item 的功能(需要更新 useState)。
2. checkbox 是否為選定狀態由之前的任務物件中 "是否完成" 這個屬性決定。
3. 送出任務或刪除任務後為了保持 showState 的正確性，需要刷新整個 ul (這裡為每個顯示模式設置兩個 state number，在兩者間切換以讓它自然刷新，應該也可以透過 useEffect 實現)。

## Footer.js
實現剩餘任務數量顯示、顯示模式切換、清除已完成任務等功能：
1. 用 useState 中的 showState 完成顯示模式切換。
2. 用 useState 中的 numIncompleted 表示未完成任務的數量。
3. 實現 "清除已完成任務" 按鈕的顯示與否以及它的清除功能。

## 操作注意事項
1. 若切換到 active 模式，將一個任務標示為完成時，它會從當前畫面中消失 (因為它已經不屬於 active 類別了)
2. 若切換到 completed 模式，取消標示後情況和前一點類似，而且加入新任務時是看不到被加進來的任務的 (因為新任務默認為 active)
3. 刪除任務時，checkbox 的標示需要一點時間 re-render，可能會看到殘影。

## TODO List
- 基本功能
	- [x] 最開始只出現 input，無 ul 和 footer
	- [x] 加入 unchecked 的新任務到清單最底下
	- [x] 點擊任務最前面的 checkbox，切換完成/未完成狀態，變化包括顏色、文字刪除線及透明度。
	- [x] 有存在的 item 時，footer 會出現，並在最左側顯示 "未完成" 的 item(s) 的數量。

- 進階功能
	- [x] 點右側浮出的叉叉可刪除該條 item，並從畫面移除，若此條為未完成狀態，下面的 "未完成" 的 item(s) 數量會減一。
	- [x] 所有 item(s) 被刪光則 ul 和 footer 皆隱藏。
	- [x] 切換顯示模式。需要注意：即使刪光所有 item 再重頭加入任務，顯示模式仍會保持在最後一次的設定，除非刷新網頁回到 default 的 all 模式，否則沒有任何 all/active/completed 外的按鈕會改變當前顯示模式。
	- [x] 已完成的 item 不為 0 時，“Clear completed” 按鈕才會出現，且在任意顯示模式下皆可移除表單中的所有已完成 item(s)。

我已實現所有基本和進階功能的實作。