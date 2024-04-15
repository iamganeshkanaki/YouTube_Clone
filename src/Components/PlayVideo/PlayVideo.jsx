import React, { useState, useEffect } from 'react';
import "./PlayVideo.css";
import video1 from '../../assets/video.mp4';
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, viewCounter } from '../../data';

const PlayVideo = () => {
  const {videoId} = useParams();
  const [apidata, setAPIdata] = useState(null);
  const [channelData, setChnannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CContentDetails%2CStatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videDetails_url).then(res => res.json()).then(data => setAPIdata(data.items[0]));
  }

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CContentDetails%2CStatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url).then(res => res.json()).then(cdata => setChnannelData(cdata.items[0]));

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2C%20replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items));
  }

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);



  useEffect(() => {
    if (apidata) {
      fetchOtherData();
    }
  }, [apidata]);

  return (
    <div className='play-video'>
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Create YouTube Clone Using React JS | Build Complete Website Like YouTube In React JS 2024" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>{apidata ? viewCounter(apidata.statistics.viewCount) : "16K"} &bull; {apidata ? moment(apidata.snippet.publishedAt).fromNow() : "Non"}</p>
        <div>
          <span><img src={like} alt="" /> {apidata ? viewCounter(apidata.statistics.likeCount) : 155} </span>
          <span><img src={dislike} alt="" /> </span>
          <span><img src={share} alt="" /> Share </span>
          <span><img src={save} alt="" /> Save </span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : "Error"}</p>
          <span>{channelData ? viewCounter(channelData.statistics.subscriberCount) : ""} Subscribers </span>
        </div>
        <button> Subscribe </button>
      </div>
      <div className="vid-description">
        <p>{apidata ? apidata.snippet.description.slice(0, 250) : "Description"}</p>
        <hr />
        <h4>{apidata ? viewCounter(apidata.statistics.commentCount) : 102}</h4>
        {commentData.map((item, index) => (
          <div className="comment" key={index}>
            <img src={jack} alt="" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>{viewCounter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayVideo;
