# Web Programming HW#9

### 全端服務的網址
[hw9-deploy-scoreboard-production.up.railway.app](https://hw9-deploy-scoreboard-production.up.railway.app)

### 服務功能簡述
包含所有作業六的基本要求：
1. 當 "Clear" 按鈕被按下去後，會送出 DELETE request 把 DB 清空，然後在下⽅空⽩處印出 “Database cleared”。 
2. 當 "Name", "Subject" 以及 "Score" 三個輸入框都被輸入值之後，按下 "Add" 按鈕，會把資料寫到 DB：
	- 如果 {Name, Subject} paired value 已經存在 DB，則取代原先在 DB 的這筆資料，然後在下⽅空⽩處印出 "Updating (Name, Subject, Score)" 
	- 否則，在 DB 新增⼀筆資料，印出 "Adding (Name, Subject, Score)"。
3. 在 Query string 不為空字串的情況下，當 Query 按鈕按下去後，會根據 Name/Subject ⼆選⼀的 radio button 選擇 Name or Subject 作為 query 條件，然後根據輸入 Query String 的內容去 DB 把符合條件的資料搜尋回來，在下⽅空⽩處印出搜尋出來的結果(⼀筆⼀⾏)，"Found card with name: (Name, Subject, Score)", or "Found card with subject: (Name, Subject, Score)"。如果找不到，就印出 “QueryType (QueryString) not found!”
4. Query Input 下⽅為 message console。印出訊息/資料會印在之前的訊息之下，⽽當 “Clear” 動作被執⾏之後，清除 console 中的所有訊息並印出 "Database cleared"。如果在 query 時有任何的錯誤訊息，也是⼀樣印在這邊。

### 預定開啟的⽇期與時段
12/30 00:00 ~ 1/5 21:00

### Deployment 的流程
1. 我選擇將作業六 deploy 到 Railway 上。
2. 把 .editorconfig, .gitignore, Dockerfile 這三個檔案從助教的 111-1-deploy-demo project 中複製到 hw9-demo 資料夾下。
3. 在 frontend/src 資料夾下修改 api.js，參考助教 frontend/src/connection.js 的寫法，如下圖：![](https://i.imgur.com/XjgVdNu.png)
4. 在 backend/package.json 中加入 yarn deploy 的運作指令：![](https://i.imgur.com/MDk3bZo.png)
5. 在 backend/src/server.js 中參考助教的 server.js，劃分 development 和 production 兩種模式下的運作：![](https://i.imgur.com/TUJFdNd.png)
6. 回到 hw9-demo 資料夾下，在 package.json 中加入以下 scripts：
`"install:prod": "cd frontend && yarn install --freeze-lockfile && cd ../backend && yarn install --freeze-lockfile",`
`"build": "cd frontend && yarn build",`
`"deploy": "cd backend && yarn deploy"`
7. 將整個 hw9-demo 資料夾 push 到 github 上作為一個新專案。
8. 在 Railway 連結到 github 後，根據 hw9-demo 這個專案新增一個 project，它會自動幫忙 deploy。
9. generate a domain for this project
10. 可連上 [hw9-deploy-scoreboard-production.up.railway.app](https://hw9-deploy-scoreboard-production.up.railway.app) 了。

### 遇到的困難以及解決的⽅式
唯一遇到的困難是打錯字，多檢查幾次就解決了。
