package ts.ncms.ad.cmmn.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.om.service.LoginService;
import ts.ncms.ad.om.vo.LoginVO;

@Configuration
public class LoginFailureHandler implements AuthenticationFailureHandler {

  @Autowired
  private LoginService loginService;
  
  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
	  String errorCode = "";
	  
	  // DB 접속장애 일수도 있음
	  if(exception instanceof InternalAuthenticationServiceException) {
		  errorCode = "2";
		  
	  //비밀번호가 일치하지 않을 시 [비밀번호 5회 이상 잘못 입력하고 제대로 로그인하면 5번이 뜸]
	  } else if(exception instanceof BadCredentialsException) {
		  errorCode = "1";
		  
		  LoginVO loginUser = new LoginVO();
	      loginUser.setMbId(request.getParameter("mbId"));

	  try {
        // 로그인 실패 횟수 증가
        loginService.updateLoginFailrCo(loginUser);

      } catch (NCmsException e) {
        e.printStackTrace();
      }
    }	  
	  
	  System.out.println("=============================================");
	  System.out.println("onAuthenticationFailure");
	  System.out.println("errorCode :  " + errorCode);	  
	  
	  
    //response.sendRedirect("/om/login?error=" + errorCode);
    response.sendRedirect("/om/main");
   
  }

}
