package ts.ncms.ad.om.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.om.service.LoginService;
import ts.ncms.ad.om.vo.LoginVO;

/**
 * Description	: 홈페이지관리자 로그인 Controller
 * System		: cpfms_ha
 * Program ID	: LoginController
 * Creator		: 정채훈
 * Create Date	: 2019. 07. 01
 * Updater		: 이성훈
 * Update Date	: 2019. 12. 09
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 BY SOULINFOTECH. All Rights Reserved.
 *
 */

@Controller
@RequestMapping(value = "/om")
public class LoginController {

  private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
  
  @Autowired
  private LoginService loginService;

  /**
   * 로그인 화면 보여주기
   *
   * @param String
   * @return
   * @throws NCmsException
   */
  @RequestMapping("/login")
  public ModelAndView login(HttpServletRequest request, ModelAndView mav) throws NCmsException {

    String errorMsg = "";
    
    int error = 0;
    if(request.getParameter("error") != null) {
      error = Integer.parseInt(request.getParameter("error"));
    }

    if(error == 1) {
      errorMsg = "아이디 혹은 비밀번호를 확인해주세요. ";
    } else if(error == 2) {
      errorMsg = "아이디 혹은 비밀번호를 확인해주세요.<br>문제가 계속 되면 관리자에게 문의해주세요.";
    } else if(error == 3) {
      errorMsg = "세션이 만료 되었습니다.<br>다시 로그인 해주세요.";
    } else if(error == 4) {
      errorMsg = "비밀번호를 5회 이상 잘못 입력하셨습니다.<br>관리자에게 문의해주세요.";
    } else if(error == 5) {
    	errorMsg = "사용이 중지된 아이디 입니다. <br> 관리자에게 문의해주세요.";
    } else if(error == 6) {
    	errorMsg = "아직 승인되지 않은 아이디 입니다. <br> 관리자의 승인을 기다려주세요.";
    } else if(error == 7) {
    	errorMsg = "승인이 거절된 아이디 입니다. <br> 관리자에게 문의해주세요.";
    }

    request.setAttribute("error", errorMsg);
    mav.setViewName("login");

    return mav;
  }

  /**
   * 권한 없음 화면
   *
   * @param String
   * @return
   * @throws NCmsException
   */
  @RequestMapping("/denied")
  public ModelAndView denied(HttpServletRequest request, ModelAndView mav) throws NCmsException {

    request.setAttribute("error", "권한이 없습니다.");
    mav.setViewName("login");

    return mav;
  }
  
  /**
   * 개인정보변경 화면
   * 
   * @param String
   * @return
   * @throws NCmsException
   */
  @RequestMapping("/addProfile")	
  public ModelAndView createProfile(LoginVO lv, ModelAndView mav, HttpServletRequest httpServletRequest, Map<String, Object> paramsMap) throws NCmsException {
	 
	  mav.setViewName("om/addProfile");
	  return mav;
  }
  
  
  /**
   * 개인정보변경 화면
   * 
   * @param String
   * @return
   * @throws NCmsException
   */
  @RequestMapping("/editProfile")	
  public ModelAndView changePwdController(LoginVO lv, ModelAndView mav, HttpServletRequest httpServletRequest, Map<String, Object> paramsMap) throws NCmsException {
	 
	  mav.setViewName("HA.om/editProfile");
	  return mav;
  }
  
  /**
   * 사용자 비밀번호 체크 
   * 
   * @param String
   * @return
   * @throws NCmsException
   */
  @RequestMapping(value="/passwordChk.do")
  @ResponseBody
  public int passwordChk(@RequestBody Map<String, Object> paramsMap) throws NCmsException {
	  return loginService.passwordCheck(paramsMap);
  }
  
  
  /**
   * 사용자 등록
   * 
   * @param paramsMap
   * @return
   * @throws NCmsException
	*/
  @RequestMapping("process/addProfile")
  @ResponseBody
  public int addProfile(@RequestBody Map<String, Object> paramsMap, LoginVO lv, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
	  return loginService.updatePassword(paramsMap);
	}  
  
  /**
   * 사용자 비밀번호 변경
   * 
   * @param paramsMap
   * @return
   * @throws NCmsException
	*/
  @RequestMapping("process/update")
  @ResponseBody
  public int updatePassword(@RequestBody Map<String, Object> paramsMap, LoginVO lv, ModelAndView mav, HttpServletRequest httpServletRequest) throws NCmsException {
	  return loginService.updatePassword(paramsMap);
	}
}