import { useEffect, useState, useRef } from "react";  //3
import { Link } from "react-router-dom";

export default function BoxOffice() {
  //state 변수
  const [viewDay, setViewDay] = useState();
  const [viewDayF, setViewDayF] = useState();
  const [officeList, setOfficeList] = useState([]);

  //ref 변수
  const refDateIn = useRef();
  
   //비동기 통신   2   async.. await
  const getBoxOffice = async(d) => {  //1
    let url ='https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?'
    url = url + 'key=' +'f5eef3421c602c6cb7ea224104795888';
    url = url + '&targetDt=' + d

   
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      console.log('data => ', data.boxOfficeResult.dailyBoxOfficeList);
      let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      setOfficeList(
        dailyBoxOfficeList.map((item) => 
        <li key={item.movieCd} className='rank'>
          <Link to={'/mv?mvcd=' + item.movieCd}>
          [{item.rank}]
          {item.movieNm}
          {item.rankInten > 0 ? '🔼' : item.rankInten < 0 ? '🔽' : ''}
          
          {Math.abs(Number(item.rankInten))}
          </Link>
        </li>)
      )
    }
    catch (err) {
      console.log('err => ', err)
    }
    
  }
  //페이지 처음 랜더링이 되었을때 실행되는 HDDk -4-
  useEffect(() => {
    //어제 날짜 추출
    //const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() -1 );
    let d = yesterday.toISOString().substring(0, 10).replaceAll('-','')
    //state 변경
    setViewDay(d);

    //console.log('d => ', d)
    //console.log(yesterday.toISOString())

    //박스오피스 open API 호출
    getBoxOffice(d);
  },[])
  useEffect(() => {
    //console.log(viewDay);
    (viewDay && setViewDayF(viewDay.substring(0,4)+'.'+viewDay.substring(4,6)+'.'+viewDay.substring(6,8)))
  getBoxOffice(viewDay)},[viewDay])
  //이벤트 함수
  const handleChange = (e) => {
    e.preventDefault();
    setViewDay(refDateIn.current.value.replaceAll('-',''))
  }
  return(
    <>
      <h1>BoxOffice ({viewDayF}일자)</h1>
      <form>
        <input type="date" name="dateIn" ref={refDateIn} onChange={handleChange}/>
      </form>
      <ul>
        {officeList}
      </ul>
    </>
  );
}