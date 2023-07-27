# Shimpyo back-end

# 📑 목차

- [프로젝트 소개](#-프로젝트-소개)
- [프로젝트 기간](#-프로젝트-기간)
- [멤버 구성](#-멤버-구성)
- [기술 스택](#-기술-스택)
- [주요 기능 및 상세](#-주요-기능-및-상세)

# 👋 프로젝트 소개

<div align="center">
  <img width="200" alt="image" src="./public/images/logo2.svg">
</div>
<div align="center">
<img width="150" alt="title" src="./public/images/shimpyoTitle.png">
</div>
<br></br>
  
#### 쉼표는 숙소를 직접 등록하거나 예약할 수 있는 통합 숙박예약 서비스입니다.

### [쉼표 바로가기](https://shimpyo.o-r.kr/)

### [쉼표 시연영상](https://www.youtube.com/watch?v=RbrhiM4ybgI)

<br/>

# 📅 프로젝트 기간

> 2023. 06 ~ 2023. 07

# 👪 멤버 구성

| 이름  | 역할  | 기능                              |
|-----|-----|---------------------------------|
| 박현준 | 팀원  | 숙소 목록 조회, 숙소 단건 세부사항 조회, 관심 숙소, 결제 |
| 신성우 | 팀원  | 숙소등록, 수정, 삭제 |
| 정채운 | 팀원  | AWS EC2 서버 구축, 배포 자동화, SSL/TLS 인증서,코드 스플릿팅 ,사용자 인증 및 계정 관리, 예약내역, 내 정보, 관심숙소 페이지 |

# 🔧 기술 스택

- Core:React18, TypeScript, Recoil
- CSS: Styled-Component, MaterialUI
- Code Management:Git, GitHub
- DevOps:AWS EC2, NGINX, GitHub Actions
- Communication: Slack, GoogleDocs 

# 💻 주요 기능 및 상세

## 📌 주요 기능
#### 로그인 - <a href="https://github.com/Project-Shimpyo/front/wiki/Login" >상세보기 - WIKI 이동</a>
- DB값 검증
- ID찾기, PW찾기
- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
#### 회원가입 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Member)" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- ID 중복 체크
#### 계정 페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Member)" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- 회원정보 변경

#### 메인페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EC%98%81%ED%99%94-%EC%98%88%EB%A7%A4)" >상세보기 - WIKI 이동</a>
- 영화 선택(날짜 지정)
- 영화관 선택(대분류/소분류 선택) 및 시간 선택
- 좌석 선택
- 결제 페이지
- 예매 완료
#### 상세 페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%A9%94%EC%9D%B8-Page)" >상세보기 - WIKI 이동</a>
- YouTube API 연동
- 메인 포스터(영화) 이미지 슬라이드(CSS)
#### 숙소 관리 페이지 - <a href="" >상세보기 - WIKI 이동</a> 
- 글 작성, 읽기, 수정, 삭제(CRUD)

#### 숙소 등록 페이지 
- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)

#### 숙소 수정 페이지 
- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)

#### 예약내역 페이지 
- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)

#### 예약상세 페이지 
- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)

#### 관심 숙소 페이지 
- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)
