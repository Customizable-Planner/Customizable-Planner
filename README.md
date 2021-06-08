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

### JustCalendarModule
* Data
```c

name: 

details: 

start:

end:
```
* Methods
 

  * getEvents() : firebase db에 저장되어있는 event를 불러옴.
  * addEvent(): 새로운 event를 firebase에 추가함.

  * editEvent(ev): event(일정)의 description을 수정한다.

    | arg | 설명 |
    |---|:---:|
    |ev|편집하려는 event(일정)|
    
  * updateEvent(ev): 
   | arg | 설명 |
    |---|:---:|
    |ev|업데이트 하려는 event(일정)|


  * showEvent (): 인자로 들어가는 nativeEvent와 event의 이름에 event가 같이 들어가지만 전자는 클릭이벤트와 관련된 항목이고 후자는 일정을 나타내는 event를 의미한다.
일정을 클릭했을때 삭제, 편집이 가능한 dialog를 띄어준다.


arg
설명
nativeEvent
클릭했을때(click:event) 눌린 직접적인 항목
event
선택한 일정




## Contribution
* 추가할 내용있으면 수정바람
* [Contribute Guildline](https://github.com/Customizable-Planner/Customizable-Planner/blob/final/Contribution_Guide.md)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
* MIT
