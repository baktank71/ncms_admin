package ts.ncms.ad.cr.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.cr.service.CrNttManageService;
import ts.ncms.ad.om.vo.LoginVO;

/**
 * Description	: 홈페이지 관리자 [자동차리콜센터 게시물관리] Controller
 * System		: cpfms_ha
 * Program ID	: CrNttManageController
 * Creater		: 이성훈
 * Create Date	: 2019. 10. 18.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Controller
@RequestMapping("/cr/ntt")
public class CrNttManageController {

	@Autowired
	private CrNttManageService crNttManageService;
	
	/**
	 * 게시물 목록(조회) 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/listView")
	public ModelAndView listView(@RequestParam Map<String,Object> paramsMap,	ModelAndView mav
					, HttpServletRequest httpServletRequest)  throws NCmsException {

		//최초 선택 페이지 : 공지사항0402
		String divisionCode = "0402";
		
		if(StringUtils.isEmpty(paramsMap.get("divisionCode"))) {
			paramsMap.put("divisionCode", divisionCode);
		}else {
			divisionCode = paramsMap.get("divisionCode").toString();
		}
		
		paramsMap.put("recordCount", 10);
		
		Map<String, Object> resultMap = crNttManageService.list(paramsMap);

		if(divisionCode.equals("0507")) {	//리콜시행,무상정보 (0507)
			mav.setViewName("HA.cr/crNttManageListRG");			
		} else if(divisionCode.equals("1001")){	//리콜현황
			String ctype = StringUtils.nullCheck(paramsMap.get("ctype"),"");
			if(ctype.equals("C")) {
				mav.setViewName("HA.cr/crNttManageListRcInfo2"); //건설기계
			}else {
				mav.setViewName("HA.cr/crNttManageListRcInfo"); //자동차
			}
		} else if(divisionCode.equals("8888")){	//무상점검,정비
			mav.setViewName("HA.cr/crNttManageListGrts");
		} else if(divisionCode.equals("8003")){	//신고내역조회
			mav.setViewName("HA.cr/crNttManageListSttemnt");
		} else if(divisionCode.equals("7777")){ //팝업존
			mav.addObject("maxPopCnt", resultMap.get("maxPopCnt"));
			mav.setViewName("HA.cr/crNttManageListPopup");
		} else {
			mav.setViewName("HA.cr/crNttManageListView");
		}
		
		mav.addObject("result", resultMap.get("result"));
		mav.addObject("params", paramsMap);
		mav.addObject("paginationInfo", (PaginationInfo)resultMap.get("paginationInfo"));

		return mav;
	}

	/**
	 * 게시물 상세보기 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/detailView")
	public ModelAndView detailView(@RequestParam Map<String,Object>	paramsMap,	ModelAndView mav
			, HttpServletRequest httpServletRequest)  throws NCmsException {
				
		Map<String, Object> detailMap = new HashMap<String, Object>();
		detailMap = crNttManageService.detail(paramsMap);
		
		mav.addObject("result", detailMap.get("result"));
		mav.addObject("fileList", detailMap.get("fileList"));
		mav.addObject("pre",detailMap.get("pre"));
		mav.addObject("next", detailMap.get("next"));
		mav.addObject("params", paramsMap);

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");
		if(divisionCode.equals("0507")) {	//리콜시행,무상정보
			mav.setViewName("HA.cr/crNttManageDetailRG");			
		} else if(divisionCode.equals("1001")){	//리콜현황
			String ctype = StringUtils.nullCheck(paramsMap.get("ctype"),"");
			if(ctype.equals("C")) {
				mav.setViewName("HA.cr/crNttManageDetailRcInfo2"); //건설기계
			}else {
				mav.setViewName("HA.cr/crNttManageDetailRcInfo"); //자동차
			}
		} else if(divisionCode.equals("8888")){	//무상점검,정비
			mav.setViewName("HA.cr/crNttManageDetailGrts");
		} else if(divisionCode.equals("8003")){	//신고내역조회
			mav.setViewName("HA.cr/crNttManageDetailSttemnt");
			
		} else if(divisionCode.equals("7777")){ //팝업존
			mav.setViewName("HA.cr/crNttManageDetailPopup");			
		}else {
			mav.setViewName("HA.cr/crNttManageDetailView");	
		}

		return mav;
	}
	
	/**
	 * 게시물 등록 화면
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	@RequestMapping("/regist")
	public ModelAndView write(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest httpServletReqest) throws NCmsException {

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");
		
		if(!StringUtils.isEmpty(paramsMap.get("contentsId")) 
				|| !StringUtils.isEmpty(paramsMap.get("bannerId"))){
			Map<String, Object> result = crNttManageService.detail(paramsMap);
			mav.addObject("result", result.get("result"));
			mav.addObject("fileList", result.get("fileList"));
		}

		if(divisionCode.equals("0507")) {	//리콜시행,무상정보
			mav.setViewName("HA.cr/crNttManageRegistRG");	
		} else if(divisionCode.equals("1001")) {	//리콜현황
			mav.setViewName("HA.cr/crNttManageRegistRcInfo");	
		} else if(divisionCode.equals("7777")){ //팝업존
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	        String strToday = sdf.format(new Date());
			mav.addObject("strToday", strToday);
			mav.setViewName("HA.cr/crNttManageRegistPopup");			
		}else {
			mav.setViewName("HA.cr/crNttManageRegist");
		}

		mav.addObject("params", paramsMap);
		return mav;
	}
	
	
	/**
	 * 게시물 수정 등록 삭제에 따른 컨트롤러
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

		LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		String userId = lv.getUserId();
		paramsMap.put("userId", userId);
		
		if(type.equals("update")) {
			ret = crNttManageService.update(paramsMap);
		} else if(type.equals("insert")) {
			Map<String, Object> resultMap = crNttManageService.insert(paramsMap);
			mav.addObject("contentsIdIndex", resultMap.get("contentsIdIndex"));
			ret = (Integer) resultMap.get("ret");
		} else if(type.equals("delete")) {
			ret = crNttManageService.delete(paramsMap);
		} else if(type.equals("updateOpenYn")) {
			ret = crNttManageService.updateOpenYn(paramsMap);
		} else if(type.equals("updateSnsYn")) {
			ret = crNttManageService.updateSnsYn(paramsMap);
		} else if(type.equals("updateMaxPopCount")) {
			ret = crNttManageService.updateMaxPopCount(paramsMap);
		}
		
		if(ret > 0) {
			resultMsg = "성공";
		} else {
			resultMsg = "실패";
		}
		
//		mav.addObject("contentsIdIndex", paramsMap.get("contentsIdIndex"));		//시퀀스 키
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	

	/**
	 * 대표이미지 수정 등록 삭제에 따른 컨트롤러
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
    @RequestMapping(value="/procRep/{type}", method=RequestMethod.POST)
	@ResponseBody
    public ModelAndView uploadRepFile(@PathVariable String type, MultipartHttpServletRequest multi, HttpServletRequest request)
    		throws NCmsException, IllegalStateException, IOException {

		ModelAndView mav = new ModelAndView("jsonView");
		int ret = 0;
		String resultMsg ="";

		if(type.equals("uploadImg")) {
			ret = crNttManageService.uploadRepImg(multi, request);
		}

		if(ret > 0) {
			resultMsg = "성공";
		}else {
			resultMsg = "실패";			
		}

		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	

	/**
	 * 팝업존 이미지 수정 등록 삭제에 따른 컨트롤러
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
    @RequestMapping(value="/procPopzn/{type}", method=RequestMethod.POST)
	@ResponseBody
    public ModelAndView uploadPopznFile(@PathVariable String type, MultipartHttpServletRequest multi, HttpServletRequest request)
    		throws NCmsException, IllegalStateException, IOException {

		ModelAndView mav = new ModelAndView("jsonView");
		int ret = 0;
		String resultMsg ="";

		if(type.equals("uploadImg")) {
			ret = crNttManageService.uploadPopImg(multi, request);
		}

		if(ret > 0) {
			resultMsg = "성공";
		}else {
			resultMsg = "실패";			
		}

		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
    

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
		
    	if(type.equals("targetList")) { // 팝업존 대상 목록 조회
    		//pageIndex, recordCount
    		/*int total = cmmnService.codeTotCount(paramsMap);
    		mav.addObject("total", total);
    		
    		if(total > 0){ 
        		List<Map<String,Object>> list = recallStatService.selectPetitionDivision1List(paramsMap);
        		mav.addObject("list", list); 
    		} else{ 
        		mav.addObject("list", null); 
    		}  */
    		Map<String,Object> resultMap = crNttManageService.selectPopupTargetList(paramsMap);
    		mav.addObject("list", resultMap.get("result"));    	

    	}
    	 
		return mav;
	}
	
    
}