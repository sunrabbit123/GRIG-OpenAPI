# Github-Rangkin-for-GSM

GSM의 깃헙 랭킹을 구현하는 OpenAPI 서버입니다.

commit 산정 방법은 github api를 이용하여 받아온 것이지만, 다소 오차가 있습니다.  
만약 GSM 학생 계정이 아니라면 등록이 되지 않습니다.

## URL
[등록하러 가기](https://github.com/login/oauth/authorize?client_id=685ffb52e4dd768b3f66&redirect_uri=https://d6ui2fy5uj.execute-api.ap-northeast-2.amazonaws.com/api/auth&scope=user:email)  
해당 서비스 base url : [https://d6ui2fy5uj.execute-api.ap-northeast-2.amazonaws.com/](https://d6ui2fy5uj.execute-api.ap-northeast-2.amazonaws.com/)  
