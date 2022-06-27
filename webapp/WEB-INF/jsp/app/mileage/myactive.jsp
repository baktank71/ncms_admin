<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">나의 활동</span>
                    <span class="header_right"></span>
                </div>
            </div>
        </div>
        
        <div id="container">
            <div class="content_sub">
                <div class="active_area">
                    <ul>
                        <li>
                            <span class="title">경제적 편익</span>
                            <span class="active_img1"></span>
                            <span class="t1">자가용 이용대비 절감비용</span>
                            <span class="t2"><sub>${info.data1 }원 절약</sub></span>
                            <span class="t3"><!-- (464원/km x 1.92km)--></span>
                        </li>
                        <li>
                            <span class="title">환경적 편익</span>
                            <span class="active_img2"></span>
                            <span class="t1">승용차 대기오염 배출량↓<br>미세먼지,CO₂↓</span>
                            <span class="t2"><sub>${info.data2 }원 절약</sub></span>
                            <span class="t3"><!-- (7,619원/kmx1.92km)--></span>
                        </li>
                        <li>
                            <span class="title">사회적 편익</span>
                            <span class="active_img3"></span>
                            <span class="t1">혼잡/교통사고비용 ↓</span>
                            <span class="t2"><sub>${info.data3 }원 절약</sub></span>
                            <span class="t3"><!-- (302원/kmx1.92km)--></span>
                        </li>
                        <li>
                            <span class="title">신체건강 편익</span>
                            <span class="active_img4"></span>
                            <span class="t1">다이어트,체지방 감소<br>외래진료 본인 부담액  ↓</span>
                            <span class="t2"><sub>${info.data4 }원 절약</sub></span>
                            <span class="t3"><!-- (167원/kmx1.92km)--></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>