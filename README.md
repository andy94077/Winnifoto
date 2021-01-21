# [109-1] Web Programming Final
**(Group 10) Winnifoto**
## Project Goal
一個媒合攝影師與模特的平台。目前想要尋找外拍機會的攝影師/模特基本上是在 facebook 社團中發文或在 Instagram 中私訊找合作夥伴，並沒有一個專門的平台來提供媒合兩方的服務。若攝影師/模特想要查看對方過往作品、評價等等資訊，是相當麻煩的。因此，我們想要做出一個可以讓攝影師/模特能方便尋找外拍合作的平台。
我們提供了一個專門的平台，並且將一些資訊給結構化，像是預定下次外拍時間、想要拍攝的類型等等。也將尋找模特/尋找攝影師的貼文分開，讓兩方都能更方便的查找合作對象。並且也有提供每個使用者一個個人頁面，讓他們可以展示自己過去的作品，這同時也可以用來讓使用者篩選出優良的合作對象。

## Deployed
http://140.112.30.33:3000/
## Demo 影片
TODO
## 使用/操作方式
### Server端
#### backend

1. 將`MONGO_URL`、`SECRET`加入至 `server/.env`
```bash
yarn  # 2. install dependencies
yarn seed  # 3. generate initial data
yarn server # 4. start up backend server
```
預設 port 為 4000

#### frontend
1. 將`REACT_APP_SERVER_URL`加入至`.env`，該值必須為 backend server 的 ip

```bash
yarn  # 2. install dependencies
yarn build # 3. build frontend
./node_modules/.bin/serve -s build -l 3000 # 4. start up service
```

### 使用者
#### 一般訪客
1. 登入、點選 `sign up` 註冊，或是以訪客身分瀏覽。
2. 點選上方的`Find Model`或`Find Snapper`來決定尋找模特或尋找攝影師的貼文。
3. 觀看其他user的作品集
4. 使用者可以搜尋其他使用者的貼文、或是在搜尋列加上`#`前綴來搜尋攝影風格。搜尋支援 regular expression 語法。
5. 點選發文者的頭像或使用者名稱，可以查看該使用帳戶的作品集。
6. 點選貼文時間可以查看該貼文的專屬頁面。
#### 已登入使用者可使用的額外功能
1. 對貼文按讚、取消讚或留言。
2. 在個人頁面新增、修改、刪除自己的作品集。
3. 在`Find Model`或`Find Snaper`頁面中新增、修改、刪除尋找合作夥伴的貼文。
4. 修改自己的大頭貼。

## Package
* Frontend
    - @material-ui/core
    - @material-ui/icons
    - @reduxjs/toolkit
    - @testing-library/jest-dom
    - @testing-library/react
    - @testing-library/user-event
    - axios
    - clsx
    - dotenv-defaults
    - moment
    - react
    - react-avatar-editor
    - react-dom
    - react-redux
    - react-router-dom
    - react-scripts
    - serve
* Backend
    - bcrypt
    - body-parser
    - cookie-parser
    - cors
    - dotenv-defaults
    - express
    - express-jwt
    - jsonwebtoken
    - method-override
    - moment
    - mongoose
    - mongoose-unique-validator
    - morgan
    - multer
    - nodemon
    - uuid
* Database
    - MongoDB

## 心得
* 陳義榮: 因為之前有開發過網頁的經驗，所以component都寫得不錯，也有好好注意RWD。而且這次有好好地寫環境變數，所以在deploy的時候只要改環境變數，一切就都能跑了。熬夜好辛苦。巧克力好好吃。
* 黃秉迦: 寫過之後才知道寫網站是多麼辛苦的一件事，許多看起來應該一下子就能完成的功能，在實作時其實還有考慮許多的面向，例如安全性的問題、錯誤處理的問題以及API是否符合要求等。前端關於render的部分也很複雜，實作較大的project後完全理解了component的重要性。最後，雖然已經盡可能提早開始做project了，但實做網頁的時間比預期的還多了許多，再次認清了工程師在deadline面前是沒有極限的，感謝讓我還能好好活著的巧克力!
* 蔡秉辰: 沒想到很多看起來很基本的功能，在實作的時候會比想像中麻煩許多。舉例像是光是要上傳一組圖片，就會遇到各種問題。然後感謝組員大大們的凱瑞，很多架構都有事先定好，讓之後在做事情的時候方便很多。喔，然後熬夜真的累，巧克力好好吃。
## Contribution
* 陳義榮
    * 前端
    * 後端
    * UI/UX
    * DevOps
    * Version Control
    * Security
* 黃秉迦
    * 前端
    * 後端
    * QA
    * DB
    * Version Control
    * Security
* 蔡秉辰
    * 後端
    * QA
    * DB
    * DevOps
    * Version Control
    * Security