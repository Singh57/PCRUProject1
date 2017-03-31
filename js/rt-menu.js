/* 
  ================================================
  PVII Tree Menu Magic 2 scripts
  Copyright (c) 2009 Project Seven Development
  www.projectseven.com
  Version:  2.1.6 - build: 1-17
  ================================================
*/

var LISTover='_over';
var LISTopen='_overdown';
var LISTmark='_down';
var LISTi=false,LISTa=false,LISTctl=[],LISTadv=[];
function PCRUset(){
	var i,h,sh,hd,x,v;
	if(!document.getElementById){
		return;
	}

	sh='.LIST div {height:0px;overflow:hidden;position:relative}\n';
	sh+='.LIST ul {overflow:hidden;}\n';
	sh+='.LISTtoggle {display:block !important;}\n';
	if(document.styleSheets){
		h='\n<st' + 'yle type="text/css">\n'+sh+'\n</s' + 'tyle>';
		document.write(h);
	}

	else{
		h=document.createElement('style');
		h.type='text/css';
		h.appendChild(document.createTextNode(sh));
		hd=document.getElementsByTagName('head');
		hd[0].appendChild(h);
	}

}

PCRUset();

function PCRUaddLoad(){

	if(window.addEventListener){
		if(!/KHTML|WebKit/i.test(navigator.userAgent)){
			document.addEventListener("DOMContentLoaded", PCRUinit, false);
		}
		window.addEventListener("load",PCRUinit,false);
		window.addEventListener("unload",PCRUbb,false);
	}
	else if(document.addEventListener){
		document.addEventListener("load",PCRUinit,false);
	}
	else if(window.attachEvent){
		document.write("<script id=p7ie7 defer src=\"//:\"><\/script>");
		document.getElementById("p7ie7").onreadystatechange=function(){
			if (this.readyState=="complete"){
				if(LISTctl.length>0){
					PCRUinit();
				}
			}
		};

		window.attachEvent("onload",PCRUinit);
	}
	else if(typeof window.onload=='function'){

		var p7loadit=onload;

		window.onload=function(){

			p7loadit();

			PCRUinit();

		};

	}

	else{

		window.onload=PCRUinit;

	}

}

PCRUaddLoad();

function PCRUbb(){

	return;

}

function PCRUop(){

	if(!document.getElementById){

		return;

	}

	LISTctl[LISTctl.length]=arguments;

}

