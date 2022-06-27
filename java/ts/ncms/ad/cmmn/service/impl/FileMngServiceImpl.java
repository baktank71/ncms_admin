package ts.ncms.ad.cmmn.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

import ts.ncms.ad.cmmn.dao.FileMngDao;
import ts.ncms.ad.cmmn.service.FileMngService;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.sys.service.CmmnAbstractServiceImpl;
import ts.ncms.ad.common.StringUtils;
import ts.ncms.ad.om.vo.LoginVO;

/** 
 * Description  : 첨부파일 ServiceImpl 
 * System       : cpfms_hp
 * Program ID   : FileMngServiceImpl 
 * Creater      : 박소희
 * Create Date  : 2019. 10. 30. 
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
@Service
public class FileMngServiceImpl extends CmmnAbstractServiceImpl implements FileMngService {

	private static final Logger logger = LoggerFactory.getLogger(FileMngServiceImpl.class);
	
	@Autowired
	private FileMngDao fileMngDao;

	@Value("${file.rootServerPath}")
	private String rootServerPath;


	/**
	 * 파일업로드 ajax
	 *
	 * @param multi
	 * @param request
	 * @return Map<String, Object>
	 * @throws NCmsException, IllegalStateException, IOException
	 */
	@Override
	public Map<String, Object> uploadFile(MultipartHttpServletRequest multi, HttpServletRequest request) throws NCmsException {

		Map<String, Object> returnMap = new HashMap<String, Object>();
		int resultCnt = 0;
		
		String folderid = multi.getParameter("folderid");
		//String attachment = multi.getParameter("attachment");
		String isUpload = multi.getParameter("isUpload");
		String contentsId = multi.getParameter("contentsId");
		String divisionCode = multi.getParameter("divisionCode");

		String replyType = "";
		if(multi.getParameter("replyType") != null && multi.getParameter("replyType") != ""){
			replyType = multi.getParameter("replyType");
		};

    	/*System.out.println("#######파일 업로드 시작....");
		System.out.println("####folderid........"+folderid);
		//System.out.println("####attachment........"+attachment);
		System.out.println("####isUpload........"+isUpload);
    	System.out.println("####contentsId : " + contentsId); 
    	System.out.println("####divisionCode : " + divisionCode);*/ 
    	
		if(isUpload.equals("true")) {
			
			LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			
			//String folderid_ = folderid;// 폴더 id
			String serverPath_ = "userFiles" + File.separator + folderid + File.separator + getDataPath(); // DB에 저장될 서버경로
			//String insertId_ = lv.getUserId();// 입력자
			
			//String filePath = request.getRealPath(rootServerPath + serverPath_);
			String filePath = rootServerPath + serverPath_; //로컬테스트용

        	//System.out.println("###파일서버경로 : " + request.getRealPath(serverPath_));
        	//System.out.println("###파일절대경로 : " + filePath); 
        	
			File dir = new File(filePath);
		
			//보안취약점
			dir.setExecutable(true, true);
			dir.setReadable(true);
			dir.setWritable(true, true);
		
			//폴더생성
			if(!dir.exists()) {
				dir.mkdirs();
			}
			
			//다중(단일) 파일 업로드
			List<MultipartFile> fileList = multi.getFiles("uploadfiles");
			
			for (MultipartFile mf : fileList) {
				String originFileName = mf.getOriginalFilename(); // 원본 파일 명 
				long time = System.currentTimeMillis();
				//String saveFileName = String.format("%d_%s", time, originFileName);
				String saveFileName = String.format("%s_%s_%d", divisionCode, contentsId, time); // 저장 파일 명

				String attachmentOriginal_ = originFileName;// 첨부파일명_원본명
				String fileType_ = attachmentOriginal_.substring(attachmentOriginal_.lastIndexOf(".") + 1); // 파일형식
				String attachment_ = saveFileName + "." + fileType_;// 첨부파일명
				String fileSize_ = String.valueOf(mf.getSize());// 파일크기
			
				try { 
					// 파일생성 
					mf.transferTo(new File(filePath + attachment_)); 

					//저장경로 userFiles/contents/2018/07/ 
					//파일명 0402_1407_1532512413874.pdf
					
	            	/*System.out.println("file length : " + mf.getBytes().length + "/" +fileSize_); 
	            	System.out.println("file name : " + mf.getOriginalFilename()); 
	            	System.out.println("save file name : " + saveFileName); */

	    			// 업로드 파일 DB정보 추가
	    			Map<String, Object> paramMap = new HashMap<String, Object>();
	    			paramMap.put("serverPath", serverPath_); // ex) userFiles/contents/2009/08/
	    			paramMap.put("contentsId", contentsId);
					paramMap.put("attachment", attachment_);
					paramMap.put("attachmentOriginal", attachmentOriginal_);
					//업로드 테이블명, 컬럼명 매칭
					paramMap = bindQuery(paramMap);
					
					//파일 DB 저장					
					if(replyType.equals("1") || replyType.equals("2")){
						paramMap.put("replyType", replyType);
						resultCnt += fileMngDao.uploadQnaFileData(paramMap); //QnA						
					}else{
						resultCnt += fileMngDao.uploadFileData(paramMap);						
					}
	            	
				} catch (IOException e) { 
					//e.printStackTrace(); 
					throw new NCmsException(e);
				} 
			}
		}

		returnMap.put("resultCnt", resultCnt);
		return returnMap;
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
	@Override
	public int deleteFile(Map<String, Object> paramsMap, HttpServletRequest request) throws NCmsException {
		int ret = 0;

		//1. 파일테이블 컬럼정보 매칭
		paramsMap = bindQuery(paramsMap);
		
		//2. 파일id로 파일정보 조회
		Map<String, Object> delFile = fileMngDao.selectFileInfo(paramsMap);
		if(delFile != null) {

			String attachment = delFile.get("attachment").toString();
			//upDir = request.getRealPath(rootServerPath + delFile.get("serverPath").toString());
			String upDir = rootServerPath + delFile.get("serverPath").toString();
			String path = upDir + File.separator + attachment;
			
			//String filename = delFile.get("attachmentOriginal").toString();
			
			File f = new File(path);
			if(f.exists()) {
				// 3. 파일 삭제
				f.delete();
			}
			// 4. DB 정보삭제
			ret = fileMngDao.deleteFile(paramsMap);
		
		}
		return ret;
	}
	
	/**
	 * 파일 다운로드
	 * @param atchFileSn, btype
	 * @param map
	 * @return
	 * @throws IOException 
	 */
	@Override
	public void dnldFile(HttpServletRequest request, HttpServletResponse response, Map<String, Object> paramsMap)
			throws NCmsException, IOException {
		
		String filename = ""; // 파일명 ATTACHMENT_ORIGINAL
		String attachment = ""; // 실제 파일명 ATTACHMENT
		String upDir = "";// 폴더 경로 SERVER_PATH
		String path = ""; // 다운로드 풀 경로

		//테이블명, 컬럼명 매칭
		paramsMap = bindQuery(paramsMap);
		
		//System.out.println("#######파일다운로드================================> "+paramsMap);
		
		if(paramsMap.get("atchFileSn") != null) {
			//int atchFileSn = Integer.valueOf(paramsMap.get("atchFileSn").toString());
			// 파일 정보 조회
			Map<String, Object> fvo = fileMngDao.selectFileInfo(paramsMap);
			
			attachment = fvo.get("attachment").toString();
			//upDir = request.getRealPath(rootServerPath + fvo.get("serverPath").toString());
			upDir = rootServerPath + fvo.get("serverPath").toString();
			filename = fvo.get("attachmentOriginal").toString();

		} else {
			// temp 파일 다운로드
			if(paramsMap.get("filename") != null) {
				filename = (String) paramsMap.get("filename");
			}
			String filepath = request.getSession().getServletContext().getRealPath(File.separator);
			upDir = filepath + paramsMap.get("path");
			attachment = filename;
		}

		path = upDir + File.separator + attachment;
		
	
		//############### 실제서버경로
		/*String[] arr = request.getRealPath("").split("/");
		System.out.println("test1================================> "+request.getRealPath(""));
		Stringroot = "/"+ arr[1] +"/"+ arr[2]+"/";
			String filepathname = mFile.get("SERVER_PATH")+mFile.get("ATTACHMENT");*/
		//###############
	
		//System.out.println("request.getRealPat================================> "+request.getRealPath(""));
		//System.out.println("filepathname================================> "+path);
		//System.out.println("originalFilename================================> "+filename);
		
		// 파일 존재 체크
		File dir = new File(upDir);
		boolean isFileExist = false;
	
		//보안취약점
		dir.setExecutable(true, true);
		dir.setReadable(true);
		dir.setWritable(true, true);
	
		if(dir.exists()) {
		File[] files = dir.listFiles();
	
		int i = 1;
			if(files.length > 0) {
				for(File f : files) {
					if(attachment.equals(f.getName())) {
						isFileExist = true;
					}
					if(files.length == i) {
						dir = null;
						files = null;
					}
					i++;
				}
			}
		}
	
		if(isFileExist) {
			
			String fileType = filename.substring(filename.lastIndexOf(".") + 1);
			String name = filename.substring(0, filename.lastIndexOf("."));
		    
			// 브라우저별 한글파일명 처리
			String userAgent = request.getHeader("User-Agent");
			boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Trident") > -1;
		    if(ie){
		    	System.out.println("IE");
		    	name = URLEncoder.encode(name, "utf-8").replaceAll("\\+", "%20");
		    } else {
		    	System.out.println("NOT IE");
		    	name = new String(name.getBytes("UTF-8"),"ISO-8859-1");
		    }// end if;
		
			// 파일 다운로드
			response.setHeader("Content-Disposition", "attachment; filename=" + name + "." + fileType + ";");
			response.setHeader("Content-Transfer-Encoding", "binary");
		
			try {
			FileInputStream fis = null;
		
				try {
					OutputStream os = response.getOutputStream();
					File file = new File(path);
					fis = new FileInputStream(file);
					FileCopyUtils.copy(fis, os);
					os.flush();
			
					} catch (FileNotFoundException e) {
						throw new NCmsException(e);
				
					} finally {
						if(fis != null) {
							fis.close();
						}
					}
			
				} catch (IOException e) {
					throw new NCmsException(e);
			}
	
		} else {
			// 파일이 없을 때
			response.setContentType("text/html; charset=UTF-8");
			PrintWriter pw = null;
			try {
				pw = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			pw.println("<script language='javascript'>");
			pw.println("alert('파일을 찾을 수 없습니다.');");
		//	pw.println("self.close();");
			pw.println("history.back();");
			pw.println("</script>");
			pw.flush();
		}
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
	@Override
	public void dnldBndeFile(HttpServletRequest request, HttpServletResponse response, Map<String, Object> paramsMap)
			throws NCmsException {
		/*	//LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
	
		// 파라미터 세팅
		String list = paramsMap.get("referdatidList").toString();
		String[] referdatidList = list.split(",");
	
		// 파일 다운로드
		response.setContentType("application/zip; charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment; filename=" + "bundle" + ".zip" + ";");
		response.setHeader("Content-Transfer-Encoding", "binary");
	
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("referdatidList", referdatidList);
		List<Map<String, Object>> fileDataList = fileMngDao.fileList(m);
	
		ZipOutputStream zos = null;
		BufferedInputStream bis = null;
	
		try {
		OutputStream os = response.getOutputStream();
		zos = new ZipOutputStream(os);
		zos.setLevel(8); // 압축 레벨 - 최대 압축률은 9, 디폴트 8
	
		int i = 1;
		for(Map<String, Object> map : fileDataList) {
		String rootPath = request.getRealPath(rootServerPath + map.get("folderid")) + File.separator;
		String name = (String) map.get("attachmentOriginal");
		name = name.substring(0, name.lastIndexOf(".")) + "." + map.get("fileType");
	//	File fi = new File(rootPath + new String(name.getBytes("MS949"), "utf-8"));
		File fi = new File(rootPath + name);
		File f = new File(rootPath + map.get("attachment"));
	
		if(!f.exists()) {
		// 파일이 없을 때
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter pw = null;
		try {
		pw = response.getWriter();
		} catch (IOException e) {
		e.printStackTrace();
		}
		pw.println("<script language='javascript'>");
		pw.println("alert('파일을 찾을 수 없습니다.');");
	//	pw.println("self.close();");
		pw.println("history.back();");
		pw.println("</script>");
		pw.flush();
		return;
		}
	
		FileCopyUtils.copy(f, fi);
	
		bis = new BufferedInputStream(new FileInputStream(fi));
	
		ZipEntry zentry = new ZipEntry(fi.getName());
		zentry.setTime(fi.lastModified());
		zos.putNextEntry(zentry);
	
		byte[] buffer = new byte[1024];
		int cnt = 0;
		while((cnt = bis.read(buffer, 0, 1024)) != -1) {
		zos.write(buffer, 0, cnt);
		}
		zos.closeEntry();
	
		bis.close();
		fi.delete();
	
		if(fileDataList.size() == i) {
		zos.flush();
		zos.close();
		bis.close();
		}
		i++;
		}
	
		} catch (FileNotFoundException e) {
		e.printStackTrace();
	
		} catch (IOException e) {
		e.printStackTrace();
	
		} finally {
		zos = null;
		bis = null;
		}*/
	}

	/**
	 * 첨부파일 테이블 매칭
	 * @param vo
	 * @param map
	 * @return
	 * @throws IOException 
	 */
	private Map<String, Object> bindQuery(Map<String, Object> paramsMap) { 

		String TABLE_NAME = "CONTENTS_INFO_FILE";
		String FILE_ID = "FILE_ID";
		String ATTACHMENT = "ATTACHMENT";
		String ATTACHMENT_ORIGINAL = "ATTACHMENT_ORIGINAL";
		String SERVER_PATH = "SERVER_PATH";
		String WRITE_TIME = "WRITE_TIME";
		String CONTENTS_ID = "CONTENTS_ID";
		String SEQ_INDEX = "SQ_CONTENTSFILEID_INDEX.NEXTVAL";

		Map<String, Object> newParamsMap = paramsMap;
		
		String folderid = StringUtils.nullCheck(paramsMap.get("folderid"), "");
		String btype = StringUtils.nullCheck(paramsMap.get("btype"), folderid).toUpperCase();
		
		if("CONTENTS".equals(btype)) {
			
		}
		else if("QNA".equals(btype)) {
			TABLE_NAME = "CONTENTS_INFO_QNA_FILE";
			SEQ_INDEX = "SQ_QNAFILEID_INDEX.NEXTVAL";
		}
		else if("O".equals(btype)) { // 리콜현황(자동차)
			TABLE_NAME = "RECALL_INFO_FILE";
			CONTENTS_ID = "RECALL_ID";
		}
		else if("CONST_BOARD".equals(btype)) {	// 리콜현황(건설기계)
			TABLE_NAME = "CONST_MACHINE_BOARD_FILE";
			CONTENTS_ID = "BOARD_ID";
		}
		else if("GRTS".equals(btype)) {	// 무상점검정비
			TABLE_NAME = "GRATISCHECK_INFO_FILE";
			CONTENTS_ID = "GRATISCHECK_ID";
		}
		else if("CMR".equals(btype)) { //결함신고(건설기계)
			TABLE_NAME = "CONST_MACHINE_FILE";
			
		}
		else if("EP".equals(btype) || "RDM".equals(btype)) { //결함신고(자동차), 리콜불만신고
			TABLE_NAME = "DEFECT_INFO_FILE";
			
		}

		newParamsMap.put("TABLE_NAME", TABLE_NAME);
		newParamsMap.put("FILE_ID", FILE_ID);
		newParamsMap.put("ATTACHMENT", ATTACHMENT);
		newParamsMap.put("ATTACHMENT_ORIGINAL", ATTACHMENT_ORIGINAL);
		newParamsMap.put("SERVER_PATH", SERVER_PATH);
		newParamsMap.put("WRITE_TIME", WRITE_TIME);
		newParamsMap.put("CONTENTS_ID", CONTENTS_ID);
		newParamsMap.put("SEQ_INDEX", SEQ_INDEX);
		
		return newParamsMap;
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
