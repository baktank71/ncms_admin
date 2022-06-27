package ts.ncms.ad.cmmn.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.om.service.LoginService;
import ts.ncms.ad.om.service.impl.LoginServiceImpl;
import ts.ncms.ad.om.vo.LoginVO;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

@Configuration
public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
  
  private static final Logger logger = LoggerFactory.getLogger(LoginSuccessHandler.class);

  @Autowired
  private LoginService loginService;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws IOException, ServletException {
	    System.out.println("====================================================");
	    System.out.println("onAuthenticationSuccess in ");
	    System.out.println("====================================================");
	    
    String errorCode = "";

    //로그인 할 시, 로그인 한 날짜를 알려주는 변수
    String inTime = new java.text.SimpleDateFormat("yyyy년 MM월 dd일 HH:mm:ss").format(new java.util.Date());
    
    //로그인 성공 시 유저 정보
    LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();


    // 로그인은 성공했으나 문제가 있을 시 분류
    //if(lv.getFailCnt() > 4) {
    //  errorCode = "4";
    //}

    
    System.out.println("====================================================");
    System.out.println("onAuthenticationSuccess");
    System.out.println("inTime : " + inTime);

    
    
    // 에러코드에 따른 처리, 코드가 ""이면 로그인 성공
    if(! errorCode.equals("")) {
      //LogoutHandler
      SecurityContextLogoutHandler ctxLogOut = new SecurityContextLogoutHandler();
      ctxLogOut.logout(request, response, auth);
  	
      System.out.println("====================================================");
  	  System.out.println("로그인 오류");
  	
      //redirect
      response.sendRedirect("/om/login?error=" + errorCode);

    } else {
    	
		/*
		 * request.getSession().setAttribute("userNm", lv.getUserNm());
		 * request.getSession().setAttribute("userId", lv.getUserId());
		 * request.getSession().setAttribute("password", lv.getUserPw());
		 * request.getSession().setAttribute("currTime", inTime);
		 */
    	
      request.getSession().setAttribute("mbNm", lv.getMbNm());
      request.getSession().setAttribute("mbId", lv.getMbId());
      request.getSession().setAttribute("password", lv.getMbPw());
      request.getSession().setAttribute("currTime", inTime);
      
      
    try {
    	System.out.println("====================================================");
    	System.out.println("로그인 성공");
    	
    	logger.debug("loginService.updateLoginInfo(lv)");
    	
        loginService.updateLoginInfo(lv);
        
      } catch (NCmsException e) {
//        e.printStackTrace();
      }
    }

    /*int result = 0;

    if(!lv.getDeleteYn().equals("N")) {
      result = 1;
      //resultMsg = "삭제된 아이디입니다.";
    } else if(!lv.getUseYn().equals("Y")) {
      result = 2;
      //resultMsg = "사용하지 않는 아이디입니다.";
    } else if(!lv.getAuthorId().equals("S00")) {
      result = 5;
      //resultMsg = "시스템관리자만 로그인이 가능합니다.";
    } else if(lv.getLockDt() != null) {
      result = 3;
      //resultMsg = "사용이 정지된 아이디입니다.\n관리자에게 문의하세요.";
    } else if(!lv.getAcntStaCd().equals("02")) {
      result = 4;
      //resultMsg = "승인된 아이디가 아닙니다.\n관리자에게 문의하세요.";
    }

    if(result > 0) {
      //LogoutHandler
      SecurityContextLogoutHandler ctxLogOut = new SecurityContextLogoutHandler();
      ctxLogOut.logout(request, response, auth);

      request.setAttribute("error", result);
      RequestDispatcher dispatcher = request.getRequestDispatcher("/om/login");
      dispatcher.forward(request, response);

    } else {
      try {
        // 로그인 성공
        loginService.updateLoginInfo(lv);

        // 로그인 성공 일시 저장
        lv.setLoginKey("AM_LOGIN");
        loginService.insertConnLog(lv);

      } catch (NCmsException e) {
        // e.printStackTrace();
//				Debug.log("LoginSuccessHandler Error");
      }
    }*/

    super.onAuthenticationSuccess(request, response, auth);
  }

}