function PCRUinit(){

	var i,j,jj,k,tM,tA,tU,lv,pp,clv,fs,tS,d=1,cl,tp,uh=0,cN,tw,ow,oh,sP,cA,oA,tN,iM,tD;

	if(LISTi){

		return;

	}

	LISTi=true;

	document.LISTpreload=[];

	for(k=0;k<LISTctl.length;k++){

		tM=document.getElementById(LISTctl[k][0]);

		if(tM){

			tM.p7opt=LISTctl[k];

			tM.style.position='relative';

			tM.style.overflow='hidden';

			tM.LISTcont=new Array();

			tM.LISTrunning=false;

			if(navigator.appVersion.indexOf("MSIE 5")>-1){

				tM.p7opt[1]=0;

			}

			tM.LISTtmr=null;

			tD=tM.getElementsByTagName("DIV");

			for(i=0;i<tD.length;i++){

				tD[i].setAttribute("id",tM.id+'d'+(i+2));

				tD[i].p7state='closed';

				tD[i].tmmmenu=tM.id;

				tD[i].LISTdelay=30;

				tD[i].LISTtargetHeight=0;

				tD[i].LISTframeRate=10;

				tD[i].p7ch=0;

				tD[i].p7cm=0;

				tD[i].LISTtargetLeft=0;

				tM.LISTcont[tM.LISTcont.length]=tD[i];

				if(tM.p7opt[1]>0){

					tD[i].style.height='0px';

				}

				else{

					tD[i].style.display='none';

					tD[i].style.height='auto';

				}

			}

			tU=tM.getElementsByTagName("UL");

			for(i=0;i<tU.length;i++){

				tU[i].setAttribute("id",tM.id+'u'+(i+1));

				lv=1;

				pp=tU[i].parentNode;

				while(pp){

					if(pp.id&&pp.id==tM.id){

						break;

					}

					if(pp.tagName&&pp.tagName=="UL"){

						lv++;

					}

					pp=pp.parentNode;

				}

				tU[i].tmmlevel=lv;

				clv='level_'+lv;

				PCRUsetClass(tU[i],clv);

				tN=tU[i].childNodes;

				if(tN){

					fs=-1;

					jj=0;

					for(j=0;j<tN.length;j++){

						if(tN[j].tagName&&tN[j].tagName=="LI"){

							jj++;

							tA=tN[j].getElementsByTagName("A")[0];

							if(fs<0){

								PCRUsetClass(tA,'tmmfirst');

								PCRUsetClass(tN[j],'tmmfirst');

							}

							tN[j].p7state='closed';

							fs=j;

							tA.setAttribute("id",tM.id+'a'+(d));

							tA.tmmlevel=lv;

							tA.tmmdiv=tU[i].parentNode.id;

							tA.tmmmenu=tM.id;

							if(i==0){

								PCRUsetClass(tN[j],('root_'+jj));

							}

							tS=tN[j].getElementsByTagName("UL");

							if(tS&&tS.length>0){

								tA.tmmsub=tS[0].parentNode.id;

								tA.p7state="closed";

								PCRUsetClass(tA,'trig_closed');

								PCRUsetClass(tA.parentNode,'trig_closed');

								tA.onclick=function(){

									return PCRUtrig(this);

								};

							}

							else{

								tA.tmmsub=false;

								PCRUsetClass(tA,'LIST_page');

								PCRUsetClass(tA.parentNode,'LIST_page');

							}

							d++;

							tA.hasImg=false;

							var sr,x,fnA,fnB,swp,s1,s2,s3;

							iM=tA.getElementsByTagName("IMG");

							if(iM&&iM[0]){

								sr=iM[0].getAttribute("src");

								swp=tM.p7opt[3];

								iM[0].tmmswap=swp;

								x=sr.lastIndexOf(".");

								fnA=sr.substring(0,x);

								fnB='.'+sr.substring(x+1);

								s1=fnA+LISTover+fnB;

								s2=fnA+LISTopen+fnB;

								s3=fnA+LISTmark+fnB;

								if(swp==1){

									iM[0].p7imgswap=[sr,s1,s1,s1];

									PCRUpreloader(s1);

								}

								else if(swp==2){

									iM[0].p7imgswap=[sr,s1,s2,s2];

									PCRUpreloader(s1,s2);

								}

								else if(swp==3){

									iM[0].p7imgswap=[sr,s1,s2,s3];

									PCRUpreloader(s1,s2,s3);

								}

								else{

									iM[0].p7imgswap=[sr,sr,sr,sr];

								}

								iM[0].p7state='closed';

								iM[0].mark=false;

								iM[0].rollover=tM.p7opt[10];

								if(swp>0){

									tA.hasImg=true;

									iM[0].onmouseover=function(){

										PCRUimovr(this);

									};

									iM[0].onmouseout=function(){

										PCRUimout(this);

									};

								}

							}

						}

					}

					if(fs>0){

						PCRUsetClass(tA,'tmmlast');

						PCRUsetClass(tN[fs],'tmmlast');

					}

				}

			}

			oA=document.getElementById(tM.id+'oa');

			if(oA){

				oA.onclick=function(){

					PCRUall(this.id.replace('oa',''),'open',0);

					return false;

				};

			}

			cA=document.getElementById(tM.id+'ca');

			if(cA){

				cA.onclick=function(){

					PCRUall(this.id.replace('ca',''),'close',0);

					return false;

				};

			}

			if(tM.p7opt[5]==1){

				PCRUcurrentMark(tM);

			}

			if(tM.p7opt[9]>-1){

				PCRUall(tM.id,'open',tM.p7opt[9]);

			}

		}

	}

	LISTa=true;

}

