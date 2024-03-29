![header](https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=300&section=header&text=blograss&fontColor=auto&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Easy%20to%20show%20your%20passion%20of%20blogging&descAlignY=57&descAlign=50)

----

<p align='center'>많은 개발자들은, 자신의 github 잔디를 채웁니다</p>
<p align='center'>이 잔디는 개발에 대한 열정과 꾸준함을 한눈에 보여주죠</p>
<p align='center'>그런데 어떤 개발자들은, 자신이 배운것을 블로그에 포스팅 합니다</p>
<p align='center'>그리고 다른 개발자들은 이 포스트들을 보고 새로운 정보를 알아가고있죠</p>
<p align='center'>우리는 이렇게 얻은 정보들로 하나의 commit, 한칸의 잔디를 채워나갑니다</p>
<p align='center'>이러한 선순환에 기여하는 블로거들이 자신의 열정을 보여줄 수 있도록</p>
<p align='center'>또 하나의 방법을 제공하고자, blograss를 개발하게 되었습니다</p>
<p align='center'>blograss를 사용하여 당신의 블로깅 열정을 보여주세요!</p>
<br>
<p align='center'><b>Easy to show your passion of blogging 👨‍💻</b></p>
<br>
<p align='center'>읽어주셔서 감사합니다</p>

----

ℹ️  **Blograss 생성기 추가**
<br>아래 링크를 통해서 나만의 Blograss를 쉽게 생성하세요!
<br>https://blograss.vercel.app

----

# 목차
1. <a href="#사용법">사용법</a>
2. <a href="#옵션">옵션</a>
    <br>2-1. <a href="#blog_typerequired">blog_type(required)</a>
    <br>2-2. <a href="#blog_namerequired">blog_name(required)</a>
    <br>2-3. <a href="#year">year</a>
    <!-- <br>2-4. <a href="#size">size</a> -->
    <br>2-4. <a href="#dark_mode">dark_mode</a>
    <br>2-5. <a href="#text_color">text_color</a>
    <br>2-6. <a href="#grass_color">grass_color</a>
3. <a href="#샘플">샘플</a>

# 사용법     

- Markdown
```
![blograss](https://blograss.vercel.app/api?{옵션})
```

- HTML
```
<img src="https://blograss.vercel.app/api?{옵션}" />
```

# 옵션
query string 입니다.

### **blog_type(required)**
`tistory`

:information_source: 현재는 `tistory` 타입만 제공됩니다.

<br>

### **blog_name(required)**
tistory 블로그 도메인 앞의 블로그 이름을 입력하시면 됩니다.
> ex) https://`blog_name`.tistory.com

<br>

### **year**
최대 2년 전까지만 제공됩니다.
(default) this year

사용법 1) 년도 4자리 입력
> ex) `2021`

사용법 2) -1, -2 입력
> ex) Today : 2021-09-29
>     year=-1 => 2020
>     year=-2 => 2019

<br>

<!-- ### **size**
`large` : 750px, 180px (default)<br>
`middle` : 412px, 180px<br>
`small` : 242px, 180px<br>
<br> -->

### **dark_mode**

- `true` (default)
    background color : <img src="./svg/darkMode_true.svg" alt="dark_mode true" >
- `false`
    background color : <img src="./svg/darkMode_false.svg" alt="dark_mode false" >
    <br>

### **text_color**
`green`(default), `orange`, `brown`, `black`, `white`

### **grass_color**
`more` ~ `less`
- **green** (default)
    <img src="./svg/grass_color_green.svg" alt="grass_color green" >
- **orange**
    <img src="./svg/grass_color_orange.svg" alt="grass_color orange" >
- **brown**
    <img src="./svg/grass_color_brown.svg" alt="grass_color brown" >
- **black** 
    <img src="./svg/grass_color_black.svg" alt="grass_color black" >
- **white**
    <img src="./svg/grass_color_white.svg" alt="grass_color white" >

# 샘플
- **green grass theme**
    ```http
    https://blograss.vercel.app/api?blog_type=tistory&blog_name=blograss&grass_color=green&text_color=green&dark_mode=true
    ```
    <img src="./svg/examples/example_green_dark.svg" alt="example" >
    
    - optinos `grass_color=green`, `text_color=green`, `dark_mode=true`
    <br>
    
    ```http
    https://blograss.vercel.app/api?blog_type=tistory&blog_name=blograss&grass_color=green&text_color=black&dark_mode=false
    ```
    <img src="./svg/examples/example_green_light.svg" alt="example" >
    
    - optinos `grass_color=green`, `text_color=black`, `dark_mode=false`
    <br>

- **orange grass theme**
    ```http
    https://blograss.vercel.app/api?blog_type=tistory&blog_name=blograss&grass_color=orange&text_color=orange&dark_mode=true
    ```
    <img src="./svg/examples/example_orange.svg" alt="example" >
    
    - optinos `grass_color=orange`, `text_color=orange`, `dark_mode=true`
    <br>

- **brown grass theme**
    ```http
    https://blograss.vercel.app/api?blog_type=tistory&blog_name=blograss&grass_color=brown&text_color=brown&dark_mode=true
    ```
    <img src="./svg/examples/example_brown.svg" alt="example" >
    
    - optinos `grass_color=brown`, `text_color=brown`, `dark_mode=true`
    <br>
- **black grass theme**
    ```http
    https://blograss.vercel.app/api?blog_type=tistory&blog_name=blograss&grass_color=black&text_color=black&dark_mode=false
    ```
    <img src="./svg/examples/example_black.svg" alt="example" >

    - optinos `grass_color=black`, `text_color=black`, `dark_mode=false`
    <br>

- **white grass theme**
    ```http
    https://blograss.vercel.app/api?blog_type=tistory&blog_name=blograss&grass_color=white&text_color=white&dark_mode=true
    ```
    <img src="./svg/examples/example_white.svg" alt="example" >
    
    - optinos `grass_color=white`, `text_color=white`, `dark_mode=true`
    <br>

![footer](https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=200&section=footer&text=Easy%20to%20show%20your%20passion%20of%20blogging&fontSize=30&fontColor=000000&animation=fadeIn&fontAlignY=65)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjinan159%2Fblograss&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
