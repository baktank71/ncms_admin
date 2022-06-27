package ts.ncms.ad.cr.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.sys.service.CmmnAbstractServiceImpl;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.cr.dao.CrNttManageDao;
import ts.ncms.ad.cr.service.CrNttManageService;

@Service
public class CrNttManageServiceImpl extends CmmnAbstractServiceImpl implements CrNttManageService {
	
	@Autowired
	private CrNttManageDao crNttManageDao;

	@Value("${file.rootServerPath}")
	private String rootServerPath;
	
	@Override
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");
		
		if(divisionCode.equals("1001")){	//리콜현황
			String ctype = StringUtils.nullCheck(paramsMap.get("ctype"),"");
			if(ctype.equals("C")) {
				resultMap = crNttManageDao.listRcInfo2(paramsMap); //건설기계
			}else {
				resultMap = crNttManageDao.listRcInfo1(paramsMap); //자동차
			}
		}else if(divisionCode.equals("8888")){	//무상점검,정비
			resultMap = crNttManageDao.listGrts(paramsMap);
		}else if(divisionCode.equals("8003")){	//신고내역조회
			resultMap = crNttManageDao.listSttemnt(paramsMap);
		}else if(divisionCode.equals("7777")){	//팝업존
			resultMap = crNttManageDao.listPopup(paramsMap);
			resultMap.put("maxPopCnt", crNttManageDao.maxPopCount());
		}else {
			resultMap = crNttManageDao.list(paramsMap);			
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		Map<String, Object> detailMap = new HashMap<String, Object>();
		Map<String, Object> result = new HashMap<String, Object>();
		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");

		if(divisionCode.equals("1001")){	//리콜현황

			String ctype = StringUtils.nullCheck(paramsMap.get("ctype"),"");
			if(ctype.equals("C")) {
				result = crNttManageDao.detailRcInfo3(paramsMap);//건설기계

				paramsMap.put("preNext", "pre");
				Map<String, Object> pre = crNttManageDao.preNext2(paramsMap);
				detailMap.put("pre", pre);
				
				paramsMap.put("preNext", "next");
				Map<String, Object> next = crNttManageDao.preNext2(paramsMap);
				detailMap.put("next", next);
				
				String recallId = paramsMap.get("recallId").toString();
				fileList = crNttManageDao.rcInfoFileList3(recallId);
			}else if(ctype.equals("O")){
				result = crNttManageDao.detailRcInfo1(paramsMap);//자동차

				String recallId = paramsMap.get("recallId").toString();
				fileList = crNttManageDao.rcInfoFileList1(recallId);
				
			}else {
				result = crNttManageDao.detailRcInfo2(paramsMap);

				String recallId = paramsMap.get("recallId").toString();
				fileList = crNttManageDao.rcInfoFileList2(recallId);
				
			}
		}else if(divisionCode.equals("8888")){	//무상점검,정비
			result = crNttManageDao.detailGrts(paramsMap);

			String gratischeckId = paramsMap.get("gratischeckId").toString();
			fileList = crNttManageDao.infoGrtsFileList(gratischeckId);
			
		}else if(divisionCode.equals("8003")){	//신고내역조회

			Map<String, Object> detail = new HashMap<String, Object>();
			
			String ctype = StringUtils.nullCheck(paramsMap.get("ctype"),"");
			detailMap.put("petitionType", ctype);

			if(ctype.equals("CMR")) { //건설기계결함신고
				//건설기계결함 const_machine_report
				detail = crNttManageDao.selectReport(paramsMap);
				result.put("detail", detail);
				
				String petitionId = StringUtils.nullCheck(detail.get("petitionId"),"");
				if (!"".equals(petitionId)) {
					//첨부파일 목록
					result.put("fileList", crNttManageDao.selectReportFileList(petitionId));
				}
				
			}else if(ctype.equals("RDM")) { //자동차리콜불만
				//리콜불만 recall_dis_master
				detail = crNttManageDao.selectRecallDis(paramsMap);
				result.put("detail", detail);
				
				String petitionId = StringUtils.nullCheck(detail.get("petitionId"),"");
				if (!"".equals(petitionId)) {
					//첨부파일 목록 
					result.put("fileList", crNttManageDao.selectRecallDisFileList(petitionId));
				}
				
			}else { //자동차결함신고
				detail = crNttManageDao.selectEptnPetition(paramsMap);
				result.put("detail", detail);
				
				String petitionId = StringUtils.nullCheck(detail.get("petitionId"),"");

				if (!"".equals(petitionId)) {
					List<Map<String, Object>> defectInfoList = crNttManageDao.selectDefectInfoList(petitionId);
					List<Map<String, Object>> defectInfoListSet = new ArrayList<Map<String, Object>>();
					for(Map<String, Object> defectInfo : defectInfoList) {
						defectInfo.put("defectInfoDetailList", crNttManageDao.selectDefectInfoDetailList(defectInfo));
						defectInfoListSet.add(defectInfo);	
					}
					result.put("defectInfoList", defectInfoListSet);
					result.put("fileList", crNttManageDao.selectDefectInfoFileList(petitionId));
				}
			}
			
		}else if(divisionCode.equals("7777")){	//팝업존
			result = crNttManageDao.detailPopup(paramsMap);
			
		}else {	// contesnts 테이블 게시물
			result = crNttManageDao.detail(paramsMap);
			
			paramsMap.put("preNext", "pre");
			Map<String, Object> pre = crNttManageDao.preNext(paramsMap);
			detailMap.put("pre", pre);
			
			paramsMap.put("preNext", "next");
			Map<String, Object> next = crNttManageDao.preNext(paramsMap);
			detailMap.put("next", next);

			String contentsId = paramsMap.get("contentsId").toString();
			fileList = crNttManageDao.detailFile(contentsId);
		}

		detailMap.put("result", result);	
		detailMap.put("fileList", fileList);
		
		return detailMap;
	}

