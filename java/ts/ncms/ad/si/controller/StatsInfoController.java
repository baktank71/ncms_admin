package ts.ncms.ad.si.controller;

import java.util.List;
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

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.om.vo.LoginVO;
import ts.ncms.ad.si.service.StatsInfoService;

/**
 * Description	: 통계정보 Controller
 * System		: cpfms_ha
 * Program ID	: StatsInfoController
 * Creater		: 박소희
 * Create Date	: 2019. 11. 26.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Controller
@RequestMapping("/si/statsInfo")
public class StatsInfoController {
	
	@Autowired
	private StatsInfoService statsInfoService;	


	/**
	 * 통계관리 목록 조회
	 * @param paramsMap
	 * @return result
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping("/listView")
	public ModelAndView siMenuStatList(@RequestParam Map<String,Object> paramsMap,	ModelAndView mav
			, HttpServletRequest httpServletRequest) throws NCmsException {

		List<Map<String, Object>> list = statsInfoService.statsManageList(paramsMap);
		mav.addObject("result", list);
		mav.addObject("params", paramsMap);

		String useType = StringUtils.nullCheck(paramsMap.get("useType"),"HP");
		
		if(useType.equals("AS")) {
			mav.setViewName("HA.si/statsAnalysList");
		}else {
			mav.setViewName("HA.si/statsInfoList");
		}
		
		return mav;
	}	 
	
	/**
	 * 통계관리 상세 조회(api)
	 * @param paramsMap
	 * @return result
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping("/as/analys{type}")
	public ModelAndView siMenuStatList(@PathVariable String type, @RequestParam Map<String,Object> paramsMap,	ModelAndView mav
			, HttpServletRequest httpServletRequest) throws NCmsException {
		
		mav.addObject("params", paramsMap);
		mav.setViewName("HA.si/as/analys"+type);
		
		return mav;
	}	  

	/**
	 * 하자 목록
	 *
	 * @param paramsMap
	 * @return Object
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping(value = "/as/psList")
	@ResponseBody
	public List<Map<String, Object>> psList(@RequestBody Map<String,Object> paramsMap, HttpServletRequest httpServletRequest) throws NCmsException {
		return statsInfoService.psList(paramsMap);
	}	

	/**
	 * 통계관리 ajax 컨트롤러
	 * @param paramsMap
	 * @return
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping("/process/{type}")
	@ResponseBody
	public ModelAndView process(@PathVariable String type, @RequestBody Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws NCmsException {
		
		ModelAndView mav = new ModelAndView("jsonView");
		int ret = 0;
		String resultMsg ="";

		//접속한 사용자 정보
		LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		paramsMap.put("userId", lv.getUserId());
		
		if(type.equals("updateOpenYn")) {
			ret = statsInfoService.updateOpenYn(paramsMap);
		}
		
		if(ret == 1 ) {
			resultMsg = "성공";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}

	/**
	 * 리콜현황 통계 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping("/rcList")
	@SuppressWarnings("unchecked")
	public ModelAndView rcListView(@RequestParam Map<String, Object> paramsMap,
			ModelAndView mav, HttpServletRequest httpServletRequest)
			throws NCmsException {
		
		//게시물 목록 조회
		Map<String,Object> resultMap = statsInfoService.rcList(paramsMap);
		List<Map<String,Object>> rcList = (List<Map<String, Object>>) resultMap.get("rcList");
		
		Map<String,Object> paramsMap2 = (Map<String, Object>) resultMap.get("paramsMap");

		mav.addObject("result", rcList);
		
		mav.addObject("search", paramsMap2);
		
		//리콜대상연도조회
		List<Map<String,Object>> yList = (List<Map<String, Object>>) resultMap.get("yList");		
		mav.addObject("yList", yList);

		mav.setViewName("HA.si/conditionRecallList");
		
		return mav;
	}

	/**
	 * 신고현황 통계 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping("/scList")
	@SuppressWarnings("unchecked")
	public ModelAndView scListView(@RequestParam Map<String, Object> paramsMap,
			ModelAndView mav, HttpServletRequest httpServletRequest)
			throws NCmsException {
		
		//게시물 목록 조회
		Map<String,Object> resultMap = statsInfoService.scList(paramsMap);
		List<Map<String,Object>> rcList = (List<Map<String, Object>>) resultMap.get("rcList");
		
		Map<String,Object> paramsMap2 = (Map<String, Object>) resultMap.get("paramsMap");

		mav.addObject("result", rcList);
		
		mav.addObject("search", paramsMap2);
		
		//신고대상연도조회
		List<Map<String,Object>> yList = (List<Map<String, Object>>) resultMap.get("yList");		
		mav.addObject("yList", yList);

		mav.setViewName("HA.si/conditionSttemntList");
		
		return mav;
	}

	/**
	 * 차트용 통계목록 조회 
	 *
	 * @param  type, paramsMap
	 * @return totCount, list
	 * @throws ts.ncms.ad.
	 */
	@RequestMapping("/chartList")
	@ResponseBody
	public ModelAndView jsonStatsData(@RequestBody Map<String, Object> paramsMap
			, HttpServletRequest request) throws NCmsException {

		ModelAndView mav = new ModelAndView("jsonView");

		Map<String,Object> resultMap = statsInfoService.getChartList(paramsMap);
		mav.addObject("korList", resultMap.get("chartList1")); //국산
		mav.addObject("forList", resultMap.get("chartList2")); //수입
    	 
		return mav;
	}
	
}
