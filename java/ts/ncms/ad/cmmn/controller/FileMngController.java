package ts.ncms.ad.cmmn.controller;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.service.FileMngService;

/** 
 * Description  : 첨부파일 Controller
 * System       : cpfms_ha
 * Program ID   : FileMngController 
 * Creater      : 박소희
 * Create Date  : 2019. 10. 30. 
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
@Controller
@RequestMapping("/file")
public class FileMngController {

	@Autowired
	private FileMngService fileMngService;

	/**
	 * 파일 다운로드
	 * @param vo
	 * @param map
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value="/dnldFile" , method = { RequestMethod.POST})
	public void dnldFile(@RequestParam Map<String, Object> paramsMap, HttpServletRequest request, HttpServletResponse response) throws NCmsException, IOException {
		fileMngService.dnldFile(request, response, paramsMap);
	}

	/**
	 * 파일 일괄다운로드 (파일id 목록으로 압축 다운)
	 *
	 * @param request
	 * @param response
	 * @param paramsMap
	 * @return void
	 * @throws NCmsException
	 */
	/*@RequestMapping(value = "/dnldBndeFile", method = RequestMethod.POST)
	public void dnldBndeFile(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> paramsMap) throws NCmsException {
		fileMngService.dnldBndeFile(request, response, paramsMap);
	}*/
	
	/**
	 * 파일 업로드 ajax
	 *
	 * @param multi
	 * @param request
	 * @return
	 * @throws NCmsException
	 * @throws IOException
	 * @throws IllegalStateException
	 */
    @RequestMapping(value="/uploadFile", method=RequestMethod.POST)
	@ResponseBody
    public ModelAndView uploadFile(MultipartHttpServletRequest multi, HttpServletRequest request)
    		throws NCmsException, IllegalStateException, IOException {

		ModelAndView mav = new ModelAndView("jsonView");
    	
    	Map<String, Object> resultMap = fileMngService.uploadFile(multi, request);
        
		mav.addObject("resultCnt", resultMap.get("resultCnt"));
		return mav;
	}

	/**
	 * 파일 삭제 ajax
	 * @param request
	 * @param response
	 * @param fileVo
	 * @param mv
	 * @return
	 * @throws TmsdgException
	 */
	@RequestMapping(value="/deleteFile", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView deleteFile(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request) throws NCmsException {

		ModelAndView mav = new ModelAndView("jsonView");
		String resultMsg = "";

		int result = fileMngService.deleteFile(paramsMap, request);

		if(result > 0) {
			resultMsg = "성공";
		}else {
			resultMsg = "실패";			
		}
		mav.addObject("resultCnt", result);
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}

}
