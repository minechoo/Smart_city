$(document).ready(function () {
	// tab
	$('.tab').on('click', function () {
		$('.tab').attr('aria-selected', 'false').removeClass('on');
		$(this).attr('aria-selected', 'true').addClass('on');
		$('.tab-panel').attr('aria-hidden', 'true').hide();

		var panelIn = $(this).attr('aria-controls');

		$('#' + panelIn)
			.attr('aria-hidden', 'false')
			.show();
	});

	//스크롤 메뉴
	var section_div = $('.system_wrap section');
	var arrow_main = $('.system_wrap .arrow.on');
	var arrow = $('.ab_spot .arrow.on');
	var arrow_sub = $('.menu_box nav button');
	var move_li_main = $('.system_wrap section ul li');
	var move_li = $('.stop_wrap section ul li');
	var scrollAmount = 62; // 스크롤 이동 거리 (픽셀)
	var scrollAmountSub = 64;

	for (var i = 0; i < section_div.length; i++) {
		moveLi(i);
	}
	function moveLi(e) {
		$(arrow_main)
			.eq(e)
			.on('click', function () {
				var $ul = $(this).prev('ul');
				$ul.scrollTop($ul.scrollTop() + scrollAmount);
			});
	}

	$(arrow).on('click', function () {
		var $ul = $(this).prev('ul');
		$ul.scrollTop($ul.scrollTop() + scrollAmount);
	});

	$(arrow_sub).on('click', function () {
		var $ul = $(this).prev('ul');
		$ul.scrollTop($ul.scrollTop() + scrollAmountSub);
	});

	$(move_li_main).on('click', function () {
		$(this).children().toggleClass('on');
	});
	$(move_li).on('click', function () {
		$(this).children().toggleClass('on');
	});

	// on off 에 따른 효과
	$('#heat_box .on_green').on('click', function () {
		$('#heat').attr('src', 'images/img_heat_on.png');
		$('.ab_info').text('온열의자 작동중');
	});
	$('#heat_box .off_grey').on('click', function () {
		$('#heat').attr('src', 'images/img_heat_off.png');
		$('.ab_info').text('온열의자 작동중지');
	});

	$('#electric .on_green').on('click', function () {
		$('#el').attr('src', 'images/img_electric_on.png');
		$('.ab_info').text('전동어닝이 펼쳐집니다');
	});
	$('#electric .off_grey').on('click', function () {
		$('#el').attr('src', 'images/img_electric_off.png');
		$('.ab_info').text('전동어닝이 접힙니다');
	});

	$('#cctv .on_green').on('click', function () {
		$('#cctv_img').attr('src', 'images/img_cctv_on.png');
		$('.info_c').text('CCTV 작동중');
	});
	$('#cctv .off_grey').on('click', function () {
		$('#cctv_img').attr('src', 'images/img_cctv_off.png');
		$('.info_c').text('CCTV 작동중지');
	});

	$('#inside .on_green').on('click', function () {
		$('.info_c').text('inside 작동중');
	});
	$('#inside .off_grey').on('click', function () {
		$('.info_c').text('inside 작동중지');
	});
	/*
	$('#bell .on_green').on('click', function () {
		$('#bell_img').attr('src', 'images/img_bell_on.png');
		$('.wrap').html('<div class="ab_caution">비상벨이 울리고 있습니다.</div>');
	});
	$('#bell .off_grey').on('click', function () {
		$('#bell_img').attr('src', 'images/img_bell_off.png');
		$('.wrap').html('<div class="ab_info">비상벨 작동중</div>');
	});
*/
	//팝업창
	$('.settingTime').on('click', function () {
		$('.pop_time').toggle();
		$('.dim').show();
	});

	$('.pop_show').hide();
	$('.same').on('click', function () {
		$('.pop_show').show();
		$('.dim').show();
	});

	$('.pop_choice').hide();
	$('.btn_add').on('click', function () {
		$('.pop_choice').show();
		$('.dim').show();
	});

	$('.set_del').hide();
	$('.svg_top').on('click', function () {
		$('.set_del').show();
		$('.dim').show();
	});

	$('.btn_close').on('click', function () {
		$(this).parent().parent().hide();
		$('.dim').hide();
	});

	$('.btn_close_pop').on('click', function () {
		$(this).parent().parent().hide();
		$('.dim').hide();
	});
});

//시간 셋팅
const $setting = document.querySelectorAll('.setting_list li');

$setting.forEach((set, idx) => {
	set.addEventListener('click', () => {
		for (const el of $setting) el.classList.remove('on');
		$setting[idx].classList.add('on');
	});
});

//대기질
const $quality = document.querySelectorAll('.power_line .quality dd');

$quality.forEach((q, idx) => {
	q.addEventListener('click', () => {
		for (const el of $quality) el.classList.remove('on');
		$quality[idx].classList.add('on');
	});
});