function PCRUpreloader(){

	var i,x;

	for(i=0;i<arguments.length;i++){

		x=document.LISTpreload.length;

		document.LISTpreload[x]=new Image();

		document.LISTpreload[x].src=arguments[i];

	}

}

function PCRUimovr(im){

	var m=false,a=im.parentNode,r=im.rollover;

	if(im.mark){

		m=(r>1)?true:false;

	}

	else if(im.p7state=='open'){

		m=(r==1||r==3)?true:false;

	}

	else{

		m=true;

	}

	if(m){

		im.src=im.p7imgswap[1];

	}

}

function PCRUimout(im){

	var a=im.parentNode,r=im.rollover;

	if(im.mark){

		if(im.p7state=='open'){

			im.src=im.p7imgswap[2];

		}

		else{

			im.src=im.p7imgswap[3];

		}

	}

	else if(im.p7state=='open'){

		if(r==1||r==3){

			im.src=im.p7imgswap[2];

		}

	}

	else{

		im.src=im.p7imgswap[0];

	}

}

function PCRUtrig(ob){

	var a,tM,wH,m=false;

	a=ob;

	tM=document.getElementById(a.tmmmenu);

	if(tM.p7opt[7]==1){

		wH=window.location.href;

		if(a.href!=wH&&a.href!=wH+'#'){

			if(a.href.toLowerCase().indexOf('javascript:')==-1){

				return true;

			}

		}

	}

	if(a.p7state=='closed'){

		PCRUopen(a);

	}

	else{

		PCRUclose(a);

	}

	return m;

}

function PCRUopen(a,bp){

	var sP,tM,tD,iM,tw,v,tU,op=0;

	if(a.p7state=='open'){

		return;

	}

	tM=document.getElementById(a.tmmmenu);

	tD=document.getElementById(a.tmmsub);

	if(!bp){

		if(tM.p7opt[8]==1){

			PCRUtoggle(a);

		}

	}

	a.p7state='open';

	a.parentNode.p7state='open';

	tD.p7state='open';

	if(a.hasImg){

		iM=a.getElementsByTagName("IMG")[0];

		iM.p7state='open';

		iM.src=iM.p7imgswap[2];

	}

	sP=document.getElementById(a.tmmspan);

	a.className=a.className.replace('trig_closed','trig_open');

	a.parentNode.className=a.parentNode.className.replace('trig_closed','trig_open');

	op=tM.p7opt[1];

	if(!bp&&LISTa&&op>0){

		if(op==1||op==3){

			tD.style.height='0px';

			tD.p7ch=0;

			tD.style.display='block';

			PCRUsetGlide(a,op,tM.p7opt[10]);

		}

		if(op==2||op==3){

			tU=document.getElementById(tD.id.replace('d','u'));

			tw=tU.offsetWidth;

			tw=a.parentNode.offsetWidth;

			v=(tw+10)*-1;

			tD.p7maxLeft=v;

			tD.style.left=v+'px';

			tD.p7cm=v;

			if(op==2){

				tD.style.height='auto';

				tD.style.display='block';

			}

		}

		if(!tM.LISTrunning){

			tM.LISTrunning=true;

			tM.LISTglide=setInterval("PCRUanim('"+tM.id+"')",tD.LISTdelay);

		}

	}

	else{

		tD.style.height='auto';

		tD.style.display='block';

		if(op==1||op==2){

			tD.p7ch=tD.offsetHeight;

		}

	}

}

