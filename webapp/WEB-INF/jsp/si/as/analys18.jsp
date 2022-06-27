<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="${contextPath}/js/cmmn/konan.js"></script>
<script type="text/javascript" src="${contextPath}/js/si/as/analys18.js"></script>
<article>
  <h2 class="skip">컨텐츠</h2>
  <section>
    <div class="content-padder">
      <div class="uk-section-small">
        <div class="uk-container uk-container-large">
          <h3>${params.statsTitl}</h3>
          <div class="uk-card uk-card-default uk-card-body uk-child-width-1-1 area_full">
          
                         <form class="search-condition uk-margin-medium-top">
                            <legend>검색조건</legend>
                            <div class="uk-form-controls">
                                <div data-ax5select="startYear" data-ax5select-config="{}" class="form-input-select" style="width: 100px; display: inline-table; vertical-align: middle; margin-bottom:2px;"></div>
                                <div data-ax5select="endYear" data-ax5select-config="{}" class="form-input-select" style="width: 100px; display: inline-table; vertical-align: middle; margin-bottom:2px;"></div>
                            </div>

                            <button type="button" id="btnSearch" class="uk-button uk-button-secondary">검색</button>
                                                      
                        </form>

                        <hr>

                        <table class="uk-table uk-table-divider table-stat table-analy">
                           <caption>상세현황</caption>
                           <thead>
                          
                               <tr>
                                   <th>연도</th>
                                   <th>결함신고수</th>
                               </tr>
                           </thead>
                           <tbody class="uk-text-center">
                               
                           </tbody>
                       </table> 
                       
                       <hr>
                       
                        <table class="uk-table uk-table-divider table-stat table-analy2">
                           <caption>상세현황</caption>
                           <thead>
                           </thead>
                           <tbody class="uk-text-center">
                           </tbody>
                       </table>                           
                        
					<div class="uk-text-center  uk-margin-small-top">
						<button type="button" class="uk-button uk-button-primary" onClick="javaScript:history.back()">돌아가기</button>          
					</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</article>