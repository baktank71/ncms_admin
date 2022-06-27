package ts.ncms.ad.om.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

@Controller
@RequestMapping(value = "/om")
public class MainController {

  private static final Logger logger = LoggerFactory.getLogger(MainController.class);


  /**
   * 메인 화면
   *
   * @param String
   * @return
   * @throws NCmsException
   */
  @RequestMapping("/main")
  public ModelAndView login(HttpServletRequest request, ModelAndView mav) throws NCmsException {

    mav.setViewName("HA.om/main");

    return mav;
  }

}