function PCRUclose(a,bp){

	var sP,tM,tD,iM,op;

	if(a.p7state=='closed'){

		return;

	}

	tM=document.getElementById(a.tmmmenu);

	op=tM.p7opt[1];

	tD=document.getElementById(a.tmmsub);

	a.p7state='closed';

	a.parentNode.p7state='closed';

	if(a.hasImg){

		iM=a.getElementsByTagName("IMG")[0];

		iM.p7state='closed';

		if(iM.mark){

			iM.src=iM.p7imgswap[3];

		}

		else{

			iM.src=iM.p7imgswap[0];

		}

	}

	sP=document.getElementById(a.tmmspan);

	a.className=a.className.replace('trig_open','trig_closed');

	a.parentNode.className=a.parentNode.className.replace('trig_open','trig_closed');

	tD.p7state='closed';

	if(!bp&&LISTa&&op>0){

		if(op==1||op==3){

			tD.p7ch=tD.offsetHeight;

			PCRUsetGlide(a,op,tM.p7opt[10]);

			if(!tM.LISTrunning){

				tM.LISTrunning=true;

				tM.LISTglide=setInterval("PCRUanim('"+tM.id+"')",tD.LISTdelay);

			}

		}

		else{

			tD.style.display='none';

		}

	}

	else{

		tD.style.display='none';

		if(op==1||op==3){

			tD.style.height='0px';

			tD.p7ch=0;

		}

	}

}

function PCRUtoggle(a,bp){

	var i,tC;

	tC=a.parentNode.parentNode.childNodes;

	for(i=0;i<tC.length;i++){

		if(tC[i].tagName&&tC[i].tagName=='LI'){

			if(tC[i].p7state&&tC[i].p7state=='open'&&tC[i]!=a.parentNode){

				PCRUclose(tC[i].getElementsByTagName('A')[0]);

			}

		}

	}

}

function PCRUsetGlide(a,op,dur){

	var tC,tU,th,stp,fr,dy;

	dur=(dur&&dur>0)?dur:250;

	dy=30;

	tC=document.getElementById(a.tmmsub);

	tC.LISTdelay=dy;

	tU=document.getElementById(tC.id.replace('d','u'));

	th=tU.offsetHeight;

	tC.LISTtargetHeight=th;

	stp=dur/dy;

	fr=parseInt(th/stp);

	fr=(fr<=1)?1:fr;

	tC.LISTframeRate=fr;

}

function PCRUanim(d){

	var i,op,tB,tC,tU,tm,st,ch,th,nh,inc,nm,cm,m=false;

	tB=document.getElementById(d);

	tC=tB.LISTcont;

	op=tB.p7opt[1];

	for(i=0;i<tC.length;i++){

		if(tC[i]){

			st=tC[i].p7state;

			if(op==1||op==3){

				if(st=='open'&&tC[i].LISTtargetHeight==0){

					tC[i].LISTtargetHeight=tC[i].offsetHeight;

					tC[i].p7ch=tC[i].LISTtargetHeight;

				}

				th=(st=='closed')?0:tC[i].LISTtargetHeight;

				ch=tC[i].p7ch;

				inc=tC[i].LISTframeRate;

				if(st=='closed'&&ch!==0){

					nh=ch-inc;

					nh=(nh<=0)?0:nh;

					m=true;

					tC[i].style.height=nh+'px';

					tC[i].p7ch=nh;

				}

				else if(st=='open'&&ch!=th){

					nh=ch+inc;

					nh=(nh>=th)?th:nh;

					m=true;

					tC[i].style.height=nh+'px';

					tC[i].p7ch=nh;

				}

				else if(st=='open'){

					tC[i].style.height='auto';

				}

			}

			if(op==2||(op==3&&!m)){

				cm=tC[i].p7cm;

				tm=tC[i].LISTtargetLeft;

				if(st=='open'&&cm!=tm){

					nm=cm+=20;

					nm=(nm>=0)?0:nm;

					m=true;

					tC[i].style.left=nm+'px';

					tC[i].p7cm=nm;

				}

			}

		}

	}

	if(!m){

		tB.LISTrunning=false;

		clearInterval(tB.LISTglide);

	}

}

