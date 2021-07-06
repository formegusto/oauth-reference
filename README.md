# OAuth Reference

# 1. Why OAuth(Open Standard Authentication)?

![Untitled](https://user-images.githubusercontent.com/52296323/124593418-95d41980-de99-11eb-9db1-8010c10307a2.png)

- 몇 년사이 Open API의 생태계는 제공범위, 활용도 등 여러가지 방면에서 많은 발전을 이루면서 성장하는 중이다. 이러한 성장 속 에서 대부분의 웹 서비스에서 필수적으로 사용되고 있는 OAuth의 사용법과 활용법을 정리해놓으려고 한다.
- passport library의 활용법과 백엔드의 인증 처리 방식을 정확하게 익히기 위함이기도 하다.
  - 토이 프로젝트를 기획하던 도중, 백엔드 서버에 인증 구조를 짜는데 조금은 프로처럼 해보고 싶었다. 그러다 보니 이해를 잘 못한 인증 구조에 코드만 멍하게 바라보는 현상이 생겼다.
- 또한 이전 회사에서 구현했었던 기술 중에 가장 신세계를 느꼈던 기술이기도 해서 공부해보고 싶었다.
- OAuth Document는 다음과 같은 흐름으로 작성될 것 이다.
  1. Sign In
  2. Success → DB Select
     1. null → DB Insert → cookie
     2. { ...user } → cookie
- References

  [OAuth 프로토콜의 이해와 활용 1 - 필요성과 역사](https://gdtbgl93.tistory.com/178?category=905944)

# 2. OAuth History

- 2000년대의 소셜 네트워크 서비스의 등장으로부터, 2010년대 스마트폰을 중심으로 한 모바일 플랫폼이 빠르게 확산됐는데, 이렇게 웹을 사용하는 사람들이 급격하게 늘어나면서, 다양한 필요와 욕구가 생겨났고 이에 맞춰 기업들은 서비스를 내놓았다.
- 이 과정에서 한 서비스를 사용하면 내가 사용하는 다른 서비스의 정보에 쉽게 접근하기 바라는 사람들이 많이 늘어났다.
- OAuth의 등장전까지는 다른 서비스에 대해 접근하기 위한 인증 및 인가 표준이 없었기 때문에 사용자들의 계정, 즉 아이디와 비밀번호를 가지고 직접 인증 절차를 통과했다.

  → 굉장히 보안상 위험한 방식이다.

- 때문에 몇몇 서비스 회사들은 각자 인증체계를 구축해서 운용했는데, 이것은 각 서비스가 제공하는 방식의 인증 체계에 모두 대응해야 했기 때문에 개발 및 유지보수가 매우 힘들었다.

  → 또한 이 중 보안 수준이 낮은 인증 체계가 있다면 문제가 생길 여지가 크다.

- 그렇게 시간이 흘러 2006년, 트위터에서 일하던 블레인 쿡(Blaine Cook)은 Open ID를 트위터에 탑재하고 있는 일을 하고 있었고, 소셕 북마크 사이트인 Ma.gnolia에서도 회원이 대시보드에서 OpenID를 통해 서비스에 접근하는 방법을 생각하고 있었다.
- 이러한 고민 중, 지금까지 API 접근을 맡기는 표준적인 방법은 없다는 것을 깨닫게 되었다. 그리고 이 순간이 바로 구글부터 새로 시작하는 스타트업까지 모두 사용하는 OAuth가 탄생하는 순간이다.
- 2007년 OAuth의 초안이 작성되었고, 2008년에는 IETF에서 OAuth를 표준화하자는 비공식 회담이 열렸고, 2010년에는 RFC 5849로 등록된 OAuth 1.0 버전이 나오게된다. 그 해 트위터의 모든 3rd Party 서비스들은 필수적으로 OAuth를 사용하게 된다.
- 2012년에는 OAuth2.0이 등장했고, RFC 6749와 RFC 6750으로 등록되어 있다.
- 현재, API를 제공하는 대다수의 국내외 서비스들은 OAuth를 사용하여 인증 및 권한 부여 체계를 갖추고 있다.

# 3. OAuth Flow

- OAuth Flow의 구조는 Client, Resource Server (사용자의 데이터 관리), Authorization Server(인증 서버) 로 이루어진다.
  1. Authorization grant and client credentials (Client → Auth Srv)
  2. Access token and refresh token (Auth Src → Client)
  3. Access token (Client → Rsc Srv)
  4. Protected resource (Rsc Srv → Client)
  5. Access token (Client → Rsc Srv)
  6. Invalid token Error (Rsc Srv → Client)
  7. Refresh token and client credentials (Client → Auth Srv)
  8. Access token and refresh token (Auth Srv → Client)
- OAuth의 핵심은 인증(Authentication)과 인가(Authorization)에 있다. OAuth에서 Resource Server는 Resource Owner에게 인증을 받음으로써, 해당 Client가 Resource에 접근할 수 있는지 확인을 한다. 그리고 인증된 Client만 자신의 목적에 따라 허용된 정보에만 접근할 수 있다.
  - 이 때, Client는 흔히 아는 Front End System이라고 생각하면 된다. 리소스에 접근하려고 하는 주체를 말한다.
  - Resource Owner는 우리의 서비스를 이용하는 사용자다.
  - 즉, Resource Owner 사용자가 허용한 정보만큼만 Client가 Service Provider(Google, Facebook)에게서 Resource를 이용할 수 있다.

1. Service Provider에 Client 정보 등록
   - 이 때 Service Provider는 client id, secret key를 생성해준다.
   - 이 정보들은 Client를 식별하고 신원을 확인하는데 사용된다.
2. Client의 인증 요청 & 권한 부여 요청
   - Resource Owner가 Client 서비스에서 Service Provider의 정보로 인증을 하면 Client는 Service Provider 측의 Authorizatio Server에 인증 요청을 한다.
   - OAuth 2.0의 특징이 여기서 나온다. "권한 인증을 요청할 때는 처음에 등록한 Client Id와 사용할 리소스의 범위를 나타내는 Scope, 그리고 Resource Owner의 리소스 사용 승인 시, 임시 토큰인 Authorization Code를 전달할 Redirect Url을 함께 파라미터로 넘겨준다"
   - 그러면 Service Provider에서는 Resource Owner가 로그인하여 리소스 사용을 승인할 수 있는 페이지로, 302 응답을 통해 슬쩍 Resource Owner를 이동시킨다. 그러면 해당 Client가 사용할 권한 목록을 명시적으로 Resource Owner에게 보여주며, 동의 시 Client가 해당 데이터에 접근할 권한을 허용한 것을 의미한다.
3. Client의 Authorization Code 획득
   - 이 과정에서 Resource Owner는 Redirect Url 파라미터 주소로 리다이렉트 된다.
4. Access Token 발행 요청

   - Authorization Code, Client Id, Client Secret Key, Redirect URL을 넘겨주어 Access Token 발행 요청,
   - Access Token, Refresh Token 발행
   - 이 때 발급 된 Refresh Token은 후에 Access Token의 유효기간 만료 시, Resource Owner의 허가를 안받고 다시 Access Token을 발급받기 위해 사용된다.

     → 그래서 Refresh Token은 Access Token 보다 유효시간이 훨씬 길다.

     → 또한, Refresh Token은 사용자의 인증을 쉽게 가져올 수 있으므로, 보안에 유의해야하며, DB에 넣어두고 사용한다.

5. 리소스에 접근 요청
   - Access Token을 받으면, Client는 이 토큰을 통해 Resource Server에서 사용자의 정보에 접근한다. 이 Resource Server에 접근하면 바로 정보를 꺼내주는 것이 아니라, Access Token이 저장된 DB에 비교하여 지정된 Scope에 접근하는 게 맞는지 확인 후에 돌려준다.
   - 보통은 헤더에 많이 세팅하며, Authorization: Bearer <ACCESS TOKEN>과 같은 형식으로 지정한다.
   - 여기서 Bearer은 전달자, 운반자라는 뜻이 있다.
6. Access Token 재발급 요청
   - Access Token을 발급받을 때, 보통 expires라는 항목으로 유효시간이 같이 넘어오게 되는데, 이를 통해 유효시간이 지났는지 확인할 수 있고, 지났으면 Refresh Token으로 재발급 받는다.

# 4. Kind Of OAuth Authorization

- RFC 6749에는 크게 4가지 방식이 소개되어 있다.
  1. 권한 코드 승인 (Authorization Code Grant Type)
  2. 암시적 승인 (Implicit Grant)
  3. 리소스 소유자 비밀번호 자격 증명 (Resource Owner Password Credentials Grant)
  4. 클라이언트 자격 증명 (Client Credentials Grant Type)

## 1. 권한 코드 승인 (Authorization Code Grant Type)

- Resource Owner에게 사용 허락을 받았다는 증서인 권한 코드(Authorization Code)를 가지고, Access Token을 요청하는 방식이다.
- 보통 서버 사이드에서 인증을 처리하는 경우 이 방식을 많이 사용하고, Resource Owner에게 사용 허락을 받을 후 증서를 따로 받고, 이 증서와 함께 요청하는 방식이므로, 다른 방식보다 조금 더 복잡하다.
- 대신 다른 방식보다 좀 더 신뢰성이 있는 방식이라 발급되는 액세스 토큰의 유효시간이 좀 더 길고, Refresh Token을 함께 발급해준다.

## 2. 암시적 승인 (Implicit Grant)

- 이 방식은 추가적인 절차 없이 Resource Owner가 인증 및 허가를 하면 바로 Access Token이 발급되는 방식이다. 발급된 Access Token은 바로 Redirect URI의 fragment로 붙어서 전송된다.
- 그래서 보통 클라이언트 사이드에서 인증을 처리할 때 많이 사용된다.
- 별도의 서버 구축 필요 없이 클라이언트 측에서 간편하게 사용할 수 있는 장점이 있다.
- 대신에 클라이언트 쪽에 프래그먼트로 바로 토큰이 노출되기 때문에, 상대적으로 보안에 취약하다.

## 3. 리소스 소유자 비밀번호 자격 증명 (Resource Owner Password Credentials Grant)

- Resource Owner가 Client에 인증하면 Resource Owner의 계정 정보를 가지고, Client가 직접 Access Token을 요청하는 방식인데, 해당 방식은 Client와 Service Provider가 절대적으로 믿을 수 있는 관계일 때, 사용하는 방식이다.

## 4. 클라이언트 자격 증명 (Client Credentials Grant)

- Client와 Resource Owner가 같은 주체일 때, 사용한다. 그래서 인증서버에서는 별도의 권한 허가 확인 없이 바로 Access Token을 발행해준다.
