'use strict'

class EmailBodyController {
  async welcome_body(pin, alias, code_1, code_2, code_3) {
    const body = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <title>Welcome to myG</title>
    <style id="applicationStylesheet" type="text/css">
    	.mediaViewInfo {
    		--web-view-name: Welcome to myG;
    		--web-view-id: Welcome_to_myG;
    		--web-scale-on-resize: true;
    		--web-enable-deep-linking: true;
    	}
    	:root {
    		--web-view-ids: Welcome_to_myG;
    	}
    	* {
    		margin: 0;
    		padding: 0;
    		box-sizing: border-box;
    		border: none;
    	}
    	#Welcome_to_myG {
    		position: absolute;
    		width: 800px;
    		height: 1751px;
    		background-color: rgba(255,255,255,1);
    		overflow: hidden;
    		--web-view-name: Welcome to myG;
    		--web-view-id: Welcome_to_myG;
    		--web-scale-on-resize: true;
    		--web-enable-deep-linking: true;
    	}
    	#Mask_Group_3 {
    		position: absolute;
    		width: 799.603px;
    		height: 366.55px;
    		left: 0.5px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Path_771 {
    		opacity: 0.79;
    		fill: rgba(11,15,20,1);
    		stroke: rgba(52,66,72,1);
    		stroke-width: 2px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_771 {
    		overflow: visible;
    		position: absolute;
    		width: 801.603px;
    		height: 368.75px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_769 {
    		fill: rgba(252,252,252,1);
    	}
    	.Path_769 {
    		overflow: visible;
    		position: absolute;
    		width: 175px;
    		height: 180.248px;
    		left: 601px;
    		top: 916px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#btn_Network {
    		position: absolute;
    		width: 310px;
    		height: 310px;
    		left: 236px;
    		top: 504px;
    		overflow: visible;
    	}
    	#Group_621 {
    		position: absolute;
    		width: 145.805px;
    		height: 144.492px;
    		left: 82.097px;
    		top: 78.157px;
    		overflow: visible;
    	}
    	#Path_759 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_759 {
    		overflow: visible;
    		position: absolute;
    		width: 74.873px;
    		height: 88.665px;
    		left: 36.78px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_760 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_760 {
    		overflow: visible;
    		position: absolute;
    		width: 145.805px;
    		height: 70.275px;
    		left: 0px;
    		top: 74.216px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_622 {
    		position: absolute;
    		width: 310px;
    		height: 310px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Path_761 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_761 {
    		overflow: visible;
    		position: absolute;
    		width: 106.654px;
    		height: 106.566px;
    		left: 175.89px;
    		top: 27.417px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_762 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_762 {
    		overflow: visible;
    		position: absolute;
    		width: 108.66px;
    		height: 107.182px;
    		left: 27.421px;
    		top: 27.458px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_763 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_763 {
    		overflow: visible;
    		position: absolute;
    		width: 108.536px;
    		height: 107.841px;
    		left: 27.417px;
    		top: 175.231px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_764 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_764 {
    		overflow: visible;
    		position: absolute;
    		width: 106.654px;
    		height: 107.222px;
    		left: 175.89px;
    		top: 175.193px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_765 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_765 {
    		overflow: visible;
    		position: absolute;
    		width: 59.11px;
    		height: 59.11px;
    		left: 250.89px;
    		top: 125.445px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_766 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_766 {
    		overflow: visible;
    		position: absolute;
    		width: 59.11px;
    		height: 59.11px;
    		left: 0px;
    		top: 125.445px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_767 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_767 {
    		overflow: visible;
    		position: absolute;
    		width: 59.11px;
    		height: 59.11px;
    		left: 126.102px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_768 {
    		fill: rgba(172,172,172,0.051);
    	}
    	.Path_768 {
    		overflow: visible;
    		position: absolute;
    		width: 59.11px;
    		height: 59.11px;
    		left: 126.102px;
    		top: 250.89px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Rectangle_432 {
    		fill: rgba(29,35,38,1);
    		stroke: rgba(40,48,52,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_432 {
    		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.251));
    		position: absolute;
    		overflow: visible;
    		width: 643px;
    		height: 473px;
    		left: 94px;
    		top: 106px;
    	}
    	#Rectangle_458 {
    		fill: rgba(29,35,38,1);
    		stroke: rgba(40,48,52,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_458 {
    		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.161));
    		position: absolute;
    		overflow: visible;
    		width: 200px;
    		height: 166px;
    		left: 94px;
    		top: 697px;
    	}
    	#Rectangle_459 {
    		fill: rgba(29,35,38,1);
    		stroke: rgba(40,48,52,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_459 {
    		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.161));
    		position: absolute;
    		overflow: visible;
    		width: 200px;
    		height: 166px;
    		left: 316px;
    		top: 697px;
    	}
    	#Rectangle_460 {
    		fill: rgba(29,35,38,1);
    		stroke: rgba(40,48,52,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_460 {
    		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.161));
    		position: absolute;
    		overflow: visible;
    		width: 200px;
    		height: 166px;
    		left: 537px;
    		top: 697px;
    	}
    	#If_you_wish_to_report_bugs_or_ {
    		left: 174px;
    		top: 1458px;
    		position: absolute;
    		overflow: visible;
    		width: 453px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -4px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 12px;
    		color: rgba(23,26,28,1);
    	}
    	#Welcome_to_myG_ {
    		left: 277px;
    		top: 198px;
    		position: absolute;
    		overflow: visible;
    		width: 248px;
    		white-space: nowrap;
    		text-align: left;
    		font-family: Montserrat Alternates;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 26px;
    		color: rgba(255,255,255,1);
    	}
    	#This_will_most_likely_be_the_f {
    		left: 166px;
    		top: 259px;
    		position: absolute;
    		overflow: visible;
    		width: 469px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -2px;
    		text-align: center;
    		font-family: Montserrat Alternates;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 16px;
    		color: rgba(255,255,255,1);
    	}
    	#Your_key_is_below_and_it_will_ {
    		left: 264px;
    		top: 378px;
    		position: absolute;
    		overflow: visible;
    		width: 273px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -2px;
    		text-align: center;
    		font-family: Montserrat Alternates;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 16px;
    		color: rgba(255,255,255,1);
    	}
    	#Group_655 {
    		position: absolute;
    		width: 134.398px;
    		height: 123.432px;
    		left: 332.801px;
    		top: 40.857px;
    		overflow: visible;
    	}
    	#Path_688 {
    		fill: rgba(0,0,0,1);
    	}
    	.Path_688 {
    		overflow: visible;
    		position: absolute;
    		width: 125.333px;
    		height: 80px;
    		left: 4.667px;
    		top: 34.81px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_581 {
    		position: absolute;
    		width: 134.398px;
    		height: 123.432px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Path_684 {
    		fill: rgba(168,136,36,1);
    	}
    	.Path_684 {
    		overflow: visible;
    		position: absolute;
    		width: 30.768px;
    		height: 20.68px;
    		left: 51.81px;
    		top: 101.827px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_685 {
    		fill: rgba(168,136,36,1);
    	}
    	.Path_685 {
    		overflow: visible;
    		position: absolute;
    		width: 31.221px;
    		height: 22.889px;
    		left: 29.383px;
    		top: 63.665px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_686 {
    		fill: rgba(168,136,36,1);
    	}
    	.Path_686 {
    		overflow: visible;
    		position: absolute;
    		width: 31.221px;
    		height: 22.889px;
    		left: 75.167px;
    		top: 63.665px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_687 {
    		fill: rgba(231,187,48,1);
    	}
    	.Path_687 {
    		overflow: visible;
    		position: absolute;
    		width: 134.398px;
    		height: 123.432px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_657 {
    		position: absolute;
    		width: 452px;
    		height: 50px;
    		left: 174px;
    		top: 446px;
    		overflow: visible;
    	}
    	#Rectangle_418 {
    		fill: rgba(231,187,48,1);
    	}
    	.Rectangle_418 {
    		position: absolute;
    		overflow: visible;
    		width: 452px;
    		height: 50px;
    		left: 0px;
    		top: 0px;
    	}
    	#bruhx007 {
    		left: 181px;
    		top: 14px;
    		position: absolute;
    		overflow: visible;
    		width: 92px;
    		white-space: nowrap;
    		text-align: left;
    		font-family: Montserrat Alternates;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 18px;
    		color: rgba(23,26,28,1);
    	}
    	#Rectangle_418_bg {
    		fill: rgba(231,187,48,1);
    	}
    	.Rectangle_418_bg {
    		position: absolute;
    		overflow: visible;
    		width: 416px;
    		height: 94px;
    		left: 192px;
    		top: 1341px;
    	}
    	#Group_656 {
    		transform: matrix(1,0,0,1,196,348) rotate(180deg);
    		transform-origin: center;
    		position: absolute;
    		width: 407.167px;
    		height: 1px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Line_396 {
    		fill: transparent;
    		stroke: rgba(56,73,82,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Line_396 {
    		overflow: visible;
    		position: absolute;
    		width: 407.167px;
    		height: 1px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Line_397 {
    		fill: transparent;
    		stroke: rgba(16,18,20,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Line_397 {
    		overflow: visible;
    		position: absolute;
    		width: 407.167px;
    		height: 1px;
    		left: 0px;
    		top: 1px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_658 {
    		transform: matrix(1,0,0,1,313,987) rotate(180deg);
    		transform-origin: center;
    		position: absolute;
    		width: 174.667px;
    		height: 1px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Line_396_bl {
    		fill: transparent;
    		stroke: rgba(56,73,82,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Line_396_bl {
    		overflow: visible;
    		position: absolute;
    		width: 174.667px;
    		height: 1px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Line_397_bm {
    		fill: transparent;
    		stroke: rgba(16,18,20,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Line_397_bm {
    		overflow: visible;
    		position: absolute;
    		width: 174.667px;
    		height: 1px;
    		left: 0px;
    		top: 1px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Icon_feather-copy {
    		position: absolute;
    		width: 18px;
    		height: 18px;
    		left: 590px;
    		top: 462px;
    		overflow: visible;
    	}
    	#Path_689 {
    		fill: transparent;
    		stroke: rgba(29,35,38,1);
    		stroke-width: 2px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_689 {
    		overflow: visible;
    		position: absolute;
    		width: 13.7px;
    		height: 13.7px;
    		left: 6.3px;
    		top: 6.3px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_690 {
    		fill: transparent;
    		stroke: rgba(29,35,38,1);
    		stroke-width: 2px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_690 {
    		overflow: visible;
    		position: absolute;
    		width: 13.7px;
    		height: 13.7px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#You_also_get_three_invite_code {
    		left: 221px;
    		top: 636px;
    		position: absolute;
    		overflow: visible;
    		width: 359px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -5px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 10px;
    		color: rgba(23,26,28,1);
    	}
    	#Code_1 {
    		left: 144px;
    		top: 732px;
    		position: absolute;
    		overflow: visible;
    		width: 71px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -1px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 18px;
    		color: rgba(255,255,255,1);
    	}
    	#Code_2 {
    		left: 362.5px;
    		top: 732px;
    		position: absolute;
    		overflow: visible;
    		width: 75px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -1px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 18px;
    		color: rgba(255,255,255,1);
    	}
    	#Code_3 {
    		left: 584.5px;
    		top: 732px;
    		position: absolute;
    		overflow: visible;
    		width: 75px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -1px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 18px;
    		color: rgba(255,255,255,1);
    	}
    	#Wait_Theres_more {
    		left: 262px;
    		top: 583px;
    		position: absolute;
    		overflow: visible;
    		width: 277px;
    		white-space: nowrap;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 28px;
    		color: rgba(23,26,28,1);
    	}
    	#Mask_Group_1 {
    		position: absolute;
    		width: 514px;
    		height: 248px;
    		left: 400px;
    		top: 1051px;
    		overflow: visible;
    	}
    	#TIP_1 {
    		left: 94px;
    		top: 1034px;
    		position: absolute;
    		overflow: visible;
    		width: 296px;
    		white-space: nowrap;
    		text-align: left;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 24px;
    		color: rgba(23,26,28,1);
    	}
    	#Group_661 {
    		position: absolute;
    		width: 133px;
    		height: 28px;
    		left: 113px;
    		top: 765.931px;
    		overflow: visible;
    	}
    	#Rectangle_496 {
    		fill: rgba(23,26,28,1);
    		stroke: rgba(39,49,54,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_496 {
    		position: absolute;
    		overflow: visible;
    		width: 133px;
    		height: 28px;
    		left: 0px;
    		top: 0px;
    	}
    	#GoodIZ1FEQb {
    		left: 14px;
    		top: 7.069px;
    		position: absolute;
    		overflow: visible;
    		width: 71px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -5px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 10px;
    		color: rgba(231,187,48,1);
    	}
    	#Icon_feather-copy_b {
    		position: absolute;
    		width: 13px;
    		height: 13px;
    		left: 110px;
    		top: 7.069px;
    		overflow: visible;
    	}
    	#Path_689_b {
    		fill: transparent;
    		stroke: rgba(231,187,48,1);
    		stroke-width: 1px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_689_b {
    		overflow: visible;
    		position: absolute;
    		width: 9.45px;
    		height: 9.45px;
    		left: 4.55px;
    		top: 4.55px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_690_b {
    		fill: transparent;
    		stroke: rgba(231,187,48,1);
    		stroke-width: 1px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_690_b {
    		overflow: visible;
    		position: absolute;
    		width: 9.45px;
    		height: 9.45px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_662 {
    		position: absolute;
    		width: 133px;
    		height: 28px;
    		left: 333.5px;
    		top: 765.931px;
    		overflow: visible;
    	}
    	#Rectangle_496_b {
    		fill: rgba(23,26,28,1);
    		stroke: rgba(39,49,54,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_496_b {
    		position: absolute;
    		overflow: visible;
    		width: 133px;
    		height: 28px;
    		left: 0px;
    		top: 0px;
    	}
    	#GoodIZ1FEQb_b {
    		left: 14px;
    		top: 7.069px;
    		position: absolute;
    		overflow: visible;
    		width: 71px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -5px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 10px;
    		color: rgba(231,187,48,1);
    	}
    	#Icon_feather-copy_ca {
    		position: absolute;
    		width: 13px;
    		height: 13px;
    		left: 110px;
    		top: 7.069px;
    		overflow: visible;
    	}
    	#Path_689_ca {
    		fill: transparent;
    		stroke: rgba(231,187,48,1);
    		stroke-width: 1px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_689_ca {
    		overflow: visible;
    		position: absolute;
    		width: 9.45px;
    		height: 9.45px;
    		left: 4.55px;
    		top: 4.55px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_690_ca {
    		fill: transparent;
    		stroke: rgba(231,187,48,1);
    		stroke-width: 1px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_690_ca {
    		overflow: visible;
    		position: absolute;
    		width: 9.45px;
    		height: 9.45px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_663 {
    		position: absolute;
    		width: 133px;
    		height: 28px;
    		left: 555.5px;
    		top: 765.931px;
    		overflow: visible;
    	}
    	#Rectangle_496_ca {
    		fill: rgba(23,26,28,1);
    		stroke: rgba(39,49,54,1);
    		stroke-width: 1px;
    		stroke-linejoin: miter;
    		stroke-linecap: butt;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Rectangle_496_ca {
    		position: absolute;
    		overflow: visible;
    		width: 133px;
    		height: 28px;
    		left: 0px;
    		top: 0px;
    	}
    	#GoodIZ1FEQb_cb {
    		left: 14px;
    		top: 7.069px;
    		position: absolute;
    		overflow: visible;
    		width: 71px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -5px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 10px;
    		color: rgba(231,187,48,1);
    	}
    	#Icon_feather-copy_cc {
    		position: absolute;
    		width: 13px;
    		height: 13px;
    		left: 110px;
    		top: 7.069px;
    		overflow: visible;
    	}
    	#Path_689_cd {
    		fill: transparent;
    		stroke: rgba(231,187,48,1);
    		stroke-width: 1px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_689_cd {
    		overflow: visible;
    		position: absolute;
    		width: 9.45px;
    		height: 9.45px;
    		left: 4.55px;
    		top: 4.55px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_690_ce {
    		fill: transparent;
    		stroke: rgba(231,187,48,1);
    		stroke-width: 1px;
    		stroke-linejoin: round;
    		stroke-linecap: round;
    		stroke-miterlimit: 4;
    		shape-rendering: auto;
    	}
    	.Path_690_ce {
    		overflow: visible;
    		position: absolute;
    		width: 9.45px;
    		height: 9.45px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Everytime_you_log_off_you_key_ {
    		left: 94px;
    		top: 1078px;
    		position: absolute;
    		overflow: visible;
    		width: 262px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -4px;
    		text-align: left;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 12px;
    		color: rgba(23,26,28,1);
    	}
    	#Group_660 {
    		position: absolute;
    		width: 464px;
    		height: 55px;
    		left: 168px;
    		top: 883px;
    		overflow: visible;
    	}
    	#myGs_vision_is_to_improve_game {
    		left: 0px;
    		top: 0px;
    		position: absolute;
    		overflow: visible;
    		width: 465px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -4px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 12px;
    		color: rgba(23,26,28,1);
    	}
    	#Update_your_Profile_createjoin {
    		left: 275px;
    		top: 1371px;
    		position: absolute;
    		overflow: visible;
    		width: 251px;
    		white-space: nowrap;
    		line-height: 20px;
    		margin-top: -4px;
    		text-align: center;
    		font-family: Montserrat;
    		font-style: normal;
    		font-weight: bold;
    		font-size: 12px;
    		color: rgba(23,26,28,1);
    	}
    	#Group_813 {
    		position: absolute;
    		width: 800px;
    		height: 230px;
    		left: 0px;
    		top: 1521px;
    		overflow: visible;
    	}
    	#Rectangle_497 {
    		fill: rgba(29,35,38,1);
    	}
    	.Rectangle_497 {
    		position: absolute;
    		overflow: visible;
    		width: 800px;
    		height: 230px;
    		left: 0px;
    		top: 0px;
    	}
    	#For_more_information_please_vi {
    		left: 49px;
    		top: 31px;
    		position: absolute;
    		overflow: visible;
    		width: 664px;
    		white-space: nowrap;
    		line-height: 30px;
    		margin-top: -7px;
    		text-align: left;
    		font-family: Montserrat Alternates;
    		font-style: normal;
    		font-weight: normal;
    		font-size: 16px;
    		color: rgba(255,255,255,1);
    	}
    	#Group_820 {
    		position: absolute;
    		width: 119.75px;
    		height: 39.342px;
    		left: 656.25px;
    		top: 1692.664px;
    		overflow: visible;
    	}
    	#Group_819 {
    		position: absolute;
    		width: 119.75px;
    		height: 39.342px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Path_773 {
    		fill: rgba(89,89,89,1);
    	}
    	.Path_773 {
    		overflow: visible;
    		position: absolute;
    		width: 36.407px;
    		height: 21.574px;
    		left: 3.225px;
    		top: 12.837px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_817 {
    		position: absolute;
    		width: 21.542px;
    		height: 24.67px;
    		left: 98.208px;
    		top: 6.951px;
    		overflow: visible;
    	}
    	#Group_816 {
    		position: absolute;
    		width: 21.542px;
    		height: 24.67px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Path_774 {
    		fill: rgba(225,225,222,1);
    	}
    	.Path_774 {
    		overflow: visible;
    		position: absolute;
    		width: 21.542px;
    		height: 24.67px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_775 {
    		fill: rgba(89,89,89,1);
    	}
    	.Path_775 {
    		overflow: visible;
    		position: absolute;
    		width: 45.772px;
    		height: 32.327px;
    		left: 49.222px;
    		top: 6.939px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Group_818 {
    		position: absolute;
    		width: 42.837px;
    		height: 39.342px;
    		left: 0px;
    		top: 0px;
    		overflow: visible;
    	}
    	#Path_776 {
    		fill: rgba(173,173,173,1);
    	}
    	.Path_776 {
    		overflow: visible;
    		position: absolute;
    		width: 9.807px;
    		height: 6.591px;
    		left: 16.514px;
    		top: 32.456px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_777 {
    		fill: rgba(173,173,173,1);
    	}
    	.Path_777 {
    		overflow: visible;
    		position: absolute;
    		width: 9.951px;
    		height: 7.296px;
    		left: 9.365px;
    		top: 20.292px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_778 {
    		fill: rgba(173,173,173,1);
    	}
    	.Path_778 {
    		overflow: visible;
    		position: absolute;
    		width: 9.951px;
    		height: 7.296px;
    		left: 23.958px;
    		top: 20.292px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    	#Path_779 {
    		fill: rgba(225,225,222,1);
    	}
    	.Path_779 {
    		overflow: visible;
    		position: absolute;
    		width: 42.837px;
    		height: 39.342px;
    		left: 0px;
    		top: 0px;
    		transform: matrix(1,0,0,1,0,0);
    	}
    </style>
    <script id="applicationScript">
    ///////////////////////////////////////
    // INITIALIZATION
    ///////////////////////////////////////

    /**
     * Functionality for scaling, showing by media query, and navigation between multiple pages on a single page.
     * Code subject to change.
     **/

    if (window.console==null) { window["console"] = { log : function() {} } }; // some browsers do not set console

    var Application = function() {
    	// event constants
    	this.prefix = "--web-";
    	this.NAVIGATION_CHANGE = "viewChange";
    	this.VIEW_NOT_FOUND = "viewNotFound";
    	this.VIEW_CHANGE = "viewChange";
    	this.VIEW_CHANGING = "viewChanging";
    	this.STATE_NOT_FOUND = "stateNotFound";
    	this.APPLICATION_COMPLETE = "applicationComplete";
    	this.APPLICATION_RESIZE = "applicationResize";
    	this.SIZE_STATE_NAME = "data-is-view-scaled";
    	this.STATE_NAME = this.prefix + "state";

    	this.lastTrigger = null;
    	this.lastView = null;
    	this.lastState = null;
    	this.lastOverlay = null;
    	this.currentView = null;
    	this.currentState = null;
    	this.currentOverlay = null;
    	this.currentQuery = {index: 0, rule: null, mediaText: null, id: null};
    	this.inclusionQuery = "(min-width: 0px)";
    	this.exclusionQuery = "none and (min-width: 99999px)";
    	this.LastModifiedDateLabelName = "LastModifiedDateLabel";
    	this.viewScaleSliderId = "ViewScaleSliderInput";
    	this.pageRefreshedName = "showPageRefreshedNotification";
    	this.applicationStylesheet = null;
    	this.mediaQueryDictionary = {};
    	this.viewsDictionary = {};
    	this.addedViews = [];
    	this.views = {};
    	this.viewIds = [];
    	this.viewQueries = {};
    	this.overlays = {};
    	this.overlayIds = [];
    	this.numberOfViews = 0;
    	this.verticalPadding = 0;
    	this.horizontalPadding = 0;
    	this.stateName = null;
    	this.viewScale = 1;
    	this.viewLeft = 0;
    	this.viewTop = 0;
    	this.horizontalScrollbarsNeeded = false;
    	this.verticalScrollbarsNeeded = false;

    	// view settings
    	this.showUpdateNotification = false;
    	this.showNavigationControls = false;
    	this.scaleViewsToFit = false;
    	this.scaleToFitOnDoubleClick = false;
    	this.actualSizeOnDoubleClick = false;
    	this.scaleViewsOnResize = false;
    	this.navigationOnKeypress = false;
    	this.showViewName = false;
    	this.enableDeepLinking = true;
    	this.refreshPageForChanges = false;
    	this.showRefreshNotifications = true;

    	// view controls
    	this.scaleViewSlider = null;
    	this.lastModifiedLabel = null;
    	this.supportsPopState = false; // window.history.pushState!=null;
    	this.initialized = false;

    	// refresh properties
    	this.refreshDuration = 250;
    	this.lastModifiedDate = null;
    	this.refreshRequest = null;
    	this.refreshInterval = null;
    	this.refreshContent = null;
    	this.refreshContentSize = null;
    	this.refreshCheckContent = false;
    	this.refreshCheckContentSize = false;

    	var self = this;

    	self.initialize = function(event) {
    		var view = self.getVisibleView();
    		var views = self.getVisibleViews();
    		if (view==null) view = self.getInitialView();
    		self.collectViews();
    		self.collectOverlays();
    		self.collectMediaQueries();

    		for (let index = 0; index < views.length; index++) {
    			var view = views[index];
    			self.setViewOptions(view);
    			self.setViewVariables(view);
    			self.centerView(view);
    		}

    		// sometimes the body size is 0 so we call this now and again later
    		if (self.initialized) {
    			window.addEventListener(self.NAVIGATION_CHANGE, self.viewChangeHandler);
    			window.addEventListener("keyup", self.keypressHandler);
    			window.addEventListener("keypress", self.keypressHandler);
    			window.addEventListener("resize", self.resizeHandler);
    			window.document.addEventListener("dblclick", self.doubleClickHandler);

    			if (self.supportsPopState) {
    				window.addEventListener('popstate', self.popStateHandler);
    			}
    			else {
    				window.addEventListener('hashchange', self.hashChangeHandler);
    			}

    			// we are ready to go
    			window.dispatchEvent(new Event(self.APPLICATION_COMPLETE));
    		}

    		if (self.initialized==false) {
    			if (self.enableDeepLinking) {
    				self.syncronizeViewToURL();
    			}

    			if (self.refreshPageForChanges) {
    				self.setupRefreshForChanges();
    			}

    			self.initialized = true;
    		}

    		if (self.scaleViewsToFit) {
    			self.viewScale = self.scaleViewToFit(view);

    			if (self.viewScale<0) {
    				setTimeout(self.scaleViewToFit, 500, view);
    			}
    		}
    		else if (view) {
    			self.viewScale = self.getViewScaleValue(view);
    			self.centerView(view);
    			self.updateSliderValue(self.viewScale);
    		}
    		else {
    			// no view found
    		}

    		if (self.showUpdateNotification) {
    			self.showNotification();
    		}

    		//"addEventListener" in window ? null : window.addEventListener = window.attachEvent;
    		//"addEventListener" in document ? null : document.addEventListener = document.attachEvent;
    	}


    	///////////////////////////////////////
    	// AUTO REFRESH
    	///////////////////////////////////////

    	self.setupRefreshForChanges = function() {
    		self.refreshRequest = new XMLHttpRequest();

    		if (!self.refreshRequest) {
    			return false;
    		}

    		// get document start values immediately
    		self.requestRefreshUpdate();
    	}

    	/**
    	 * Attempt to check the last modified date by the headers
    	 * or the last modified property from the byte array (experimental)
    	 **/
    	self.requestRefreshUpdate = function() {
    		var url = document.location.href;
    		var protocol = window.location.protocol;
    		var method;

    		try {

    			if (self.refreshCheckContentSize) {
    				self.refreshRequest.open('HEAD', url, true);
    			}
    			else if (self.refreshCheckContent) {
    				self.refreshContent = document.documentElement.outerHTML;
    				self.refreshRequest.open('GET', url, true);
    				self.refreshRequest.responseType = "text";
    			}
    			else {

    				// get page last modified date for the first call to compare to later
    				if (self.lastModifiedDate==null) {

    					// File system does not send headers in FF so get blob if possible
    					if (protocol=="file:") {
    						self.refreshRequest.open("GET", url, true);
    						self.refreshRequest.responseType = "blob";
    					}
    					else {
    						self.refreshRequest.open("HEAD", url, true);
    						self.refreshRequest.responseType = "blob";
    					}

    					self.refreshRequest.onload = self.refreshOnLoadOnceHandler;

    					// In some browsers (Chrome & Safari) this error occurs at send:
    					//
    					// Chrome - Access to XMLHttpRequest at 'file:///index.html' from origin 'null'
    					// has been blocked by CORS policy:
    					// Cross origin requests are only supported for protocol schemes:
    					// http, data, chrome, chrome-extension, https.
    					//
    					// Safari - XMLHttpRequest cannot load file:///Users/user/Public/index.html. Cross origin requests are only supported for HTTP.
    					//
    					// Solution is to run a local server, set local permissions or test in another browser
    					self.refreshRequest.send(null);

    					// In MS browsers the following behavior occurs possibly due to an AJAX call to check last modified date:
    					//
    					// DOM7011: The code on this page disabled back and forward caching.

    					// In Brave (Chrome) error when on the server
    					// index.js:221 HEAD https://www.example.com/ net::ERR_INSUFFICIENT_RESOURCES
    					// self.refreshRequest.send(null);

    				}
    				else {
    					self.refreshRequest = new XMLHttpRequest();
    					self.refreshRequest.onreadystatechange = self.refreshHandler;
    					self.refreshRequest.ontimeout = function() {
    						self.log("Couldn't find page to check for updates");
    					}

    					var method;
    					if (protocol=="file:") {
    						method = "GET";
    					}
    					else {
    						method = "HEAD";
    					}

    					//refreshRequest.open('HEAD', url, true);
    					self.refreshRequest.open(method, url, true);
    					self.refreshRequest.responseType = "blob";
    					self.refreshRequest.send(null);
    				}
    			}
    		}
    		catch (error) {
    			self.log("Refresh failed for the following reason:")
    			self.log(error);
    		}
    	}

    	self.refreshHandler = function() {
    		var contentSize;

    		try {

    			if (self.refreshRequest.readyState === XMLHttpRequest.DONE) {

    				if (self.refreshRequest.status === 2 ||
    					self.refreshRequest.status === 200) {
    					var pageChanged = false;

    					self.updateLastModifiedLabel();

    					if (self.refreshCheckContentSize) {
    						var lastModifiedHeader = self.refreshRequest.getResponseHeader("Last-Modified");
    						contentSize = self.refreshRequest.getResponseHeader("Content-Length");
    						//lastModifiedDate = refreshRequest.getResponseHeader("Last-Modified");
    						var headers = self.refreshRequest.getAllResponseHeaders();
    						var hasContentHeader = headers.indexOf("Content-Length")!=-1;

    						if (hasContentHeader) {
    							contentSize = self.refreshRequest.getResponseHeader("Content-Length");

    							// size has not been set yet
    							if (self.refreshContentSize==null) {
    								self.refreshContentSize = contentSize;
    								// exit and let interval call this method again
    								return;
    							}

    							if (contentSize!=self.refreshContentSize) {
    								pageChanged = true;
    							}
    						}
    					}
    					else if (self.refreshCheckContent) {

    						if (self.refreshRequest.responseText!=self.refreshContent) {
    							pageChanged = true;
    						}
    					}
    					else {
    						lastModifiedHeader = self.getLastModified(self.refreshRequest);

    						if (self.lastModifiedDate!=lastModifiedHeader) {
    							self.log("lastModifiedDate:" + self.lastModifiedDate + ",lastModifiedHeader:" +lastModifiedHeader);
    							pageChanged = true;
    						}

    					}


    					if (pageChanged) {
    						clearInterval(self.refreshInterval);
    						self.refreshUpdatedPage();
    						return;
    					}

    				}
    				else {
    					self.log('There was a problem with the request.');
    				}

    			}
    		}
    		catch( error ) {
    			//console.log('Caught Exception: ' + error);
    		}
    	}

    	self.refreshOnLoadOnceHandler = function(event) {

    		// get the last modified date
    		if (self.refreshRequest.response) {
    			self.lastModifiedDate = self.getLastModified(self.refreshRequest);

    			if (self.lastModifiedDate!=null) {

    				if (self.refreshInterval==null) {
    					self.refreshInterval = setInterval(self.requestRefreshUpdate, self.refreshDuration);
    				}
    			}
    			else {
    				self.log("Could not get last modified date from the server");
    			}
    		}
    	}

    	self.refreshUpdatedPage = function() {
    		if (self.showRefreshNotifications) {
    			var date = new Date().setTime((new Date().getTime()+10000));
    			document.cookie = encodeURIComponent(self.pageRefreshedName) + "=true" + "; max-age=6000;" + " path=/";
    		}

    		document.location.reload(true);
    	}

    	self.showNotification = function(duration) {
    		var notificationID = self.pageRefreshedName+"ID";
    		var notification = document.getElementById(notificationID);
    		if (duration==null) duration = 4000;

    		if (notification!=null) {return;}

    		notification = document.createElement("div");
    		notification.id = notificationID;
    		notification.textContent = "PAGE UPDATED";
    		var styleRule = ""
    		styleRule = "position: fixed; padding: 7px 16px 6px 16px; font-family: Arial, sans-serif; font-size: 10px; font-weight: bold; left: 50%;";
    		styleRule += "top: 20px; background-color: rgba(0,0,0,.5); border-radius: 12px; color:rgb(235, 235, 235); transition: all 2s linear;";
    		styleRule += "transform: translateX(-50%); letter-spacing: .5px; filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, .1))";
    		notification.setAttribute("style", styleRule);

    		notification.className= "PageRefreshedClass";

    		document.body.appendChild(notification);

    		setTimeout(function() {
    			notification.style.opacity = "0";
    			notification.style.filter = "drop-shadow( 0px 0px 0px rgba(0,0,0, .5))";
    			setTimeout(function() {
    				notification.parentNode.removeChild(notification);
    			}, duration)
    		}, duration);

    		document.cookie = encodeURIComponent(self.pageRefreshedName) + "=; max-age=1; path=/";
    	}

    	/**
    	 * Get the last modified date from the header
    	 * or file object after request has been received
    	 **/
    	self.getLastModified = function(request) {
    		var date;

    		// file protocol - FILE object with last modified property
    		if (request.response && request.response.lastModified) {
    			date = request.response.lastModified;
    		}

    		// http protocol - check headers
    		if (date==null) {
    			date = request.getResponseHeader("Last-Modified");
    		}

    		return date;
    	}

    	self.updateLastModifiedLabel = function() {
    		var labelValue = "";

    		if (self.lastModifiedLabel==null) {
    			self.lastModifiedLabel = document.getElementById("LastModifiedLabel");
    		}

    		if (self.lastModifiedLabel) {
    			var seconds = parseInt(((new Date().getTime() - Date.parse(document.lastModified)) / 1000 / 60) * 100 + "");
    			var minutes = 0;
    			var hours = 0;

    			if (seconds < 60) {
    				seconds = Math.floor(seconds/10)*10;
    				labelValue = seconds + " seconds";
    			}
    			else {
    				minutes = parseInt((seconds/60) + "");

    				if (minutes>60) {
    					hours = parseInt((seconds/60/60) +"");
    					labelValue += hours==1 ? " hour" : " hours";
    				}
    				else {
    					labelValue = minutes+"";
    					labelValue += minutes==1 ? " minute" : " minutes";
    				}
    			}

    			if (seconds<10) {
    				labelValue = "Updated now";
    			}
    			else {
    				labelValue = "Updated " + labelValue + " ago";
    			}

    			if (self.lastModifiedLabel.firstElementChild) {
    				self.lastModifiedLabel.firstElementChild.textContent = labelValue;

    			}
    			else if ("textContent" in self.lastModifiedLabel) {
    				self.lastModifiedLabel.textContent = labelValue;
    			}
    		}
    	}

    	self.getShortString = function(string, length) {
    		if (length==null) length = 30;
    		string = string!=null ? string.substr(0, length).replace(/\n/g, "") : "[String is null]";
    		return string;
    	}

    	self.getShortNumber = function(value, places) {
    		if (places==null || places<1) places = 4;
    		value = Math.round(value * Math.pow(10,places)) / Math.pow(10, places);
    		return value;
    	}

    	///////////////////////////////////////
    	// NAVIGATION CONTROLS
    	///////////////////////////////////////

    	self.updateViewLabel = function() {
    		var viewNavigationLabel = document.getElementById("ViewNavigationLabel");
    		var view = self.getVisibleView();
    		var viewIndex = view ? self.getViewIndex(view) : -1;
    		var viewName = view ? self.getViewPreferenceValue(view, self.prefix + "view-name") : null;
    		var viewId = view ? view.id : null;

    		if (viewNavigationLabel && view) {
    			if (viewName && viewName.indexOf('"')!=-1) {
    				viewName = viewName.replace(/"/g, "");
    			}

    			if (self.showViewName) {
    				viewNavigationLabel.textContent = viewName;
    				self.setTooltip(viewNavigationLabel, viewIndex + 1 + " of " + self.numberOfViews);
    			}
    			else {
    				viewNavigationLabel.textContent = viewIndex + 1 + " of " + self.numberOfViews;
    				self.setTooltip(viewNavigationLabel, viewName);
    			}

    		}
    	}

    	self.updateURL = function(view) {
    		view = view == null ? self.getVisibleView() : view;
    		var viewId = view ? view.id : null
    		var viewFragment = view ? "#"+ viewId : null;

    		if (viewId && self.viewIds.length>1 && self.enableDeepLinking) {

    			if (self.supportsPopState==false) {
    				self.setFragment(viewId);
    			}
    			else {
    				if (viewFragment!=window.location.hash) {

    					if (window.location.hash==null) {
    						window.history.replaceState({name:viewId}, null, viewFragment);
    					}
    					else {
    						window.history.pushState({name:viewId}, null, viewFragment);
    					}
    				}
    			}
    		}
    	}

    	self.updateURLState = function(view, stateName) {
    		stateName = view && (stateName=="" || stateName==null) ? self.getStateNameByViewId(view.id) : stateName;

    		if (self.supportsPopState==false) {
    			self.setFragment(stateName);
    		}
    		else {
    			if (stateName!=window.location.hash) {

    				if (window.location.hash==null) {
    					window.history.replaceState({name:view.viewId}, null, stateName);
    				}
    				else {
    					window.history.pushState({name:view.viewId}, null, stateName);
    				}
    			}
    		}
    	}

    	self.setFragment = function(value) {
    		window.location.hash = "#" + value;
    	}

    	self.setTooltip = function(element, value) {
    		// setting the tooltip in edge causes a page crash on hover
    		if (/Edge/.test(navigator.userAgent)) { return; }

    		if ("title" in element) {
    			element.title = value;
    		}
    	}

    	self.getStylesheetRules = function(styleSheet) {
    		try {
    			if (styleSheet) return styleSheet.cssRules || styleSheet.rules;

    			return document.styleSheets[0]["cssRules"] || document.styleSheets[0]["rules"];
    		}
    		catch (error) {
    			// ERRORS:
    			// SecurityError: The operation is insecure.
    			// Errors happen when script loads before stylesheet or loading an external css locally

    			// InvalidAccessError: A parameter or an operation is not supported by the underlying object
    			// Place script after stylesheet

    			console.log(error);
    			if (error.toString().indexOf("The operation is insecure")!=-1) {
    				console.log("Load the stylesheet before the script or load the stylesheet inline until it can be loaded on a server")
    			}
    			return [];
    		}
    	}

    	/**
    	 * If single page application hide all of the views.
    	 * @param {Number} selectedIndex if provided shows the view at index provided
    	 **/
    	self.hideViews = function(selectedIndex, animation) {
    		var rules = self.getStylesheetRules();
    		var queryIndex = 0;
    		var numberOfRules = rules!=null ? rules.length : 0;

    		// loop through rules and hide media queries except selected
    		for (var i=0;i<numberOfRules;i++) {
    			var rule = rules[i];

    			if (rule.media!=null) {

    				if (queryIndex==selectedIndex) {
    					self.currentQuery.mediaText = rule.conditionText;
    					self.currentQuery.index = selectedIndex;
    					self.currentQuery.rule = rule;
    					self.enableMediaQuery(rule);
    				}
    				else {
    					if (animation) {
    						self.fadeOut(rule)
    					}
    					else {
    						self.disableMediaQuery(rule);
    					}
    				}

    				queryIndex++;
    			}
    		}

    		self.numberOfViews = queryIndex;
    		self.updateViewLabel();
    		self.updateURL();

    		self.dispatchViewChange();

    		var view = self.getVisibleView();
    		var viewIndex = view ? self.getViewIndex(view) : -1;

    		return viewIndex==selectedIndex ? view : null;
    	}

    	/**
    	 * Hide view
    	 * @param {Object} view element to hide
    	 **/
    	self.hideView = function(view) {
    		var rule = view ? self.mediaQueryDictionary[view.id] : null;

    		if (rule) {
    			self.disableMediaQuery(rule);
    		}
    	}

    	/**
    	 * Hide overlay
    	 * @param {Object} overlay element to hide
    	 **/
    	self.hideOverlay = function(overlay) {
    		var rule = overlay ? self.mediaQueryDictionary[overlay.id] : null;

    		if (rule) {
    			self.disableMediaQuery(rule);

    			//if (self.showByMediaQuery) {
    				overlay.style.display = "none";
    			//}
    		}
    	}

    	/**
    	 * Show the view by media query. Does not hide current views
    	 * Sets view options by default
    	 * @param {Object} view element to show
    	 * @param {Boolean} setViewOptions sets view options if null or true
    	 */
    	self.showViewByMediaQuery = function(view, setViewOptions) {
    		var id = view ? view.id : null;
    		var query = id ? self.mediaQueryDictionary[id] : null;
    		var isOverlay = view ? self.isOverlay(view) : false;
    		setViewOptions = setViewOptions==null ? true : setViewOptions;

    		if (query) {
    			self.enableMediaQuery(query);

    			if (isOverlay && view && setViewOptions) {
    				self.setViewVariables(null, view);
    			}
    			else {
    				if (view && setViewOptions) self.setViewOptions(view);
    				if (view && setViewOptions) self.setViewVariables(view);
    			}
    		}
    	}

    	/**
    	 * Show the view. Does not hide current views
    	 */
    	self.showView = function(view, setViewOptions) {
    		var id = view ? view.id : null;
    		var query = id ? self.mediaQueryDictionary[id] : null;
    		var display = null;
    		setViewOptions = setViewOptions==null ? true : setViewOptions;

    		if (query) {
    			self.enableMediaQuery(query);
    			if (view==null) view =self.getVisibleView();
    			if (view && setViewOptions) self.setViewOptions(view);
    		}
    		else if (id) {
    			display = window.getComputedStyle(view).getPropertyValue("display");
    			if (display=="" || display=="none") {
    				view.style.display = "block";
    			}
    		}

    		if (view) {
    			if (self.currentView!=null) {
    				self.lastView = self.currentView;
    			}

    			self.currentView = view;
    		}
    	}

    	self.showViewById = function(id, setViewOptions) {
    		var view = id ? self.getViewById(id) : null;

    		if (view) {
    			self.showView(view);
    			return;
    		}

    		self.log("View not found '" + id + "'");
    	}

    	self.getElementView = function(element) {
    		var view = element;
    		var viewFound = false;

    		while (viewFound==false || view==null) {
    			if (view && self.viewsDictionary[view.id]) {
    				return view;
    			}
    			view = view.parentNode;
    		}
    	}

    	/**
    	 * Show overlay over view
    	 * @param {Event | HTMLElement} event event or html element with styles applied
    	 * @param {String} id id of view or view reference
    	 * @param {Number} x x location
    	 * @param {Number} y y location
    	 */
    	self.showOverlay = function(event, id, x, y) {
    		var overlay = id && typeof id === 'string' ? self.getViewById(id) : id ? id : null;
    		var query = overlay ? self.mediaQueryDictionary[overlay.id] : null;
    		var centerHorizontally = false;
    		var centerVertically = false;
    		var anchorLeft = false;
    		var anchorTop = false;
    		var anchorRight = false;
    		var anchorBottom = false;
    		var display = null;
    		var reparent = true;
    		var view = null;

    		if (overlay==null || overlay==false) {
    			self.log("Overlay not found, '"+ id + "'");
    			return;
    		}

    		// get enter animation - event target must have css variables declared
    		if (event) {
    			var button = event.currentTarget || event; // can be event or htmlelement
    			var buttonComputedStyles = getComputedStyle(button);
    			var actionTargetValue = buttonComputedStyles.getPropertyValue(self.prefix+"action-target").trim();
    			var animation = buttonComputedStyles.getPropertyValue(self.prefix+"animation").trim();
    			var isAnimated = animation!="";
    			var targetType = buttonComputedStyles.getPropertyValue(self.prefix+"action-type").trim();
    			var actionTarget = self.application ? null : self.getElement(actionTargetValue);
    			var actionTargetStyles = actionTarget ? actionTarget.style : null;

    			if (actionTargetStyles) {
    				actionTargetStyles.setProperty("animation", animation);
    			}

    			if ("stopImmediatePropagation" in event) {
    				event.stopImmediatePropagation();
    			}
    		}

    		if (self.application==false || targetType=="page") {
    			document.location.href = "./" + actionTargetValue;
    			return;
    		}

    		// remove any current overlays
    		if (self.currentOverlay) {

    			// act as switch if same button
    			if (self.currentOverlay==actionTarget || self.currentOverlay==null) {
    				if (self.lastTrigger==button) {
    					self.removeOverlay(isAnimated);
    					return;
    				}
    			}
    			else {
    				self.removeOverlay(isAnimated);
    			}
    		}

    		if (reparent) {
    			view = self.getElementView(button);
    			if (view) {
    				view.appendChild(overlay);
    			}
    		}

    		if (query) {
    			//self.setElementAnimation(overlay, null);
    			//overlay.style.animation = animation;
    			self.enableMediaQuery(query);

    			var display = overlay && overlay.style.display;

    			if (overlay && display=="" || display=="none") {
    				overlay.style.display = "block";
    				//self.setViewOptions(overlay);
    			}

    			// add animation defined in event target style declaration
    			if (animation && self.supportAnimations) {
    				self.fadeIn(overlay, false, animation);
    			}
    		}
    		else if (id) {

    			display = window.getComputedStyle(overlay).getPropertyValue("display");

    			if (display=="" || display=="none") {
    				overlay.style.display = "block";
    			}

    			// add animation defined in event target style declaration
    			if (animation && self.supportAnimations) {
    				self.fadeIn(overlay, false, animation);
    			}
    		}

    		// do not set x or y position if centering
    		var horizontal = self.prefix + "center-horizontally";
    		var vertical = self.prefix + "center-vertically";
    		var style = overlay.style;
    		var transform = [];

    		centerHorizontally = self.getIsStyleDefined(id, horizontal) ? self.getViewPreferenceBoolean(overlay, horizontal) : false;
    		centerVertically = self.getIsStyleDefined(id, vertical) ? self.getViewPreferenceBoolean(overlay, vertical) : false;
    		anchorLeft = self.getIsStyleDefined(id, "left");
    		anchorRight = self.getIsStyleDefined(id, "right");
    		anchorTop = self.getIsStyleDefined(id, "top");
    		anchorBottom = self.getIsStyleDefined(id, "bottom");


    		if (self.viewsDictionary[overlay.id] && self.viewsDictionary[overlay.id].styleDeclaration) {
    			style = self.viewsDictionary[overlay.id].styleDeclaration.style;
    		}

    		if (centerHorizontally) {
    			style.left = "50%";
    			style.transformOrigin = "0 0";
    			transform.push("translateX(-50%)");
    		}
    		else if (anchorRight && anchorLeft) {
    			style.left = x + "px";
    		}
    		else if (anchorRight) {
    			//style.right = x + "px";
    		}
    		else {
    			style.left = x + "px";
    		}

    		if (centerVertically) {
    			style.top = "50%";
    			transform.push("translateY(-50%)");
    			style.transformOrigin = "0 0";
    		}
    		else if (anchorTop && anchorBottom) {
    			style.top = y + "px";
    		}
    		else if (anchorBottom) {
    			//style.bottom = y + "px";
    		}
    		else {
    			style.top = y + "px";
    		}

    		if (transform.length) {
    			style.transform = transform.join(" ");
    		}

    		self.currentOverlay = overlay;
    		self.lastTrigger = button;
    	}

    	self.goBack = function() {
    		if (self.currentOverlay) {
    			self.removeOverlay();
    		}
    		else if (self.lastView) {
    			self.goToView(self.lastView.id);
    		}
    	}

    	self.removeOverlay = function(animate) {
    		var overlay = self.currentOverlay;
    		animate = animate===false ? false : true;

    		if (overlay) {
    			var style = overlay.style;

    			if (style.animation && self.supportAnimations && animate) {
    				self.reverseAnimation(overlay, true);

    				var duration = self.getAnimationDuration(style.animation, true);

    				setTimeout(function() {
    					self.setElementAnimation(overlay, null);
    					self.hideOverlay(overlay);
    					self.currentOverlay = null;
    				}, duration);
    			}
    			else {
    				self.setElementAnimation(overlay, null);
    				self.hideOverlay(overlay);
    				self.currentOverlay = null;
    			}
    		}
    	}

    	/**
    	 * Reverse the animation and hide after
    	 * @param {Object} target element with animation
    	 * @param {Boolean} hide hide after animation ends
    	 */
    	self.reverseAnimation = function(target, hide) {
    		var lastAnimation = null;
    		var style = target.style;

    		style.animationPlayState = "paused";
    		lastAnimation = style.animation;
    		style.animation = null;
    		style.animationPlayState = "paused";

    		if (hide) {
    			//target.addEventListener("animationend", self.animationEndHideHandler);

    			var duration = self.getAnimationDuration(lastAnimation, true);
    			var isOverlay = self.isOverlay(target);

    			setTimeout(function() {
    				self.setElementAnimation(target, null);

    				if (isOverlay) {
    					self.hideOverlay(target);
    				}
    				else {
    					self.hideView(target);
    				}
    			}, duration);
    		}

    		setTimeout(function() {
    			style.animation = lastAnimation;
    			style.animationPlayState = "paused";
    			style.animationDirection = "reverse";
    			style.animationPlayState = "running";
    		}, 30);
    	}

    	self.animationEndHandler = function(event) {
    		var target = event.currentTarget;
    		self.dispatchEvent(new Event(event.type));
    	}

    	self.isOverlay = function(view) {
    		var result = view ? self.getViewPreferenceBoolean(view, self.prefix + "is-overlay") : false;

    		return result;
    	}

    	self.animationEndHideHandler = function(event) {
    		var target = event.currentTarget;
    		self.setViewVariables(null, target);
    		self.hideView(target);
    		target.removeEventListener("animationend", self.animationEndHideHandler);
    	}

    	self.animationEndShowHandler = function(event) {
    		var target = event.currentTarget;
    		target.removeEventListener("animationend", self.animationEndShowHandler);
    	}

    	self.setViewOptions = function(view) {

    		if (view) {
    			self.minimumScale = self.getViewPreferenceValue(view, self.prefix + "minimum-scale");
    			self.maximumScale = self.getViewPreferenceValue(view, self.prefix + "maximum-scale");
    			self.scaleViewsToFit = self.getViewPreferenceBoolean(view, self.prefix + "scale-to-fit");
    			self.scaleToFitType = self.getViewPreferenceValue(view, self.prefix + "scale-to-fit-type");
    			self.scaleToFitOnDoubleClick = self.getViewPreferenceBoolean(view, self.prefix + "scale-on-double-click");
    			self.actualSizeOnDoubleClick = self.getViewPreferenceBoolean(view, self.prefix + "actual-size-on-double-click");
    			self.scaleViewsOnResize = self.getViewPreferenceBoolean(view, self.prefix + "scale-on-resize");
    			self.enableScaleUp = self.getViewPreferenceBoolean(view, self.prefix + "enable-scale-up");
    			self.centerHorizontally = self.getViewPreferenceBoolean(view, self.prefix + "center-horizontally");
    			self.centerVertically = self.getViewPreferenceBoolean(view, self.prefix + "center-vertically");
    			self.navigationOnKeypress = self.getViewPreferenceBoolean(view, self.prefix + "navigate-on-keypress");
    			self.showViewName = self.getViewPreferenceBoolean(view, self.prefix + "show-view-name");
    			self.refreshPageForChanges = self.getViewPreferenceBoolean(view, self.prefix + "refresh-for-changes");
    			self.refreshPageForChangesInterval = self.getViewPreferenceValue(view, self.prefix + "refresh-interval");
    			self.showNavigationControls = self.getViewPreferenceBoolean(view, self.prefix + "show-navigation-controls");
    			self.scaleViewSlider = self.getViewPreferenceBoolean(view, self.prefix + "show-scale-controls");
    			self.enableDeepLinking = self.getViewPreferenceBoolean(view, self.prefix + "enable-deep-linking");
    			self.singlePageApplication = self.getViewPreferenceBoolean(view, self.prefix + "application");
    			self.showByMediaQuery = self.getViewPreferenceBoolean(view, self.prefix + "show-by-media-query");
    			self.showUpdateNotification = document.cookie!="" ? document.cookie.indexOf(self.pageRefreshedName)!=-1 : false;
    			self.imageComparisonDuration = self.getViewPreferenceValue(view, self.prefix + "image-comparison-duration");
    			self.supportAnimations = self.getViewPreferenceBoolean(view, self.prefix + "enable-animations", true);

    			if (self.scaleViewsToFit) {
    				var newScaleValue = self.scaleViewToFit(view);

    				if (newScaleValue<0) {
    					setTimeout(self.scaleViewToFit, 500, view);
    				}
    			}
    			else {
    				self.viewScale = self.getViewScaleValue(view);
    				self.viewToFitWidthScale = self.getViewFitToViewportWidthScale(view, self.enableScaleUp)
    				self.viewToFitHeightScale = self.getViewFitToViewportScale(view, self.enableScaleUp);
    				self.updateSliderValue(self.viewScale);
    			}

    			if (self.imageComparisonDuration!=null) {
    				// todo
    			}

    			if (self.refreshPageForChangesInterval!=null) {
    				self.refreshDuration = Number(self.refreshPageForChangesInterval);
    			}
    		}
    	}

    	self.previousView = function(event) {
    		var rules = self.getStylesheetRules();
    		var view = self.getVisibleView()
    		var index = view ? self.getViewIndex(view) : -1;
    		var prevQueryIndex = index!=-1 ? index-1 : self.currentQuery.index-1;
    		var queryIndex = 0;
    		var numberOfRules = rules!=null ? rules.length : 0;

    		if (event) {
    			event.stopImmediatePropagation();
    		}

    		if (prevQueryIndex<0) {
    			return;
    		}

    		// loop through rules and hide media queries except selected
    		for (var i=0;i<numberOfRules;i++) {
    			var rule = rules[i];

    			if (rule.media!=null) {

    				if (queryIndex==prevQueryIndex) {
    					self.currentQuery.mediaText = rule.conditionText;
    					self.currentQuery.index = prevQueryIndex;
    					self.currentQuery.rule = rule;
    					self.enableMediaQuery(rule);
    					self.updateViewLabel();
    					self.updateURL();
    					self.dispatchViewChange();
    				}
    				else {
    					self.disableMediaQuery(rule);
    				}

    				queryIndex++;
    			}
    		}
    	}

    	self.nextView = function(event) {
    		var rules = self.getStylesheetRules();
    		var view = self.getVisibleView();
    		var index = view ? self.getViewIndex(view) : -1;
    		var nextQueryIndex = index!=-1 ? index+1 : self.currentQuery.index+1;
    		var queryIndex = 0;
    		var numberOfRules = rules!=null ? rules.length : 0;
    		var numberOfMediaQueries = self.getNumberOfMediaRules();

    		if (event) {
    			event.stopImmediatePropagation();
    		}

    		if (nextQueryIndex>=numberOfMediaQueries) {
    			return;
    		}

    		// loop through rules and hide media queries except selected
    		for (var i=0;i<numberOfRules;i++) {
    			var rule = rules[i];

    			if (rule.media!=null) {

    				if (queryIndex==nextQueryIndex) {
    					self.currentQuery.mediaText = rule.conditionText;
    					self.currentQuery.index = nextQueryIndex;
    					self.currentQuery.rule = rule;
    					self.enableMediaQuery(rule);
    					self.updateViewLabel();
    					self.updateURL();
    					self.dispatchViewChange();
    				}
    				else {
    					self.disableMediaQuery(rule);
    				}

    				queryIndex++;
    			}
    		}
    	}

    	/**
    	 * Enables a view via media query
    	 */
    	self.enableMediaQuery = function(rule) {

    		try {
    			rule.media.mediaText = self.inclusionQuery;
    		}
    		catch(error) {
    			//self.log(error);
    			rule.conditionText = self.inclusionQuery;
    		}
    	}

    	self.disableMediaQuery = function(rule) {

    		try {
    			rule.media.mediaText = self.exclusionQuery;
    		}
    		catch(error) {
    			rule.conditionText = self.exclusionQuery;
    		}
    	}

    	self.dispatchViewChange = function() {
    		try {
    			var event = new Event(self.NAVIGATION_CHANGE);
    			window.dispatchEvent(event);
    		}
    		catch (error) {
    			// In IE 11: Object doesn't support this action
    		}
    	}

    	self.getNumberOfMediaRules = function() {
    		var rules = self.getStylesheetRules();
    		var numberOfRules = rules ? rules.length : 0;
    		var numberOfQueries = 0;

    		for (var i=0;i<numberOfRules;i++) {
    			if (rules[i].media!=null) { numberOfQueries++; }
    		}

    		return numberOfQueries;
    	}

    	/////////////////////////////////////////
    	// VIEW SCALE
    	/////////////////////////////////////////

    	self.sliderChangeHandler = function(event) {
    		var value = self.getShortNumber(event.currentTarget.value/100);
    		var view = self.getVisibleView();
    		self.setViewScaleValue(view, false, value, true);
    	}

    	self.updateSliderValue = function(scale) {
    		var slider = document.getElementById(self.viewScaleSliderId);
    		var tooltip = parseInt(scale * 100 + "") + "%";
    		var inputType;
    		var inputValue;

    		if (slider) {
    			inputValue = self.getShortNumber(scale * 100);
    			if (inputValue!=slider["value"]) {
    				slider["value"] = inputValue;
    			}
    			inputType = slider.getAttributeNS(null, "type");

    			if (inputType!="range") {
    				// input range is not supported
    				slider.style.display = "none";
    			}

    			self.setTooltip(slider, tooltip);
    		}
    	}

    	self.viewChangeHandler = function(event) {
    		var view = self.getVisibleView();
    		var matrix = view ? getComputedStyle(view).transform : null;

    		if (matrix) {
    			self.viewScale = self.getViewScaleValue(view);

    			var scaleNeededToFit = self.getViewFitToViewportScale(view);
    			var isViewLargerThanViewport = scaleNeededToFit<1;

    			// scale large view to fit if scale to fit is enabled
    			if (self.scaleViewsToFit) {
    				self.scaleViewToFit(view);
    			}
    			else {
    				self.updateSliderValue(self.viewScale);
    			}
    		}
    	}

    	self.getViewScaleValue = function(view) {
    		var matrix = getComputedStyle(view).transform;

    		if (matrix) {
    			var matrixArray = matrix.replace("matrix(", "").split(",");
    			var scaleX = parseFloat(matrixArray[0]);
    			var scaleY = parseFloat(matrixArray[3]);
    			var scale = Math.min(scaleX, scaleY);
    		}

    		return scale;
    	}

    	/**
    	 * Scales view to scale.
    	 * @param {Object} view view to scale. views are in views array
    	 * @param {Boolean} scaleToFit set to true to scale to fit. set false to use desired scale value
    	 * @param {Number} desiredScale scale to define. not used if scale to fit is false
    	 * @param {Boolean} isSliderChange indicates if slider is callee
    	 */
    	self.setViewScaleValue = function(view, scaleToFit, desiredScale, isSliderChange) {
    		var enableScaleUp = self.enableScaleUp;
    		var scaleToFitType = self.scaleToFitType;
    		var minimumScale = self.minimumScale;
    		var maximumScale = self.maximumScale;
    		var hasMinimumScale = !isNaN(minimumScale) && minimumScale!="";
    		var hasMaximumScale = !isNaN(maximumScale) && maximumScale!="";
    		var scaleNeededToFit = self.getViewFitToViewportScale(view, enableScaleUp);
    		var scaleNeededToFitWidth = self.getViewFitToViewportWidthScale(view, enableScaleUp);
    		var scaleNeededToFitHeight = self.getViewFitToViewportHeightScale(view, enableScaleUp);
    		var scaleToFitFull = self.getViewFitToViewportScale(view, true);
    		var scaleToFitFullWidth = self.getViewFitToViewportWidthScale(view, true);
    		var scaleToFitFullHeight = self.getViewFitToViewportHeightScale(view, true);
    		var scaleToWidth = scaleToFitType=="width";
    		var scaleToHeight = scaleToFitType=="height";
    		var shrunkToFit = false;
    		var topPosition = null;
    		var leftPosition = null;
    		var translateY = null;
    		var translateX = null;
    		var transformValue = "";
    		var canCenterVertically = true;
    		var canCenterHorizontally = true;
    		var style = view.style;

    		if (view && self.viewsDictionary[view.id] && self.viewsDictionary[view.id].styleDeclaration) {
    			style = self.viewsDictionary[view.id].styleDeclaration.style;
    		}

    		if (scaleToFit && isSliderChange!=true) {
    			if (scaleToFitType=="fit" || scaleToFitType=="") {
    				desiredScale = scaleNeededToFit;
    			}
    			else if (scaleToFitType=="width") {
    				desiredScale = scaleNeededToFitWidth;
    			}
    			else if (scaleToFitType=="height") {
    				desiredScale = scaleNeededToFitHeight;
    			}
    		}
    		else {
    			if (isNaN(desiredScale)) {
    				desiredScale = 1;
    			}
    		}

    		self.updateSliderValue(desiredScale);

    		// scale to fit width
    		if (scaleToWidth && scaleToHeight==false) {
    			canCenterVertically = scaleNeededToFitHeight>=scaleNeededToFitWidth;
    			canCenterHorizontally = scaleNeededToFitWidth>=1 && enableScaleUp==false;

    			if (isSliderChange) {
    				canCenterHorizontally = desiredScale<scaleToFitFullWidth;
    			}
    			else if (scaleToFit) {
    				desiredScale = scaleNeededToFitWidth;
    			}

    			if (hasMinimumScale) {
    				desiredScale = Math.max(desiredScale, Number(minimumScale));
    			}

    			if (hasMaximumScale) {
    				desiredScale = Math.min(desiredScale, Number(maximumScale));
    			}

    			desiredScale = self.getShortNumber(desiredScale);

    			canCenterHorizontally = self.canCenterHorizontally(view, "width", enableScaleUp, desiredScale, minimumScale, maximumScale);
    			canCenterVertically = self.canCenterVertically(view, "width", enableScaleUp, desiredScale, minimumScale, maximumScale);

    			if (desiredScale>1 && (enableScaleUp || isSliderChange)) {
    				transformValue = "scale(" + desiredScale + ")";
    			}
    			else if (desiredScale>=1 && enableScaleUp==false) {
    				transformValue = "scale(" + 1 + ")";
    			}
    			else {
    				transformValue = "scale(" + desiredScale + ")";
    			}

    			if (self.centerVertically) {
    				if (canCenterVertically) {
    					translateY = "-50%";
    					topPosition = "50%";
    				}
    				else {
    					translateY = "0";
    					topPosition = "0";
    				}

    				if (style.top != topPosition) {
    					style.top = topPosition + "";
    				}

    				if (canCenterVertically) {
    					transformValue += " translateY(" + translateY+ ")";
    				}
    			}

    			if (self.centerHorizontally) {
    				if (canCenterHorizontally) {
    					translateX = "-50%";
    					leftPosition = "50%";
    				}
    				else {
    					translateX = "0";
    					leftPosition = "0";
    				}

    				if (style.left != leftPosition) {
    					style.left = leftPosition + "";
    				}

    				if (canCenterHorizontally) {
    					transformValue += " translateX(" + translateX+ ")";
    				}
    			}

    			style.transformOrigin = "0 0";
    			style.transform = transformValue;

    			self.viewScale = desiredScale;
    			self.viewToFitWidthScale = scaleNeededToFitWidth;
    			self.viewToFitHeightScale = scaleNeededToFitHeight;
    			self.viewLeft = leftPosition;
    			self.viewTop = topPosition;

    			return desiredScale;
    		}

    		// scale to fit height
    		if (scaleToHeight && scaleToWidth==false) {
    			//canCenterVertically = scaleNeededToFitHeight>=scaleNeededToFitWidth;
    			//canCenterHorizontally = scaleNeededToFitHeight<=scaleNeededToFitWidth && enableScaleUp==false;
    			canCenterVertically = scaleNeededToFitHeight>=scaleNeededToFitWidth;
    			canCenterHorizontally = scaleNeededToFitWidth>=1 && enableScaleUp==false;

    			if (isSliderChange) {
    				canCenterHorizontally = desiredScale<scaleToFitFullHeight;
    			}
    			else if (scaleToFit) {
    				desiredScale = scaleNeededToFitHeight;
    			}

    			if (hasMinimumScale) {
    				desiredScale = Math.max(desiredScale, Number(minimumScale));
    			}

    			if (hasMaximumScale) {
    				desiredScale = Math.min(desiredScale, Number(maximumScale));
    				//canCenterVertically = desiredScale>=scaleNeededToFitHeight && enableScaleUp==false;
    			}

    			desiredScale = self.getShortNumber(desiredScale);

    			canCenterHorizontally = self.canCenterHorizontally(view, "height", enableScaleUp, desiredScale, minimumScale, maximumScale);
    			canCenterVertically = self.canCenterVertically(view, "height", enableScaleUp, desiredScale, minimumScale, maximumScale);

    			if (desiredScale>1 && (enableScaleUp || isSliderChange)) {
    				transformValue = "scale(" + desiredScale + ")";
    			}
    			else if (desiredScale>=1 && enableScaleUp==false) {
    				transformValue = "scale(" + 1 + ")";
    			}
    			else {
    				transformValue = "scale(" + desiredScale + ")";
    			}

    			if (self.centerHorizontally) {
    				if (canCenterHorizontally) {
    					translateX = "-50%";
    					leftPosition = "50%";
    				}
    				else {
    					translateX = "0";
    					leftPosition = "0";
    				}

    				if (style.left != leftPosition) {
    					style.left = leftPosition + "";
    				}

    				if (canCenterHorizontally) {
    					transformValue += " translateX(" + translateX+ ")";
    				}
    			}

    			if (self.centerVertically) {
    				if (canCenterVertically) {
    					translateY = "-50%";
    					topPosition = "50%";
    				}
    				else {
    					translateY = "0";
    					topPosition = "0";
    				}

    				if (style.top != topPosition) {
    					style.top = topPosition + "";
    				}

    				if (canCenterVertically) {
    					transformValue += " translateY(" + translateY+ ")";
    				}
    			}

    			style.transformOrigin = "0 0";
    			style.transform = transformValue;

    			self.viewScale = desiredScale;
    			self.viewToFitWidthScale = scaleNeededToFitWidth;
    			self.viewToFitHeightScale = scaleNeededToFitHeight;
    			self.viewLeft = leftPosition;
    			self.viewTop = topPosition;

    			return scaleNeededToFitHeight;
    		}

    		if (scaleToFitType=="fit") {
    			//canCenterVertically = scaleNeededToFitHeight>=scaleNeededToFitWidth;
    			//canCenterHorizontally = scaleNeededToFitWidth>=scaleNeededToFitHeight;
    			canCenterVertically = scaleNeededToFitHeight>=scaleNeededToFit;
    			canCenterHorizontally = scaleNeededToFitWidth>=scaleNeededToFit;

    			if (hasMinimumScale) {
    				desiredScale = Math.max(desiredScale, Number(minimumScale));
    			}

    			desiredScale = self.getShortNumber(desiredScale);

    			if (isSliderChange || scaleToFit==false) {
    				canCenterVertically = scaleToFitFullHeight>=desiredScale;
    				canCenterHorizontally = desiredScale<scaleToFitFullWidth;
    			}
    			else if (scaleToFit) {
    				desiredScale = scaleNeededToFit;
    			}

    			transformValue = "scale(" + desiredScale + ")";

    			//canCenterHorizontally = self.canCenterHorizontally(view, "fit", false, desiredScale);
    			//canCenterVertically = self.canCenterVertically(view, "fit", false, desiredScale);

    			if (self.centerVertically) {
    				if (canCenterVertically) {
    					translateY = "-50%";
    					topPosition = "50%";
    				}
    				else {
    					translateY = "0";
    					topPosition = "0";
    				}

    				if (style.top != topPosition) {
    					style.top = topPosition + "";
    				}

    				if (canCenterVertically) {
    					transformValue += " translateY(" + translateY+ ")";
    				}
    			}

    			if (self.centerHorizontally) {
    				if (canCenterHorizontally) {
    					translateX = "-50%";
    					leftPosition = "50%";
    				}
    				else {
    					translateX = "0";
    					leftPosition = "0";
    				}

    				if (style.left != leftPosition) {
    					style.left = leftPosition + "";
    				}

    				if (canCenterHorizontally) {
    					transformValue += " translateX(" + translateX+ ")";
    				}
    			}

    			style.transformOrigin = "0 0";
    			style.transform = transformValue;

    			self.viewScale = desiredScale;
    			self.viewToFitWidthScale = scaleNeededToFitWidth;
    			self.viewToFitHeightScale = scaleNeededToFitHeight;
    			self.viewLeft = leftPosition;
    			self.viewTop = topPosition;

    			self.updateSliderValue(desiredScale);

    			return desiredScale;
    		}

    		if (scaleToFitType=="default" || scaleToFitType=="") {
    			desiredScale = 1;

    			if (hasMinimumScale) {
    				desiredScale = Math.max(desiredScale, Number(minimumScale));
    			}
    			if (hasMaximumScale) {
    				desiredScale = Math.min(desiredScale, Number(maximumScale));
    			}

    			canCenterHorizontally = self.canCenterHorizontally(view, "none", false, desiredScale, minimumScale, maximumScale);
    			canCenterVertically = self.canCenterVertically(view, "none", false, desiredScale, minimumScale, maximumScale);

    			if (self.centerVertically) {
    				if (canCenterVertically) {
    					translateY = "-50%";
    					topPosition = "50%";
    				}
    				else {
    					translateY = "0";
    					topPosition = "0";
    				}

    				if (style.top != topPosition) {
    					style.top = topPosition + "";
    				}

    				if (canCenterVertically) {
    					transformValue += " translateY(" + translateY+ ")";
    				}
    			}

    			if (self.centerHorizontally) {
    				if (canCenterHorizontally) {
    					translateX = "-50%";
    					leftPosition = "50%";
    				}
    				else {
    					translateX = "0";
    					leftPosition = "0";
    				}

    				if (style.left != leftPosition) {
    					style.left = leftPosition + "";
    				}

    				if (canCenterHorizontally) {
    					transformValue += " translateX(" + translateX+ ")";
    				}
    				else {
    					transformValue += " translateX(" + 0 + ")";
    				}
    			}

    			style.transformOrigin = "0 0";
    			style.transform = transformValue;


    			self.viewScale = desiredScale;
    			self.viewToFitWidthScale = scaleNeededToFitWidth;
    			self.viewToFitHeightScale = scaleNeededToFitHeight;
    			self.viewLeft = leftPosition;
    			self.viewTop = topPosition;

    			self.updateSliderValue(desiredScale);

    			return desiredScale;
    		}
    	}

    	/**
    	 * Returns true if view can be centered horizontally
    	 * @param {HTMLElement} view view
    	 * @param {String} type type of scaling - width, height, all, none
    	 * @param {Boolean} scaleUp if scale up enabled
    	 * @param {Number} scale target scale value
    	 */
    	self.canCenterHorizontally = function(view, type, scaleUp, scale, minimumScale, maximumScale) {
    		var scaleNeededToFit = self.getViewFitToViewportScale(view, scaleUp);
    		var scaleNeededToFitHeight = self.getViewFitToViewportHeightScale(view, scaleUp);
    		var scaleNeededToFitWidth = self.getViewFitToViewportWidthScale(view, scaleUp);
    		var canCenter = false;
    		var minScale;

    		type = type==null ? "none" : type;
    		scale = scale==null ? scale : scaleNeededToFitWidth;
    		scaleUp = scaleUp == null ? false : scaleUp;

    		if (type=="width") {

    			if (scaleUp && maximumScale==null) {
    				canCenter = false;
    			}
    			else if (scaleNeededToFitWidth>=1) {
    				canCenter = true;
    			}
    		}
    		else if (type=="height") {
    			minScale = Math.min(1, scaleNeededToFitHeight);
    			if (minimumScale!="" && maximumScale!="") {
    				minScale = Math.max(minimumScale, Math.min(maximumScale, scaleNeededToFitHeight));
    			}
    			else {
    				if (minimumScale!="") {
    					minScale = Math.max(minimumScale, scaleNeededToFitHeight);
    				}
    				if (maximumScale!="") {
    					minScale = Math.max(minimumScale, Math.min(maximumScale, scaleNeededToFitHeight));
    				}
    			}

    			if (scaleUp && maximumScale=="") {
    				canCenter = false;
    			}
    			else if (scaleNeededToFitWidth>=minScale) {
    				canCenter = true;
    			}
    		}
    		else if (type=="fit") {
    			canCenter = scaleNeededToFitWidth>=scaleNeededToFit;
    		}
    		else {
    			if (scaleUp) {
    				canCenter = false;
    			}
    			else if (scaleNeededToFitWidth>=1) {
    				canCenter = true;
    			}
    		}

    		self.horizontalScrollbarsNeeded = canCenter;

    		return canCenter;
    	}

    	/**
    	 * Returns true if view can be centered horizontally
    	 * @param {HTMLElement} view view to scale
    	 * @param {String} type type of scaling
    	 * @param {Boolean} scaleUp if scale up enabled
    	 * @param {Number} scale target scale value
    	 */
    	self.canCenterVertically = function(view, type, scaleUp, scale, minimumScale, maximumScale) {
    		var scaleNeededToFit = self.getViewFitToViewportScale(view, scaleUp);
    		var scaleNeededToFitWidth = self.getViewFitToViewportWidthScale(view, scaleUp);
    		var scaleNeededToFitHeight = self.getViewFitToViewportHeightScale(view, scaleUp);
    		var canCenter = false;
    		var minScale;

    		type = type==null ? "none" : type;
    		scale = scale==null ? 1 : scale;
    		scaleUp = scaleUp == null ? false : scaleUp;

    		if (type=="width") {
    			canCenter = scaleNeededToFitHeight>=scaleNeededToFitWidth;
    		}
    		else if (type=="height") {
    			minScale = Math.max(minimumScale, Math.min(maximumScale, scaleNeededToFit));
    			canCenter = scaleNeededToFitHeight>=minScale;
    		}
    		else if (type=="fit") {
    			canCenter = scaleNeededToFitHeight>=scaleNeededToFit;
    		}
    		else {
    			if (scaleUp) {
    				canCenter = false;
    			}
    			else if (scaleNeededToFitHeight>=1) {
    				canCenter = true;
    			}
    		}

    		self.verticalScrollbarsNeeded = canCenter;

    		return canCenter;
    	}

    	self.getViewFitToViewportScale = function(view, scaleUp) {
    		var enableScaleUp = scaleUp;
    		var availableWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    		var availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    		var elementWidth = parseFloat(getComputedStyle(view, "style").width);
    		var elementHeight = parseFloat(getComputedStyle(view, "style").height);
    		var newScale = 1;

    		// if element is not added to the document computed values are NaN
    		if (isNaN(elementWidth) || isNaN(elementHeight)) {
    			return newScale;
    		}

    		availableWidth -= self.horizontalPadding;
    		availableHeight -= self.verticalPadding;

    		if (enableScaleUp) {
    			newScale = Math.min(availableHeight/elementHeight, availableWidth/elementWidth);
    		}
    		else if (elementWidth > availableWidth || elementHeight > availableHeight) {
    			newScale = Math.min(availableHeight/elementHeight, availableWidth/elementWidth);
    		}

    		return newScale;
    	}

    	self.getViewFitToViewportWidthScale = function(view, scaleUp) {
    		// need to get browser viewport width when element
    		var isParentWindow = view && view.parentNode && view.parentNode===document.body;
    		var enableScaleUp = scaleUp;
    		var availableWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    		var elementWidth = parseFloat(getComputedStyle(view, "style").width);
    		var newScale = 1;

    		// if element is not added to the document computed values are NaN
    		if (isNaN(elementWidth)) {
    			return newScale;
    		}

    		availableWidth -= self.horizontalPadding;

    		if (enableScaleUp) {
    			newScale = availableWidth/elementWidth;
    		}
    		else if (elementWidth > availableWidth) {
    			newScale = availableWidth/elementWidth;
    		}

    		return newScale;
    	}

    	self.getViewFitToViewportHeightScale = function(view, scaleUp) {
    		var enableScaleUp = scaleUp;
    		var availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    		var elementHeight = parseFloat(getComputedStyle(view, "style").height);
    		var newScale = 1;

    		// if element is not added to the document computed values are NaN
    		if (isNaN(elementHeight)) {
    			return newScale;
    		}

    		availableHeight -= self.verticalPadding;

    		if (enableScaleUp) {
    			newScale = availableHeight/elementHeight;
    		}
    		else if (elementHeight > availableHeight) {
    			newScale = availableHeight/elementHeight;
    		}

    		return newScale;
    	}

    	self.keypressHandler = function(event) {
    		var rightKey = 39;
    		var leftKey = 37;

    		// listen for both events
    		if (event.type=="keypress") {
    			window.removeEventListener("keyup", self.keypressHandler);
    		}
    		else {
    			window.removeEventListener("keypress", self.keypressHandler);
    		}

    		if (self.showNavigationControls) {
    			if (self.navigationOnKeypress) {
    				if (event.keyCode==rightKey) {
    					self.nextView();
    				}
    				if (event.keyCode==leftKey) {
    					self.previousView();
    				}
    			}
    		}
    		else if (self.navigationOnKeypress) {
    			if (event.keyCode==rightKey) {
    				self.nextView();
    			}
    			if (event.keyCode==leftKey) {
    				self.previousView();
    			}
    		}
    	}

    	///////////////////////////////////
    	// GENERAL FUNCTIONS
    	///////////////////////////////////

    	self.getViewById = function(id) {
    		id = id ? id.replace("#", "") : "";
    		var view = self.viewIds.indexOf(id)!=-1 && self.getElement(id);
    		return view;
    	}

    	self.getViewIds = function() {
    		var viewIds = self.getViewPreferenceValue(document.body, self.prefix + "view-ids");
    		var viewId = null;

    		viewIds = viewIds!=null && viewIds!="" ? viewIds.split(",") : [];

    		if (viewIds.length==0) {
    			viewId = self.getViewPreferenceValue(document.body, self.prefix + "view-id");
    			viewIds = viewId ? [viewId] : [];
    		}

    		return viewIds;
    	}

    	self.getInitialViewId = function() {
    		var viewId = self.getViewPreferenceValue(document.body, self.prefix + "view-id");
    		return viewId;
    	}

    	self.getApplicationStylesheet = function() {
    		var stylesheetId = self.getViewPreferenceValue(document.body, self.prefix + "stylesheet-id");
    		self.applicationStylesheet = document.getElementById("applicationStylesheet");
    		return self.applicationStylesheet.sheet;
    	}

    	self.getVisibleView = function() {
    		var viewIds = self.getViewIds();

    		for (var i=0;i<viewIds.length;i++) {
    			var viewId = viewIds[i].replace(/[\#?\.?](.*)/, "$" + "1");
    			var view = self.getElement(viewId);
    			var postName = "_Class";

    			if (view==null && viewId && viewId.lastIndexOf(postName)!=-1) {
    				view = self.getElement(viewId.replace(postName, ""));
    			}

    			if (view) {
    				var display = getComputedStyle(view).display;

    				if (display=="block" || display=="flex") {
    					return view;
    				}
    			}
    		}

    		return null;
    	}

    	self.getVisibleViews = function() {
    		var viewIds = self.getViewIds();
    		var views = [];

    		for (var i=0;i<viewIds.length;i++) {
    			var viewId = viewIds[i].replace(/[\#?\.?](.*)/, "$" + "1");
    			var view = self.getElement(viewId);
    			var postName = "_Class";

    			if (view==null && viewId && viewId.lastIndexOf(postName)!=-1) {
    				view = self.getElement(viewId.replace(postName, ""));
    			}

    			if (view) {
    				var display = getComputedStyle(view).display;

    				if (display=="none") {
    					continue;
    				}

    				if (display=="block" || display=="flex") {
    					views.push(view);
    				}
    			}
    		}

    		return views;
    	}

    	self.getStateNameByViewId = function(id) {
    		var state = self.viewsDictionary[id];
    		return state && state.stateName;
    	}

    	self.getMatchingViews = function(ids) {
    		var views = self.addedViews.slice(0);
    		var matchingViews = [];

    		if (self.showByMediaQuery) {
    			for (let index = 0; index < views.length; index++) {
    				var viewId = views[index];
    				var state = self.viewsDictionary[viewId];
    				var rule = state && state.rule;
    				var matchResults = window.matchMedia(rule.conditionText);
    				var view = self.views[viewId];

    				if (matchResults.matches) {
    					if (ids==true) {
    						matchingViews.push(viewId);
    					}
    					else {
    						matchingViews.push(view);
    					}
    				}
    			}
    		}

    		return matchingViews;
    	}

    	self.ruleMatchesQuery = function(rule) {
    		var result = window.matchMedia(rule.conditionText);
    		return result.matches;
    	}

    	self.getViewsByStateName = function(stateName, matchQuery) {
    		var views = self.addedViews.slice(0);
    		var matchingViews = [];

    		if (self.showByMediaQuery) {

    			// find state name
    			for (let index = 0; index < views.length; index++) {
    				var viewId = views[index];
    				var state = self.viewsDictionary[viewId];
    				var rule = state.rule;
    				var mediaRule = state.mediaRule;
    				var view = self.views[viewId];
    				var viewStateName = self.getStyleRuleValue(mediaRule, self.STATE_NAME, state);
    				var stateFoundAtt = view.getAttribute(self.STATE_NAME)==state;
    				var matchesResults = false;

    				if (viewStateName==stateName) {
    					if (matchQuery) {
    						matchesResults = self.ruleMatchesQuery(rule);

    						if (matchesResults) {
    							matchingViews.push(view);
    						}
    					}
    					else {
    						matchingViews.push(view);
    					}
    				}
    			}
    		}

    		return matchingViews;
    	}

    	self.getInitialView = function() {
    		var viewId = self.getInitialViewId();
    		viewId = viewId.replace(/[\#?\.?](.*)/, "$" + "1");
    		var view = self.getElement(viewId);
    		var postName = "_Class";

    		if (view==null && viewId && viewId.lastIndexOf(postName)!=-1) {
    			view = self.getElement(viewId.replace(postName, ""));
    		}

    		return view;
    	}

    	self.getViewIndex = function(view) {
    		var viewIds = self.getViewIds();
    		var id = view ? view.id : null;
    		var index = id && viewIds ? viewIds.indexOf(id) : -1;

    		return index;
    	}

    	self.syncronizeViewToURL = function() {
    		var fragment = self.getHashFragment();

    		if (self.showByMediaQuery) {
    			var stateName = fragment;

    			if (stateName==null || stateName=="") {
    				var initialView = self.getInitialView();
    				stateName = initialView ? self.getStateNameByViewId(initialView.id) : null;
    			}

    			self.showMediaQueryViewsByState(stateName);
    			return;
    		}

    		var view = self.getViewById(fragment);
    		var index = view ? self.getViewIndex(view) : 0;
    		if (index==-1) index = 0;
    		var currentView = self.hideViews(index);

    		if (self.supportsPopState && currentView) {

    			if (fragment==null) {
    				window.history.replaceState({name:currentView.id}, null, "#"+ currentView.id);
    			}
    			else {
    				window.history.pushState({name:currentView.id}, null, "#"+ currentView.id);
    			}
    		}

    		self.setViewVariables(view);
    		return view;
    	}

    	/**
    	 * Set the currentView or currentOverlay properties and set the lastView or lastOverlay properties
    	 */
    	self.setViewVariables = function(view, overlay, parentView) {
    		if (view) {
    			if (self.currentView) {
    				self.lastView = self.currentView;
    			}
    			self.currentView = view;
    		}

    		if (overlay) {
    			if (self.currentOverlay) {
    				self.lastOverlay = self.currentOverlay;
    			}
    			self.currentOverlay = overlay;
    		}
    	}

    	self.getViewPreferenceBoolean = function(view, property, altValue) {
    		var computedStyle = window.getComputedStyle(view);
    		var value = computedStyle.getPropertyValue(property);
    		var type = typeof value;

    		if (value=="true" || (type=="string" && value.indexOf("true")!=-1)) {
    			return true;
    		}
    		else if (value=="" && arguments.length==3) {
    			return altValue;
    		}

    		return false;
    	}

    	self.getViewPreferenceValue = function(view, property, defaultValue) {
    		var value = window.getComputedStyle(view).getPropertyValue(property);

    		if (value===undefined) {
    			return defaultValue;
    		}

    		value = value.replace(/^[\s\"]*/, "");
    		value = value.replace(/[\s\"]*$/, "");
    		value = value.replace(/^[\s"]*(.*?)[\s"]*$/, function (match, capture) {
    			return capture;
    		});

    		return value;
    	}

    	self.getStyleRuleValue = function(cssRule, property) {
    		var value = cssRule ? cssRule.style.getPropertyValue(property) : null;

    		if (value===undefined) {
    			return null;
    		}

    		value = value.replace(/^[\s\"]*/, "");
    		value = value.replace(/[\s\"]*$/, "");
    		value = value.replace(/^[\s"]*(.*?)[\s"]*$/, function (match, capture) {
    			return capture;
    		});

    		return value;
    	}

    	/**
    	 * Get the first defined value of property. Returns empty string if not defined
    	 * @param {String} id id of element
    	 * @param {String} property
    	 */
    	self.getCSSPropertyValueForElement = function(id, property) {
    		var styleSheets = document.styleSheets;
    		var numOfStylesheets = styleSheets.length;
    		var values = [];
    		var selectorIDText = "#" + id;
    		var selectorClassText = "." + id + "_Class";
    		var value;

    		for(var i=0;i<numOfStylesheets;i++) {
    			var styleSheet = styleSheets[i];
    			var cssRules = self.getStylesheetRules(styleSheet);
    			var numOfCSSRules = cssRules.length;
    			var cssRule;

    			for (var j=0;j<numOfCSSRules;j++) {
    				cssRule = cssRules[j];

    				if (cssRule.media) {
    					var mediaRules = cssRule.cssRules;
    					var numOfMediaRules = mediaRules ? mediaRules.length : 0;

    					for(var k=0;k<numOfMediaRules;k++) {
    						var mediaRule = mediaRules[k];

    						if (mediaRule.selectorText==selectorIDText || mediaRule.selectorText==selectorClassText) {

    							if (mediaRule.style && mediaRule.style.getPropertyValue(property)!="") {
    								value = mediaRule.style.getPropertyValue(property);
    								values.push(value);
    							}
    						}
    					}
    				}
    				else {

    					if (cssRule.selectorText==selectorIDText || cssRule.selectorText==selectorClassText) {
    						if (cssRule.style && cssRule.style.getPropertyValue(property)!="") {
    							value = cssRule.style.getPropertyValue(property);
    							values.push(value);
    						}
    					}
    				}
    			}
    		}

    		return values.pop();
    	}

    	self.getIsStyleDefined = function(id, property) {
    		var value = self.getCSSPropertyValueForElement(id, property);
    		return value!==undefined && value!="";
    	}

    	self.collectViews = function() {
    		var viewIds = self.getViewIds();

    		for (let index = 0; index < viewIds.length; index++) {
    			const id = viewIds[index];
    			const view = self.getElement(id);
    			self.views[id] = view;
    		}

    		self.viewIds = viewIds;
    	}

    	self.collectOverlays = function() {
    		var viewIds = self.getViewIds();
    		var ids = [];

    		for (let index = 0; index < viewIds.length; index++) {
    			const id = viewIds[index];
    			const view = self.getViewById(id);
    			const isOverlay = view && self.isOverlay(view);

    			if (isOverlay) {
    				ids.push(id);
    				self.overlays[id] = view;
    			}
    		}

    		self.overlayIds = ids;
    	}

    	self.collectMediaQueries = function() {
    		var viewIds = self.getViewIds();
    		var styleSheet = self.getApplicationStylesheet();
    		var cssRules = self.getStylesheetRules(styleSheet);
    		var numOfCSSRules = cssRules ? cssRules.length : 0;
    		var cssRule;
    		var id = viewIds.length ? viewIds[0]: ""; // single view
    		var selectorIDText = "#" + id;
    		var selectorClassText = "." + id + "_Class";
    		var viewsNotFound = viewIds.slice();
    		var viewsFound = [];
    		var selectorText = null;
    		var property = self.prefix + "view-id";
    		var stateName = self.prefix + "state";
    		var stateValue;

    		for (var j=0;j<numOfCSSRules;j++) {
    			cssRule = cssRules[j];

    			if (cssRule.media) {
    				var mediaRules = cssRule.cssRules;
    				var numOfMediaRules = mediaRules ? mediaRules.length : 0;
    				var mediaViewInfoFound = false;
    				var mediaId = null;

    				for(var k=0;k<numOfMediaRules;k++) {
    					var mediaRule = mediaRules[k];

    					selectorText = mediaRule.selectorText;

    					if (selectorText==".mediaViewInfo" && mediaViewInfoFound==false) {

    						mediaId = self.getStyleRuleValue(mediaRule, property);
    						stateValue = self.getStyleRuleValue(mediaRule, stateName);

    						selectorIDText = "#" + mediaId;
    						selectorClassText = "." + mediaId + "_Class";

    						// prevent duplicates from load and domcontentloaded events
    						if (self.addedViews.indexOf(mediaId)==-1) {
    							self.addView(mediaId, cssRule, mediaRule, stateValue);
    						}

    						viewsFound.push(mediaId);

    						if (viewsNotFound.indexOf(mediaId)!=-1) {
    							viewsNotFound.splice(viewsNotFound.indexOf(mediaId));
    						}

    						mediaViewInfoFound = true;
    					}

    					if (selectorIDText==selectorText || selectorClassText==selectorText) {
    						var styleObject = self.viewsDictionary[mediaId];
    						if (styleObject) {
    							styleObject.styleDeclaration = mediaRule;
    						}
    						break;
    					}
    				}
    			}
    			else {
    				selectorText = cssRule.selectorText;

    				if (selectorText==null) continue;

    				selectorText = selectorText.replace(/[#|\s|*]?/g, "");

    				if (viewIds.indexOf(selectorText)!=-1) {
    					self.addView(selectorText, cssRule, null, stateValue);

    					if (viewsNotFound.indexOf(selectorText)!=-1) {
    						viewsNotFound.splice(viewsNotFound.indexOf(selectorText));
    					}

    					break;
    				}
    			}
    		}

    		if (viewsNotFound.length) {
    			console.log("Could not find the following views:" + viewsNotFound.join(",") + "");
    			console.log("Views found:" + viewsFound.join(",") + "");
    		}
    	}

    	/**
    	 * Adds a view. A view object contains the id of the view and the style rule
    	 * Use enableMediaQuery(rule) to enable
    	 * An array of view names are in self.addedViews array
    	 */
    	self.addView = function(viewId, cssRule, mediaRule, stateName) {
    		var state = {name:viewId, rule:cssRule, id:viewId, mediaRule:mediaRule, stateName:stateName};
    		self.addedViews.push(viewId);
    		self.viewsDictionary[viewId] = state;
    		self.mediaQueryDictionary[viewId] = cssRule;
    	}

    	self.hasView = function(name) {

    		if (self.addedViews.indexOf(name)!=-1) {
    			return true;
    		}
    		return false;
    	}

    	/**
    	 * Go to view by id. Views are added in addView()
    	 * @param {String} id id of view in current
    	 * @param {Boolean} maintainPreviousState if true then do not hide other views
    	 * @param {String} parent id of parent view
    	 */
    	self.goToView = function(id, maintainPreviousState, parent) {
    		var state = self.viewsDictionary[id];

    		if (state) {
    			if (maintainPreviousState==false || maintainPreviousState==null) {
    				self.hideViews();
    			}
    			self.enableMediaQuery(state.rule);
    			self.updateViewLabel();
    			self.updateURL();
    		}
    		else {
    			var event = new Event(self.STATE_NOT_FOUND);
    			self.stateName = id;
    			window.dispatchEvent(event);
    		}
    	}

    	/**
    	 * Go to the view in the event targets CSS variable
    	 */
    	self.goToTargetView = function(event) {
    		var button = event.currentTarget;
    		var buttonComputedStyles = getComputedStyle(button);
    		var actionTargetValue = buttonComputedStyles.getPropertyValue(self.prefix+"action-target").trim();
    		var animation = buttonComputedStyles.getPropertyValue(self.prefix+"animation").trim();
    		var targetType = buttonComputedStyles.getPropertyValue(self.prefix+"action-type").trim();
    		var targetView = self.application ? null : self.getElement(actionTargetValue);
    		var targetState = targetView ? self.getStateNameByViewId(targetView.id) : null;
    		var actionTargetStyles = targetView ? targetView.style : null;
    		var state = self.viewsDictionary[actionTargetValue];

    		// navigate to page
    		if (self.application==false || targetType=="page") {
    			document.location.href = "./" + actionTargetValue;
    			return;
    		}

    		// if view is found
    		if (targetView) {

    			if (self.currentOverlay) {
    				self.removeOverlay(false);
    			}

    			if (self.showByMediaQuery) {
    				var stateName = targetState;

    				if (stateName==null || stateName=="") {
    					var initialView = self.getInitialView();
    					stateName = initialView ? self.getStateNameByViewId(initialView.id) : null;
    				}
    				self.showMediaQueryViewsByState(stateName, event);
    				return;
    			}

    			// add animation set in event target style declaration
    			if (animation && self.supportAnimations) {
    				self.crossFade(self.currentView, targetView, false, animation);
    			}
    			else {
    				self.setViewVariables(self.currentView);
    				self.hideViews();
    				self.enableMediaQuery(state.rule);
    				self.scaleViewIfNeeded(targetView);
    				self.centerView(targetView);
    				self.updateViewLabel();
    				self.updateURL();
    			}
    		}
    		else {
    			var stateEvent = new Event(self.STATE_NOT_FOUND);
    			self.stateName = name;
    			window.dispatchEvent(stateEvent);
    		}

    		event.stopImmediatePropagation();
    	}

    	/**
    	 * Cross fade between views
    	 **/
    	self.crossFade = function(from, to, update, animation) {
    		var targetIndex = to.parentNode
    		var fromIndex = Array.prototype.slice.call(from.parentElement.children).indexOf(from);
    		var toIndex = Array.prototype.slice.call(to.parentElement.children).indexOf(to);

    		if (from.parentNode==to.parentNode) {
    			var reverse = self.getReverseAnimation(animation);
    			var duration = self.getAnimationDuration(animation, true);

    			// if target view is above (higher index)
    			// then fade in target view
    			// and after fade in then hide previous view instantly
    			if (fromIndex<toIndex) {
    				self.setElementAnimation(from, null);
    				self.setElementAnimation(to, null);
    				self.showViewByMediaQuery(to);
    				self.fadeIn(to, update, animation);

    				setTimeout(function() {
    					self.setElementAnimation(to, null);
    					self.setElementAnimation(from, null);
    					self.hideView(from);
    					self.updateURL();
    					self.setViewVariables(to);
    					self.updateViewLabel();
    				}, duration)
    			}
    			// if target view is on bottom
    			// then show target view instantly
    			// and fade out current view
    			else if (fromIndex>toIndex) {
    				self.setElementAnimation(to, null);
    				self.setElementAnimation(from, null);
    				self.showViewByMediaQuery(to);
    				self.fadeOut(from, update, reverse);

    				setTimeout(function() {
    					self.setElementAnimation(to, null);
    					self.setElementAnimation(from, null);
    					self.hideView(from);
    					self.updateURL();
    					self.setViewVariables(to);
    				}, duration)
    			}
    		}
    	}

    	self.fadeIn = function(element, update, animation) {
    		self.showViewByMediaQuery(element);

    		if (update) {
    			self.updateURL(element);

    			element.addEventListener("animationend", function(event) {
    				element.style.animation = null;
    				self.setViewVariables(element);
    				self.updateViewLabel();
    				element.removeEventListener("animationend", arguments.callee);
    			});
    		}

    		self.setElementAnimation(element, null);

    		element.style.animation = animation;
    	}

    	self.fadeOutCurrentView = function(animation, update) {
    		if (self.currentView) {
    			self.fadeOut(self.currentView, update, animation);
    		}
    		if (self.currentOverlay) {
    			self.fadeOut(self.currentOverlay, update, animation);
    		}
    	}

    	self.fadeOut = function(element, update, animation) {
    		if (update) {
    			element.addEventListener("animationend", function(event) {
    				element.style.animation = null;
    				self.hideView(element);
    				element.removeEventListener("animationend", arguments.callee);
    			});
    		}

    		element.style.animationPlayState = "paused";
    		element.style.animation = animation;
    		element.style.animationPlayState = "running";
    	}

    	self.getReverseAnimation = function(animation) {
    		if (animation && animation.indexOf("reverse")==-1) {
    			animation += " reverse";
    		}

    		return animation;
    	}

    	/**
    	 * Get duration in animation string
    	 * @param {String} animation animation value
    	 * @param {Boolean} inMilliseconds length in milliseconds if true
    	 */
    	self.getAnimationDuration = function(animation, inMilliseconds) {
    		var duration = 0;
    		var expression = /.+(\d\.\d)s.+/;

    		if (animation && animation.match(expression)) {
    			duration = parseFloat(animation.replace(expression, "$" + "1"));
    			if (duration && inMilliseconds) duration = duration * 1000;
    		}

    		return duration;
    	}

    	self.setElementAnimation = function(element, animation, priority) {
    		element.style.setProperty("animation", animation, "important");
    	}

    	self.getElement = function(id) {
    		var elementId = id ? id.trim() : id;
    		var element = elementId ? document.getElementById(elementId) : null;

    		return element;
    	}

    	self.getElementByClass = function(className) {
    		className = className ? className.trim() : className;
    		var elements = document.getElementsByClassName(className);

    		return elements.length ? elements[0] : null;
    	}

    	self.resizeHandler = function(event) {

    		if (self.showByMediaQuery) {
    			if (self.enableDeepLinking) {
    				var stateName = self.getHashFragment();

    				if (stateName==null || stateName=="") {
    					var initialView = self.getInitialView();
    					stateName = initialView ? self.getStateNameByViewId(initialView.id) : null;
    				}
    				self.showMediaQueryViewsByState(stateName, event);
    			}
    		}
    		else {
    			var visibleViews = self.getVisibleViews();

    			for (let index = 0; index < visibleViews.length; index++) {
    				var view = visibleViews[index];
    				self.scaleViewIfNeeded(view);
    			}
    		}

    		window.dispatchEvent(new Event(self.APPLICATION_RESIZE));
    	}

    	self.scaleViewIfNeeded = function(view) {

    		if (self.scaleViewsOnResize) {
    			if (view==null) {
    				view = self.getVisibleView();
    			}

    			var isViewScaled = view.getAttributeNS(null, self.SIZE_STATE_NAME)=="false" ? false : true;

    			if (isViewScaled) {
    				self.scaleViewToFit(view, true);
    			}
    			else {
    				self.scaleViewToActualSize(view);
    			}
    		}
    		else if (view) {
    			self.centerView(view);
    		}
    	}

    	self.centerView = function(view) {

    		if (self.scaleViewsToFit) {
    			self.scaleViewToFit(view, true);
    		}
    		else {
    			self.scaleViewToActualSize(view);  // for centering support for now
    		}
    	}

    	self.preventDoubleClick = function(event) {
    		event.stopImmediatePropagation();
    	}

    	self.getHashFragment = function() {
    		var value = window.location.hash ? window.location.hash.replace("#", "") : "";
    		return value;
    	}

    	self.showBlockElement = function(view) {
    		view.style.display = "block";
    	}

    	self.hideElement = function(view) {
    		view.style.display = "none";
    	}

    	self.showStateFunction = null;

    	self.showMediaQueryViewsByState = function(state, event) {
    		// browser will hide and show by media query (small, medium, large)
    		// but if multiple views exists at same size user may want specific view
    		// if showStateFunction is defined that is called with state fragment and user can show or hide each media matching view by returning true or false
    		// if showStateFunction is not defined and state is defined and view has a defined state that matches then show that and hide other matching views
    		// if no state is defined show view
    		// an viewChanging event is dispatched before views are shown or hidden that can be prevented

    		// get all matched queries
    		// if state name is specified then show that view and hide other views
    		// if no state name is defined then show
    		var matchedViews = self.getMatchingViews();
    		var matchMediaQuery = true;
    		var foundViews = self.getViewsByStateName(state, matchMediaQuery);
    		var showViews = [];
    		var hideViews = [];

    		// loop views that match media query
    		for (let index = 0; index < matchedViews.length; index++) {
    			var view = matchedViews[index];

    			// let user determine visible view
    			if (self.showStateFunction!=null) {
    				if (self.showStateFunction(view, state)) {
    					showViews.push(view);
    				}
    				else {
    					hideViews.push(view);
    				}
    			}
    			// state was defined so check if view matches state
    			else if (foundViews.length) {

    				if (foundViews.indexOf(view)!=-1) {
    					showViews.push(view);
    				}
    				else {
    					hideViews.push(view);
    				}
    			}
    			// if no state names are defined show view (define unused state name to exclude)
    			else if (state==null || state=="") {
    				showViews.push(view);
    			}
    		}

    		if (showViews.length) {
    			var viewChangingEvent = new Event(self.VIEW_CHANGING);
    			viewChangingEvent.showViews = showViews;
    			viewChangingEvent.hideViews = hideViews;
    			window.dispatchEvent(viewChangingEvent);

    			if (viewChangingEvent.defaultPrevented==false) {
    				for (var index = 0; index < hideViews.length; index++) {
    					var view = hideViews[index];

    					if (self.isOverlay(view)) {
    						self.removeOverlay(view);
    					}
    					else {
    						self.hideElement(view);
    					}
    				}

    				for (var index = 0; index < showViews.length; index++) {
    					var view = showViews[index];

    					if (index==showViews.length-1) {
    						self.clearDisplay(view);
    						self.setViewOptions(view);
    						self.setViewVariables(view);
    						self.centerView(view);
    						self.updateURLState(view, state);
    					}
    				}
    			}

    			var viewChangeEvent = new Event(self.VIEW_CHANGE);
    			viewChangeEvent.showViews = showViews;
    			viewChangeEvent.hideViews = hideViews;
    			window.dispatchEvent(viewChangeEvent);
    		}

    	}

    	self.clearDisplay = function(view) {
    		view.style.setProperty("display", null);
    	}

    	self.hashChangeHandler = function(event) {
    		var fragment = self.getHashFragment();
    		var view = self.getViewById(fragment);

    		if (self.showByMediaQuery) {
    			var stateName = fragment;

    			if (stateName==null || stateName=="") {
    				var initialView = self.getInitialView();
    				stateName = initialView ? self.getStateNameByViewId(initialView.id) : null;
    			}
    			self.showMediaQueryViewsByState(stateName);
    		}
    		else {
    			if (view) {
    				self.hideViews();
    				self.showView(view);
    				self.setViewVariables(view);
    				self.updateViewLabel();

    				window.dispatchEvent(new Event(self.VIEW_CHANGE));
    			}
    			else {
    				window.dispatchEvent(new Event(self.VIEW_NOT_FOUND));
    			}
    		}
    	}

    	self.popStateHandler = function(event) {
    		var state = event.state;
    		var fragment = state ? state.name : window.location.hash;
    		var view = self.getViewById(fragment);

    		if (view) {
    			self.hideViews();
    			self.showView(view);
    			self.updateViewLabel();
    		}
    		else {
    			window.dispatchEvent(new Event(self.VIEW_NOT_FOUND));
    		}
    	}

    	self.doubleClickHandler = function(event) {
    		var view = self.getVisibleView();
    		var scaleValue = view ? self.getViewScaleValue(view) : 1;
    		var scaleNeededToFit = view ? self.getViewFitToViewportScale(view) : 1;
    		var scaleNeededToFitWidth = view ? self.getViewFitToViewportWidthScale(view) : 1;
    		var scaleNeededToFitHeight = view ? self.getViewFitToViewportHeightScale(view) : 1;
    		var scaleToFitType = self.scaleToFitType;

    		// Three scenarios
    		// - scale to fit on double click
    		// - set scale to actual size on double click
    		// - switch between scale to fit and actual page size

    		if (scaleToFitType=="width") {
    			scaleNeededToFit = scaleNeededToFitWidth;
    		}
    		else if (scaleToFitType=="height") {
    			scaleNeededToFit = scaleNeededToFitHeight;
    		}

    		// if scale and actual size enabled then switch between
    		if (self.scaleToFitOnDoubleClick && self.actualSizeOnDoubleClick) {
    			var isViewScaled = view.getAttributeNS(null, self.SIZE_STATE_NAME);
    			var isScaled = false;

    			// if scale is not 1 then view needs scaling
    			if (scaleNeededToFit!=1) {

    				// if current scale is at 1 it is at actual size
    				// scale it to fit
    				if (scaleValue==1) {
    					self.scaleViewToFit(view);
    					isScaled = true;
    				}
    				else {
    					// scale is not at 1 so switch to actual size
    					self.scaleViewToActualSize(view);
    					isScaled = false;
    				}
    			}
    			else {
    				// view is smaller than viewport
    				// so scale to fit() is scale actual size
    				// actual size and scaled size are the same
    				// but call scale to fit to retain centering
    				self.scaleViewToFit(view);
    				isScaled = false;
    			}

    			view.setAttributeNS(null, self.SIZE_STATE_NAME, isScaled+"");
    			isViewScaled = view.getAttributeNS(null, self.SIZE_STATE_NAME);
    		}
    		else if (self.scaleToFitOnDoubleClick) {
    			self.scaleViewToFit(view);
    		}
    		else if (self.actualSizeOnDoubleClick) {
    			self.scaleViewToActualSize(view);
    		}

    	}

    	self.scaleViewToFit = function(view) {
    		return self.setViewScaleValue(view, true);
    	}

    	self.scaleViewToActualSize = function(view) {
    		self.setViewScaleValue(view, false, 1);
    	}

    	self.onloadHandler = function(event) {
    		self.initialize();
    	}

    	self.setElementHTML = function(id, value) {
    		var element = self.getElement(id);
    		element.innerHTML = value;
    	}

    	self.getStackArray = function(error) {
    		var value = "";

    		if (error==null) {
    		  try {
    			 error = new Error("Stack");
    		  }
    		  catch (e) {

    		  }
    		}

    		if ("stack" in error) {
    		  value = error.stack;
    		  var methods = value.split(/\n/g);

    		  var newArray = methods ? methods.map(function (value, index, array) {
    			 value = value.replace(/\@.*/,"");
    			 return value;
    		  }) : null;

    		  if (newArray && newArray[0].includes("getStackTrace")) {
    			 newArray.shift();
    		  }
    		  if (newArray && newArray[0].includes("getStackArray")) {
    			 newArray.shift();
    		  }
    		  if (newArray && newArray[0]=="") {
    			 newArray.shift();
    		  }

    			return newArray;
    		}

    		return null;
    	}

    	self.log = function(value) {
    		console.log.apply(this, [value]);
    	}

    	// initialize on load
    	// sometimes the body size is 0 so we call this now and again later
    	window.addEventListener("load", self.onloadHandler);
    	window.document.addEventListener("DOMContentLoaded", self.onloadHandler);
    }

    window.application = new Application();
    </script>
    </head>
    <body>
    <div id="Welcome_to_myG">
    	<source media="(min-width:650px)" srcset="https://myg-marketing.s3.amazonaws.com/welcome-email/Mask_Group_3%402x.png">
     <source media="(min-width:465px)" srcset="https://myg-marketing.s3.amazonaws.com/welcome-email/Mask_Group_3.png">
     <img id="Mask_Group_3" src="https://myg-marketing.s3.amazonaws.com/welcome-email/Mask_Group_3.png" alt="Gamer_bg" style="width:auto;">

    	</svg>
    	<svg class="Path_771" viewBox="0.5 0 799.603 366.55">
    		<path id="Path_771" d="M 0.5 0 L 0.5 366.5495300292969 L 800.1027221679688 219.7326507568359 L 800.1027221679688 0 L 0.5 0 Z">
    		</path>
    	</svg>
    	<svg class="Path_769" viewBox="1026.798 526.591 175 180.248">
    		<path id="Path_769" d="M 1199.57763671875 628.925537109375 C 1199.322265625 628.42138671875 1199.322265625 628.20166015625 1199.57080078125 627.610595703125 C 1203.22509765625 619.005126953125 1201.89990234375 611.12939453125 1195.63330078125 604.22021484375 C 1192.47119140625 600.73388671875 1188.533203125 597.873291015625 1183.22900390625 595.21484375 C 1172.98974609375 590.101318359375 1161.5927734375 586.83544921875 1147.35791015625 584.947509765625 C 1145.9970703125 584.779296875 1144.63623046875 585.09765625 1143.634765625 585.885498046875 C 1142.7080078125 586.620849609375 1142.123046875 587.6982421875 1141.98974609375 588.920166015625 C 1141.70068359375 591.670654296875 1143.4951171875 593.686279296875 1146.576171875 594.056884765625 C 1154.33056640625 594.9951171875 1161.95751953125 596.738037109375 1169.2373046875 599.23974609375 C 1175.44482421875 601.371337890625 1181.9375 604.005859375 1187.3056640625 608.830078125 C 1193.04443359375 613.978515625 1193.9248046875 619.074462890625 1190.25927734375 625.86767578125 C 1188.91552734375 628.363525390625 1189.7265625 630.35009765625 1190.5830078125 631.7919921875 C 1191.58544921875 633.483154296875 1192.23388671875 635.150634765625 1192.4599609375 636.610107421875 C 1193.05029296875 640.391845703125 1192.14111328125 644.20263671875 1189.74951171875 647.931884765625 C 1187.91357421875 650.79296875 1187.34619140625 653.45654296875 1187.861328125 656.838623046875 C 1188.73583984375 662.60107421875 1186.55859375 667.80126953125 1181.19580078125 672.718017578125 C 1179.8583984375 673.95166015625 1179.14013671875 675.289306640625 1178.955078125 676.928466796875 C 1178.1962890625 683.90087890625 1174.5703125 688.950927734375 1167.8701171875 692.367431640625 C 1161.53466796875 695.58740234375 1154.67822265625 696.59521484375 1149.408203125 697.110595703125 C 1140.08447265625 698.03125 1130.1875 697.90966796875 1120.01806640625 696.768798828125 C 1112.17724609375 695.876953125 1103.85498046875 694.60302734375 1096.11767578125 691.232421875 C 1085.734375 686.726806640625 1076.138671875 683.663330078125 1066.72802734375 681.804443359375 C 1066.7509765625 660.562255859375 1066.7509765625 639.320556640625 1066.5830078125 618.0263671875 C 1066.58837890625 618.020751953125 1066.67578125 617.97412109375 1066.9365234375 617.910400390625 C 1069.49072265625 617.314208984375 1071.5576171875 616.717529296875 1073.45166015625 616.034423828125 C 1078.958984375 614.053466796875 1083.00146484375 610.735107421875 1085.80419921875 605.893798828125 C 1091.03369140625 596.8828125 1097.18359375 588.61328125 1104.09814453125 581.299072265625 C 1112.1884765625 572.73388671875 1117.37158203125 562.1533203125 1120.00048828125 548.625244140625 C 1120.55126953125 545.770263671875 1121.12451171875 542.816650390625 1122.09716796875 540.117919921875 C 1123.03564453125 537.500244140625 1125.07373046875 536.046875 1128.14306640625 535.7919921875 C 1131.52490234375 535.508056640625 1134.22412109375 536.88671875 1136.66796875 540.1064453125 C 1138.84521484375 542.97900390625 1140.17724609375 546.511474609375 1140.72705078125 550.91845703125 C 1141.56689453125 557.601318359375 1140.18896484375 564.191650390625 1136.50537109375 571.060302734375 L 1134.95361328125 573.955810546875 C 1133.0888671875 577.4130859375 1131.2236328125 580.870361328125 1129.46923828125 584.3798828125 C 1126.83447265625 589.649658203125 1126.7998046875 594.9951171875 1129.365234375 600.264892578125 C 1131.201171875 604.041015625 1131.826171875 608.38427734375 1131.21826171875 613.190673828125 C 1130.7373046875 616.966796875 1129.1044921875 620.354248046875 1126.353515625 623.25 C 1124.49462890625 625.20751953125 1124.48876953125 627.952392578125 1126.3359375 629.764892578125 C 1128.212890625 631.589111328125 1131.00390625 631.4736328125 1132.97265625 629.51611328125 C 1133.3203125 629.17431640625 1133.65625 628.815185546875 1133.95751953125 628.44482421875 C 1141.3291015625 619.404541015625 1142.615234375 608.789306640625 1137.77978515625 596.8828125 C 1136.34326171875 593.3271484375 1136.470703125 590.42578125 1138.2197265625 587.1884765625 C 1140.7392578125 582.526611328125 1143.24658203125 577.870361328125 1145.63232421875 573.150634765625 C 1149.54736328125 565.396240234375 1150.890625 557.1845703125 1149.61669921875 548.735107421875 C 1148.44677734375 540.96337890625 1145.3837890625 535.073974609375 1140.26953125 530.724609375 C 1135.9384765625 527.04736328125 1129.8115234375 525.697998046875 1124.2802734375 527.18603515625 C 1119.00439453125 528.605224609375 1115.0205078125 532.432861328125 1113.07470703125 537.951904296875 C 1112.24609375 540.297607421875 1111.80029296875 542.7587890625 1111.3662109375 545.14453125 L 1111.0068359375 547.119384765625 C 1108.85302734375 558.163330078125 1105.26806640625 566.18994140625 1099.72607421875 572.363037109375 C 1090.74951171875 582.34716796875 1083.279296875 592.302001953125 1076.8798828125 602.783935546875 C 1074.7138671875 606.33984375 1070.8916015625 607.527099609375 1066.74560546875 608.5869140625 L 1066.7392578125 603.670166015625 C 1066.716796875 599.813232421875 1065.0546875 598.16845703125 1061.17431640625 598.16845703125 L 1032.55419921875 598.174560546875 C 1028.361328125 598.174560546875 1026.80322265625 599.73779296875 1026.80322265625 603.9306640625 L 1026.7978515625 648.41259765625 L 1026.80322265625 692.240234375 C 1026.80322265625 696.502685546875 1029.43896484375 697.39990234375 1031.64501953125 697.40576171875 C 1041.7275390625 697.428955078125 1051.8037109375 697.428955078125 1061.89794921875 697.40576171875 C 1064.8115234375 697.39990234375 1066.57177734375 695.708984375 1066.72802734375 692.76123046875 C 1066.7509765625 692.228515625 1066.7568359375 691.701416015625 1066.7509765625 691.134033203125 L 1072.11376953125 692.7265625 C 1076.91455078125 694.145263671875 1081.71533203125 695.570068359375 1086.47021484375 697.1220703125 C 1088.58984375 697.817138671875 1090.6689453125 698.645263671875 1092.75341796875 699.461669921875 C 1095.7470703125 700.648681640625 1098.84033203125 701.87060546875 1102.03662109375 702.704833984375 C 1112.65771484375 705.467041015625 1123.68994140625 706.84521484375 1135.43408203125 706.839599609375 C 1140.8896484375 706.839599609375 1146.49560546875 706.544189453125 1152.28662109375 705.95361328125 C 1160.05224609375 705.166015625 1166.59619140625 703.330078125 1172.3125 700.353515625 C 1181.03955078125 695.7900390625 1186.2685546875 688.77685546875 1187.85595703125 679.49951171875 C 1187.890625 679.302734375 1188.09912109375 678.920654296875 1188.49267578125 678.509033203125 C 1195.4541015625 671.189208984375 1198.20458984375 663.2900390625 1196.8896484375 654.38330078125 C 1196.8837890625 654.30810546875 1196.9130859375 654.070556640625 1197.20849609375 653.410400390625 C 1197.53857421875 652.669189453125 1197.9091796875 651.9453125 1198.27392578125 651.221435546875 C 1198.95751953125 649.8779296875 1199.658203125 648.488037109375 1200.17333984375 647.005126953125 C 1202.5244140625 640.22412109375 1202.322265625 634.30517578125 1199.57763671875 628.925537109375 Z M 1057.4853515625 607.4111328125 L 1057.4853515625 688.319580078125 C 1050.98193359375 688.580078125 1039.7529296875 688.45849609375 1035.80908203125 688.400390625 C 1035.7978515625 678.7060546875 1035.7509765625 622.56103515625 1035.95947265625 607.4111328125 L 1057.4853515625 607.4111328125 Z">
    		</path>
    	</svg>
    	<div id="btn_Network">
    		<div id="Group_621">
    			<svg class="Path_759" viewBox="1.81 1.19 74.873 88.665">
    				<path id="Path_759" d="M 39.24643707275391 89.85527038574219 C 18.22949028015137 89.85527038574219 1.809999465942383 58.98659515380859 1.809999465942383 38.62644577026367 C 1.809999465942383 18.26627731323242 18.22949028015137 1.189999580383301 39.24643707275391 1.189999580383301 C 60.26338958740234 1.189999580383301 76.682861328125 17.6094970703125 76.682861328125 38.62644577026367 C 76.02609252929688 58.32982635498047 60.26338958740234 89.85527038574219 39.24643707275391 89.85527038574219 Z M 39.24643707275391 10.38491725921631 C 23.48372840881348 10.38491725921631 11.00490951538086 22.86372375488281 11.00490951538086 38.62644577026367 C 11.00490951538086 54.38915252685547 24.14050102233887 80.66035461425781 39.24643707275391 80.66035461425781 C 53.69558715820313 80.66035461425781 66.83118438720703 54.38915252685547 66.83118438720703 37.96965789794922 C 66.83118438720703 22.86372375488281 54.35235595703125 10.38491725921631 39.24643707275391 10.38491725921631 Z">
    				</path>
    			</svg>
    			<svg class="Path_760" viewBox="1.25 2.32 145.805 70.275">
    				<path id="Path_760" d="M 142.4576416015625 72.595458984375 L 5.847457885742188 72.595458984375 C 3.220346450805664 72.595458984375 1.25 70.6251220703125 1.25 67.99799346923828 L 1.25 37.78610229492188 C 1.25 35.81576538085938 2.563558578491211 33.84542083740234 4.533893585205078 33.18865203857422 L 57.7330436706543 18.73950004577637 L 57.7330436706543 6.917463302612305 C 57.7330436706543 4.290336608886719 59.7033805847168 2.319999694824219 62.33048629760742 2.319999694824219 L 62.33048629760742 2.319999694824219 C 64.95762634277344 2.319999694824219 66.92796325683594 4.290336608886719 66.92796325683594 6.917463302612305 L 66.92796325683594 22.02339363098145 C 66.92796325683594 23.99373054504395 65.61439514160156 25.96406745910645 63.6440544128418 26.62084770202637 L 10.44491004943848 41.72679138183594 L 10.44491004943848 64.05729675292969 L 137.8601837158203 64.05729675292969 L 137.8601837158203 41.07002258300781 L 86.63136291503906 25.96408271789551 C 84.66102600097656 25.30729866027832 83.34747314453125 23.99374580383301 83.34747314453125 22.02339363098145 L 83.34747314453125 7.574235916137695 C 83.34747314453125 4.947126388549805 85.31781005859375 2.976789474487305 87.94491577148438 2.976789474487305 L 87.94491577148438 2.976789474487305 C 90.57203674316406 2.976789474487305 92.5423583984375 4.947126388549805 92.5423583984375 7.574235916137695 L 92.5423583984375 18.73950004577637 L 143.7711791992188 33.84542083740234 C 145.7415618896484 33.84542083740234 147.0550842285156 35.81576538085938 147.0550842285156 37.78610229492188 L 147.0550842285156 67.99797058105469 C 147.0550842285156 70.62510681152344 145.0847473144531 72.595458984375 142.4576416015625 72.595458984375 Z">
    				</path>
    			</svg>
    		</div>
    		<div id="Group_622">
    			<svg class="Path_761" viewBox="2.678 0.417 106.654 106.566">
    				<path id="Path_761" d="M 104.606201171875 106.9831161499023 C 102.6358489990234 106.9831161499023 100.66552734375 105.6695709228516 100.0087432861328 103.0424423217773 C 90.81382751464844 56.41109085083008 54.03416442871094 19.63142776489258 6.746030807495117 9.779736518859863 C 4.118921279907227 9.122959136962891 2.148569107055664 6.495837211608887 2.805360794067383 3.868721008300781 C 3.462133407592773 1.24160099029541 5.432470321655273 -0.07195758819580078 8.059595108032227 0.5848217010498047 C 59.28840637207031 11.09329509735107 98.69516754150391 51.15685653686523 109.2036743164063 101.7288970947266 C 109.8604278564453 104.3560180664063 107.8901214599609 106.3263397216797 105.9197540283203 106.9831161499023 C 105.2629699707031 106.9831161499023 105.2629699707031 106.9831161499023 104.606201171875 106.9831161499023 Z">
    				</path>
    			</svg>
    			<svg class="Path_762" viewBox="0.418 0.418 108.66 107.182">
    				<path id="Path_762" d="M 5.179155349731445 107.6004409790039 C 5.179155349731445 107.6004409790039 4.522374153137207 107.6004409790039 4.522374153137207 107.6004409790039 C 1.23847484588623 106.9436569213867 -0.07508468627929688 104.9733123779297 0.5816946029663086 102.3462066650391 C 11.09016704559326 50.46061325073242 51.15372848510742 10.39704895019531 103.6961135864258 0.5453553199768066 C 106.3232269287109 -0.1114239692687988 108.2935638427734 1.858914375305176 108.9503326416016 4.486032962799072 C 109.6071243286133 7.113154888153076 107.6367874145508 9.083490371704102 105.009651184082 9.740268707275391 C 56.40796661376953 18.27840423583984 18.97152709960938 55.71483612060547 9.119830131530762 104.3165435791016 C 9.119830131530762 106.2868728637695 7.149491310119629 107.6004409790039 5.179155349731445 107.6004409790039 Z">
    				</path>
    			</svg>
    			<svg class="Path_763" viewBox="0.417 2.668 108.536 107.841">
    				<path id="Path_763" d="M 104.3560180664063 110.5087203979492 C 104.3560180664063 110.5087203979492 103.6992416381836 110.5087203979492 103.6992416381836 110.5087203979492 C 51.15685653686523 100.0002670288086 11.09329509735107 59.93669891357422 0.5848217010498047 8.051103591918945 C -0.07195758819580078 5.423994064331055 1.24160099029541 3.453653335571289 3.868720054626465 2.796865463256836 C 6.495837211608887 2.140092849731445 8.466182708740234 4.11042594909668 9.122959136962891 6.080766677856445 C 18.97465133666992 54.02568817138672 57.06787490844727 92.11892700195313 105.0127792358398 101.3138046264648 C 107.6399154663086 101.9706039428711 108.9534530639648 103.9409408569336 108.9534530639648 106.5680313110352 C 108.2966918945313 108.5383987426758 106.3263397216797 110.5087203979492 104.3560180664063 110.5087203979492 Z">
    				</path>
    			</svg>
    			<svg class="Path_764" viewBox="2.678 2.667 106.654 107.222">
    				<path id="Path_764" d="M 7.402807235717773 109.8899383544922 C 5.432470321655273 109.8899383544922 3.462133407592773 108.5763854980469 2.805360794067383 105.9492645263672 C 2.148569107055664 103.9789276123047 4.118921279907227 101.3517913818359 6.746030807495117 100.6950073242188 C 54.03416442871094 90.84329223632813 90.81382751464844 53.40685272216797 100.66552734375 6.118719100952148 C 101.3223266601563 3.491609573364258 103.2926635742188 2.178047180175781 105.9197540283203 2.834817886352539 C 107.8901214599609 3.49162483215332 109.8604278564453 5.461957931518555 109.2036743164063 8.089071273803711 C 99.35198974609375 59.31790161132813 59.28840637207031 99.38142395019531 8.716367721557617 109.8899383544922 C 8.059595108032227 109.8899383544922 8.059595108032227 109.8899383544922 7.402807235717773 109.8899383544922 Z">
    				</path>
    			</svg>
    			<svg class="Path_765" viewBox="3.82 1.91 59.11 59.11">
    				<path id="Path_765" d="M 33.37509155273438 61.02017974853516 C 16.95558166503906 61.02017974853516 3.819999694824219 47.88458251953125 3.819999694824219 31.46509552001953 C 3.819999694824219 15.04559707641602 16.95558166503906 1.909999847412109 33.37509155273438 1.909999847412109 C 49.79458618164063 1.909999847412109 62.93017578125 15.04559707641602 62.93017578125 31.46509552001953 C 62.93017578125 47.88458251953125 49.79458618164063 61.02017974853516 33.37509155273438 61.02017974853516 Z M 33.37509155273438 11.10492515563965 C 22.20983505249023 11.10492515563965 13.01490783691406 20.29984664916992 13.01490783691406 31.46509552001953 C 13.01490783691406 42.6303596496582 22.20983505249023 51.82524871826172 33.37509155273438 51.82524871826172 C 44.54035949707031 51.82524871826172 53.73526000976563 42.63034439086914 53.73526000976563 31.46509552001953 C 53.73526000976563 20.29984664916992 44.54035949707031 11.10492515563965 33.37509155273438 11.10492515563965 Z">
    				</path>
    			</svg>
    			<svg class="Path_766" viewBox="0 1.91 59.11 59.11">
    				<path id="Path_766" d="M 29.55508422851563 61.02017974853516 C 13.13559532165527 61.02017974853516 0 47.88458251953125 0 31.46509552001953 C 0 15.04559707641602 13.13559532165527 1.909999847412109 29.55508422851563 1.909999847412109 C 45.97457885742188 1.909999847412109 59.11016845703125 15.04559707641602 59.11016845703125 31.46509552001953 C 59.11016845703125 47.88458251953125 45.97457885742188 61.02017974853516 29.55508422851563 61.02017974853516 Z M 29.55508422851563 11.10492515563965 C 18.38982963562012 11.10492515563965 9.194914817810059 20.29984664916992 9.194914817810059 31.46509552001953 C 9.194914817810059 42.6303596496582 18.38982963562012 51.82524871826172 29.55508422851563 51.82524871826172 C 40.72034454345703 51.82524871826172 49.91525650024414 42.63034439086914 49.91525650024414 31.46509552001953 C 49.91525650024414 20.29984664916992 40.72034454345703 11.10492515563965 29.55508422851563 11.10492515563965 Z">
    				</path>
    			</svg>
    			<svg class="Path_767" viewBox="1.92 0 59.11 59.11">
    				<path id="Path_767" d="M 31.47509384155273 59.11016845703125 C 15.05559921264648 59.11016845703125 1.920000076293945 45.97457885742188 1.920000076293945 29.55508422851563 C 1.920000076293945 13.13559341430664 15.71240234375 0 31.47509384155273 0 C 47.89459228515625 0 61.03018951416016 13.13559532165527 61.03018951416016 29.55508422851563 C 61.03018951416016 45.97457885742188 47.89459228515625 59.11016845703125 31.47509384155273 59.11016845703125 Z M 31.47509384155273 9.194914817810059 C 20.30983352661133 9.194914817810059 11.11492156982422 18.38982963562012 11.11492156982422 29.55508422851563 C 11.11492156982422 40.72034454345703 20.30984878540039 49.91525650024414 31.47509384155273 49.91525650024414 C 42.64036178588867 49.91525650024414 51.83526611328125 40.72034454345703 51.83526611328125 29.55508422851563 C 51.83526611328125 18.38982963562012 42.64036178588867 9.194914817810059 31.47509384155273 9.194914817810059 Z">
    				</path>
    			</svg>
    			<svg class="Path_768" viewBox="1.92 3.82 59.11 59.11">
    				<path id="Path_768" d="M 31.47509384155273 62.93017578125 C 15.05559921264648 62.93017578125 1.920000076293945 49.79458618164063 1.920000076293945 33.37509155273438 C 1.920000076293945 16.95558166503906 15.05559921264648 3.819999694824219 31.47509384155273 3.819999694824219 C 47.89459228515625 3.819999694824219 61.03018951416016 16.95558166503906 61.03018951416016 33.37509155273438 C 61.03018951416016 49.79458618164063 47.89459228515625 62.93017578125 31.47509384155273 62.93017578125 Z M 31.47509384155273 13.01490783691406 C 20.30983352661133 13.01490783691406 11.11492156982422 22.20983505249023 11.11492156982422 33.37509155273438 C 11.11492156982422 44.54035949707031 20.30984878540039 53.73526000976563 31.47509384155273 53.73526000976563 C 42.64036178588867 53.73526000976563 51.83526611328125 44.54035949707031 51.83526611328125 33.37509155273438 C 51.83528900146484 22.20983505249023 42.64036178588867 13.01490783691406 31.47509384155273 13.01490783691406 Z">
    				</path>
    			</svg>
    		</div>
    	</div>
    	<svg class="Rectangle_432">
    		<rect id="Rectangle_432" rx="6" ry="6" x="0" y="0" width="613" height="443">
    		</rect>
    	</svg>
    	<svg class="Rectangle_458">
    		<rect id="Rectangle_458" rx="6" ry="6" x="0" y="0" width="170" height="136">
    		</rect>
    	</svg>
    	<svg class="Rectangle_459">
    		<rect id="Rectangle_459" rx="6" ry="6" x="0" y="0" width="170" height="136">
    		</rect>
    	</svg>
    	<svg class="Rectangle_460">
    		<rect id="Rectangle_460" rx="6" ry="6" x="0" y="0" width="170" height="136">
    		</rect>
    	</svg>
    	<div id="If_you_wish_to_report_bugs_or_">
    		<span>If you wish to report bugs or make feature requests you </span><span style="font-style:normal;font-weight:bold;color:rgba(0,0,0,1);text-decoration:underline;">do it here</span><span>. </span>
    	</div>
    	<div id="Welcome_to_myG_">
    		<span>Welcome to myG!</span>
    	</div>
    	<div id="This_will_most_likely_be_the_f">
    		<span>This will most likely be the first and last email from myG. <br/>That's because email is turned off by default. <br/>Of course you can update this in the </span><span style="font-style:normal;font-weight:bold;">Settings</span><span>.</span>
    	</div>
    	<div id="Your_key_is_below_and_it_will_">
    		<span>Your key is below and it will be<br/>used to access your</span><span style="font-style:normal;font-weight:bold;"> Chat History</span>
    	</div>
    	<div id="Group_655">
    		<svg class="Path_688" viewBox="858.667 146.667 125.333 80">
    			<path id="Path_688" d="M 883.3333129882813 146.6666717529297 L 858.6666870117188 172.6666717529297 L 867.3333129882813 209.3333282470703 L 924.6666870117188 226.6666717529297 L 976 203.3333282470703 L 984 172.6666717529297 L 954.6666870117188 150.6666717529297 L 883.3333129882813 146.6666717529297 Z">
    			</path>
    		</svg>
    		<div id="Group_581">
    			<svg class="Path_684" viewBox="282.717 404.137 30.768 20.68">
    				<path id="Path_684" d="M 282.7170104980469 404.1369934082031 C 282.7170104980469 404.1369934082031 298.5549926757813 408.5759887695313 313.4849853515625 404.1369934082031 C 313.1900024414063 404.4240112304688 307.1300048828125 423.9089965820313 307.1300048828125 423.9089965820313 C 307.1300048828125 423.9089965820313 301.2789916992188 424.8169860839844 298.35400390625 424.8169860839844 C 295.5710144042969 424.8169860839844 289.072998046875 423.9089965820313 289.072998046875 423.9089965820313 L 282.7170104980469 404.1369934082031 Z">
    				</path>
    			</svg>
    			<svg class="Path_685" viewBox="260.29 365.975 31.221 22.889">
    				<path id="Path_685" d="M 270.6510009765625 365.9880065917969 C 270.6510009765625 365.9880065917969 259.7219848632813 365.3970031738281 260.31298828125 372.1910095214844 C 260.9039916992188 378.9849853515625 273.6050109863281 390.2090148925781 283.3529968261719 388.7319946289063 C 293.1000061035156 387.2550048828125 293.2250061035156 384.9540100097656 288.3739929199219 378.3940124511719 C 279.7099914550781 365.2980041503906 270.6510009765625 365.9880065917969 270.6510009765625 365.9880065917969 Z">
    				</path>
    			</svg>
    			<svg class="Path_686" viewBox="306.074 365.975 31.221 22.889">
    				<path id="Path_686" d="M 326.9339904785156 365.9880065917969 C 326.9339904785156 365.9880065917969 337.8630065917969 365.3970031738281 337.2720031738281 372.1910095214844 C 336.6820068359375 378.9849853515625 323.9800109863281 390.2090148925781 314.2330017089844 388.7319946289063 C 304.4849853515625 387.2550048828125 304.3609924316406 384.9540100097656 309.2109985351563 378.3940124511719 C 317.8760070800781 365.2980041503906 326.9339904785156 365.9880065917969 326.9339904785156 365.9880065917969 Z">
    				</path>
    			</svg>
    			<svg class="Path_687" viewBox="230.907 302.31 134.398 123.432">
    				<path id="Path_687" d="M 363.3340148925781 349.9930114746094 C 359.6340026855469 335.2219848632813 351.614990234375 317.6610107421875 334.2330017089844 310.3009948730469 C 319.1380004882813 303.9089965820313 308.1579895019531 302.8259887695313 298.2479858398438 302.322998046875 L 298.2479858398438 302.3099975585938 C 298.2219848632813 302.3110046386719 298.1950073242188 302.3150024414063 298.1679992675781 302.3160095214844 C 298.1530151367188 302.3150024414063 298.1380004882813 302.3139953613281 298.1220092773438 302.31298828125 L 298.1220092773438 302.3099975585938 L 298.1059875488281 302.3110046386719 L 298.0899963378906 302.3099975585938 L 298.0899963378906 302.31298828125 C 298.072998046875 302.3139953613281 298.0580139160156 302.3150024414063 298.0429992675781 302.3160095214844 C 298.0169982910156 302.3150024414063 297.989013671875 302.3110046386719 297.9639892578125 302.3099975585938 L 297.9639892578125 302.322998046875 C 288.0539855957031 302.8259887695313 277.0740051269531 303.9089965820313 261.97900390625 310.3009948730469 C 244.5959930419922 317.6610107421875 236.5769958496094 335.2219848632813 232.8780059814453 349.9930114746094 C 229.7420043945313 362.5180053710938 230.3939971923828 375.68701171875 234.5099945068359 387.9249877929688 L 237.8130035400391 397.7449951171875 C 239.5720062255859 402.9739990234375 243.3849945068359 407.2579956054688 248.3730010986328 409.6099853515625 C 248.3730010986328 409.6099853515625 256.6340026855469 414.0320129394531 268.9339904785156 418.8909912109375 C 281.2330017089844 423.75 290.2309875488281 425.7420043945313 290.2309875488281 425.7420043945313 L 283.0549926757813 402.9469909667969 C 283.0549926757813 402.9469909667969 241.7039947509766 390.9909973144531 244.6580047607422 372.677001953125 C 247.6109924316406 354.3630065917969 270.0610046386719 353.4769897460938 270.0610046386719 353.4769897460938 C 270.0610046386719 353.4769897460938 285.1199951171875 362.1700134277344 297.9639892578125 362.5910034179688 L 297.9639892578125 362.6029968261719 C 297.989990234375 362.6019897460938 298.0169982910156 362.5979919433594 298.0429992675781 362.5969848632813 C 298.0580139160156 362.5969848632813 298.072998046875 362.5989990234375 298.0899963378906 362.6010131835938 L 298.0899963378906 362.6029968261719 L 298.1059875488281 362.6019897460938 L 298.1220092773438 362.6029968261719 L 298.1220092773438 362.6010131835938 C 298.1369934082031 362.5989990234375 298.1530151367188 362.5969848632813 298.1679992675781 362.5969848632813 C 298.1950073242188 362.5979919433594 298.2210083007813 362.6019897460938 298.2479858398438 362.6029968261719 L 298.2479858398438 362.5910034179688 C 311.0910034179688 362.1700134277344 326.1510009765625 353.4769897460938 326.1510009765625 353.4769897460938 C 326.1510009765625 353.4769897460938 348.6000061035156 354.3630065917969 351.5539855957031 372.677001953125 C 354.5079956054688 390.9909973144531 313.156005859375 402.9469909667969 313.156005859375 402.9469909667969 L 305.9809875488281 425.7420043945313 C 305.9809875488281 425.7420043945313 314.9779968261719 423.75 327.2770080566406 418.8909912109375 C 339.5769958496094 414.0320129394531 347.8389892578125 409.6099853515625 347.8389892578125 409.6099853515625 C 352.8269958496094 407.2579956054688 356.6400146484375 402.9739990234375 358.3989868164063 397.7449951171875 L 361.7019958496094 387.9249877929688 C 365.8179931640625 375.68701171875 366.4700012207031 362.5180053710938 363.3340148925781 349.9930114746094 Z">
    				</path>
    			</svg>
    		</div>
    	</div>
    	<div id="Group_657">
    		<svg class="Rectangle_418">
    			<rect id="Rectangle_418" rx="8" ry="8" x="0" y="0" width="452" height="50">
    			</rect>
    		</svg>
    		<div id="bruhx007">
    			<span>bruhx007</span>
    		</div>
    	</div>
    	<svg class="Rectangle_418_bg">
    		<rect id="Rectangle_418_bg" rx="8" ry="8" x="0" y="0" width="416" height="94">
    		</rect>
    	</svg>
    	<div id="Group_656">
    		<svg class="Line_396" viewBox="0 0 407.167 1">
    			<path id="Line_396" d="M 0 0 L 407.1666870117188 0">
    			</path>
    		</svg>
    		<svg class="Line_397" viewBox="0 0 407.167 1">
    			<path id="Line_397" d="M 0 0 L 407.1666870117188 0">
    			</path>
    		</svg>
    	</div>
    	<div id="Group_658">
    		<svg class="Line_396_bl" viewBox="0 0 174.667 1">
    			<path id="Line_396_bl" d="M 0 0 L 174.6666564941406 0">
    			</path>
    		</svg>
    		<svg class="Line_397_bm" viewBox="0 0 174.667 1">
    			<path id="Line_397_bm" d="M 0 0 L 174.6666564941406 0">
    			</path>
    		</svg>
    	</div>
    	<div id="Icon_feather-copy">
    		<svg class="Path_689" viewBox="13.5 13.5 11.7 11.7">
    			<path id="Path_689" d="M 15.30000114440918 13.5 L 23.39999961853027 13.5 C 24.39411354064941 13.5 25.20000076293945 14.30588722229004 25.20000076293945 15.30000114440918 L 25.20000076293945 23.39999961853027 C 25.20000076293945 24.39411354064941 24.39411354064941 25.20000076293945 23.39999961853027 25.20000076293945 L 15.30000114440918 25.20000076293945 C 14.30588722229004 25.20000076293945 13.5 24.39411354064941 13.5 23.39999961853027 L 13.5 15.30000114440918 C 13.5 14.30588722229004 14.30588912963867 13.5 15.30000114440918 13.5 Z">
    			</path>
    		</svg>
    		<svg class="Path_690" viewBox="3 3 11.7 11.7">
    			<path id="Path_690" d="M 5.699999809265137 14.70000076293945 L 4.800000190734863 14.70000076293945 C 3.805887460708618 14.70000076293945 3 13.89411354064941 3 12.90000057220459 L 3 4.800000190734863 C 3 3.805887460708618 3.805887937545776 3 4.800000190734863 3 L 12.90000057220459 3 C 13.89411354064941 3 14.70000076293945 3.805887699127197 14.70000076293945 4.800000190734863 L 14.70000076293945 5.699999809265137">
    			</path>
    		</svg>
    	</div>
    	<div id="You_also_get_three_invite_code">
    		<span>You also </span><span style="font-style:normal;font-weight:bold;">get three invite codes for your friends</span><span>. They expire in 14 days!</span>
    	</div>
    	<div id="Code_1">
    		<span>Code #1</span>
    	</div>
    	<div id="Code_2">
    		<span>Code #2</span>
    	</div>
    	<div id="Code_3">
    		<span>Code #3</span>
    	</div>
    	<div id="Wait_Theres_more">
    		<span>Wait! There's more</span>
    	</div>
    	<source media="(min-width:650px)" srcset="https://myg-marketing.s3.amazonaws.com/welcome-email/Mask_Group_1%402x.png">
    	<source media="(min-width:465px)" srcset="https://myg-marketing.s3.amazonaws.com/welcome-email/Mask_Group_1.png">
    	<img id="Mask_Group_1" src="https://myg-marketing.s3.amazonaws.com/welcome-email/Mask_Group_1.png" alt="Gamer_keyboard" style="width:auto;">

    	</svg>
    	<div id="TIP_1">
    		<span>TIP #1</span>
    	</div>
    	<div id="Group_661">
    		<svg class="Rectangle_496">
    			<rect id="Rectangle_496" rx="4" ry="4" x="0" y="0" width="133" height="28">
    			</rect>
    		</svg>
    		<div id="GoodIZ1FEQb">
    			<span>GoodIZ1FEQb</span>
    		</div>
    		<div id="Icon_feather-copy_b">
    			<svg class="Path_689_b" viewBox="13.5 13.5 8.45 8.45">
    				<path id="Path_689_b" d="M 14.80000019073486 13.5 L 20.64999961853027 13.5 C 21.36797142028809 13.5 21.95000076293945 14.08202934265137 21.95000076293945 14.80000019073486 L 21.95000076293945 20.64999961853027 C 21.95000076293945 21.36797142028809 21.36797142028809 21.95000076293945 20.64999961853027 21.95000076293945 L 14.80000019073486 21.95000076293945 C 14.08202934265137 21.95000076293945 13.5 21.36797142028809 13.5 20.64999961853027 L 13.5 14.80000019073486 C 13.5 14.08202934265137 14.08203125 13.5 14.80000019073486 13.5 Z">
    				</path>
    			</svg>
    			<svg class="Path_690_b" viewBox="3 3 8.45 8.45">
    				<path id="Path_690_b" d="M 4.949999809265137 11.44999980926514 L 4.300000190734863 11.44999980926514 C 3.582029819488525 11.44999980926514 2.999999761581421 10.86797046661377 2.999999761581421 10.14999961853027 L 2.999999761581421 4.300000190734863 C 2.999999761581421 3.582029819488525 3.582030057907104 2.999999761581421 4.300000190734863 2.999999761581421 L 10.14999961853027 2.999999761581421 C 10.86797046661377 2.999999761581421 11.44999980926514 3.582029819488525 11.44999980926514 4.300000190734863 L 11.44999980926514 4.949999809265137">
    				</path>
    			</svg>
    		</div>
    	</div>
    	<div id="Group_662">
    		<svg class="Rectangle_496_b">
    			<rect id="Rectangle_496_b" rx="4" ry="4" x="0" y="0" width="133" height="28">
    			</rect>
    		</svg>
    		<div id="GoodIZ1FEQb_b">
    			<span>GoodIZ1FEQb</span>
    		</div>
    		<div id="Icon_feather-copy_ca">
    			<svg class="Path_689_ca" viewBox="13.5 13.5 8.45 8.45">
    				<path id="Path_689_ca" d="M 14.80000019073486 13.5 L 20.64999961853027 13.5 C 21.36797142028809 13.5 21.95000076293945 14.08202934265137 21.95000076293945 14.80000019073486 L 21.95000076293945 20.64999961853027 C 21.95000076293945 21.36797142028809 21.36797142028809 21.95000076293945 20.64999961853027 21.95000076293945 L 14.80000019073486 21.95000076293945 C 14.08202934265137 21.95000076293945 13.5 21.36797142028809 13.5 20.64999961853027 L 13.5 14.80000019073486 C 13.5 14.08202934265137 14.08203125 13.5 14.80000019073486 13.5 Z">
    				</path>
    			</svg>
    			<svg class="Path_690_ca" viewBox="3 3 8.45 8.45">
    				<path id="Path_690_ca" d="M 4.949999809265137 11.44999980926514 L 4.300000190734863 11.44999980926514 C 3.582029819488525 11.44999980926514 2.999999761581421 10.86797046661377 2.999999761581421 10.14999961853027 L 2.999999761581421 4.300000190734863 C 2.999999761581421 3.582029819488525 3.582030057907104 2.999999761581421 4.300000190734863 2.999999761581421 L 10.14999961853027 2.999999761581421 C 10.86797046661377 2.999999761581421 11.44999980926514 3.582029819488525 11.44999980926514 4.300000190734863 L 11.44999980926514 4.949999809265137">
    				</path>
    			</svg>
    		</div>
    	</div>
    	<div id="Group_663">
    		<svg class="Rectangle_496_ca">
    			<rect id="Rectangle_496_ca" rx="4" ry="4" x="0" y="0" width="133" height="28">
    			</rect>
    		</svg>
    		<div id="GoodIZ1FEQb_cb">
    			<span>GoodIZ1FEQb</span>
    		</div>
    		<div id="Icon_feather-copy_cc">
    			<svg class="Path_689_cd" viewBox="13.5 13.5 8.45 8.45">
    				<path id="Path_689_cd" d="M 14.80000019073486 13.5 L 20.64999961853027 13.5 C 21.36797142028809 13.5 21.95000076293945 14.08202934265137 21.95000076293945 14.80000019073486 L 21.95000076293945 20.64999961853027 C 21.95000076293945 21.36797142028809 21.36797142028809 21.95000076293945 20.64999961853027 21.95000076293945 L 14.80000019073486 21.95000076293945 C 14.08202934265137 21.95000076293945 13.5 21.36797142028809 13.5 20.64999961853027 L 13.5 14.80000019073486 C 13.5 14.08202934265137 14.08203125 13.5 14.80000019073486 13.5 Z">
    				</path>
    			</svg>
    			<svg class="Path_690_ce" viewBox="3 3 8.45 8.45">
    				<path id="Path_690_ce" d="M 4.949999809265137 11.44999980926514 L 4.300000190734863 11.44999980926514 C 3.582029819488525 11.44999980926514 2.999999761581421 10.86797046661377 2.999999761581421 10.14999961853027 L 2.999999761581421 4.300000190734863 C 2.999999761581421 3.582029819488525 3.582030057907104 2.999999761581421 4.300000190734863 2.999999761581421 L 10.14999961853027 2.999999761581421 C 10.86797046661377 2.999999761581421 11.44999980926514 3.582029819488525 11.44999980926514 4.300000190734863 L 11.44999980926514 4.949999809265137">
    				</path>
    			</svg>
    		</div>
    	</div>
    	<div id="Everytime_you_log_off_you_key_">
    		<span>Everytime you log off, you key is cleared <br/>and when you log back in, you will need <br/>to RE-ENTER this key. Failure to do so will <br/>disable chat and if a new key is generated, <br/>you will lose all your previous chat history.<br/><br/>This is a true End to End encryption chat, <br/>meaning myG doesn't have any visibility <br/>of your messages or your key. Therefore <br/>we cannot retrieve messages or key if <br/>they are lost.</span>
    	</div>
    	<div id="Group_660">
    		<div id="myGs_vision_is_to_improve_game">
    			<span>myG's vision is to improve gamers performance, knowledge and experience <br/>and we're going to do that by becoming a kick ass gaming platform, <br/>allowing gamers to connect, share and improve.</span>
    		</div>
    	</div>
    	<div id="Update_your_Profile_createjoin">
    		<span>Update your Profile, create/join games, <br/>reach out to other gamers!</span>
    	</div>
    	<div id="Group_813">
    		<svg class="Rectangle_497">
    			<rect id="Rectangle_497" rx="0" ry="0" x="0" y="0" width="800" height="230">
    			</rect>
    		</svg>
    		<div id="For_more_information_please_vi">
    			<span>For more information, please visit our</span><span style="font-style:normal;font-weight:bold;text-decoration:underline;"> Help Centre.</span><br><span style="font-size:12px;">This email was sent to: bru****@gmail.com. Please do not reply to this email as this address is not monitored. <br/>This email was sent by: myG LLC, Brisbane, Australia, 4058.<br/>Manage all email preferences within </span><span style="font-style:normal;font-weight:bold;font-size:12px;text-decoration:underline;">myG Settings</span><br><span style="font-style:normal;font-weight:bold;font-size:12px;">Terms of Use      |      Privacy Policy       |      Contact Us</span><br><span style="font-size:12px;">© 2021 myG LLC. All Rights Reserved.</span>
    		</div>
    	</div>
    	<div id="Group_820">
    		<div id="Group_819">
    			<svg class="Path_773" viewBox="379.695 470 36.407 21.574">
    				<path id="Path_773" d="M 389.1341552734375 470 L 381.0437622070313 474.045166015625 L 379.6953735351563 482.1355590820313 L 390.4825134277344 491.5742797851563 L 405.3148498535156 490.2258911132813 L 414.7536010742188 484.8323364257813 L 416.1019897460938 476.741943359375 L 406.6632690429688 471.348388671875 L 397.2244873046875 474.045166015625 L 391.8309020996094 474.045166015625 L 389.1341552734375 470 Z">
    				</path>
    			</svg>
    			<div id="Group_817">
    				<div id="Group_816">
    					<svg class="Path_774" viewBox="1352.667 409.7 21.542 24.67">
    						<path id="Path_774" d="M 1374.209350585938 433.5010070800781 C 1368.7890625 434.0796508789063 1363.80859375 434.3695678710938 1359.268676757813 434.3695678710938 C 1356.998046875 434.3695678710938 1355.330322265625 433.8371276855469 1354.265258789063 432.7714233398438 C 1353.199584960938 431.7060546875 1352.6669921875 430.0383911132813 1352.6669921875 427.767822265625 L 1352.6669921875 416.6492614746094 C 1352.6669921875 414.217041015625 1353.216796875 412.4508666992188 1354.317260742188 411.3504028320313 C 1355.417236328125 410.25048828125 1357.183837890625 409.7000122070313 1359.616088867188 409.7000122070313 L 1372.124755859375 409.7000122070313 L 1372.124755859375 414.5643615722656 L 1361.005981445313 414.5643615722656 C 1359.616088867188 414.5643615722656 1358.921264648438 415.2593383789063 1358.921264648438 416.6492614746094 L 1358.921264648438 427.767822265625 C 1358.921264648438 428.3011169433594 1359.077514648438 428.7234191894531 1359.390258789063 429.0361328125 C 1359.702880859375 429.3489074707031 1360.125366210938 429.5050964355469 1360.658447265625 429.5050964355469 C 1363.321899414063 429.5050964355469 1365.754272460938 429.4476928710938 1367.955200195313 429.3315124511719 L 1367.955200195313 424.2933044433594 L 1363.438232421875 424.2933044433594 L 1363.438232421875 420.1238098144531 L 1374.209350585938 420.1238098144531 L 1374.209350585938 433.5010070800781 Z">
    						</path>
    					</svg>
    				</div>
    			</div>
    			<svg class="Path_775" viewBox="850.871 409.58 45.772 32.327">
    				<path id="Path_775" d="M 895.5722045898438 409.786376953125 L 895.5722045898438 417.5423583984375 C 895.5722045898438 419.6419067382813 894.9877319335938 421.3193359375 893.8190307617188 422.5741577148438 C 892.6504516601563 423.8295593261719 891.0597534179688 424.4569702148438 889.0470581054688 424.4569702148438 C 887.1423950195313 424.4569702148438 885.6760864257813 423.9326477050781 884.6482543945313 422.8826293945313 C 883.6201782226563 421.8330383300781 883.1063842773438 420.3128662109375 883.1063842773438 418.3215942382813 L 883.1063842773438 409.786376953125 L 882.0352172851563 409.786376953125 L 882.0352172851563 418.3865051269531 C 882.0352172851563 420.6588439941406 882.6517944335938 422.4011840820313 883.8854370117188 423.6128540039063 C 885.1190795898438 424.8253173828125 886.8284301757813 425.4309387207031 889.0145874023438 425.4309387207031 C 890.5941772460938 425.4309387207031 891.9469604492188 425.06884765625 893.0724487304688 424.3435363769531 C 894.1974487304688 423.6184997558594 895.0308227539063 422.6066589355469 895.5722045898438 421.3080139160156 L 895.5722045898438 434.0185852050781 C 895.5722045898438 436.3989868164063 895.0689086914063 438.1465759277344 894.0624389648438 439.2614440917969 C 893.0562133789063 440.3757629394531 891.4924926757813 440.9331970214844 889.3716430664063 440.9331970214844 C 888.0944213867188 440.9331970214844 886.9151000976563 440.7110290527344 885.8331909179688 440.2676696777344 C 884.8268432617188 439.8551330566406 884.0374145507813 439.2117614746094 883.2660522460938 438.5370788574219 L 883.0944213867188 438.3838195800781 C 882.2291870117188 437.6590881347656 878.4776000976563 434.138671875 878.4776000976563 427.6112060546875 L 878.4713745117188 425.2139587402344 L 878.4642944335938 425.2139587402344 L 878.4642944335938 419.8302307128906 C 878.4642944335938 417.5364990234375 877.8743286132813 415.7835388183594 876.6951293945313 414.5712890625 C 875.5151977539063 413.3592834472656 873.8977661132813 412.7532653808594 871.8418579101563 412.7532653808594 C 870.1320190429688 412.7532653808594 868.6710815429688 413.16455078125 867.4594116210938 413.9867248535156 C 866.2471313476563 414.8097534179688 865.3925170898438 415.9239807128906 864.8949584960938 417.3306274414063 C 864.526611328125 415.8370971679688 863.7911376953125 414.7011108398438 862.6873168945313 413.9218139648438 C 861.5836181640625 413.1427612304688 860.2202758789063 412.7532653808594 858.5971069335938 412.7532653808594 C 856.9739379882813 412.7532653808594 855.5831298828125 413.1266784667969 854.4256591796875 413.8732604980469 C 853.267578125 414.6197814941406 852.4291381835938 415.6423645019531 851.9097900390625 416.94091796875 L 851.9097900390625 409.5799865722656 L 850.8709716796875 409.5799865722656 L 850.8709716796875 434.5216064453125 L 851.9422607421875 434.5216064453125 L 851.9422607421875 420.6417236328125 C 851.9422607421875 418.5427856445313 852.5316162109375 416.8710327148438 853.7114868164063 415.6262817382813 C 854.890869140625 414.3818969726563 856.4976806640625 413.7597351074219 858.5322265625 413.7597351074219 C 860.3064575195313 413.7597351074219 861.6810302734375 414.2847595214844 862.6549072265625 415.3340759277344 C 863.6287841796875 416.3840942382813 864.1158447265625 417.9042663574219 864.1158447265625 419.8951416015625 L 864.1158447265625 434.5216064453125 L 865.1870727539063 434.5216064453125 L 865.1870727539063 420.6417236328125 C 865.1870727539063 418.5641784667969 865.781982421875 416.8979797363281 866.9725341796875 415.6423645019531 C 868.1624755859375 414.3875732421875 869.7642822265625 413.7597351074219 871.7769165039063 413.7597351074219 C 873.5731811523438 413.7597351074219 874.9583129882813 414.2847595214844 875.9321899414063 415.3340759277344 C 876.9061889648438 416.3840942382813 877.3931274414063 417.9042663574219 877.3931274414063 419.8951416015625 L 877.3931274414063 426.3773803710938 L 877.4009399414063 426.3773803710938 L 877.4041137695313 427.6127014160156 C 877.4041137695313 435.4921569824219 882.4273071289063 439.2396545410156 882.6411743164063 439.3952331542969 C 882.6411743164063 439.3952331542969 884.2553100585938 440.7308044433594 885.3950805664063 441.1767272949219 C 886.6392211914063 441.6637268066406 887.9758911132813 441.9069519042969 889.4041137695313 441.9069519042969 C 891.8495483398438 441.9069519042969 893.6674194335938 441.2577819824219 894.8578491210938 439.9594421386719 C 896.0479125976563 438.6606750488281 896.6432495117188 436.6369018554688 896.6432495117188 433.8887634277344 L 896.6432495117188 409.786376953125 L 895.5722045898438 409.786376953125 Z">
    				</path>
    			</svg>
    			<div id="Group_818">
    				<svg class="Path_776" viewBox="515.82 670.965 9.807 6.591">
    					<path id="Path_776" d="M 515.8199462890625 670.9650268554688 C 515.8199462890625 670.9650268554688 520.8680419921875 672.3796997070313 525.6268310546875 670.9650268554688 C 525.53271484375 671.0562744140625 523.60107421875 677.26708984375 523.60107421875 677.26708984375 C 523.60107421875 677.26708984375 521.7362060546875 677.556396484375 520.8038330078125 677.556396484375 C 519.9169921875 677.556396484375 517.8455810546875 677.26708984375 517.8455810546875 677.26708984375 L 515.8199462890625 670.9650268554688 Z">
    					</path>
    				</svg>
    				<svg class="Path_777" viewBox="442.594 546.364 9.951 7.296">
    					<path id="Path_777" d="M 445.8961181640625 546.3677978515625 C 445.8961181640625 546.3677978515625 442.41259765625 546.179443359375 442.6008911132813 548.3449096679688 C 442.7891845703125 550.5103149414063 446.837646484375 554.0879516601563 449.944580078125 553.6172485351563 C 453.0514526367188 553.146484375 453.0910034179688 552.4129638671875 451.5450439453125 550.322021484375 C 448.7833862304688 546.1481323242188 445.8961181640625 546.3677978515625 445.8961181640625 546.3677978515625 Z">
    					</path>
    				</svg>
    				<svg class="Path_778" viewBox="592.08 546.364 9.951 7.296">
    					<path id="Path_778" d="M 598.7290649414063 546.3677978515625 C 598.7290649414063 546.3677978515625 602.2124633789063 546.179443359375 602.0242919921875 548.3449096679688 C 601.8359375 550.5103149414063 597.7874755859375 554.0879516601563 594.6806030273438 553.6172485351563 C 591.5736694335938 553.146484375 591.5341796875 552.4129638671875 593.0801391601563 550.322021484375 C 595.8418579101563 546.1481323242188 598.7290649414063 546.3677978515625 598.7290649414063 546.3677978515625 Z">
    					</path>
    				</svg>
    				<svg class="Path_779" viewBox="346.659 338.497 42.837 39.342">
    					<path id="Path_779" d="M 388.8678588867188 353.6953430175781 C 387.6888427734375 348.9871826171875 385.1328735351563 343.3899841308594 379.5924072265625 341.0439453125 C 374.7813110351563 339.0068969726563 371.2816162109375 338.66162109375 368.1228637695313 338.501220703125 L 368.1228637695313 338.4970092773438 C 368.11474609375 338.4974060058594 368.1058959960938 338.4986572265625 368.0974731445313 338.4989624023438 C 368.0927124023438 338.4988708496094 368.087890625 338.498291015625 368.082763671875 338.4978942871094 L 368.082763671875 338.4970092773438 C 368.0808715820313 338.4972229003906 368.0794067382813 338.4972229003906 368.0775756835938 338.4974060058594 C 368.07568359375 338.4972229003906 368.073974609375 338.4972229003906 368.072509765625 338.4970092773438 L 368.072509765625 338.4978942871094 C 368.0673217773438 338.498291015625 368.0625610351563 338.4988708496094 368.0578002929688 338.4989624023438 C 368.0492553710938 338.4986572265625 368.04052734375 338.4974060058594 368.0323486328125 338.4970092773438 L 368.0323486328125 338.501220703125 C 364.8736572265625 338.66162109375 361.3739013671875 339.0068969726563 356.5628051757813 341.0439453125 C 351.0223388671875 343.3899841308594 348.4663696289063 348.9871826171875 347.2872924804688 353.6953430175781 C 346.2877197265625 357.6873168945313 346.4954833984375 361.8848266601563 347.8073120117188 365.7853698730469 L 348.8602294921875 368.9155883789063 C 349.4207153320313 370.5820007324219 350.6361694335938 371.9476928710938 352.2260131835938 372.6974487304688 C 352.2260131835938 372.6974487304688 354.8593139648438 374.106689453125 358.7796630859375 375.6553649902344 C 362.69970703125 377.2040100097656 365.5675659179688 377.8389282226563 365.5675659179688 377.8389282226563 L 363.2804565429688 370.573486328125 C 363.2804565429688 370.573486328125 350.100341796875 366.7627563476563 351.0419311523438 360.9254760742188 C 351.9833984375 355.0883483886719 359.1386108398438 354.8058166503906 359.1386108398438 354.8058166503906 C 359.1386108398438 354.8058166503906 363.938720703125 357.5765991210938 368.0323486328125 357.7106323242188 L 368.0323486328125 357.7145385742188 C 368.0408325195313 357.71435546875 368.0492553710938 357.7128601074219 368.0578002929688 357.7126770019531 C 368.0625610351563 357.7126770019531 368.0673217773438 357.7132568359375 368.072509765625 357.7137451171875 L 368.072509765625 357.7145385742188 C 368.073974609375 357.7145385742188 368.07568359375 357.71435546875 368.0775756835938 357.7141418457031 C 368.0794067382813 357.71435546875 368.0808715820313 357.7145385742188 368.082763671875 357.7145385742188 L 368.082763671875 357.7137451171875 C 368.0875244140625 357.7132568359375 368.0927124023438 357.7126770019531 368.0974731445313 357.7126770019531 C 368.1058959960938 357.7128601074219 368.1143798828125 357.71435546875 368.1228637695313 357.7145385742188 L 368.1228637695313 357.7106323242188 C 372.2164306640625 357.5765991210938 377.0165405273438 354.8058166503906 377.0165405273438 354.8058166503906 C 377.0165405273438 354.8058166503906 384.171875 355.0883483886719 385.1133422851563 360.9254760742188 C 386.0548095703125 366.7627563476563 372.8748168945313 370.573486328125 372.8748168945313 370.573486328125 L 370.587646484375 377.8389282226563 C 370.587646484375 377.8389282226563 373.4554443359375 377.2040100097656 377.37548828125 375.6553649902344 C 381.2958984375 374.106689453125 383.9291381835938 372.6974487304688 383.9291381835938 372.6974487304688 C 385.5189819335938 371.9476928710938 386.7344970703125 370.5820007324219 387.2949829101563 368.9155883789063 L 388.3478393554688 365.7853698730469 C 389.65966796875 361.8848266601563 389.8674926757813 357.6873168945313 388.8678588867188 353.6953430175781 Z">
    					</path>
    				</svg>
    			</div>
    		</div>
    	</div>
    </div>
    </body>
    </html>

    `
    return body
  }
}

module.exports = EmailBodyController
