[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# :calendar: Customizable Planner

## 우리 플래너 설명

깔쌈한 문장 추천받아요

## :memo: 제공하는 기능

### Dashboard 추가
* 각 Dashboard 별로 객체를 생성 
* 내부에 생성된 모듈의 개수 및 해당 위치 저장  
* 해당 Dashboard 객체를 database에 저장

### Basic 모듈 
* Memolist
* Todolist
* loadImage
* Calendar

### Advanced 모듈
 * Google Calendar와 연동된 Advanced Calendar
 * 본인의 Google 계정에서 사용중인 Google Calendar로 일정을 POST할 수 있음




## :clipboard: Installation
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

## :rocket: API
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
  * setDialogDate({ date }): 현재 클릭한 날짜가 무엇인지를 업데이트 한다.
  
    | arg | 설명 |
    |---|:---:|
    |date|클릭한 부분의 날짜|
  
  * addEvent() : 새로운 event를 firebase에 추가함.
  * editEvent(ev) : event(일정)의 description을 수정한다.

    | arg | 설명 |
    |---|:---:|
    |ev|편집하려는 event(일정)|
    
  * updateEvent(ev): event(일정)의 description을 수정한다.
  
    | arg | 설명 |
    |---|:---:|
    |ev|업데이트 하려는 event(일정)|
    
  * deleteEvent (ev): 특정 일정을 삭제한다.

    | arg | 설명 |
    |---|:---:|
    |ev|삭제하려는 일정|



  * showEvent ({ nativeEvent, event }): 인자로 들어가는 nativeEvent와 event의 이름에 event가 같이 들어가지만 전자는 클릭이벤트와 관련된 항목이고 
   후자는 일정을 나타내는 event를 의미한다. 일정을 클릭했을때 삭제, 편집이 가능한 dialog를 띄어준다.

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
    |id|Dashboard DB에 현재 focus된 Memolist의 id값|

  * text: 'write your memo here!'
   Memolist가 처음 생성되었을때 textarea에 표시될 default 내용
  * items: []

* Methods
	* save: memodb에 input으로 들어온 text내용을 저장
	* memoDelete: memodb안의 해당 텍스트 내용을 삭제함.
	* memoClick: 현재 클릭한 id좌표를 전송
	* Database 형식
	```c
	memodb= {
		id: Home과 연결된 모듈 id 저장(
		text: 현재 메모장의 텍스트 저장(type = String)
		_id: 해당 모듈의 고유 id(type=String, ex: ‘MX90qyZ3’ )
	}
	```



### Todolist.vue

* Data

    | Props | 설명 |
    |---|:---:|
    |Dashboard|DB에 현재 focus된 Memolist의 id값|
    |mode|dark, app : 다크모드, 기본모드|


  * todos: []
	props로 받은 id에 해당하는 Todolist에 등록된 할일들에대한 정보가 저장되어 있다.
 
* Methods
  * deleteTodo: Todolist 안에 있는 등록된 할일 삭제
  * createTodo: Todolist 안에 할일 등록
  * todoClick: 현재 클릭한 id좌표를 전송


### loadImage.vue
* Data

    | Props | 설명 |
    |---|:---:|
    |item|Dashboard DB에 현재 focus된 Todolist의 id값|


  
  * imageurl: default = null ( item에서 받아온 url을 저장하여 템플릿에 전달하기 위한 변수 )
* Methods
  * imageClick: 현재 클릭한 id좌표를 전송

* Methods
imageClick:


### Toggle.vue
* Data

    | Props | 설명 |
    |---|:---:|
    |mode|dark, app : 다크모드, 기본모드|


	* switchMode: true

* Methods
	* messages(): 현재 mode의 상태를 반환


***


## PageInfodb Components ( Module 추가시 활용 할 수 있는 DB)


| Columns | Description                                | type   | Example       | 
|---------|--------------------------------------------|--------|---------------|
| type    | 모듈의 타입을 저장                         | String |  ‘Memolist’   | 
| poseX   | 모듈이 위치한 x좌표를 저장                 | int    | 135, 10, 0 …  |  
| poseY   | 모듈이 위치한 y좌표를 저장                 | int    | 135, 10, 0 …  |  
| dashid  | 현재 모듈이 있는 대쉬보드 아이디 저장      | int    | 1, 2, 3 ...   |  
| url     | 이미지의 로컬 주소를 저장 (only for image) | String | “/desktop/..” |  
| _id     | 해당 모듈의 고유 id (nedb의 특성)          | String | ‘MX90qyZ3’    |

## :minidisc: Database 구조
```c
	pageInfodb = {
		type: 모듈의 타입을 저장(type=String, ex: ‘Memolist’, ‘Todolist’)
		poseX: 모듈이 위치한 x좌표를 저장(type=int, ex: 135, 10, 0 …)
		poseY: 모듈이 위치한 y좌표를 저장(type=int, ex: 135, 10, 0 …)
		dashid: 현재 모듈이 있는 대쉬보드 아이디 저장(type=int, ex: 1, 2, 3…)
		url: 이미지의 로컬 주소를 저장(type=”/../..”)
		_id: 해당 모듈의 고유 id(type=String, ex: ‘MX90qyZ3’ )
	}
```



## :wrench: Contribution
* 추가할 내용있으면 수정바람
* [Contribute Guildline](https://github.com/Customizable-Planner/Customizable-Planner/blob/final/Contribution_Guide.md)


## License
* [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) MIT License
