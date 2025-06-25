import React,{useState} from 'react';
import './article.css';

const Article = ({ imgUrl, date, text, smImgUrl }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    console.log("loaded");
    setLoaded(true);
  }

  return(
    <div className="rd__blog-container_article">
      <div className={loaded ? "rd__blog-container_article-image blurred-img loaded" : "rd__blog-container_article-image blurred-img"} style={{backgroundImage: `url(${smImgUrl})`}}>
        <img src={imgUrl} alt="blog_image" loading="lazy" onLoad={handleLoad}/>
      </div>
      <div className="rd__blog-container_article-content">
        <div>
          <p>{date}</p>
          <h3>{text}</h3>
        </div>
        <p>Read Full Article</p>
      </div>
    </div>
  )
};

export default Article;
