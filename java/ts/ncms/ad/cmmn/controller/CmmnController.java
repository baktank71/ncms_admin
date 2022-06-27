package ts.ncms.ad.cmmn.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ts.ncms.ad.cmmn.service.CmmnService;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;


@Controller
@RequestMapping(value = "/cmmn")
public class CmmnController {

	private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);

	@Autowired
	private CmmnService cmmnService;
	
	/**
	 * 코드목록 조회 
	 *
	 * @param  type, paramsMap
	 * @return totCount, list
	 * @throws NCmsException
	 */
	@RequestMapping("/json/{type}")
	@ResponseBody
	public ModelAndView jsonData(@PathVariable String type, @RequestBody Map<String, Object> paramsMap
			, HttpServletRequest request) throws NCmsException {

		ModelAndView mav = new ModelAndView("jsonView");
		
    	if(type.equals("prdctList")) { // 제작사 목록 조회
    		Map<String,Object> resultMap = cmmnService.selectPrdctList(paramsMap);
    		mav.addObject("list", resultMap.get("result"));    	

    	}
    	 
		return mav;
	}
	
	
}
