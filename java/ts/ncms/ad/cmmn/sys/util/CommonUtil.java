package ts.ncms.ad.cmmn.sys.util;


//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Properties;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

public class CommonUtil {

  private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);
  public static final String RELATIVE_PATH_PREFIX = CommonUtil.class.getResource("").getPath();
  public static final String GLOBALS_PROPERTIES_FILE =
    RELATIVE_PATH_PREFIX.substring(0, RELATIVE_PATH_PREFIX.lastIndexOf("kr")) + "egovframework" + File.separator + "egovProps" + File.separator + "app.properties";

  private CommonUtil() {
	  System.out.println("##########" + GLOBALS_PROPERTIES_FILE);
    try {
      throw new IllegalStateException("Utility class");
    } catch (IllegalStateException e) {
      logger.error("CommonUtil() 에러 발생");
    }
  }

  /**
   * 아이피 가져오기
   *
   * @throws UnknownHostException
   */
  public static String getIpAddr() throws UnknownHostException {
    InetAddress addr = InetAddress.getLocalHost();
    return addr.getHostAddress();
  }

  /**
   * 세션의 사용자 환경정보 반환
   */
  /*public static SessionModel getEnv(HttpSession session) {
    return (SessionModel) session.getAttribute("env");
  }*/

  /**
   * 세션에 사용자 환경정보 저장.
   */
  /*public static void setEnv(HttpSession session, SessionModel env) {
    setSessionAttribute(session, "env", env);
  }*/

  public static HttpSession setSessionAttribute(final HttpSession session, final String attributeName, final Serializable attributeValue) {
    session.setAttribute(attributeName, attributeValue);
    return session;
  }

  public static String getXSS(String variable) {
    if(variable != null) {
      variable = variable.replaceAll("<", "&lt;");
      variable = variable.replaceAll(">", "&gt;");

      return variable;
    } else {
      return "";
    }
  }

  public static String getFileXSS(String variable) {

    if(variable != null) {
      variable = variable.replace("&", "");
      //variable = variable.replace("/", "");
      //variable = variable.replace("\\", "");

      return variable;
    } else {
      return "";
    }
  }

  public static String getHashFile(String targetFile, String algorithm) throws NCmsException, IOException {
    FileInputStream inputStream = null;
    try {
      inputStream = new FileInputStream(targetFile);
      MessageDigest digest = MessageDigest.getInstance(algorithm);
      byte[] bytesBuffer = new byte[1024];
      int bytesRead = -1;

      while((bytesRead = inputStream.read(bytesBuffer)) != -1) {
        digest.update(bytesBuffer, 0, bytesRead);
      }

      byte[] hashedBytes = digest.digest();
      StringBuilder sb = new StringBuilder("");

      for(int i = 0; i < hashedBytes.length; i++) {
        sb.append(Integer.toString((hashedBytes[i] & 0xff) + 0x100, 16).substring(1));
      }
      return sb.toString();
    } catch (FileNotFoundException ex) {
      logger.debug("getHashFile Exception ");
      throw new NCmsException(ex);
    } catch (IOException ex) {
      logger.debug("getHashFile Exception ");
      throw new NCmsException(ex);
    } catch (NoSuchAlgorithmException ex) {
      logger.debug("getHashFile Exception ");
      throw new NCmsException(ex);
    } finally {
      if(inputStream != null) {
        inputStream.close();
      }
    }
  }

  /**
   * 엑셀 Column 자동 크기 수정
   *
   * @param workbook
   */
  /*final static public void setColumnAutoWidth(Workbook workbook) {
    Sheet sheet = workbook.getSheetAt(0);

    Row row = sheet.getRow(0);
    for(int column = 0; column < row.getPhysicalNumberOfCells(); column++) {
      sheet.autoSizeColumn(column);
    }
  }*/

  /**
   * 천단위 콤마 추가
   *
   * @param data
   * @return
   */
  public static String commaAdd(Object data) {
    int result = 0;

    if(data.toString().indexOf('.') >= 0) {
      String tempResult = data.toString().substring(0, data.toString().indexOf('.'));
      result = Integer.parseInt(tempResult);
    } else {
      result = Integer.parseInt(data.toString());
    }

    return new java.text.DecimalFormat("#,###").format(result);

  }

  /**
   * 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 값을 반환한다(Globals.java 전용)
   *
   * @param keyName String
   * @return String
   * @throws IOException
   */
  public static String getProperty(String keyName) throws IOException {
    String value = "";
    FileInputStream fis = null;
    try {
      Properties props = new Properties();
      String getHash = getHashFile(GLOBALS_PROPERTIES_FILE, "MD5");

      if(true/*"f02fb01f0f986294038a271ad42b90fe".equals(getHash)*/) {
        fis = new FileInputStream(GLOBALS_PROPERTIES_FILE);
        props.load(new BufferedInputStream(fis));
        value = props.getProperty(keyName).trim();
        // 수정 : 외부 입력값 필터링
        value = getXSS(getFileXSS(value));
      }
    } catch (FileNotFoundException fne) {
      logger.error("파일 없음 에러 발생");
    } catch (IOException ioe) {
      logger.error("IO 에러 발생");
    } catch (NCmsException e) {
      logger.error("getHashFile() 에러 발생");
    } finally {
      if(fis != null) {
        fis.close();
      }
    }

    return value;
  }

  /**
   * 파일의 확장자를 체크하여 필터링된 확장자를 포함한 파일인 경우에 true를 리턴한다.
   *
   * @param file
   */
  public static boolean badFileExtIsReturnBoolean(MultipartFile file) {
    String fileName = file.getName();
    String ext = fileName.substring(fileName.lastIndexOf(".") + 1,
      fileName.length());
    final String[] BAD_EXTENSION = {"zip", "hwp", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt", "bmp", "jpg", "jpeg", "gif", "png"};

    int len = BAD_EXTENSION.length;
    for(int i = 0; i < len; i++) {
      if(ext.equalsIgnoreCase(BAD_EXTENSION[i])) {
        return true; // 불량 확장자가 존재할때..
      }
    }
    return false;
  }
  
  public static String getCurrentDateTm() {
	  SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHH");
	  return df.format(new Date());
  }

}