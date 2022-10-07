import { getByTitle } from '@testing-library/react'
import React from 'react'

const NewsItem=(props)=>{
    let {title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div>
           <div className="my-3">
              <div className="card">
                  <img src={!imageUrl?"https://www.businessinsider.in/photo/94335957/night-owls-may-have-higher-risk-of-heart-disease-and-type-2-diabetes-than-early-birds-according-to-research.jpg?imgsize=52098":imageUrl}/>
                  <div className="card-body">
                      <h5 className="card-title">{title} <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{right:"20%", zIndex:'1'}}>
    {source}
  </span></h5>
                      <p className="card-text">{description}</p>
                      <p class="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                      <a href={newsUrl} target="_blank" className="btn btn-dark">Go somewhere</a>
                  </div>
              </div>
            </div> 
      </div>
    )
  }

export default NewsItem
