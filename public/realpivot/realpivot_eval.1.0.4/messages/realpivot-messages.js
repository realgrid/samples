RealPivotMessages = {
	notReadyText: "피벗 설정이 준비되지 않았습니다.",
	emptyDataText: "데이터가 존재하지 않습니다.",
	columnTotalText: "전체 요약",
	rowTotalText: "전체 요약",
	columnText: "열",
	rowText: "행",
	valueText: "값",
	countText: "건수",
	progressMessage: "피벗 화면 구성 중입니다...",

	valueTypeTexts : {
		sum : "합계",
		min : "최소",
		max : "최대",
		avg : "평균",
		count : "건수",
		distinct : "고유"
	},

	setupPanel : {
		headerText: "Pivot Setup",
		columnSectionText: "컬럼 필드 ",
		rowSectionText: "행 필드",
		valueSectionText: "값 필드",
		filterSectionText: "필터 필드",
		fieldSectionText: "전체 필드",
		valueConfigText: "설정",
		applyButtonText: "적용",
		cancelButtonText: "취소",
		fieldAddUnableText: "여기에 추가 할 수 없는 필드입니다.",
		fieldDuplicateText: "이미 존재하는 필드입니다.",
		filter: {
			headerText: "필터 설정",
			allText: "전체",
			expressionPlaceholder: "예) value > 0",
			applyButtonText: "확인",
			cancelButtonText: "취소"
		},
		value : {
			headerText: "값 설정",
			columnGroupText: "컬럼 값 기준 정렬",
			rowGroupText: "행 값 기준 정렬",
			formatGroupText: "표시형식",
			alignmentGroupText: "맞춤방식",
			selectNoConfigText: "설정하지 않음",
			selectConfigText: "설정",
			sortDirectionText: "정렬방식",
			sortAscendingText: "순차정렬",
			sortDescendingText: "역차정렬",
			emptyUpperOptionText: "상위 미지정",
			summaryOptionText: "합계",
			applyButtonText: "확인",
			cancelButtonText: "취소"
		}
	},

	numberFormatList : [{
		value : "",
		labelText : "지정 안함"
	}, {
		value : "#0",
		labelText : "일반(#0)"
	}, {
		value : "#,##0",
		labelText : "정수(#,##0)"
	}, {
		value : "#,##0.0",
		labelText : "소수점 1자리(#,##0.0)"
	}, {
		value : "#,##0.00",
		labelText : "소수점 2자리(#,##0.00)"
	}, {
		value : "#,##0.000",
		labelText : "소수점 3자리(#,##0.000)"
	}],
	userDefinedFormatText: "사용자 정의 포맷",
	alignmentList: [
		{value: null, labelText: "기본"}, 
		{value: "center", labelText:"중앙"},
		{value: "near", labelText: "좌측"}, 
		{value: "far", labelText: "우측"}
	]
};