[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Customizable Planner
## 우리 플래너 설명

ㅁㄴㅇㄹ
ㅁㄴㅇㄹ
ㅁㄴㅇㄹ
ㅁㄴㅇㄹ
## Installation
### Prerequisite
*  node.js, vue, electron 의 설치가 필요합니다.
```c
사용자 Installation 하는 방법
> npm install -g vue-cli
> npm install -g electron-forge

```
### 실행
```c
yarn electron:serve
```
***
## API
사용자의 개발 편의성 및 ~~ 하기위해  각 모듈별 다음과 같은 API를 제공합니다.

### JustCalendarModule.vue
* Data
```c

name: 

details: 

start:

end:
```
* Methods
 

  * getEvents() : firebase db에 저장되어있는 event를 불러옴.
  * addEvent() : 새로운 event를 firebase에 추가함.

  * editEvent(ev) : event(일정)의 description을 수정한다.

    | arg | 설명 |
    |---|:---:|
    |ev|편집하려는 event(일정)|
    
  * updateEvent(ev): event(일정)의 description을 수정한다.
  
    | arg | 설명 |
    |---|:---:|
    |ev|업데이트 하려는 event(일정)|


  * showEvent () : 인자로 들어가는 nativeEvent와 event의 이름에 event가 같이 들어가지만 전자는 클릭이벤트와 관련된 항목이고 후자는 일정을 나타내는 event를 의미한다.
                   일정을 클릭했을때 삭제, 편집이 가능한 dialog를 띄어준다.

    | arg | 설명 |
    |---|:---:|
    |nativeEvent|클릭했을때(click:event) 눌린 직접적인 항목|
    |event|선택한 일정|



### Home.vue

| Props | 설명 |
|---|:---:|
|mode|dark, app : 다크모드, 기본모드|

* Methods

  * upload(): 이미지를 업로드하고, 데이터베이스에 이미지 주소를 저장하는 함수
    | arg | 설명 |
    |---|:---:|
    |url|이미지 로컬 주소|
 

  * pickData(data) : 드래그하고 있는 ‘data’의 위치를 변경한다.
  * delData(data) : 들어온 ‘data’를 데이터베이스에서 삭제한다. 
  
    | arg | 설명 |
    |---|:---:|
    |data|모듈 고유 _id|
    
  * addModule(index) : 선택된 모듈을 데이터베이스와 대쉬보드에 추가한다.

    | arg | 설명 |
    |---|:---:|
    |index|클릭한 모듈의 종류 구분|
    

### Memolist.vue

* Data

    | Props | 설명 |
    |---|:---:|
    |Dashboard|DB에 현재 focus된 Memolist의 id값|

  * text: 'write your memo here!'
   Memolist가 처음 생성되었을때 textarea에 표시될 default 내용
  * items: []

* Methods

여기 뭐지


### Todolist.vue

* Data

    | Props | 설명 |
    |---|:---:|
    |Dashboard|DB에 현재 focus된 Memolist의 id값|
    |mode|dark, app : 다크모드, 기본모드|


  * todos: []
	props로 받은 id에 해당하는 Todolist에 등록된 할일들에대한 정보가 저장되어 있다.
 
* Methods
  * deleteTodo:
  * createTodo:
  * todoClick:


### loadImage.vue
* Data

    | Props | 설명 |
    |---|:---:|
    |item|Dashboard DB에 현재 focus된 Todolist의 id값|


  * insertedImage: null,
  * imageurl: null,
  * inn: true


* Methods
imageClick:








## Contribution
* 추가할 내용있으면 수정바람
* [Contribute Guildline](https://github.com/Customizable-Planner/Customizable-Planner/blob/final/Contribution_Guide.md)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
* MIT
