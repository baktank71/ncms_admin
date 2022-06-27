package ts.ncms.ad.common;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;

public class StringUtils {
	/**
	* <code>nullCheck</code>       
	*  설명:널체크하는 메소드.
	*  @param input 체크할 스트링
	*  @param defaultVal 체크할 스트링이 널값일때 반환할 값
	*  @return String
	*/
	public static String nullCheck(Object input, String defaultVal) {
		if (input == null) {
			return defaultVal;
		} else {
			return (input.toString().equals("") ? defaultVal : input.toString());
		}
	}

	/**
	*  긴 스트링값을 잘라서 배열로 반환해주는 메소드
	*  @param	 String contents 
	*  @param	 String[] 
	*/		
	public static String[] getDividedContents(String contents){
		String[] results = null;
		String strContentResult = "";
		StringBuffer strContentBuffer = new StringBuffer("");
		int intContentSize = 600;    	//contents를 나눌 문자 길이
		char chrC;	
		
		java.util.Vector v = null;
		java.io.CharArrayReader cr = null;
		char[] cArray = contents.toCharArray();
		char[] cBuff = new char[intContentSize];	
		int readCnt = -1;
		try {
			cr = new java.io.CharArrayReader(cArray);
			v = new java.util.Vector();
			while( (readCnt = cr.read(cBuff)) > -1 ){
				strContentResult = new String(cBuff);
				v.add(strContentResult);
				cBuff = new char[intContentSize];	
			}			
			results = new String[v.size()];
			for(int i=0; i<results.length; i++){
				results[i] = (String)v.get(i);
			}
		} catch (Exception e) {

		} finally{
			if(cr != null){
				cr.close();
			}
			if(v != null){
				v.clear();v=null;
			}
		}

		return results;			
	}	

	/**
	*  HTML 형식의 문자를 치환해주는 메소드
	*  @param	 strText 내용 
	*/	
	public static String escapHTML(String strText) {
		strText = unEscapHTML(strText);
		String strInput;
		StringBuffer strOutput = new StringBuffer("");
		String convert;
		char strTmp;
		int nCount;
		if (strText == null) {
			strText = "";
		}
		strInput = strText;
		nCount = strInput.length();

		for (int i = 0; i < nCount; i++) {
			strTmp = strInput.charAt(i);
			if (strTmp == '<')
				strOutput.append("&lt;");
			else if (strTmp == '>')
				strOutput.append("&gt;");
			else if (strTmp == '&')
				strOutput.append("&amp;");
			else if (strTmp == (char) 37)
				strOutput.append("&#37;");
			else if (strTmp == (char) 34)
				strOutput.append("&quot;");
			else if (strTmp == (char) 39)
				strOutput.append("&#39;");
			else if (strTmp == '#')
				strOutput.append("&#35;");
			//else if (strTmp == '\n')
				//strOutput.append("<br>");
			else if (strTmp == ' ')
				strOutput.append("&nbsp;");
			else
				strOutput.append(strTmp);
		}
		convert = strOutput.toString();
		return convert;
	}
	
	/**
	*  HTML 형식으로 치환했던 문자를 원복해주는 메소드
	*  @param	 html 내용 
	*/	
	public static String unEscapHTML(String html) {
		String strOutPut = html;
		if (html == null || html.length() == 0) {
			return "";
		}
		strOutPut = replace(strOutPut, "&lt;", "<");
		strOutPut = replace(strOutPut, "&gt;", ">");
		strOutPut = replace(strOutPut, "&amp;", "&");
		strOutPut = replace(strOutPut, "&#37;", "%");
		strOutPut = replace(strOutPut, "&#34;", "\"");
		strOutPut = replace(strOutPut, "&#39;", "'");
		strOutPut = replace(strOutPut, "&#35;", "#");
		strOutPut = replace(strOutPut, "&nbsp;", " ");

		return strOutPut;
	}
	

	/**
	*  설명:영어문장인지 아닌지 검사하는 메소드.<br>
	*  @param inputStr 검사하고자하는 스트링
	*  @return 영어문장인지아닌지의 결과
	*/
	public static boolean isEnglish(String inputStr) {
		boolean flag = false;
		java.util.regex.Pattern p = java.util.regex.Pattern. compile("^[a-zA-Z]*$");
		java.util.regex.Matcher m = p.matcher (inputStr); 
		return flag  = m. matches (); 
	}

	/**
	*  설명:한글문장인지 아닌지 검사하는 메소드.<br>
	*  @param inputStr 검사하고자하는 스트링
	*  @return 한글문장인지아닌지의 결과
	*/
	public static boolean isHangul(String inputStr) {
		boolean flag = false;
		java.util.regex.Pattern p = java.util.regex.Pattern. compile("^[\\xA1-\\xFE][\\xA1-\\xFE]*$");
		java.util.regex.Matcher m = p.matcher (inputStr); 
		return flag  = m. matches (); 
	}
	
	/**
	*  설명:숫자인지 아닌지 검사하는 메소드.<br>
	*  @param inputStr 검사하고자하는 스트링
	*  @return 숫자인지아닌지의 결과
	*/
	public static boolean isNumeric(String inputStr) {
		boolean flag = false;
		java.util.regex.Pattern p = java.util.regex.Pattern. compile("^[0-9.,]*$");
		java.util.regex.Matcher m = p.matcher (inputStr); 
		return flag  = m. matches (); 
	}
	