function PCRUall(d,ac,lv){

	var i,tM,tA;

	lv=(lv>0)?lv:0;

	tM=document.getElementById(d);

	if(tM){

		tA=tM.getElementsByTagName("A");

		for(i=0;i<tA.length;i++){

			if(tA[i].tmmsub&&(lv==0||tA[i].tmmlevel<=lv)){

				if(ac=='open'){

					if(tA[i].p7state!='open'){

						PCRUopen(tA[i],1);

					}

				}

				else{

					if(tA[i].p7state!='closed'){

						PCRUclose(tA[i],1);

					}

				}

			}

		}

	}

}

function PCRUmark(){

	LISTadv[LISTadv.length]=arguments;

}

function PCRUcurrentMark(el){

	var x,j,i,k,wH,cm=false,mt=['',1,'',''],op,r1,kk,tA,aU,pp,a,im;

	wH=window.location.href;

	if(el.p7opt[12!=1]){

		wH=wH.replace(window.location.search,'');

	}

	if(wH.charAt(wH.length-1)=='#'){

		wH=wH.substring(0,wH.length-1);

	}

	for(k=0;k<LISTadv.length;k++){

		if(LISTadv[k][0]&&LISTadv[k][0]==el.id){

			mt=LISTadv[k];

			cm=true;

			break;

		}

	}

	op=mt[1];

	if(op<1){

		return;

	}

	r1=/index\.[\S]*/i;

	k=-1;

	kk=-1;

	tA=el.getElementsByTagName("A");

	for(j=0;j<tA.length;j++){

		aU=tA[j].href.replace(r1,'');

		if(op>0){

			if(tA[j].href==wH||aU==wH){

				k=j;

				kk=-1;

			}

		}

		if(op==2){

			if(tA[j].firstChild){

				if(tA[j].firstChild.nodeValue==mt[2]){

					kk=j;

				}

			}

		}

		if(op==3&&tA[j].href.indexOf(mt[2])>-1){

			kk=j;

		}

		if(op==4){

			for(x=2;x<mt.length;x+=2){

				if(wH.indexOf(mt[x])>-1){

					if(tA[j].firstChild&&tA[j].firstChild.nodeValue){

						if(tA[j].firstChild.nodeValue==mt[x+1]){

							kk=j;

						}

					}

				}

			}

		}

	}

	k=(kk>k)?kk:k;

	if(k>-1){

		pp=tA[k].parentNode;

		while(pp){

			if(pp.tagName&&pp.tagName=='LI'){

				PCRUsetClass(pp,'li_current_mark');

				a=pp.getElementsByTagName('A');

				if(a&&a[0]){

					PCRUsetClass(a[0],'current_mark');

					if(a[0].hasImg){

						im=a[0].getElementsByTagName('IMG')[0];

						im.mark=true;

						im.src=im.p7imgswap[3];

					}

					if(a[0].tmmsub){

						PCRUopen(a[0],1);

					}

				}

			}

			else{

				if(pp==el){

					break;

				}

			}

			pp=pp.parentNode;

		}

	}

}

function PCRUsetClass(ob,cl){

	var cc,nc,r=/\s+/g;

	cc=ob.className;

	nc=cl;

	if(cc&&cc.length>0&&cc.indexOf(cl)==-1){

		nc=cc+' '+cl;

	}

	nc=nc.replace(r,' ');

	ob.className=nc;

}

function PCRUremClass(ob,cl){

	var cc,nc,r=/\s+/g;

	cc=ob.className;

	if(cc&&cc.indexOf(cl>-1)){

		nc=cc.replace(cl,'');

		nc=nc.replace(r,' ');

		ob.className=nc;

	}

}

function PCRUgetPropValue(ob,prop,prop2){

	var h,v=null;

	if(ob){

		if(ob.currentStyle){

			v=eval('ob.currentStyle.'+prop);

		}

		else if(document.defaultView.getComputedStyle(ob,"")){

			v=document.defaultView.getComputedStyle(ob,"").getPropertyValue(prop2);

		}

		else{

			v=eval("ob.style."+prop);

		}

	}

	return v;

}

