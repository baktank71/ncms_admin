package ts.ncms.ad.common;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonInterceptor extends HandlerInterceptorAdapter {

  protected final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    //logger.debug("preHandle==>") ;
    System.out.println("=======================================================");
    System.out.println("interceptor~!!");
    System.out.println(request.getRequestURL());
    System.out.println(" ");

    String reqUri = request.getRequestURI();
    logger.debug("Request URI \t:  " + reqUri);

    // 헤더 전체정보 보기
    Enumeration<String> em = request.getHeaderNames();

    while(em.hasMoreElements()) {
      String name = em.nextElement();
      String val = request.getHeader(name);
      logger.debug(name + " : " + val);
    }

    // 이전 접속 페이지 가져오기
    String h_referer = request.getHeader("referer");
    logger.debug("referer : " + h_referer);

    // 사용자의 브라우저 확인
    String h_agent = request.getHeader("User-Agent");
    logger.debug("User-Agent : " + h_agent);

    String clientip = request.getHeader("X-FORWARDED-FOR");
    if(clientip == null)
      clientip = request.getRemoteAddr();
    logger.debug("User-Ip : " + clientip);

   
    
    
    //String mbNm = request.getSession().getAttribute("mbNm").toString();
    System.out.println("==============================================" );
    System.out.println("request.getSession().getAttribute(mbNm)" );
    System.out.println(request.getSession().getAttribute("mbNm"));
    
    // 로그인 세션 유저 정보 없으면 로그인 페이지로 이동 (로그인, 권한없음, 회원가입 페이지 제외)

    if(request.getSession().getAttribute("mbNm") == null) {
      if(reqUri.equals("/om/login") ||
        reqUri.equals("/om/login.do") ||
        reqUri.equals("/view/fileUpload.do") ||
        reqUri.equals("/om/denied") ||
        reqUri.equals("/om/denied.do") || 
        reqUri.equals("/om/addProfile") ||
        reqUri.equals("/om/addProfile.do") || 
        reqUri.equals("/om/main") ||
        reqUri.equals("/om/main.do") || 
        
        reqUri.indexOf("/cmmn/") > -1 ||
        reqUri.indexOf("/css/") > -1 ||
        reqUri.indexOf("/ext/") > -1 ||
        reqUri.indexOf("/fonts/") > -1 ||
        reqUri.indexOf("/images/") > -1 ||
        reqUri.indexOf("/js/") > -1 ||
        reqUri.indexOf("/vendor/") > -1 ||
        reqUri.indexOf("/favicon.ico/") > -1
        ) {
    	  
      } else {
        response.sendRedirect("/om/login?error=3");
      }
    }

    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    //logger.debug("postHandle==>") ;
    super.postHandle(request, response, handler, modelAndView);
  }
	
	/*@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		//logger.debug("afterCompletion==>") ;
		super.afterCompletion(request, response, handler, ex);
	}
	
	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//logger.debug("afterConcurrentHandlingStarted==>") ;
		super.afterConcurrentHandlingStarted(request, response, handler);
	}*/

}

