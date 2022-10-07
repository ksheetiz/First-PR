import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1);
  const[totalResults,setTotalResults]=useState(0)
  //document.title=`${props.category}-NewsMonkey`;

  const updateNews=async()=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7fdd294e4448448d088eb1961e3c08&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData= await data.json()
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.loading);
    setLoading(false)
    console.log(parseData);
    console.log("This is page for : "+props.category);
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  }, [])
   
  const handlePrevClick=async()=>{
    setPage(page-1)
    updateNews();
  }

  const handleNextClick =async ()=>{ 
  setPage(page+1)
  updateNews(); 
  }
  
  const fetchMoreData =async () => {
     setPage(page+1)
     const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3d7fdd294e4448448d088eb1961e3c08&page=${page}&pageSize=${props.pageSize}`;
     setLoading(true)
     let data = await fetch(url);
     let parseData= await data.json()
     console.log(parseData);
     setArticles(articles.concat(parseData.articles))
     setTotalResults(parseData.totalResults)
     console.log("This is page for : "+props.category);
  };
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey- Top {`${props.category}`} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
      
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          
          <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
            </div>
        })}    
        </div>
        </div>
      
      </InfiniteScroll>
      </div>
    )
  }
News.defaultProps={
  country:'in',
  pageSize:8,
  category: "general",
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string,
}
export default News

