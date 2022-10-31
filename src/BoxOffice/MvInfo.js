//import mv from '../JsonData/Movie.json'
//import './Movie.css' 
//import MvTimer from './MvTimer';

//useState Hook
import { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';


function MvInfo(probs) {
  const [mlis, setMlis] = useState([]);
  /*
영화명 movieNm
영화코드 movieCd
개봉일 openDt
제작상태 prdtStatNm
관람등급 audits => watchGradeNm
상영시간 showTm
제작국가 nations => nation => nationNm
감독 directors=>director=>peopleNm
장르 genres => genre => genreNm
배급사 companys => company => companyPartNm === 배급사
*/
  //json 데이터 가져오기
  const mvinfo = probs.m.movieInfoResult.movieInfo;
  // console.log(mvinfo);

  // 화면에 출력할 정보를 오브젝트 생성
  let myinfo = {};
  const key1 = ['movieNm', 'movieCd', 'openDt', 'prdtStatNm', 'showTm']
  //배열에 대한 정보 처리
  const key2 = ['audits', 'nations', 'directors', 'genres', 'companys' ]

  const keys = {
    'movieNm' : '영화명',
    'movieCd' : '영화코드',
    'openDt' : '개봉일',
    'prdtStatNm' : '제작상태',
    'showTm' : '상영시간',
    'audits' : '관람등급', 
    'nations' : '제작국가', 
    'directors' :'감독', 
    'genres' : '장르', 
    'companys' : '배급사'
  }
  //key1에 해당하는 값추출
  for(let k of key1) {
    myinfo[keys[k]] = mvinfo[k];
  }
  //key2에 해당하는 값추출 : 배열에서 추출
  for(let k of key2) {
    switch (k) {
      case 'audits' :
        myinfo[keys[k]] = mvinfo[k].map((item)=>item.watchGradeNm);
        break;
      case 'nations' :
        myinfo[keys[k]] = mvinfo[k].map((item)=>item.nationNm);
        break;
      case 'directors' :
        myinfo[keys[k]] = mvinfo[k].map((item)=>item.peopleNm);
        break;
      case 'genres' :
        myinfo[keys[k]] = mvinfo[k].map((item)=>item.genreNm);
        break;
        default:
      case 'companys' :
        myinfo[keys[k]] = mvinfo[k].filter((item)=>item.companyPartNm === '배급사');
        myinfo[keys[k]] = myinfo[keys[k]].map((item)=>item.companyNm); //myinfo[keys[k]] 필터
        break;
        
    }
  }
  // console.log(myinfo);
  //화면에 출력할 내용을 jsx로 만들기
  let lis = [];

  for (let [k, v] of Object.entries(myinfo)) {
    lis.push(<li key={myinfo.movieCd + k} className='Li1'>
      <span className='span1'>{k}</span>
      <span className='span2'> {v}</span>
      </li>);
  }

  //count 제어
  let cntUp = 0;
  let cntDown = 0;

  //State 변수
  let [cntUpSt, setCntUpSt] = useState(0);
  let [cntDownSt, setCntDownSt] = useState(0);
  let [flag, setFlag] = useState(true);
  let [flag2, setFlag2] = useState('none');
  let [txt1, setTxt1] = useState([]);

  //useRef
  let cntRef = useRef(0);
  let txtRef = useRef();

  const handleUp = () => {
    // console.log('local 변수 :', ++cntUp);
    setCntUpSt(++cntUpSt)
    console.log('state변수(좋아요) :',cntUpSt)
    cntRef.current = cntRef.current + 1;
  }
  const handleDown = () => {
    // console.log('local 변수 :',++cntDown);
    setCntDownSt(++cntDownSt)
    console.log('state변수(싫어요) :',cntDownSt)
    ++cntRef.current;
  }

  //시계아이콘을 클릭하면 flag변수 변경
  const handleTimer = () =>{
    setFlag(!flag);
    setFlag2(flag2 === 'none'? 'flex':'none');
    console.log(flag2);

    console.log(cntRef.current)
  }
  
  //form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(txtRef.current.value)
    setTxt1([<li key={txtRef.current.value}>
      {txtRef.current.value}
      </li>, ...txt1])
  }
    //useEffect Hook 랜더링 발생시 계속 수행
  useEffect(()=>{
    console.log('useEffect 랜더링 발생시 계속 수행')
  });

  //useEffect Hook 컴포넌트 생성시 한번 발생
  useEffect(()=>{
    console.log('useEffect 컴포넌트 생성시 한번 발생')
    console.log('ref cnt', cntRef.current)

    txtRef.current.focus();
  },[]);

  // useEffect Hook 관련 state변수가 변경될때 실행
  useEffect(()=>{
    console.log('useEffect 관련 state변수가 변경될때 실행')
  },[cntUpSt]);
  const navigate = useNavigate();
  const Click = (k) => {
    const url = {
      '홈으로' : '/'
    }
    navigate(url[k])
  }
  return (
    <>
    <div className='mainDiv'>
    <h1>영화상세</h1>
    
    <form className='MvForm' onSubmit={handleSubmit}>
        <button onClick={()=>Click('홈으로')} className='home'>Home</button>
        <input type='text' ref={txtRef} placeholder='댓글을 입력하세요.' />
        <button type='submit'>등록</button>
        <button type='reset'>취소</button>
      </form>
      <div className='mvFormList'>
        <ul className='Mvul'>
         {txt1}
        </ul>
      </div>
    <ul className='mvLi'>
      {lis}
    </ul>
    </div>
      <div className='mvList2'>
        <div onClick={handleUp} className='p'>👍</div>
        <div>{cntUpSt}</div>
        <div onClick={handleDown} className='p'>👎</div>
        <div>{cntDownSt}</div>
        <div onClick={handleTimer} className='p'>⏰</div>
      </div>
      {/* <div className='mvList3'>{flag && <MvTimer/>}</div> */}
      <div className='mvList3' style={{'display':flag2}}>
      </div>
    </>
  )
};
export default MvInfo;