	/**
	* <code>replace</code>    
	*  설명:스트링치환 메소드.
	*  @param str 치환할 스트링
	*  @param pattern 있으면 바꾸고자하는 스트링
	*  @param replace 바꿀 스트링
	*  @return String
	*/
	public static String replace(String str, String pattern, String replace) {

		int s = 0; // 찾기 시작할 위치 
		int e = 0; // StringBuffer에 append 할 위치 
		StringBuffer result = new StringBuffer(); // 잠시 문자열 담궈둘 놈 

		while ((e = str.indexOf(pattern, s)) >= 0) {
			result.append(str.substring(s, e));
			result.append(replace);
			s = e + pattern.length();
		}
		result.append(str.substring(s));

		return result.toString();
	}
	
	/**
	* <code>dateFormat</code>    
	*  설명:날짜포맷이 적용된 금일날짜 반환 메소드.
	*  @param param_format 날짜포맷 스트링
	*  @return String
	*/
	public static String dateFormat(String param_format) {
		java.text.SimpleDateFormat form = new java.text.SimpleDateFormat(param_format);
		java.util.Date day = new java.util.Date();
		String new_day = form.format(day);
		return new_day;
	}
	
	public static String convertStr(Object obj, String fromEnc, String toEnc) {
		String result = "";
		if (obj != null) {
			try {
				result = new String(((String) obj).getBytes(fromEnc), toEnc);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return result;
		} else {
			return null;
		}
	}
	public static String[] toStrArray(String strInput, String div) {
		String[] sResults = null;
		String strOutput = "";
		String sTemp = "";
		int index = 0;

		strInput = replace(strInput, (div), (" "+div) );
		java.util.StringTokenizer token = new java.util.StringTokenizer(strInput, div);
		sResults = new String[token.countTokens()];
		while (token.hasMoreElements()) {
			sTemp = (String) token.nextElement();
			sResults[index] = sTemp.trim();
			index++;
		}
		return sResults;
	}	

	/**
	 * 널스트링을를 ""값을 가진 스트링으로 반환 
	 * @param str
	 * @return
	 */
	public static String convertNull(String str){
		if(str==null){
			str = "";
		}
		return str;
	}
	/**
	 * 널오브젝트를 ""값을 가진 오브젝트로 반환 
	 * @param str
	 * @return
	 */
	public static Object convertNull(Object obj){
		if(obj==null){
			obj = "";
		}
		return obj;
	}	
	
	public static Object convertZero(Object obj){
		if(obj==null){
			obj = 0;
		}
		return obj;
	}
	
	/**
	 * 배치로그기록을 메일로 전송할때 key값 생성 8자리고정
	 * 
	 * @param num
	 * @return
	 * @throws Exception
	 */
	public static String sumstring(String value) {

		for(int i = 0; i < 8 ; i++){
			value = "0" + value;
			
			if(value.length() == 8){
				break;
			}
		}
		return nullCheck(value, "");
	}
	
	public static boolean isEmpty(String val){
		if(val == null || "".equals(val)){
			return true;
		}else{
			return false;
		}
	}
	
	public static boolean isEmpty(Object val){
		if(val == null || "".equals(val)){
			return true;
		}else{
			return false;
		}
	}
	
	public static boolean isNotEmpty(String val){
		if(val == null || "".equals(val)){
			return false;
		}else{
			return true;
		}
	}	
	
	public static String encSha256(String planText){
        String rlt = planText;
        
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(planText.getBytes());
            byte byteData[] = md.digest();

            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }

            StringBuffer hexString = new StringBuffer();
            for (int i=0;i<byteData.length;i++) {
                String hex=Integer.toHexString(0xff & byteData[i]);
                if(hex.length()==1){
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            rlt = hexString.toString();
        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
        
        return rlt;

	}
	
    public static String encSha512(String planText){

		String toReturn = null;
		try {
		    MessageDigest digest = MessageDigest.getInstance("SHA-512");
		    digest.reset();
		    digest.update(planText.getBytes("utf8"));
		    toReturn = String.format("%0128x", new BigInteger(1, digest.digest()));
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
		return toReturn;
    }		
	
	static String charset = "utf-8";
		
	public static byte pbUserKey[] = { (byte) 0x2c, (byte) 0x11, (byte) 0x19, (byte) 0x1d, (byte) 0x1f, (byte) 0x16, (byte) 0x12, (byte) 0x12, (byte) 0x11, (byte) 0x19, (byte) 0x1d, (byte) 0x1f, (byte) 0x10, (byte) 0x14, (byte) 0x1b, (byte) 0x16 };
	public static byte bszIV[] = { (byte) 0x27, (byte) 0x28, (byte) 0x27, (byte) 0x6d, (byte) 0x2d, (byte) 0xd5, (byte) 0x4e, (byte) 0x29, (byte) 0x2c, (byte) 0x56, (byte) 0xf4, (byte) 0x2a, (byte) 0x65, (byte) 0x2a, (byte) 0xae, (byte) 0x08 };
	
    public static byte[] enc_data(String str) {

        byte[] enc = null;
        try {
            //암호화 함수 호출
            enc = KISA_SEED_CBC.SEED_CBC_Encrypt(pbUserKey, bszIV, str.getBytes(charset), 0, str.getBytes(charset).length);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        //Encoder encoder = Base64.getEncoder();

        //byte[] encArray = encoder.encode(enc);
        byte[] encArray = enc;

        try {
            System.out.println(new String(encArray, "utf-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return encArray;
    }

    public static String dec_data(byte[] str) {

        //Decoder decoder = Base64.getDecoder();

        //byte[] enc = decoder.decode(str);
        byte[] enc = str;

        String result = "";

        byte[] dec = null;

        try {
            //복호화 함수 호출
            dec = KISA_SEED_CBC.SEED_CBC_Decrypt(pbUserKey, bszIV, enc, 0, enc.length);
            result = new String(dec, charset);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        System.out.println("decrypt Result = " + result);

        return result;
    }

}