	@Override
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");

		if(divisionCode.equals("7777")){	//팝업존
			result = crNttManageDao.updatePopup(paramsMap);
		}else {
			result = crNttManageDao.update(paramsMap);
		}
		
		return result;
	}

	@Override
	public Map<String, Object> insert(Map<String, Object> paramsMap) throws NCmsException {
		int ret = 0;
		Map<String, Object> resultMap = new HashMap<String, Object>();

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");

		if(divisionCode.equals("7777")){	//팝업존
			ret = crNttManageDao.insertPopup(paramsMap);
		}else {
			ret = crNttManageDao.insert(paramsMap);
		}
		
		int contentsIdIndex = Integer.parseInt(paramsMap.get("contentsIdIndex").toString());
		resultMap.put("contentsIdIndex", contentsIdIndex);	
		resultMap.put("ret", ret);		
				
		return resultMap;
	}
	
	@Override
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");

		if(divisionCode.equals("7777")){	//팝업존
			String bannerId = StringUtils.nullCheck(paramsMap.get("bannerId"),"");
    		deletePopImg(bannerId);
    		result = crNttManageDao.deletePopup(paramsMap);
		}else {
			result = crNttManageDao.delete(paramsMap);
		}
		
		
		return result;
	}

	@Override
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");
		
		if(divisionCode.equals("1001")){	//리콜현황
			if(null != paramsMap.get("contentsIdListO") && ((List)paramsMap.get("contentsIdListO")).size() > 0) {
				result = crNttManageDao.updateOpenYnRcInfoO(paramsMap);
				result = crNttManageDao.updateSnsYnRcInfoO(paramsMap); //공개, 비공개시엔 sns도 같이 변경
			}
			if(null != paramsMap.get("contentsIdList") && ((List)paramsMap.get("contentsIdList")).size() > 0) {
				result = crNttManageDao.updateOpenYnRcInfo(paramsMap);
				result = crNttManageDao.updateSnsYnRcInfo(paramsMap);
			}
			if(null != paramsMap.get("contentsIdListC") && ((List)paramsMap.get("contentsIdListC")).size() > 0) {
				result = crNttManageDao.updateOpenYnRcInfoC(paramsMap);
				result = crNttManageDao.updateSnsYnRcInfoC(paramsMap);
			}
			
		}else if(divisionCode.equals("8888")){	//무상점검,정비
			result = crNttManageDao.updateOpenYnGrts(paramsMap);
			result = crNttManageDao.updateSnsYnGrts(paramsMap);
		}else {
			result = crNttManageDao.updateOpenYn(paramsMap);
		}
		
		return result;
	}

	@Override
	public int updateSnsYn(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;

		String divisionCode = StringUtils.nullCheck(paramsMap.get("divisionCode"),"");
		
		if(divisionCode.equals("1001")){	//리콜현황
			if(null != paramsMap.get("contentsIdListO") && ((List)paramsMap.get("contentsIdListO")).size() > 0) {
				result = crNttManageDao.updateSnsYnRcInfoO(paramsMap);
			}
			if(null != paramsMap.get("contentsIdList") && ((List)paramsMap.get("contentsIdList")).size() > 0) {
				result = crNttManageDao.updateSnsYnRcInfo(paramsMap);
			}
			if(null != paramsMap.get("contentsIdListC") && ((List)paramsMap.get("contentsIdListC")).size() > 0) {
				result = crNttManageDao.updateSnsYnRcInfoC(paramsMap);
			}
			
		}else if(divisionCode.equals("8888")){	//무상점검,정비
			result = crNttManageDao.updateSnsYnGrts(paramsMap);
		}else if(divisionCode.equals("8003")){	//신고내역조회
			if(null != paramsMap.get("contentsIdListEP") && ((List)paramsMap.get("contentsIdListEP")).size() > 0) {
				result = crNttManageDao.updateSnsYnSttemntEP(paramsMap);
			}
			if(null != paramsMap.get("contentsIdListCMR") && ((List)paramsMap.get("contentsIdListCMR")).size() > 0) {
				result = crNttManageDao.updateSnsYnSttemntCMR(paramsMap);
			}
			if(null != paramsMap.get("contentsIdListRDM") && ((List)paramsMap.get("contentsIdListRDM")).size() > 0) {
				result = crNttManageDao.updateSnsYnSttemntRDM(paramsMap);
			}
			
		}else if(divisionCode.equals("8003")){	//신고내역조회
			//result = crNttManageDao.updateSnsYnGrts(paramsMap);
		}
		
		return result;
	}
	@Override
	public int updateMaxPopCount(Map<String, Object> paramsMap) throws NCmsException {
		int result = 0;
		
		result = crNttManageDao.updateMaxPopCount(paramsMap);
		
		return result;
	}

	public Map<String, Object> insertPopup(MultipartHttpServletRequest multi, HttpServletRequest request, Map<String, Object> paramsMap) throws NCmsException {
		int ret = 0;
		Map<String, Object> resultMap = new HashMap<String, Object>();

		ret = crNttManageDao.insert(paramsMap);
		
		int contentsIdIndex = Integer.parseInt(paramsMap.get("contentsIdIndex").toString());
		resultMap.put("contentsIdIndex", contentsIdIndex);	
		resultMap.put("ret", ret);		
				
		return resultMap;
	}

	@Override
	public int uploadRepImg(MultipartHttpServletRequest multi, HttpServletRequest request) throws NCmsException {

		int resultCnt = 0;
		String contentsId = multi.getParameter("contentsId");
		String updFlg = multi.getParameter("updFlg");
		
		//파일업로드
        int maxUploadSize = 10 * 1024 * 1024; //10M 용량제한
       
        String filePath = "userFiles" + File.separator + "contents" + File.separator + getDataPath(); // DB에 저장될 서버경로
        String rootPath = rootServerPath;

        /*String rootPath = request.getSession().getServletContext().getRealPath("/../../"); //root
        String filePath = File.separator + "userFiles" + File.separator + "contents" + File.separator + getDataPath(); // DB에 저장될 서버경로
        */
        File path = new File(rootPath + filePath);
        
        if(!path.exists()) {
        	path.mkdirs();
        }

    	System.out.println("####################################"); 
    	System.out.println("file path : " + path ); 
    	
    	if(updFlg.equals("Y")) {
    		//업데이트시엔 이전 파일 삭제 
    		deleteRepImg(contentsId);
    	}
    	
		//다중(단일) 파일 업로드
		List<MultipartFile> fileList = multi.getFiles("uploadfileRep");
		
		for (MultipartFile mf : fileList) {
			String originFileName = mf.getOriginalFilename(); // 원본 파일 명 
			long time = System.currentTimeMillis();
			//String saveFileName = String.format("%d_%s", time, originFileName);
			String saveFileName = String.format("%s_%d", contentsId, time); // 저장 파일 명

			String attachmentOriginal_ = originFileName;// 첨부파일명_원본명
			String fileType_ = attachmentOriginal_.substring(attachmentOriginal_.lastIndexOf(".") + 1); // 파일형식
			String attachment_ = saveFileName + "." + fileType_;// 첨부파일명
			String fileSize_ = String.valueOf(mf.getSize());// 파일크기
		
			try { 
				// 파일생성 
				mf.transferTo(new File(rootPath + filePath + attachment_)); 
				
            	System.out.println("file length : " + mf.getBytes().length + "/" +fileSize_); 
            	System.out.println("file name : " + mf.getOriginalFilename()); 
            	System.out.println("save file name : " + saveFileName); 
            	System.out.println("bannerImage : " + rootPath + filePath + attachment_);
            	System.out.println("####################################");  

				//저장경로 파일명 \\userFiles\contents\2019\12\463_1576065817806.jpg

    			// 업로드 파일 DB정보 추가
    			Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("contentsId", contentsId);
				paramMap.put("repImage", filePath + attachment_);
				
				//파일 DB 저장
				resultCnt += crNttManageDao.uploadRepImg(paramMap);
            	
			} catch (IOException e) { 
				//e.printStackTrace(); 
				throw new NCmsException(e);
			} 
		}
		return resultCnt;
	}

	/**
	 * 팝업존 배너 파일 삭제
	 * @value String bannerId
	 * @throws NCmsException 
	 */
	private void deleteRepImg(String contentsId) throws NCmsException {

		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
        //HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        //String rootPath = request.getSession().getServletContext().getRealPath("/../../"); //root
        String rootPath = rootServerPath;
        
		//업로드된 파일삭제 
        paramsMap.put("contentsId", contentsId);
		resultMap = crNttManageDao.detail(paramsMap);
		Object banner_image = resultMap.get("titleDc");

    	System.out.println("####################################");  
		System.out.println("파일삭제중.... ");
		System.out.println("delFile : "+rootPath + banner_image);
		
        File delFile = null;
        delFile = new File(rootPath + banner_image);
		if(delFile.exists()) {
        	delFile.delete();
    		System.out.println("###대표이미지 파일 삭제완료!! ");
        }

    	System.out.println("####################################");  
	}

	@Override
	public int uploadPopImg(MultipartHttpServletRequest multi, HttpServletRequest request) throws NCmsException {

		int resultCnt = 0;
		String bannerId = multi.getParameter("bannerId");
		String updFlg = multi.getParameter("updFlg");
		
		//파일업로드
        int maxUploadSize = 10 * 1024 * 1024; //10M 용량제한
       
        String filePath = "userFiles" + File.separator + "contents" + File.separator + getDataPath(); // DB에 저장될 서버경로
        String rootPath = rootServerPath;

        /*String rootPath = request.getSession().getServletContext().getRealPath("/../../"); //root
        String filePath = File.separator + "userFiles" + File.separator + "contents" + File.separator + getDataPath(); // DB에 저장될 서버경로
        */
        File path = new File(rootPath + filePath);
        
        if(!path.exists()) {
        	path.mkdirs();
        }

    	System.out.println("####################################"); 
    	System.out.println("file path : " + path ); 
    	
    	if(updFlg.equals("Y")) {
    		//업데이트시엔 이전 파일 삭제 
    		deletePopImg(bannerId);
    	}
    	
		//다중(단일) 파일 업로드
		List<MultipartFile> fileList = multi.getFiles("uploadfiles");
		
		for (MultipartFile mf : fileList) {
			String originFileName = mf.getOriginalFilename(); // 원본 파일 명 
			long time = System.currentTimeMillis();
			//String saveFileName = String.format("%d_%s", time, originFileName);
			String saveFileName = String.format("%s_%d", bannerId, time); // 저장 파일 명

			String attachmentOriginal_ = originFileName;// 첨부파일명_원본명
			String fileType_ = attachmentOriginal_.substring(attachmentOriginal_.lastIndexOf(".") + 1); // 파일형식
			String attachment_ = saveFileName + "." + fileType_;// 첨부파일명
			String fileSize_ = String.valueOf(mf.getSize());// 파일크기
		
			try { 
				// 파일생성 
				mf.transferTo(new File(rootPath + filePath + attachment_)); 
				
            	System.out.println("file length : " + mf.getBytes().length + "/" +fileSize_); 
            	System.out.println("file name : " + mf.getOriginalFilename()); 
            	System.out.println("save file name : " + saveFileName); 
            	System.out.println("bannerImage : " + rootPath + filePath + attachment_);
            	System.out.println("####################################");  

				//저장경로 파일명 \\userFiles\contents\2019\12\463_1576065817806.jpg

    			// 업로드 파일 DB정보 추가
    			Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("bannerId", bannerId);
				paramMap.put("bannerImage", filePath + attachment_);
				
				//파일 DB 저장
				resultCnt += crNttManageDao.uploadPopImg(paramMap);
            	
			} catch (IOException e) { 
				//e.printStackTrace(); 
				throw new NCmsException(e);
			} 
		}
		return resultCnt;
	}

	/**
	 * 팝업존 배너 파일 삭제
	 * @value String bannerId
	 * @throws NCmsException 
	 */
	private void deletePopImg(String bannerId) throws NCmsException {

		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
        //HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        //String rootPath = request.getSession().getServletContext().getRealPath("/../../"); //root
        String rootPath = rootServerPath;
        
		//업로드된 파일삭제 
        paramsMap.put("bannerId", bannerId);
		resultMap = crNttManageDao.detailPopup(paramsMap);
		Object banner_image = resultMap.get("bannerImage");

    	System.out.println("####################################");  
		System.out.println("파일삭제중.... ");
		System.out.println("delFile : "+rootPath + banner_image);
		
        File delFile = null;
        delFile = new File(rootPath + banner_image);
		if(delFile.exists()) {
        	delFile.delete();
    		System.out.println("###배너존 파일 삭제완료!! ");
        }

    	System.out.println("####################################");  
	}

	@Override
	public Map<String, Object> selectPopupTargetList(Map<String, Object> paramsMap) throws NCmsException {
		return crNttManageDao.selectPopupTargetList(paramsMap);
	}
	
	/**
	 * 현재년월로 폴더명 객체 구하기
	 * @return String YYYY/MM/
	 * @throws IOException 
	 */
	private String getDataPath() {
        Calendar cal = Calendar.getInstance();  // 오늘 날짜시간에 대한 객체 얻기
        String yStr = ""+cal.get(Calendar.YEAR);  		// 올해년도 얻기
        String mStr = ""+(cal.get(Calendar.MONTH) + 1);  // 현재 월 얻기 (월은 + 1 해줘야함)

        if((cal.get(Calendar.MONTH)+1) < 10 ) {
           mStr = "0"+mStr;  // 현재월이 1자리 숫자인경우 앞에 0을붙여준다.
        }
        String dataPath = yStr + File.separator + mStr + File.separator;
        
        return dataPath;
	}
	
}