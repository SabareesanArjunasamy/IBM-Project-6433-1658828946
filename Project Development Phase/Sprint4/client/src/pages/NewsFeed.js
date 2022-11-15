import React, { useState, useEffect } from 'react';
import News from '../component/News';
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const NewsFeed = () => {
  const [articles, setArticles] = useState([])
  const [fetched, setFetched] = useState(false);
  const [likedArticles, setLikedArticles] = useState();
  const [bookedArticles, setBookedArticles] = useState();
  const [changed, setChanged] = useState(false);
  // const [found1, setFound1] = useState(0);
  // const [found2, setFound2] = useState(0);
  // useEffect(() => {
  //   setFound1(found1+1);
  // }, [likedArticles])
  // useEffect(() => {
  //   setFound2(found2+1);
  // }, [bookedArticles])
  useEffect(() => {
    const fn = () => {
      axios.get("http://169.51.205.76:32522/get-top-headlines?userName=" + sessionStorage.getItem('@user')).then((data, error) => {
        axios.get("http://169.51.205.76:32522/profile?userName=" + sessionStorage.getItem('@user')).then((profileData, err) => {
          console.log(profileData);
          let likedList = [], bookedList = [];
          for(const article of profileData?.data.likes){
            var name = article.NEWS_ARTICLE_LINK;
            var obj = {};
            obj[name] = true;
            likedList = {
              ...likedList,
              ...obj
            };
          }
          for(const article of profileData?.data.bookmarks){
            var name = article.NEWS_ARTICLE_LINK;
            var obj = {};
            obj[name] = true;
            bookedList = {
              ...bookedList,
              ...obj
            };
          }
          setLikedArticles(likedList);
          setBookedArticles(bookedList);
          setArticles(data.data.articles);
          setFetched(true);
        })
      })
    }
    fn();
  }, [])

  return (
    <div className='w-full flex'>
      <div className='m-auto justify-center p-20 rounded-lg'>
        <Link to="/profile"><CgProfile className='text-white text-5xl float-right -mr-3/4 -mt-16' /></Link>
        {fetched ?
          <>
            {articles.map((item, index) => {
              if(index==0)
              console.log('lister',likedArticles,bookedArticles);
              return (
                <News new={{
                  ...item,
                  liked: likedArticles[`${item.url}`],
                  bookmark: bookedArticles[`${item.url}`]
                }} key={index} />
              )
            }
            )
            }
          </>
          : null}
      </div>
    </div>
  );
}

export default NewsFeed;