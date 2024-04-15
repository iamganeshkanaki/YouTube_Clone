import React, { useEffect } from 'react'
import "./Feed.css"
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.png"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import thumbnail5 from "../../assets/thumbnail5.png"
import thumbnail6 from "../../assets/thumbnail6.png"
import thumbnail7 from "../../assets/thumbnail7.png"
import thumbnail8 from "../../assets/thumbnail8.png"
import { Link } from "react-router-dom";
import { API_KEY, viewCounter } from '../../data';
import { useState } from 'react'
import moment from 'moment/moment'
const Feed = ({ category }) => {
    const [data, setData] = useState([])
    const fetchdata = async () => {
        const videoList_URL = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CContentDetails%2CStatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videoList_URL).then(res => res.json()).then(cdata => setData(cdata.items)).catch((err) => {
            console.log("Error:", err);
        })
    }

    useEffect(() => {
        fetchdata();
    }, [category])
    return (
        <div>
            <div className="feed">
                {
                    data.map((item, index) => {
                        return (
                            <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                                <img src={item.snippet.thumbnails.medium.url} alt="" />
                                <h2>{item.snippet.title}</h2>
                                <h3>{item.snippet.channelTitle}</h3>
                                <p> {viewCounter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                            </Link>
                        )
                    })}
            </div>
        </div>
    )
}

export default Feed
