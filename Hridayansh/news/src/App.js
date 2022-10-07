import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  pagesize=5;
  apikey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <Navbar></Navbar>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="general" pageSize={this.pagesize} country="in" category="general"></News>}></Route>
          <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="business" pageSize={this.pagesize} country="in" category="business"></News>}></Route>
          <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pagesize} country="in" category="entertainment"></News>}></Route>
          <Route path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey}   key="general" pageSize={this.pagesize} country="in" category="general"></News>}></Route>
          <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey}   key="health" pageSize={this.pagesize} country="in" category="health"></News>}></Route>
          <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey}   key="science" pageSize={this.pagesize} country="in" category="science"></News>}></Route>
          <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="sports" pageSize={this.pagesize} country="in" category="sports"></News>}></Route>
          <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey}   key="technology" pageSize={this.pagesize} country="in" category="technology"></News>}></Route>
        </Routes>
      </>
    )
  }
}
