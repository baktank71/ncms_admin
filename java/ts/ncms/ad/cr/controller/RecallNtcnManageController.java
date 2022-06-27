package ts.ncms.ad.cr.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cr.service.RecallNtcnManageService;

/**
 * Description	: 리콜알리미 Controller
 * System		: cpfms_ha
 * Program ID	: RecallNtcnManageController
 * Creater		: 박소희
 * Create Date	: 2019. 11. 24.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Controller
@RequestMapping("/cr/recallNtcn")
public class RecallNtcnManageController {

	@Autowired
	private RecallNtcnManageService recallNtcnManageService;
	
	/**
	 * 리콜알리미 목록 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/listView")
	public ModelAndView listView(@RequestParam Map<String,Object> paramsMap,	ModelAndView mav
					, HttpServletRequest httpServletRequest)  throws NCmsException {

		paramsMap.put("recordCount", 10);

		Map<String, Object> resultMap = recallNtcnManageService.list(paramsMap);

		mav.addObject("result", resultMap.get("result"));
		mav.addObject("params", paramsMap);
		mav.addObject("paginationInfo", (PaginationInfo)resultMap.get("paginationInfo"));

		mav.setViewName("HA.cr/recallNtcnManageListView");
		return mav;
	}

	/**
	 * 리콜알리미 상세 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/detailView")
	public ModelAndView detailView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav
					, HttpServletRequest httpServletRequest) throws NCmsException {

		Map<String, Object> detailMap = new HashMap<String, Object>();
		detailMap = recallNtcnManageService.detail(paramsMap);
		
		mav.addObject("result", detailMap.get("result"));
		mav.addObject("params", paramsMap);		
		
		mav.setViewName("HA.cr/recallNtcnManageDetailView");
		
		return mav;
	}

	/**
	 * Ajax 컨트롤러
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/process/{type}")
	@ResponseBody
	public ModelAndView process(@PathVariable String type, @RequestBody Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws NCmsException {
		
		ModelAndView mav = new ModelAndView("jsonView");
		int ret = 0;
		String resultMsg ="";

		if(type.equals("deleteUser")) {			//해지신청
			ret = recallNtcnManageService.deleteUser(paramsMap);
		} else if(type.equals("resetPassword")) {	//패스워드 초기화
			ret = recallNtcnManageService.resetPassword(paramsMap);
		}

		if(ret == 1 ) {
			resultMsg = "성공";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
}
