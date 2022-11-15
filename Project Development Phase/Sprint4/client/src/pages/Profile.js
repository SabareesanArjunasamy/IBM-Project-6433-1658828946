import React, { useState, useEffect } from "react";
import axios from "axios";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import News from "../component/News";
import Multiselect from "multiselect-react-dropdown";

const Profile = () => {
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState();
  const [likedArticles, setLikedArticles] = useState([]);
  const [bookedArticles, setBookedArticles] = useState([]);
  const [options, setOptions] = useState([{ name: 'business', id: 1 }, { name: 'entertainment', id: 2 }, { name: 'general', id: 3 }, { name: 'health', id: 4 }, { name: 'science', id: 5 }, { name: 'sports', id: 6 }, { name: 'business', id: 7 }, { name: 'technology', id: 8 }, { name: 'Virat Kohli', id: 9 }, { name: 'Narendra Modi', id: 10 }, { name: 'Rain', id: 13 }, { name: 'MK Stalin', id: 12 }, { name: 'Cinema', id: 13 }, { name: 'Floods', id: 14 }, { name: 'politics', id: 15 }, { name: 'Donald Trump', id: 16 }, { name: 'Putin', id: 17 }, { name: 'Ukraine-Russia', id: 18 }, { name: 'Biden', id: 19 }, { name: 'ADMK', id: 20 }, { name: 'Rahul Gandhi', id: 21 }, { name: 'China', id: 22 }, { name: 'corona', id: 23 }, { name: 'elon musk', id: 24 }, { name: 'worldcup', id: 25 }, { name: 'BJP', id: 26 }, { name: 'Taiwan China crisis', id: 27 }, { name: 'job opputunities', id: 28 }, { name: 'tourism', id: 29 }, { name: 'metroplian', id: 30 }]);
  const [selectedVal, setSelectedVal] = useState([]);
  useEffect(() => {
    const fn = async () => {
      const profileData = await axios.get("http://169.51.205.76:32522/profile?userName=" + sessionStorage.getItem('@user'));
      console.log('data', profileData.data.topics);
      setData(profileData.data);
      const selval = [];
      let ids = 0;
      for (const topic of profileData.data.topics) {
        selval.push({
          name: topic,
          id: ids
        })
        ids++;
      }
      setSelectedVal(selval);
      const likedLinks = profileData.data?.likes.reduce((prev, cur) => {
        return prev.concat(cur.NEWS_ARTICLE_LINK);
      }, [])
      const bookmarkedLinks = profileData.data?.bookmarks.reduce((prev, cur) => {
        return prev.concat(cur.NEWS_ARTICLE_LINK);
      }, [])
      setLikedArticles(likedLinks);
      setBookedArticles(bookmarkedLinks);
      setFetched(true);
    }
    fn();
  }, [])
  const onSelect = (selectedList, selectedItem) => {
    selectedVal.push(selectedItem)
  }

  const onRemove = (selectedList, removedItem) => {
    let newVal = [];
    for(const topic of selectedVal){
      if(topic.id==removedItem.id){
        console.log(topic,removedItem);
        continue;
      }
      newVal.push(topic);
    }
    setSelectedVal(newVal);
  }
  return (
    <>
      {fetched ?
        <div>
          <div className="pt-20">
            <div className="px-20">
              <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div>
                        <img width={180} height={180} alt="..." src="https://64.media.tumblr.com/bed5455fdd7789656247fb01ed60ad31/93c34c0b6d121aef-6a/s400x600/15a48a245b0ef5bb4f5215d177116cf9c4150531.png" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button onClick={() => {
                          sessionStorage.removeItem('@user');
                          window.location.replace('/');
                        }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                          Logout
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{data?.likes?.length}</span><span className="text-sm text-blueGray-400">Likes</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{data?.bookmarks?.length}</span><span className="text-sm text-blueGray-400">Bookmarks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {data?.user.NAME}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      Date of Birth : {data?.user.DOB}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> Email : {data?.user.USERNAME}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Password : {'*'.repeat(data?.user.PASSWORD?.length)}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Topics: {data?.user.TOPICS}
                    </div>
                  </div>
                  {data?.likes.length > 0 ?
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <h1 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Articles Liked</h1>
                        <Carousel autoPlay>
                          {data?.likes.map((item, index) =>
                            <News new={{
                              title: item.NEWS_TITLE,
                              url: item.NEWS_ARTICLE_LINK,
                              description: item.NEWS_DESCRIPTION,
                              urlToImage: item.NEWS_IMAGE_LINK,
                              publishedAt: item.NEWS_DATE,
                              liked: true,
                              bookmark: bookedArticles?.includes(item.NEWS_ARTICLE_LINK)
                            }} key={index} />
                          )}
                        </Carousel>
                      </div>
                    </div>
                    : null}
                  {data?.bookmarks?.length ?
                    <div className="w-full mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex justify-center">
                        <h1 className="text-center text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Articles BookMarked</h1>
                        <Carousel autoPlay>
                          {data?.bookmarks.map((item, index) =>
                            <News new={{
                              title: item.NEWS_TITLE,
                              url: item.NEWS_ARTICLE_LINK,
                              description: item.NEWS_DESCRIPTION,
                              urlToImage: item.NEWS_IMAGE_LINK,
                              publishedAt: item.NEWS_DATE,
                              liked: likedArticles?.includes(item.NEWS_ARTICLE_LINK),
                              bookmark: true
                            }} key={index} />
                          )}
                        </Carousel>
                      </div>
                    </div>
                    : null}
                  <div className="text-center mb-40">
                    <h1 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Update Tags</h1>
                    <Multiselect
                      options={options}
                      selectedValues={selectedVal}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                    />
                    <div className="flex justify-center mt-40">
                      <button onClick={async() => {
                        let topicSelected = [];
                        for(const topics of selectedVal){
                          topicSelected.push(topics.name);
                        }
                        const payload = {
                          user: sessionStorage.getItem('@user'),
                          topics: topicSelected
                        }
                        await axios.post("http://169.51.205.76:32522/update-profile",payload);
                      }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-white font-semibold py-1">
                      Made by Saitama Squad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}

export default Profile;